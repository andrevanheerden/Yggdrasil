const pool = require("../config/db");

// Helper to safely handle undefined/null values
const safeValue = (val) => (val === undefined || val === null ? "" : val);

// Generate Race ID: CHA-RAC-XXX-123-123
const generateRaceId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = (length = 3) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
  return `CHA-RAC-${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
};

// Create a new Race
const createRace = async (data) => {
  const race_id = generateRaceId();
  const sql = `
    INSERT INTO character_races (
      race_id, character_id, race_name, race_description,
      race_skill_1, race_skill_2, tool_proficiencies, language_proficiencies
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    race_id,
    safeValue(data.character_id),
    safeValue(data.race_name),
    safeValue(data.race_description),
    safeValue(data.race_skill_1),
    safeValue(data.race_skill_2),
    JSON.stringify(data.tool_proficiencies || []),
    JSON.stringify(data.language_proficiencies || []),
  ];
  const [result] = await pool.execute(sql, values);
  return { race_id, result };
};

// Get races by character
const getRacesByCharacter = async (characterId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_races WHERE character_id = ?",
    [characterId]
  );
  return rows;
};

// Get race by ID
const getRaceById = async (raceId) => {
  const [rows] = await pool.execute(
    "SELECT * FROM character_races WHERE race_id = ?",
    [raceId]
  );
  return rows[0];
};

// Update race
const updateRace = async (raceId, data) => {
  const sql = `
    UPDATE character_races SET
      race_name = ?, race_description = ?, race_skill_1 = ?, race_skill_2 = ?,
      tool_proficiencies = ?, language_proficiencies = ?
    WHERE race_id = ?
  `;
  const values = [
    safeValue(data.race_name),
    safeValue(data.race_description),
    safeValue(data.race_skill_1),
    safeValue(data.race_skill_2),
    JSON.stringify(data.tool_proficiencies || []),
    JSON.stringify(data.language_proficiencies || []),
    raceId,
  ];
  const [result] = await pool.execute(sql, values);
  return result;
};

// Delete race
const deleteRace = async (raceId) => {
  const [result] = await pool.execute(
    "DELETE FROM character_races WHERE race_id = ?",
    [raceId]
  );
  return result;
};

module.exports = {
  createRace,
  getRacesByCharacter,
  getRaceById,
  updateRace,
  deleteRace,
};
