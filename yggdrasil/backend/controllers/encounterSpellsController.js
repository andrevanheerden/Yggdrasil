const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createEncounterSpell,
  getSpellsByEncounter,
  getSpellById,
  deleteEncounterSpell
} = require("../models/encounterSpellsModel");

// ID generator
const generateEncounterSpellId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = (count = 3) =>
    Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  const randomNumbers = (count = 3) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join("");
  return `ENC-SPL_${randomLetters()}-${randomNumbers()}-${randomNumbers()}`;
};

// CREATE Spell
exports.create = async (req, res) => {
  try {
    const {
      encounter_id,
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

    if (!encounter_id) return res.status(400).json({ error: "Encounter ID is required" });

    const encounter_spell_id = generateEncounterSpellId();

    let spell_image = null;
    if (req.files && req.files.spell_image) {
      const file = req.files.spell_image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounter_spells",
        use_filename: true
      });
      spell_image = result.secure_url;
      fs.unlink(file.tempFilePath, (err) => { if (err) console.error(err); });
    }

    const data = {
      encounter_spell_id,
      encounter_id,
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

    await createEncounterSpell(data);

    res.status(201).json({ message: "Spell created", encounter_spell_id });
  } catch (err) {
    console.error("❌ Create spell error:", err);
    res.status(500).json({ error: "Failed to create spell" });
  }
};

// GET spells by encounter
exports.getByEncounter = async (req, res) => {
  try {
    const spells = await getSpellsByEncounter(req.params.encounterId);
    res.json(spells);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounter spells" });
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
    await deleteEncounterSpell(req.params.id);
    res.json({ message: "Spell deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete spell" });
  }
};
