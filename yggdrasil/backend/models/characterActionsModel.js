const pool = require("../config/db");
const safeValue = (val) => (val === undefined || val === null ? "" : val);

const createCharacterAction = async (data) => {
  const sql = `
    INSERT INTO character_actions (
      character_action_id, character_id, action_name, action_type,
      action_image, action_description, action_range, action_area,
      action_cost, action_effects, damage_types
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safeValue(data.character_action_id),
    safeValue(data.character_id),
    safeValue(data.action_name),
    safeValue(data.action_type),
    safeValue(data.action_image),
    safeValue(data.action_description),
    safeValue(data.action_range),
    safeValue(data.action_area),
    safeValue(data.action_cost),
    JSON.stringify(data.action_effects),
    JSON.stringify(data.damage_types),
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

const getActionsByCharacter = async (characterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_actions WHERE character_id = ?",
    [characterId]
  );
  return rows;
};

const getActionById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_actions WHERE character_action_id = ?",
    [id]
  );
  return rows[0];
};

const deleteCharacterAction = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM character_actions WHERE character_action_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createCharacterAction,
  getActionsByCharacter,
  getActionById,
  deleteCharacterAction,
  safeValue,
};
