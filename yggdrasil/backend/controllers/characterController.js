const { createCharacter, getCharactersByCampaign, getCharacterById, updateCharacter, deleteCharacter, generateCharacterId } = require("../models/characterModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// CREATE character
exports.create = async (req, res) => {
  try {
    const { campaign_id } = req.body;
    if (!campaign_id) return res.status(400).json({ error: "Campaign ID is required" });

    const character_id = generateCharacterId();
    let character_img = null;

    if (req.files && req.files.character_img) {
      const file = req.files.character_img;
      const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: "characters", use_filename: true });
      character_img = result.secure_url;
      fs.unlink(file.tempFilePath, () => {});
    }

    const data = { ...req.body, character_id, character_img };
    await createCharacter(data);

    res.status(201).json({ message: "Character created", character_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create character" });
  }
};

// GET characters by campaign
exports.getByCampaign = async (req, res) => {
  try {
    const characters = await getCharactersByCampaign(req.params.campaignId);
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
};

// GET character by ID
exports.getById = async (req, res) => {
  try {
    const character = await getCharacterById(req.params.id);
    if (!character) return res.status(404).json({ error: "Character not found" });
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch character" });
  }
};

// UPDATE character
exports.update = async (req, res) => {
  try {
    let character_img = req.body.character_img || null;
    if (req.files && req.files.character_img) {
      const file = req.files.character_img;
      const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: "characters", use_filename: true });
      character_img = result.secure_url;
      fs.unlink(file.tempFilePath, () => {});
    }

    const data = { ...req.body, character_img };
    await updateCharacter(req.params.id, data);
    res.json({ message: "Character updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update character" });
  }
};

// DELETE character
exports.delete = async (req, res) => {
  try {
    await deleteCharacter(req.params.id);
    res.json({ message: "Character deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete character" });
  }
};
