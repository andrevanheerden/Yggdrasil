const pool = require("../config/db");

// Helper: ensure value is not undefined
const safeValue = (val) => (val === undefined || val === null ? "" : val);

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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safeValue(data.encounter_id),
    safeValue(data.campaign_id),
    safeValue(data.encounter_name),
    safeValue(data.encounter_img),
    safeValue(data.encounter_AC),
    safeValue(data.encounter_level),
    safeValue(data.encounter_speed),
    safeValue(data.encounter_current_HP),
    safeValue(data.encounter_max_HP),
    safeValue(data.encounter_ability_score_str),
    safeValue(data.encounter_ability_score_dex),
    safeValue(data.encounter_ability_score_con),
    safeValue(data.encounter_ability_score_int),
    safeValue(data.encounter_ability_score_wis),
    safeValue(data.encounter_ability_score_cha),
    safeValue(data.skill_modefed_1),
    safeValue(data.skill_modefed_2),
    safeValue(data.encounter_dec),
    safeValue(data.race_name),
    safeValue(data.race_dec),
    safeValue(data.race_skill_modefed_1),
    safeValue(data.race_skill_modefed_2),
    JSON.stringify(data.race_proficiencie_languages || []),
    JSON.stringify(data.race_proficiencie_tools || [])
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

const getEncountersByCampaign = async (campaignId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounters WHERE campaign_id = ?",
    [campaignId]
  );
  return rows;
};

const getEncounterById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM encounters WHERE encounter_id = ?",
    [id]
  );
  return rows[0];
};

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
    safeValue(data.encounter_name),
    safeValue(data.encounter_img),
    safeValue(data.encounter_AC),
    safeValue(data.encounter_level),
    safeValue(data.encounter_speed),
    safeValue(data.encounter_current_HP),
    safeValue(data.encounter_max_HP),
    safeValue(data.encounter_ability_score_str),
    safeValue(data.encounter_ability_score_dex),
    safeValue(data.encounter_ability_score_con),
    safeValue(data.encounter_ability_score_int),
    safeValue(data.encounter_ability_score_wis),
    safeValue(data.encounter_ability_score_cha),
    safeValue(data.skill_modefed_1),
    safeValue(data.skill_modefed_2),
    safeValue(data.encounter_dec),
    safeValue(data.race_name),
    safeValue(data.race_dec),
    safeValue(data.race_skill_modefed_1),
    safeValue(data.race_skill_modefed_2),
    JSON.stringify(data.race_proficiencie_languages || []),
    JSON.stringify(data.race_proficiencie_tools || []),
    safeValue(id)
  ];

  const [result] = await pool.execute(sql, values);
  return result;
};

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
