const pool = require("../config/db");
const safeValue = (val) => (val === undefined || val === null ? "" : val);

const createEncounterItem = async (data) => {
  const sql = `
    INSERT INTO encounter_inventory (
      encounter_item_id, encounter_id, item_name, item_type, item_image,
      item_description, item_range, item_area, item_cost, item_effect, damage_types
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safeValue(data.encounter_item_id),
    safeValue(data.encounter_id),
    safeValue(data.item_name),
    safeValue(data.item_type),
    safeValue(data.item_image),
    safeValue(data.item_description),
    safeValue(data.item_range),
    safeValue(data.item_area),
    safeValue(data.item_cost),
    safeValue(data.item_effect),
    JSON.stringify(data.damage_types || []) // <-- stringify array for JSON column
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
  deleteEncounterSpell,
};
