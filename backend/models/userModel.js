const pool = require("../config/db");

// Create a new user
const createUser = async ({ user_id, username, email, password, role }) => {
  const [result] = await pool.query(
    "INSERT INTO users (user_id, username, email, password, profile_img, role) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, username, email, password, null, role] // profile_img is null at signup
  );
  return result;
};

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Find user by username
const findUserByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  return rows[0];
};

module.exports = { createUser, findUserByEmail, findUserByUsername };
