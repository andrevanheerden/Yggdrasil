const { createCampaign, getCampaigns } = require("../models/campaignModel");
const { addCampaignRole } = require("../models/campaignRoleModel");
const cloudinary = require("cloudinary").v2;

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
        await createCampaign.updatePlayerIds(campaign_id, JSON.stringify(currentPlayers));
      }
    }

    res.json({ message: "Player invited successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createNewCampaign, fetchCampaigns, invitePlayerToCampaign };

