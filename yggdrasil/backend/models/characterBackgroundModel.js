const pool = require("../config/db");

// Safe value helper
const safeValue = (val) => (val === undefined || val === null ? "" : val);

// Generate Background ID
const generateBackgroundId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = (length = 3) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-BAK-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
};

// CREATE background
const createBackground = async (data) => {
  const sql = `
    INSERT INTO character_backgrounds (
      background_id, character_id, background_name, background_description,
      skill_selected_1, skill_selected_2, tool_proficiencies, language_proficiencies
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safeValue(data.background_id),
    safeValue(data.character_id),
    safeValue(data.background_name),
    safeValue(data.background_description),
    safeValue(data.skill_selected_1),
    safeValue(data.skill_selected_2),
    JSON.stringify(data.tool_proficiencies || []),
    JSON.stringify(data.language_proficiencies || [])
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

// GET backgrounds by character
const getBackgroundsByCharacter = async (characterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_backgrounds WHERE character_id = ?",
    [characterId]
  );
  return rows;
};

// GET background by ID
const getBackgroundById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_backgrounds WHERE background_id = ?",
    [id]
  );
  return rows[0];
};

// UPDATE background
const updateBackground = async (id, data) => {
  const sql = `
    UPDATE character_backgrounds SET
      background_name = ?, background_description = ?,
      skill_selected_1 = ?, skill_selected_2 = ?,
      tool_proficiencies = ?, language_proficiencies = ?
    WHERE background_id = ?
  `;

  const values = [
    safeValue(data.background_name),
    safeValue(data.background_description),
    safeValue(data.skill_selected_1),
    safeValue(data.skill_selected_2),
    JSON.stringify(data.tool_proficiencies || []),
    JSON.stringify(data.language_proficiencies || []),
    safeValue(id)
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

// DELETE background
const deleteBackground = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM character_backgrounds WHERE background_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createBackground,
  getBackgroundsByCharacter,
  getBackgroundById,
  updateBackground,
  deleteBackground,
  generateBackgroundId
};
