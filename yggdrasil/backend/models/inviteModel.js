const pool = require('../config/db');

// Create a new invite
const createInvite = async ({ campaign_id, sender_id, receiver_id }) => {
  if (!campaign_id || !sender_id || !receiver_id) {
    throw new Error("campaign_id, sender_id, and receiver_id are required");
  }

  const [result] = await pool.query(
    "INSERT INTO campaign_invites (campaign_id, sender_id, receiver_id, status) VALUES (?, ?, ?, ?)",
    [campaign_id, sender_id, receiver_id, "pending"]
  );

  return result;
};

// Get all invites for a user (pending, accepted, rejected)
const getInvitesForUser = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT ci.*, u.username AS sender_username, c.campaign_name
     FROM campaign_invites ci
     JOIN users u ON ci.sender_id = u.user_id
     JOIN campaigns c ON ci.campaign_id = c.campaign_id
     WHERE ci.receiver_id = ? AND ci.status = 'pending'
     ORDER BY ci.created_at DESC`,
    [user_id]
  );
  return rows;
};

// Get invite by ID
const getInviteById = async (invite_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM campaign_invites WHERE invite_id = ?`,
    [invite_id]
  );
  return rows[0];
};

// Update invite status (pending -> accepted or rejected)
const updateInviteStatus = async (invite_id, status) => {
  if (!["accepted", "rejected"].includes(status)) {
    throw new Error("Status must be 'accepted' or 'rejected'");
  }

  const [result] = await pool.query(
    `UPDATE campaign_invites SET status = ? WHERE invite_id = ?`,
    [status, invite_id]
  );
  return result;
};

module.exports = {
  createInvite,
  getInvitesForUser,
  getInviteById,
  updateInviteStatus
};
