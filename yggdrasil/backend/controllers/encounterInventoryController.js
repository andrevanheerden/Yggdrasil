const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createEncounterItem,
  getItemsByEncounter,
  getItemById,
  deleteEncounterItem
} = require("../models/encounterInventoryModel");

// ID generator: ENC-ITM-XXX-123-123
const generateEncounterItemId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = (count = 3) =>
    Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  const randomNumbers = (count = 3) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join("");
  return `ENC-ITM_${randomLetters()}-${randomNumbers()}-${randomNumbers()}`;
};

// CREATE Item
exports.create = async (req, res) => {
  try {
    const {
  encounter_id,
  item_name,
  item_type,
  item_description,
  item_range,
  item_area,
  item_cost, // <-- rename from item_amount
  item_effect
} = req.body;

    if (!encounter_id) {
      return res.status(400).json({ error: "Encounter ID is required" });
    }

    const encounter_item_id = generateEncounterItemId();

    // Upload image to Cloudinary
    let item_image = null;
    if (req.files && req.files.item_image) {
      const file = req.files.item_image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounter_items",
        use_filename: true
      });
      item_image = result.secure_url;

      fs.unlink(file.tempFilePath, (err) => {
        if (err) console.error("Temp file cleanup failed:", err);
      });
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
  item_cost, // <-- send correct field
  item_effect
};

    await createEncounterItem(data);
    res.status(201).json({ message: "Item created", encounter_item_id });
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).json({ error: "Failed to create item" });
  }
};

// GET items by encounter
exports.getByEncounter = async (req, res) => {
  try {
    const items = await getItemsByEncounter(req.params.encounterId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounter items" });
  }
};

// GET item by ID
exports.getById = async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

// DELETE item
exports.delete = async (req, res) => {
  try {
    await deleteEncounterItem(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
};


// GET items by encounter
exports.getByEncounter = async (req, res) => {
  try {
    const items = await getItemsByEncounter(req.params.encounterId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch encounter items" });
  }
};

// GET item by ID
exports.getById = async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

// DELETE item
exports.delete = async (req, res) => {
  try {
    await deleteEncounterItem(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
