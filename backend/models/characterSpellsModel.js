const pool = require("../config/db");
const safeValue = (val) => (val === undefined || val === null ? "" : val);

const createCharacterSpell = async (data) => {
  const sql = `
    INSERT INTO character_spells (
      character_spell_id, character_id, spell_name, spell_type, spell_level,
      spell_image, spell_description, spell_range, spell_area, spell_cost,
      spell_effects, damage_types
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safeValue(data.character_spell_id),
    safeValue(data.character_id),
    safeValue(data.spell_name),
    safeValue(data.spell_type),
    safeValue(data.spell_level),
    safeValue(data.spell_image),
    safeValue(data.spell_description),
    safeValue(data.spell_range),
    safeValue(data.spell_area),
    safeValue(data.spell_cost),
    safeValue(data.spell_effects),
    JSON.stringify(data.damage_types || [])
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

const getSpellsByCharacter = async (characterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_spells WHERE character_id = ?",
    [characterId]
  );
  return rows;
};

const getSpellById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_spells WHERE character_spell_id = ?",
    [id]
  );
  return rows[0];
};

const deleteCharacterSpell = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM character_spells WHERE character_spell_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createCharacterSpell,
  getSpellsByCharacter,
  getSpellById,
  deleteCharacterSpell
};
