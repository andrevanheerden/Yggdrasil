const pool = require("../config/db");

// Helper to safely handle null/undefined values
const safeValue = (val) => (val === undefined || val === null ? "" : val);

// Generate Note ID: CMP-NOT-XXX-XXX
const generateNoteId = () => {
  const randomDigits = () => Math.floor(100 + Math.random() * 900);
  return `CMP-NOT-${randomDigits()}-${randomDigits()}`;
};

// CREATE note
const createNote = async (data) => {
  const note_id = generateNoteId();
  const sql = "INSERT INTO campaign_notes (note_id, campaign_id, note_text) VALUES (?, ?, ?)";
  const values = [note_id, safeValue(data.campaign_id), safeValue(data.note_text)];
  await pool.execute(sql, values);
  const [rows] = await pool.execute("SELECT * FROM campaign_notes WHERE note_id = ?", [note_id]);
  return rows[0];
};

// GET notes by campaign
const getNotesByCampaign = async (campaign_id) => {
  const [rows] = await pool.execute("SELECT * FROM campaign_notes WHERE campaign_id = ?", [campaign_id]);
  return rows;
};

// GET note by ID
const getNoteById = async (note_id) => {
  const [rows] = await pool.execute("SELECT * FROM campaign_notes WHERE note_id = ?", [note_id]);
  return rows[0];
};

// UPDATE note
const updateNote = async (note_id, note_text) => {
  await pool.execute("UPDATE campaign_notes SET note_text = ? WHERE note_id = ?", [safeValue(note_text), note_id]);
  return getNoteById(note_id);
};

// DELETE note
const deleteNote = async (note_id) => {
  const [result] = await pool.execute("DELETE FROM campaign_notes WHERE note_id = ?", [note_id]);
  return result;
};

module.exports = {
  createNote,
  getNotesByCampaign,
  getNoteById,
  updateNote,
  deleteNote,
  generateNoteId,
};
