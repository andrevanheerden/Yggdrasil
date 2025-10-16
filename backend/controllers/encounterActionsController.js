const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const {
  createEncounterAction,
  getActionsByEncounter,
  getActionById,
  deleteEncounterAction,
  safeValue
} = require("../models/encounterActionsModel");


// Generate custom ID
const generateEncounterActionId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = (n = 3) =>
    Array.from({ length: n }, () =>
      letters[Math.floor(Math.random() * letters.length)]
    ).join("");
  const randomNumbers = (n = 3) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
  return `ENC-ACT_${randomLetters()}-${randomNumbers()}-${randomNumbers()}`;
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      encounter_id,
      action_name,
      action_type,
      action_description,
      effects,
      damage_types,
      action_range,
      action_area,
      action_cost
    } = req.body;

    if (!encounter_id) return res.status(400).json({ error: "Encounter ID is required" });

    const encounter_action_id = generateEncounterActionId();

    let action_image = null;
    if (req.files?.action_image) {
      const file = req.files.action_image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "encounter_actions",
        use_filename: true,
      });
      action_image = result.secure_url;
      fs.unlink(file.tempFilePath, () => {});
    }

    // Parse effects from frontend
    // Parse effects from frontend (array of strings)
const parsedEffects = JSON.parse(effects || "[]"); // ["Burn", "Freeze"]
const effectTexts = parsedEffects.map(e => e?.trim()).filter(Boolean); // ["Burn", "Freeze"]

const data = {
  encounter_action_id,
  encounter_id,
  action_name,
  action_type,
  action_description,
  action_image,
  action_effects: effectTexts,
  damage_types: JSON.parse(damage_types || "[]"),
  action_range: safeValue(action_range),
  action_area: safeValue(action_area),
  action_cost: safeValue(action_cost),
};


    const result = await createEncounterAction(data);
    res.status(201).json({ message: "Action created", encounter_action_id, result });
  } catch (err) {
    console.error("❌ Create action error:", err.message, err.stack);
    res.status(500).json({ error: "Failed to create action", details: err.message });
  }
};




// GET actions by encounter
// GET actions by encounter
exports.getByEncounter = async (req, res) => {
  try {
    console.log("📥 Fetching actions for encounter:", req.params.encounterId);
    const actions = await getActionsByEncounter(req.params.encounterId);
    console.log("✅ Actions fetched:", actions);
    res.json(actions);
  } catch (err) {
    console.error("❌ Error in getByEncounter:", err.message, err.stack);
    res.status(500).json({ error: "Failed to fetch encounter actions", details: err.message });
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
    await deleteEncounterAction(req.params.id);
    res.json({ message: "Action deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete action" });
  }
};
