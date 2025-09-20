const { createCampaign, getCampaigns, deleteCampaign: deleteCampaignModel, removePlayerFromCampaign } = require("../models/campaignModel");
const { addCampaignRole } = require("../models/campaignRoleModel");
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

// Invite player to campaign
const invitePlayerToCampaign = async (req, res) => {
  try {
    const { campaign_id, user_id } = req.body;
    const invited_by = req.user.user_id;

    if (!campaign_id || !user_id) return res.status(400).json({ error: "All fields are required" });

    await addCampaignRole({ campaign_id, user_id, role: "player", invited_by });

    // Update campaign player_ids column
    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);
    if (campaign) {
      const currentPlayers = campaign.player_ids ? JSON.parse(campaign.player_ids) : [];
      if (!currentPlayers.includes(user_id)) {
        currentPlayers.push(user_id);
        // This function doesn't exist yet - you'll need to implement it
        // await updatePlayerIds(campaign_id, JSON.stringify(currentPlayers));
      }
    }

    res.json({ message: "Player invited successfully" });
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
