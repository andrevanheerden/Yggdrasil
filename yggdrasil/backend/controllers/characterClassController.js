const {
  createClass,
  getClassesByCharacter,
  getClassById,
  updateClass,
  deleteClass,
} = require("../models/characterClassModel");

// CREATE class
exports.create = async (req, res) => {
  try {
    const { character_id } = req.body;
    if (!character_id) return res.status(400).json({ error: "Character ID is required" });

    const { class_id } = await createClass(req.body);
    res.status(201).json({ message: "Class created", class_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create class" });
  }
};

// GET classes by character
exports.getByCharacter = async (req, res) => {
  try {
    const classes = await getClassesByCharacter(req.params.characterId);
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

// GET class by ID
exports.getById = async (req, res) => {
  try {
    const cls = await getClassById(req.params.id);
    if (!cls) return res.status(404).json({ error: "Class not found" });
    res.json(cls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch class" });
  }
};

// UPDATE class
exports.update = async (req, res) => {
  try {
    await updateClass(req.params.id, req.body);
    res.json({ message: "Class updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update class" });
  }
};

// DELETE class
exports.delete = async (req, res) => {
  try {
    await deleteClass(req.params.id);
    res.json({ message: "Class deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete class" });
  }
};
