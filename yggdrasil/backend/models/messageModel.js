const pool = require("../config/db");

const { generateUniqueMessageId } = require("../utils/messageId"); // import helper

const createMessage = async ({ sender_id, type, text }) => {
  const id = await generateUniqueMessageId(pool); // generate unique custom ID

  const [result] = await pool.query(
    "INSERT INTO messages (id, sender_id, type, text) VALUES (?, ?, ?, ?)",
    [id, sender_id, type, text]
  );
  return { ...result, id };
};

const getMessagesByUser = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM messages WHERE sender_id = ? ORDER BY created_at DESC",
    [user_id]
  );
  return rows;
};

module.exports = { createMessage, getMessagesByUser };

