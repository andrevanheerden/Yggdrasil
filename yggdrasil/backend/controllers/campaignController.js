const { createCampaign, getCampaigns, deleteCampaign: deleteCampaignModel, removePlayerFromCampaign } = require("../models/campaignModel");
const { addCampaignRole } = require("../models/campaignRoleModel");
const { createInvite, getInvitesForUser, updateInviteStatus } = require("../models/inviteModel");
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

// -------------------- CAMPAIGN CRUD -------------------- //

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
      player_ids: JSON.stringify([]),
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

// Update existing campaign
const updateCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const { campaign_name, cover_color, description, setting, factions, themes } = req.body;

    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    if (campaign.creator_user_id !== req.user.user_id) return res.status(403).json({ error: "Only creator can edit" });

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

// Delete campaign
const deleteCampaignController = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const userId = req.user.user_id;

    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    if (campaign.creator_user_id !== userId) return res.status(403).json({ error: "Only creator can delete" });

    await pool.query("DELETE FROM campaign_roles WHERE campaign_id = ?", [campaign_id]);
    await deleteCampaignModel(campaign_id);

    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Leave campaign
const leaveCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const userId = req.user.user_id;

    const campaigns = await getCampaigns();
    const campaign = campaigns.find(c => c.campaign_id === campaign_id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    const playerIds = campaign.player_ids ? JSON.parse(campaign.player_ids) : [];
    if (!playerIds.includes(userId)) return res.status(400).json({ error: "Not a player" });

    await removePlayerFromCampaign(campaign_id, userId);
    res.json({ message: "You have left the campaign" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get campaign DM
const getCampaignDm = async (req, res) => {
  try {
    const { campaign_id } = req.params;

    const [rows] = await pool.query(
      `SELECT u.user_id, u.username, u.profile_img
       FROM campaign_roles cr
       JOIN users u ON cr.user_id = u.user_id
       WHERE cr.campaign_id = ? AND cr.role = 'admin'`,
      [campaign_id]
    );

    if (!rows.length) return res.status(404).json({ error: "DM not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get campaign roles
const getCampaignRoles = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const [rows] = await pool.query("SELECT * FROM campaign_roles WHERE campaign_id = ?", [campaign_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- INVITES -------------------- //

// Send invite
const invitePlayerToCampaign = async (req, res) => {
  try {
    const { campaign_id, receiver_id } = req.body;
    const sender_id = req.user.user_id;

    if (!campaign_id || !receiver_id) return res.status(400).json({ error: "Campaign ID and receiver ID required" });

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
    const { invite_id } = req.body;
    const user_id = req.user.user_id;

    // Get invite
    const [inviteRows] = await pool.query("SELECT * FROM campaign_invites WHERE invite_id = ?", [invite_id]);
    const invite = inviteRows[0];
    if (!invite || invite.receiver_id !== user_id) return res.status(404).json({ error: "Invite not found" });

    // Add role
    await addCampaignRole({ campaign_id: invite.campaign_id, user_id, role: "player" });

    // Mark invite as accepted
    await updateInviteStatus(invite_id, "accepted");

    res.json({ message: "Invite accepted and joined the campaign" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Reject invite
const rejectCampaignInvite = async (req, res) => {
  try {
    const { invite_id } = req.body;
    const user_id = req.user.user_id;

    const [inviteRows] = await pool.query("SELECT * FROM campaign_invites WHERE invite_id = ?", [invite_id]);
    const invite = inviteRows[0];
    if (!invite || invite.receiver_id !== user_id) return res.status(404).json({ error: "Invite not found" });

    await updateInviteStatus(invite_id, "declined");
    res.json({ message: "Invite declined" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewCampaign,
  fetchCampaigns,
  updateCampaign,
  deleteCampaign: deleteCampaignController,
  leaveCampaign,
  getCampaignDm,
  getCampaignRoles,
  invitePlayerToCampaign,
  acceptCampaignInvite,
  rejectCampaignInvite
};
