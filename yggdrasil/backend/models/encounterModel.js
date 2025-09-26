const pool = require("../config/db");

const createEncounter = async (encounter) => {
  const {
    encounter_id,
    campaign_id,
    encounter_name,
    encounter_image,
    description,
    abilities,
    ability_scores,
    hp,
    ac,
    speed,
    level,
    selected_skills,
    race_name,
    race_languages,
    race_tools
  } = encounter;

  const [result] = await pool.query(
    `INSERT INTO encounters 
      (encounter_id, campaign_id, encounter_name, encounter_image, description, abilities, ability_scores, hp, ac, speed, level, selected_skills, race_name, race_languages, race_tools)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      encounter_id,
      campaign_id,
      encounter_name,
      encounter_image,
      description || null,
      JSON.stringify(abilities),
      JSON.stringify(ability_scores),
      JSON.stringify(hp),
      ac,
      speed,
      level,
      JSON.stringify(selected_skills),
      race_name || null,
      JSON.stringify(race_languages || []),
      JSON.stringify(race_tools || [])
    ]
  );

  return result;
};

const getEncountersByCampaign = async (campaign_id) => {
  const [rows] = await pool.query("SELECT * FROM encounters WHERE campaign_id = ?", [campaign_id]);
  return rows;
};

const getEncounterById = async (encounter_id) => {
  const [rows] = await pool.query("SELECT * FROM encounters WHERE encounter_id = ?", [encounter_id]);
  return rows[0];
};

module.exports = { createEncounter, getEncountersByCampaign, getEncounterById };
