const pool = require("../config/db");

// Generate message ID
function generateMessageId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => String(Math.floor(Math.random() * 1000)).padStart(3, "0");

  return `MSG-${randomNumber()}-${randomLetter()}${randomLetter()}${randomLetter()}-${randomLetter()}${randomLetter()}${randomLetter()}`;
}

// Ensure unique message ID
async function generateUniqueMessageId() {
  let id;
  let exists = true;
  while (exists) {
    id = generateMessageId();
    const [rows] = await pool.query("SELECT id FROM messages WHERE id = ?", [id]);
    exists = rows.length > 0;
  }
  return id;
}

// ================= CREATE MESSAGE =================
const createMessage = async (req, res) => {
  try {
    const sender_id = req.user.user_id;
    const { type, text } = req.body;

    if (!type || !text) return res.status(400).json({ error: "Type and text are required" });
    if (!["error", "review"].includes(type))
      return res.status(400).json({ error: "Type must be 'error' or 'review'" });

    const id = await generateUniqueMessageId();

    await pool.query(
      "INSERT INTO messages (id, sender_id, type, text, created_at) VALUES (?, ?, ?, ?, NOW())",
      [id, sender_id, type, text]
    );

    res.status(201).json({ message: "Message sent successfully", id });
  } catch (err) {
    console.error("Create message error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ================= GET MESSAGES =================
const getMessages = async (req, res) => {
  try {
    let query = "SELECT * FROM messages";
    const params = [];

    // Only non-super-admin users see their own messages
    if (req.user.role !== "super_admin") {
      query += " WHERE sender_id = ?";
      params.push(req.user.user_id);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await pool.query(query, params);
    res.json({ messages: rows });
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// ================= DELETE MESSAGE =================
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const user = req.user;

    let query = "DELETE FROM messages WHERE id = ?";
    const params = [messageId];

    // Non-super-admin can delete only their own messages
    if (user.role !== "super_admin") {
      query += " AND sender_id = ?";
      params.push(user.user_id);
    }

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found or not authorized" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMessage, getMessages, deleteMessage };


