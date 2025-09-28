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

exports.create = async (req, res) => {
  try {
    const data = { ...req.body, encounter_id: generateEncounterId() };
    await createEncounter(data);
    res.status(201).json({ message: "Encounter created", encounter_id: data.encounter_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create encounter" });
  }
};

exports.getByCampaign = async (req, res) => {
  try {
    const encounters = await getEncountersByCampaign(req.params.campaignId);
    res.json(encounters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounters" });
  }
};

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

exports.update = async (req, res) => {
  try {
    await updateEncounter(req.params.id, req.body);
    res.json({ message: "Encounter updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update encounter" });
  }
};

exports.delete = async (req, res) => {
  try {
    await deleteEncounter(req.params.id);
    res.json({ message: "Encounter deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete encounter" });
  }
};
