const { createNote, getNotesByCampaign, getNoteById, updateNote, deleteNote } = require("../models/dmNoteModel");

// CREATE note
exports.create = async (req, res) => {
  try {
    const { campaign_id, note_text } = req.body;
    if (!campaign_id) return res.status(400).json({ error: "Campaign ID is required" });

    const note = await createNote({ campaign_id, note_text });
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
};

// GET notes by campaign
exports.getByCampaign = async (req, res) => {
  try {
    const notes = await getNotesByCampaign(req.params.campaignId);
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// GET note by ID
exports.getById = async (req, res) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

// UPDATE note
exports.update = async (req, res) => {
  try {
    const { note_text } = req.body;
    const note = await updateNote(req.params.id, note_text);
    res.json({ message: "Note updated", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update note" });
  }
};

// DELETE note
exports.delete = async (req, res) => {
  try {
    await deleteNote(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
