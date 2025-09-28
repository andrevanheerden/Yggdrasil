const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createEncounter,
  getEncountersByCampaign,
  getEncounterById,
  updateEncounter,
  deleteEncounter
} = require("../models/encounterModel");

// Utility to generate encounter IDs
const generateEncounterId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `ENC-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}`;
};

// CREATE encounter with optional image upload
exports.create = async (req, res) => {
  try {
    const encounter_id = generateEncounterId();
    let encounter_img = null;

    // Upload image to Cloudinary if file exists
    if (req.files && req.files.encounter_img) {
      const file = req.files.encounter_img;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounters",
        use_filename: true,
      });
      encounter_img = result.secure_url;
      fs.unlinkSync(file.tempFilePath); // remove temp file
    }

    const data = { ...req.body, encounter_id, encounter_img };
    await createEncounter(data);

    res.status(201).json({ message: "Encounter created", encounter_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create encounter" });
  }
};

// GET all encounters for a campaign
exports.getByCampaign = async (req, res) => {
  try {
    const encounters = await getEncountersByCampaign(req.params.campaignId);
    res.json(encounters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounters" });
  }
};

// GET single encounter by ID
exports.getById = async (req, res) => {
  try {
    const encounter = await getEncounterById(req.params.id);
    if (!encounter) return res.status(404).json({ error: "Encounter not found" });
    res.json(encounter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounter" });
  }
};

// UPDATE encounter by ID
exports.update = async (req, res) => {
  try {
    let encounter_img = req.body.encounter_img || null;

    // If new image file uploaded
    if (req.files && req.files.encounter_img) {
      const file = req.files.encounter_img;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounters",
        use_filename: true,
      });
      encounter_img = result.secure_url;
      fs.unlinkSync(file.tempFilePath);
    }

    const data = { ...req.body, encounter_img };
    await updateEncounter(req.params.id, data);
    res.json({ message: "Encounter updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update encounter" });
  }
};

// DELETE encounter by ID
exports.delete = async (req, res) => {
  try {
    await deleteEncounter(req.params.id);
    res.json({ message: "Encounter deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete encounter" });
  }
};
