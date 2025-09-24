const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { createUser, findUserByEmail, findUserByUsername } = require("../models/userModel");

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate a random user_id like AAA-000-001
function generateUserId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}-${randomNumber()}`;
}

// Ensure unique user_id
async function generateUniqueUserId() {
  let user_id;
  let exists = true;
  while (exists) {
    user_id = generateUserId();
    const [rows] = await pool.query("SELECT user_id FROM users WHERE user_id = ?", [user_id]);
    exists = rows.length > 0;
  }
  return user_id;
}

// =================== SIGNUP ===================
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    if (password.length < 6 || password.length > 12)
      return res.status(400).json({ error: "Password must be between 6 and 12 characters" });

    if (await findUserByEmail(email)) return res.status(400).json({ error: "Email already registered" });
    if (await findUserByUsername(username)) return res.status(400).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = await generateUniqueUserId();
    const role = "user"; // default role

    await createUser({ user_id, username, email, password: hashedPassword, profile_img: null, role });

    res.status(201).json({ message: "User registered successfully", user_id });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// =================== LOGIN ===================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// =================== GET CURRENT USER ===================
const getCurrentUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const [rows] = await pool.query("SELECT user_id, username, email, profile_img, role FROM users WHERE user_id = ?", [user_id]);

    if (!rows[0]) return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ error: err.message });
  }
};

// =================== UPDATE CURRENT USER ===================
const updateCurrentUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { username } = req.body;
    let profile_img = null;

    // Check if a file was uploaded
    if (req.files && req.files.profile_img) {
      const file = req.files.profile_img;

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profiles",
      });

      profile_img = uploadResult.secure_url;
    }

    // Update DB
    await pool.query(
      "UPDATE users SET username = ?, profile_img = IFNULL(?, profile_img) WHERE user_id = ?",
      [username, profile_img, user_id]
    );

    // Return updated user
    const [rows] = await pool.query(
      "SELECT user_id, username, email, profile_img, role FROM users WHERE user_id = ?",
      [user_id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login, getCurrentUser, updateCurrentUser };


