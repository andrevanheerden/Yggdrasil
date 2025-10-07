const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createEncounterSpell,
  getSpellsByEncounter,
  getSpellById,
  deleteEncounterSpell
} = require("../models/encounterSpellsModel");

// ID generator: ENC-SPL-XXX-123-123
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
      item_name,
      item_type,
      item_description,
      item_range,
      item_area,
      item_cost,
      item_effect,
      damage_types // <- this comes as a JSON string
    } = req.body;

    if (!encounter_id) {
      return res.status(400).json({ error: "Encounter ID is required" });
    }

    const encounter_item_id = generateEncounterItemId();

    let item_image = null;
    if (req.files && req.files.item_image) {
      const file = req.files.item_image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounter_items",
        use_filename: true
      });
      item_image = result.secure_url;
      fs.unlink(file.tempFilePath, (err) => { if (err) console.error(err); });
    }

    const data = {
      encounter_item_id,
      encounter_id,
      item_name,
      item_type,
      item_image,
      item_description,
      item_range,
      item_area,
      item_cost,
      item_effect,
      damage_types: damage_types ? JSON.parse(damage_types) : [] // <-- parse string
    };

    await createEncounterItem(data);
    res.status(201).json({ message: "Item created", encounter_item_id });
  } catch (err) {
    console.error("❌ Create item error:", err);
    res.status(500).json({ error: "Failed to create item" });
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
