const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createCharacterItem,
  getItemsByCharacter,
  getItemById,
  deleteCharacterItem
} = require("../models/characterInventoryModel");

// CREATE Item
exports.create = async (req, res) => {
  try {
    const {
      character_id,
      item_name,
      item_type,
      item_description,
      item_range,
      item_area,
      item_cost,
      item_effect,
      damage_types: damageRaw
    } = req.body;

    if (!character_id) return res.status(400).json({ error: "Character ID is required" });

    // Upload image if exists
let item_image = null;

    if (req.files) {
      // Support any field name in case it changes
      const file = req.files.item_image || Object.values(req.files)[0];

      if (file) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "character_items",
          use_filename: true
        });
        item_image = result.secure_url;

        // Cleanup temp file
        fs.unlink(file.tempFilePath, (err) => {
          if (err) console.error("Temp file cleanup failed:", err);
        });
      }
    }

    // Parse damage types
    let damageTypes = [];
    if (Array.isArray(damageRaw)) {
      damageTypes = damageRaw;
    } else if (typeof damageRaw === "string") {
      try {
        damageTypes = JSON.parse(damageRaw);
        if (!Array.isArray(damageTypes)) {
          damageTypes = damageRaw.split(",").map(s => s.trim()).filter(Boolean);
        }
      } catch {
        damageTypes = damageRaw.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    damageTypes = damageTypes.slice(0, 3); // only first 3

    const data = {
      character_id,
      item_name,
      item_type,
      item_image,
      item_description,
      item_range,
      item_area,
      item_cost,
      item_effect,
      damage_types: damageTypes
    };

    const { character_inventory_id } = await createCharacterItem(data);

    res.status(201).json({ message: "Item created", character_inventory_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
};

// GET items by character
exports.getByCharacter = async (req, res) => {
  try {
    const items = await getItemsByCharacter(req.params.characterId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
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
    await deleteCharacterItem(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
