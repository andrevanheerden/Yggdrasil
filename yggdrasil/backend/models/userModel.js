const db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
  async findByUsername(username) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE name = ?',
      [username]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  async create({ name, email, password, role = 'player', campaign_id = null, profileimg = null }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users 
       (name, email, password, role, campaign_id, profileimg) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, campaign_id, profileimg]
    );
    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, role, campaign_id, profileimg, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async updateProfileImage(userId, imagePath) {
    await db.query(
      'UPDATE users SET profileimg = ? WHERE id = ?',
      [imagePath, userId]
    );
    return this.findById(userId);
  },

  async assignToCampaign(userId, campaignId) {
    await db.query(
      'UPDATE users SET campaign_id = ? WHERE id = ?',
      [campaignId, userId]
    );
    return this.findById(userId);
  }
};