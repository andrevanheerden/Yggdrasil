// backend/models/encounterModel.js
const pool = require("../config/db");

// Create a new encounter
const createEncounter = async (data) => {
  const sql = `
    INSERT INTO encounters (
      encounter_id, campaign_id, encounter_name, encounter_img,
      encounter_AC, encounter_level, encounter_speed,
      encounter_current_HP, encounter_max_HP,
      encounter_ability_score_str, encounter_ability_score_dex,
      encounter_ability_score_con, encounter_ability_score_int,
      encounter_ability_score_wis, encounter_ability_score_cha,
      skill_modefed_1, skill_modefed_2, encounter_dec,
      race_name, race_dec, race_skill_modefed_1, race_skill_modefed_2,
      race_proficiencie_languages, race_proficiencie_tools
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.encounter_id, data.campaign_id, data.encounter_name, data.encounter_img,
    data.encounter_AC, data.encounter_level, data.encounter_speed,
    data.encounter_current_HP, data.encounter_max_HP,
    data.encounter_ability_score_str, data.encounter_ability_score_dex,
    data.encounter_ability_score_con, data.encounter_ability_score_int,
    data.encounter_ability_score_wis, data.encounter_ability_score_cha,
    data.skill_modefed_1, data.skill_modefed_2, data.encounter_dec,
    data.race_name, data.race_dec, data.race_skill_modefed_1, data.race_skill_modefed_2,
    JSON.stringify(data.race_proficiencie_languages),
    JSON.stringify(data.race_proficiencie_tools)
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

// Get all encounters by campaign
const getEncountersByCampaign = async (campaignId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounters WHERE campaign_id = ?",
    [campaignId]
  );
  return rows;
};

// Get encounter by ID
const getEncounterById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounters WHERE encounter_id = ?",
    [id]
  );
  return rows[0];
};

// Update encounter
const updateEncounter = async (id, data) => {
  const sql = `
    UPDATE encounters SET
      encounter_name = ?, encounter_img = ?, encounter_AC = ?, encounter_level = ?,
      encounter_speed = ?, encounter_current_HP = ?, encounter_max_HP = ?,
      encounter_ability_score_str = ?, encounter_ability_score_dex = ?,
      encounter_ability_score_con = ?, encounter_ability_score_int = ?,
      encounter_ability_score_wis = ?, encounter_ability_score_cha = ?,
      skill_modefed_1 = ?, skill_modefed_2 = ?, encounter_dec = ?,
      race_name = ?, race_dec = ?, race_skill_modefed_1 = ?, race_skill_modefed_2 = ?,
      race_proficiencie_languages = ?, race_proficiencie_tools = ?
    WHERE encounter_id = ?
  `;

  const values = [
    data.encounter_name, data.encounter_img, data.encounter_AC, data.encounter_level,
    data.encounter_speed, data.encounter_current_HP, data.encounter_max_HP,
    data.encounter_ability_score_str, data.encounter_ability_score_dex,
    data.encounter_ability_score_con, data.encounter_ability_score_int,
    data.encounter_ability_score_wis, data.encounter_ability_score_cha,
    data.skill_modefed_1, data.skill_modefed_2, data.encounter_dec,
    data.race_name, data.race_dec, data.race_skill_modefed_1, data.race_skill_modefed_2,
    JSON.stringify(data.race_proficiencie_languages),
    JSON.stringify(data.race_proficiencie_tools),
    id
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

// Delete encounter
const deleteEncounter = async (id) => {
  const [result] = await pool.execute(
    "DELETE FROM encounters WHERE encounter_id = ?",
    [id]
  );
  return result;
};

module.exports = {
  createEncounter,
  getEncountersByCampaign,
  getEncounterById,
  updateEncounter,
  deleteEncounter,
};

