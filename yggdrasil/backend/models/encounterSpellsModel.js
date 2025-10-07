const pool = require("../config/db");
const safeValue = (val) => (val === undefined || val === null ? "" : val);

const createEncounterSpell = async (data) => {
const sql = `
  INSERT INTO encounter_spells (
    encounter_spell_id, encounter_id, spell_name, spell_type, spell_level,
    spell_image, spell_description, spell_range, spell_area, spell_cost,
    spell_effects, damage_types
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  safeValue(data.encounter_spell_id),
  safeValue(data.encounter_id),
  safeValue(data.spell_name),
  safeValue(data.spell_type),
  safeValue(data.spell_level),
  safeValue(data.spell_image),
  safeValue(data.spell_description),
  safeValue(data.spell_range),
  safeValue(data.spell_area),
  safeValue(data.spell_cost),
  safeValue(data.spell_effects), // <-- THIS ONE
  JSON.stringify(data.damage_types || [])
];


  const [result] = await pool.execute(sql, values);
  return result;
};

const getSpellsByEncounter = async (encounterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounter_spells WHERE encounter_id = ?",
    [encounterId]
  );
  return rows;
};

const getSpellById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounter_spells WHERE encounter_spell_id = ?",
    [id]
  );
  return rows[0];
};

const deleteEncounterSpell = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM encounter_spells WHERE encounter_spell_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createEncounterSpell,
  getSpellsByEncounter,
  getSpellById,
  deleteEncounterSpell
};
