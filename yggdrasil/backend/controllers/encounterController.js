const { createEncounter, getEncountersByCampaign, getEncounterById } = require("../models/encounterModel");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate unique Encounter ID like ENC-XXX-XXX
const generateEncounterId = async () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => String(Math.floor(Math.random() * 1000)).padStart(3, "0");

  let encounterId;
  let exists = true;

  while (exists) {
    encounterId = `ENC-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
    const encounter = await getEncounterById(encounterId);
    if (!encounter) exists = false; // ID is unique
  }

  return encounterId;
};

// Create Encounter
const createNewEncounter = async (req, res) => {
  try {
    const {
      campaign_id,
      encounter_name,
      description,
      abilities,
      ability_scores,
      hp,
      ac,
      speed,
      level,
      selected_skills,
      race_name,
      race_languages,
      race_tools
    } = req.body;

    if (!campaign_id || !encounter_name) return res.status(400).json({ error: "Campaign and Encounter name required" });

    let encounterImageUrl = null;
    if (req.files?.encounter_image) {
      const upload = await cloudinary.uploader.upload(req.files.encounter_image.tempFilePath);
      encounterImageUrl = upload.secure_url;
    }

    const encounter_id = await generateEncounterId();

    await createEncounter({
      encounter_id,
      campaign_id,
      encounter_name,
      encounter_image: encounterImageUrl,
      description,
      abilities,
      ability_scores,
      hp,
      ac,
      speed,
      level,
      selected_skills,
      race_name,
      race_languages,
      race_tools
    });

    res.status(201).json({ message: "Encounter created successfully", encounter_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get encounters by campaign
const fetchEncountersByCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const encounters = await getEncountersByCampaign(campaign_id);
    res.json(encounters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get single encounter
const fetchEncounterById = async (req, res) => {
  try {
    const { encounter_id } = req.params;
    const encounter = await getEncounterById(encounter_id);
    if (!encounter) return res.status(404).json({ error: "Encounter not found" });
    res.json(encounter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createNewEncounter, fetchEncountersByCampaign, fetchEncounterById };

