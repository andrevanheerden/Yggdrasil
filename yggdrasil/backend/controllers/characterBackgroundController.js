const {
  createBackground,
  getBackgroundsByCharacter,
  getBackgroundById,
  updateBackground,
  deleteBackground,
  generateBackgroundId
} = require("../models/characterBackgroundModel");

// CREATE background
exports.create = async (req, res) => {
  try {
    const { character_id } = req.body;
    if (!character_id) return res.status(400).json({ error: "Character ID is required" });

    const background_id = generateBackgroundId();
    const data = { ...req.body, background_id };

    await createBackground(data);
    res.status(201).json({ message: "Background created", background_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create background" });
  }
};

// GET backgrounds by character
exports.getByCharacter = async (req, res) => {
  try {
    const backgrounds = await getBackgroundsByCharacter(req.params.characterId);
    res.json(backgrounds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch backgrounds" });
  }
};

// GET background by ID
exports.getById = async (req, res) => {
  try {
    const background = await getBackgroundById(req.params.id);
    if (!background) return res.status(404).json({ error: "Background not found" });
    res.json(background);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch background" });
  }
};

// UPDATE background
exports.update = async (req, res) => {
  try {
    const data = { ...req.body };
    await updateBackground(req.params.id, data);
    res.json({ message: "Background updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update background" });
  }
};

// DELETE background
exports.delete = async (req, res) => {
  try {
    await deleteBackground(req.params.id);
    res.json({ message: "Background deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete background" });
  }
};
