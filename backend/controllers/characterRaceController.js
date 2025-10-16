const {
  createRace,
  getRacesByCharacter,
  getRaceById,
  updateRace,
  deleteRace,
} = require("../models/characterRaceModel");

// CREATE race
exports.create = async (req, res) => {
  try {
    const { character_id } = req.body;
    if (!character_id) return res.status(400).json({ error: "Character ID is required" });

    const { race_id } = await createRace(req.body);
    res.status(201).json({ message: "Race created", race_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create race" });
  }
};

// GET races by character
exports.getByCharacter = async (req, res) => {
  try {
    const races = await getRacesByCharacter(req.params.characterId);
    res.json(races);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch races" });
  }
};

// GET race by ID
exports.getById = async (req, res) => {
  try {
    const race = await getRaceById(req.params.id);
    if (!race) return res.status(404).json({ error: "Race not found" });
    res.json(race);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch race" });
  }
};

// UPDATE race
exports.update = async (req, res) => {
  try {
    await updateRace(req.params.id, req.body);
    res.json({ message: "Race updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update race" });
  }
};

// DELETE race
exports.delete = async (req, res) => {
  try {
    await deleteRace(req.params.id);
    res.json({ message: "Race deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete race" });
  }
};
