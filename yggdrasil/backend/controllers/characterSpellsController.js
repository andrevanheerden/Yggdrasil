const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createCharacterSpell,
  getSpellsByCharacter,
  getSpellById,
  deleteCharacterSpell
} = require("../models/characterSpellsModel");

// ID generator: CHA-SPL-XXX-123-123
const generateCharacterSpellId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = (count = 3) =>
    Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  const randomNumbers = (count = 3) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-SPL_${randomLetters()}-${randomNumbers()}-${randomNumbers()}`;
};

// CREATE Spell
exports.create = async (req, res) => {
  try {
    const {
      character_id,
      spell_name,
      spell_type,
      spell_level,
      spell_description,
      spell_range,
      spell_area,
      spell_cost,
      spell_effects,
      damage_types
    } = req.body;

    if (!character_id) return res.status(400).json({ error: "Character ID is required" });

    const character_spell_id = generateCharacterSpellId();

    let spell_image = null;
    if (req.files && req.files.spell_image) {
      const file = req.files.spell_image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "character_spells",
        use_filename: true
      });
      spell_image = result.secure_url;
      fs.unlink(file.tempFilePath, (err) => { if (err) console.error(err); });
    }

    const data = {
      character_spell_id,
      character_id,
      spell_name,
      spell_type,
      spell_level,
      spell_image,
      spell_description,
      spell_range,
      spell_area,
      spell_cost,
      spell_effects,
      damage_types: damage_types ? JSON.parse(damage_types) : []
    };

    await createCharacterSpell(data);

    res.status(201).json({ message: "Spell created", character_spell_id });
  } catch (err) {
    console.error("❌ Create spell error:", err);
    res.status(500).json({ error: "Failed to create spell" });
  }
};

// GET spells by character
exports.getByCharacter = async (req, res) => {
  try {
    const spells = await getSpellsByCharacter(req.params.characterId);
    res.json(spells);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch character spells" });
  }
};

// GET spell by ID
exports.getById = async (req, res) => {
  try {
    const spell = await getSpellById(req.params.id);
    if (!spell) return res.status(404).json({ error: "Spell not found" });
    res.json(spell);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch spell" });
  }
};

// DELETE spell
exports.delete = async (req, res) => {
  try {
    await deleteCharacterSpell(req.params.id);
    res.json({ message: "Spell deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete spell" });
  }
};
