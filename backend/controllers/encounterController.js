const cloudinary = require("../config/cloudinary");


const fs = require("fs");
const {
  createEncounter,
  getEncountersByCampaign,
  getEncounterById,
  updateEncounter,
  deleteEncounter
} = require("../models/encounterModel");


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate encounter ID like CAM, but ENC
const generateEncounterId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = (length = 3) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

  return `ENC-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
};

// CREATE encounter
exports.create = async (req, res) => {
  try {
    const { campaign_id } = req.body;
    if (!campaign_id) {
      return res.status(400).json({ error: "Campaign ID is required" });
    }

    const encounter_id = generateEncounterId();

    // Handle optional image upload
    let encounter_img = null;
if (req.files && req.files.encounter_img) {
  const file = req.files.encounter_img;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "encounters",
    use_filename: true,
  });
  encounter_img = result.secure_url; // save Cloudinary URL
  console.log("Cloudinary result:", encounter_img);

  fs.unlink(file.tempFilePath, (err) => {
    if (err) console.error("Temp file cleanup failed:", err);
  });
}


    const data = { ...req.body, encounter_img, encounter_id };
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

// GET encounter by ID
exports.getById = async (req, res) => {
  try {
    const encounter = await getEncounterById(req.params.id);
    if (!encounter) {
      return res.status(404).json({ error: "Encounter not found" });
    }
    res.json(encounter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounter" });
  }
};

// UPDATE encounter
exports.update = async (req, res) => {
  try {
    let encounter_img = req.body.encounter_img || null;

    if (req.files && req.files.encounter_img) {
      const file = req.files.encounter_img;
      console.log("Uploading file:", file.name, file.tempFilePath);

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounters",
        use_filename: true,
      });

      console.log("Cloudinary result:", result.secure_url);
      encounter_img = result.secure_url;

      fs.unlink(file.tempFilePath, (err) => {
        if (err) console.error("Temp file cleanup failed:", err);
      });
    }

    const data = { ...req.body, encounter_img };
    await updateEncounter(req.params.id, data);

    res.json({ message: "Encounter updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update encounter" });
  }
};

// DELETE encounter
exports.delete = async (req, res) => {
  try {
    await deleteEncounter(req.params.id);
    res.json({ message: "Encounter deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete encounter" });
  }
};
