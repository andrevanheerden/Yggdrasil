const pool = require("../config/db");

// Safe value helper
const safeValue = (val) => (val === undefined || val === null ? "" : val);

// Generate Character ID
const generateCharacterId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = (length = 3) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
};

// CREATE character
const createCharacter = async (data) => {
  const sql = `
    INSERT INTO characters (
      character_id, campaign_id, character_name, character_img,
      encounter_ability_score_str, encounter_ability_score_dex,
      encounter_ability_score_con, encounter_ability_score_int,
      encounter_ability_score_wis, encounter_ability_score_cha,
      encounter_saving_throw_str, encounter_saving_throw_dex,
      encounter_saving_throw_con, encounter_saving_throw_int,
      encounter_saving_throw_wis, encounter_saving_throw_cha,
      character_AC, character_level, character_speed,
      character_current_HP, character_max_HP,
      skill_selected_1, skill_selected_2, character_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safeValue(data.character_id),
    safeValue(data.campaign_id),
    safeValue(data.character_name),
    safeValue(data.character_img),
    safeValue(data.encounter_ability_score_str),
    safeValue(data.encounter_ability_score_dex),
    safeValue(data.encounter_ability_score_con),
    safeValue(data.encounter_ability_score_int),
    safeValue(data.encounter_ability_score_wis),
    safeValue(data.encounter_ability_score_cha),
    safeValue(data.encounter_saving_throw_str),
    safeValue(data.encounter_saving_throw_dex),
    safeValue(data.encounter_saving_throw_con),
    safeValue(data.encounter_saving_throw_int),
    safeValue(data.encounter_saving_throw_wis),
    safeValue(data.encounter_saving_throw_cha),
    safeValue(data.character_AC),
    safeValue(data.character_level),
    safeValue(data.character_speed),
    safeValue(data.character_current_HP),
    safeValue(data.character_max_HP),
    safeValue(data.skill_selected_1),
    safeValue(data.skill_selected_2),
    safeValue(data.character_description)
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

// GET characters by campaign
const getCharactersByCampaign = async (campaignId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM characters WHERE campaign_id = ?",
    [campaignId]
  );
  return rows;
};

// GET character by ID
const getCharacterById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM characters WHERE character_id = ?",
    [id]
  );
  return rows[0];
};

// UPDATE character
const updateCharacter = async (id, data) => {
  const sql = `
    UPDATE characters SET
      character_name = ?, character_img = ?,
      encounter_ability_score_str = ?, encounter_ability_score_dex = ?,
      encounter_ability_score_con = ?, encounter_ability_score_int = ?,
      encounter_ability_score_wis = ?, encounter_ability_score_cha = ?,
      encounter_saving_throw_str = ?, encounter_saving_throw_dex = ?,
      encounter_saving_throw_con = ?, encounter_saving_throw_int = ?,
      encounter_saving_throw_wis = ?, encounter_saving_throw_cha = ?,
      character_AC = ?, character_level = ?, character_speed = ?,
      character_current_HP = ?, character_max_HP = ?,
      skill_selected_1 = ?, skill_selected_2 = ?, character_description = ?
    WHERE character_id = ?
  `;

  const values = [
    safeValue(data.character_name),
    safeValue(data.character_img),
    safeValue(data.encounter_ability_score_str),
    safeValue(data.encounter_ability_score_dex),
    safeValue(data.encounter_ability_score_con),
    safeValue(data.encounter_ability_score_int),
    safeValue(data.encounter_ability_score_wis),
    safeValue(data.encounter_ability_score_cha),
    safeValue(data.encounter_saving_throw_str),
    safeValue(data.encounter_saving_throw_dex),
    safeValue(data.encounter_saving_throw_con),
    safeValue(data.encounter_saving_throw_int),
    safeValue(data.encounter_saving_throw_wis),
    safeValue(data.encounter_saving_throw_cha),
    safeValue(data.character_AC),
    safeValue(data.character_level),
    safeValue(data.character_speed),
    safeValue(data.character_current_HP),
    safeValue(data.character_max_HP),
    safeValue(data.skill_selected_1),
    safeValue(data.skill_selected_2),
    safeValue(data.character_description),
    safeValue(id)
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

// DELETE character
const deleteCharacter = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM characters WHERE character_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createCharacter,
  getCharactersByCampaign,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  generateCharacterId
};
