const pool = require("../config/db");

// Helper
const safeValue = (val) => (val === undefined || val === null ? "" : val);

// Generate Character Item ID: CHA-ITM-XXX-123-123
const generateCharacterItemId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = (count = 3) =>
    Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  const randomNumbers = (count = 3) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-ITM_${randomLetters()}-${randomNumbers()}-${randomNumbers()}`;
};

// CREATE character item
const createCharacterItem = async (data) => {
  const character_inventory_id = generateCharacterItemId();
  const sql = `
    INSERT INTO character_inventory (
      character_inventory_id, character_id, item_name, item_type, item_image,
      item_description, item_range, item_area, item_cost, item_effect, damage_types
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    character_inventory_id,
    safeValue(data.character_id),
    safeValue(data.item_name),
    safeValue(data.item_type),
    safeValue(data.item_image),
    safeValue(data.item_description),
    safeValue(data.item_range),
    safeValue(data.item_area),
    safeValue(data.item_cost),
    safeValue(data.item_effect),
    JSON.stringify(data.damage_types || [])
  ];
  const [result] = await pool.execute(sql, values);
  return { character_inventory_id, result };
};

// GET items by character
const getItemsByCharacter = async (characterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_inventory WHERE character_id = ?",
    [characterId]
  );
  return rows;
};

// GET item by ID
const getItemById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_inventory WHERE character_inventory_id = ?",
    [id]
  );
  return rows[0];
};

// DELETE item
const deleteCharacterItem = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM character_inventory WHERE character_inventory_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createCharacterItem,
  getItemsByCharacter,
  getItemById,
  deleteCharacterItem
};
