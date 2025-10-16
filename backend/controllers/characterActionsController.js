const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createCharacterAction,
  getActionsByCharacter,
  getActionById,
  deleteCharacterAction,
  safeValue
} = require("../models/characterActionsModel");

// Generate custom ID: CHA-ACT-XXX-123-123
const generateCharacterActionId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = (n = 3) =>
    Array.from({ length: n }, () =>
      letters[Math.floor(Math.random() * letters.length)]
    ).join("");
  const randomNumbers = (n = 3) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-ACT_${randomLetters()}-${randomNumbers()}-${randomNumbers()}`;
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      character_id,
      action_name,
      action_type,
      action_description,
      effects,
      damage_types,
      action_range,
      action_area,
      action_cost
    } = req.body;

    if (!character_id) return res.status(400).json({ error: "Character ID is required" });

    const character_action_id = generateCharacterActionId();

    let action_image = null;
    if (req.files?.action_image) {
      const file = req.files.action_image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "character_actions",
        use_filename: true,
      });
      action_image = result.secure_url;
      fs.unlink(file.tempFilePath, () => {});
    }

    const parsedEffects = JSON.parse(effects || "[]").map(e => e?.trim()).filter(Boolean);

    const data = {
      character_action_id,
      character_id,
      action_name,
      action_type,
      action_description,
      action_image,
      action_effects: parsedEffects,
      damage_types: JSON.parse(damage_types || "[]"),
      action_range: safeValue(action_range),
      action_area: safeValue(action_area),
      action_cost: safeValue(action_cost),
    };

    await createCharacterAction(data);
    res.status(201).json({ message: "Action created", character_action_id });
  } catch (err) {
    console.error("❌ Create action error:", err.message, err.stack);
    res.status(500).json({ error: "Failed to create action", details: err.message });
  }
};

// GET actions by character
exports.getByCharacter = async (req, res) => {
  try {
    const actions = await getActionsByCharacter(req.params.characterId);
    res.json(actions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch character actions" });
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const action = await getActionById(req.params.id);
    if (!action) return res.status(404).json({ error: "Action not found" });
    res.json(action);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch action" });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await deleteCharacterAction(req.params.id);
    res.json({ message: "Action deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete action" });
  }
};
