const pool = require("../config/db");

// Helper to safely handle undefined/null values
const safeValue = (val) => (val === undefined || val === null ? "" : val);

// Generate Class ID: CHA-CLA-XXX-123-123
const generateClassId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = (length = 3) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-CLA-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
};

// Create a new Class
const createClass = async (data) => {
  const class_id = generateClassId();
  const sql = `
    INSERT INTO character_classes (
      class_id, character_id, class_name, class_description,
      energy_name, max_energy_level,
      amount_lv1, amount_lv2, amount_lv3, amount_lv4, amount_lv5, amount_lv6,
      tool_proficiencies, language_proficiencies
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    class_id,
    safeValue(data.character_id),
    safeValue(data.class_name),
    safeValue(data.class_description),
    safeValue(data.energy_name),
    safeValue(data.max_energy_level),
    safeValue(data.amount_lv1),
    safeValue(data.amount_lv2),
    safeValue(data.amount_lv3),
    safeValue(data.amount_lv4),
    safeValue(data.amount_lv5),
    safeValue(data.amount_lv6),
    JSON.stringify(data.tool_proficiencies || []),
    JSON.stringify(data.language_proficiencies || []),
  ];
  const [result] = await pool.execute(sql, values);
  return { class_id, result };
};

// Get classes by character
const getClassesByCharacter = async (characterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_classes WHERE character_id = ?",
    [characterId]
  );
  return rows;
};

// Get class by ID
const getClassById = async (classId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_classes WHERE class_id = ?",
    [classId]
  );
  return rows[0];
};

// Update class
const updateClass = async (classId, data) => {
  const sql = `
    UPDATE character_classes SET
      class_name = ?, class_description = ?, energy_name = ?, max_energy_level = ?,
      amount_lv1 = ?, amount_lv2 = ?, amount_lv3 = ?, amount_lv4 = ?, amount_lv5 = ?, amount_lv6 = ?,
      tool_proficiencies = ?, language_proficiencies = ?
    WHERE class_id = ?
  `;
  const values = [
    safeValue(data.class_name),
    safeValue(data.class_description),
    safeValue(data.energy_name),
    safeValue(data.max_energy_level),
    safeValue(data.amount_lv1),
    safeValue(data.amount_lv2),
    safeValue(data.amount_lv3),
    safeValue(data.amount_lv4),
    safeValue(data.amount_lv5),
    safeValue(data.amount_lv6),
    JSON.stringify(data.tool_proficiencies || []),
    JSON.stringify(data.language_proficiencies || []),
    classId,
  ];
  const [result] = await pool.execute(sql, values);
  return result;
};

// Delete class
const deleteClass = async (classId) => {
  const [result] = await pool.execute(
    "DELETE FROM character_classes WHERE class_id = ?",
    [classId]
  );
  return result;
};

module.exports = {
  createClass,
  getClassesByCharacter,
  getClassById,
  updateClass,
  deleteClass,
};
