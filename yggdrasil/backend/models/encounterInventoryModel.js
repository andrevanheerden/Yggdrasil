const pool = require("../config/db");

// Helper
const safeValue = (val) => (val === undefined || val === null ? "" : val);

const createEncounterItem = async (data) => {
  const sql = `
    INSERT INTO encounter_inventory (
      encounter_item_id, encounter_id, item_name, item_type, item_image,
      item_description, item_range, item_area, item_cost, item_effect
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    safeValue(data.item_cost), // changed from item_amount
    safeValue(data.item_effect),
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

const getItemsByEncounter = async (encounterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounter_inventory WHERE encounter_id = ?",
    [encounterId]
  );
  return rows;
};

const getItemById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounter_inventory WHERE encounter_item_id = ?",
    [id]
  );
  return rows[0];
};

const deleteEncounterItem = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM encounter_inventory WHERE encounter_item_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createEncounterItem,
  getItemsByEncounter,
  getItemById,
  deleteEncounterItem,
};
