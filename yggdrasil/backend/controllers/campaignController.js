const { createCampaign, getCampaigns, deleteCampaign: deleteCampaignModel, removePlayerFromCampaign } = require("../models/campaignModel");
const { addCampaignRole } = require("../models/campaignRoleModel");
const { createInvite } = require("../models/inviteModel"); // ← Add this
const cloudinary = require("cloudinary").v2;
const pool = require("../config/db");


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateCampaignId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `CAM-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}`;
};

// Create new campaign
const createNewCampaign = async (req, res) => {
  try {
    const { campaign_name, cover_color, description, setting, factions, themes } = req.body;
    const creatorUserId = req.user.user_id;

    if (!campaign_name || !req.files?.cover_img || !creatorUserId) {
      return res.status(400).json({ error: "Campaign name, cover image, and creator are required" });
    }

    const coverUpload = await cloudinary.uploader.upload(req.files.cover_img.tempFilePath);

    let mapUploadUrl = null;
    if (req.files?.map_img) {
      const mapUpload = await cloudinary.uploader.upload(req.files.map_img.tempFilePath);
      mapUploadUrl = mapUpload.secure_url;
    }

    const campaign_id = generateCampaignId();

    await createCampaign({
      campaign_id,
      campaign_name,
      cover_img: coverUpload.secure_url,
      cover_color: cover_color || null,
      description: description || null,
      setting: setting || null,
      factions: factions ? JSON.parse(factions) : [],
      themes: themes ? JSON.parse(themes) : [],
      map_img: mapUploadUrl,
      creator_user_id: creatorUserId,
      player_ids: JSON.stringify([]), // initialize empty array
    });

    await addCampaignRole({ campaign_id, user_id: creatorUserId, role: "admin" });

    res.status(201).json({ message: "Campaign created successfully", campaign_id });
  } catch (err) {
    console.error("Campaign creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch campaigns where user is creator or player
const fetchCampaigns = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const campaigns = await getCampaigns();

    // Filter campaigns where user is creator or in player_ids
    const filtered = campaigns.filter(c => 
      c.creator_user_id === userId ||
      (c.player_ids && JSON.parse(c.player_ids).includes(userId))
    );

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Send invite notification
const invitePlayerToCampaign = async (req, res) => {
  try {
    const { campaign_id, receiver_id } = req.body;
    const sender_id = req.user.user_id; // logged-in user

    if (!campaign_id || !receiver_id)
      return res.status(400).json({ error: "Campaign ID and receiver ID required" });

    await createInvite({ campaign_id, sender_id, receiver_id });

    res.json({ message: "Invite sent successfully" });
  } catch (err) {
    console.error("invitePlayerToCampaign error:", err);
    res.status(500).json({ error: err.message });
  }
};



// Accept invite
const acceptCampaignInvite = async (req, res) => {
  try {
    const { campaign_id } = req.body;
    const user_id = req.user.user_id;

    // Add role for player
    await addCampaignRole({ campaign_id, user_id, role: "player" });

    // Remove notification
    const [user] = await pool.query("SELECT notifications FROM users WHERE user_id = ?", [user_id]);
    let notifications = user[0].notifications ? JSON.parse(user[0].notifications) : [];
    notifications = notifications.filter(n => !n.includes(`invited to join campaign ${campaign_id}`));
    await pool.query("UPDATE users SET notifications = ? WHERE user_id = ?", [JSON.stringify(notifications), user_id]);

    res.json({ message: "You have joined the campaign!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete campaign (only for admin/creator) - Option 1
const deleteCampaignController = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const userId = req.user.user_id;

    // Check if campaign exists
    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // Check if user is the creator/admin
    if (campaign.creator_user_id !== userId) {
      return res.status(403).json({ error: "Only the campaign creator can delete this campaign" });
    }

    // Delete all roles linked to this campaign first
    await pool.query("DELETE FROM campaign_roles WHERE campaign_id = ?", [campaign_id]);
    console.log(`Deleted roles for campaign ${campaign_id}`);

    // Now delete the campaign
    await deleteCampaignModel(campaign_id);
    console.log(`Deleted campaign ${campaign_id}`);

    res.json({ message: "Campaign and its roles deleted successfully" });
  } catch (err) {
    console.error("Error deleting campaign:", err);
    res.status(500).json({ error: err.message });
  }
};

// Leave campaign (for players)
const leaveCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const userId = req.user.user_id;
    
    // Check if user is a player in this campaign
    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);
    
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    
    const playerIds = campaign.player_ids ? JSON.parse(campaign.player_ids) : [];
    
    if (!playerIds.includes(userId)) {
      return res.status(400).json({ error: "You are not a player in this campaign" });
    }
    
    await removePlayerFromCampaign(campaign_id, userId);
    res.json({ message: "You have left the campaign" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get roles for a specific campaign
const getCampaignRoles = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    
    const [rows] = await pool.query(
      "SELECT * FROM campaign_roles WHERE campaign_id = ?",
      [campaign_id]
    );
    
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
  createNewCampaign, 
  fetchCampaigns, 
  invitePlayerToCampaign, 
  deleteCampaign: deleteCampaignController, 
  leaveCampaign,
  getCampaignRoles
};


// Update existing campaign
const updateCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const { campaign_name, cover_color, description, setting, factions, themes } = req.body;

    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);

    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    // Optional: Only creator can edit
    if (campaign.creator_user_id !== req.user.user_id) {
      return res.status(403).json({ error: "Only the creator can edit this campaign" });
    }

    let coverImgUrl = campaign.cover_img;
    if (req.files?.cover_img) {
      const upload = await cloudinary.uploader.upload(req.files.cover_img.tempFilePath);
      coverImgUrl = upload.secure_url;
    }

    let mapImgUrl = campaign.map_img;
    if (req.files?.map_img) {
      const upload = await cloudinary.uploader.upload(req.files.map_img.tempFilePath);
      mapImgUrl = upload.secure_url;
    }

    await pool.query(
      `UPDATE campaigns SET campaign_name=?, cover_img=?, cover_color=?, description=?, setting=?, factions=?, themes=?, map_img=? WHERE campaign_id=?`,
      [
        campaign_name,
        coverImgUrl,
        cover_color,
        description,
        setting,
        factions,
        themes,
        mapImgUrl,
        campaign_id
      ]
    );

    res.json({ message: "Campaign updated successfully" });
  } catch (err) {
    console.error("Error updating campaign:", err);
    res.status(500).json({ error: err.message });
  }
};

const getCampaignDm = async (req, res) => {
  try {
    const { campaign_id } = req.params;

    // Join campaign_roles with users to get DM info
    const [rows] = await pool.query(
      `SELECT u.user_id, u.username, u.profile_img
       FROM campaign_roles cr
       JOIN users u ON cr.user_id = u.user_id
       WHERE cr.campaign_id = ? AND cr.role = 'admin'`,
      [campaign_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "DM not found for this campaign" });
    }

    res.json(rows[0]); // return the DM info
  } catch (err) {
    console.error("Error fetching DM info:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewCampaign,
  fetchCampaigns,
  invitePlayerToCampaign,
  deleteCampaign: deleteCampaignController,
  leaveCampaign,
  getCampaignRoles,
  updateCampaign,
  getCampaignDm
};

