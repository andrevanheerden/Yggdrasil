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

// Controller: Create a new message
const createMessage = async (req, res) => {
  try {
    const sender_id = req.user.user_id; // from authenticated user
    const { type, text } = req.body;

    if (!type || !text) return res.status(400).json({ error: "Type and text are required" });
    if (!["error", "review"].includes(type))
      return res.status(400).json({ error: "Type must be 'error' or 'review'" });

    const id = await generateUniqueMessageId();

    await pool.query(
      "INSERT INTO messages (id, sender_id, type, text) VALUES (?, ?, ?, ?)",
      [id, sender_id, type, text]
    );

    res.status(201).json({ message: "Message sent successfully", id });
  } catch (err) {
    console.error("Create message error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: Get all messages from a user
const getUserMessages = async (req, res) => {
  try {
    const sender_id = req.user.user_id;
    const [rows] = await pool.query(
      "SELECT id, type, text, created_at FROM messages WHERE sender_id = ? ORDER BY created_at DESC",
      [sender_id]
    );

    res.json({ messages: rows });
  } catch (err) {
    console.error("Get user messages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMessage, getUserMessages };
