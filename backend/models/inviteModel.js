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

// Update invite status and optionally add user to campaign players
const updateInviteStatus = async (invite_id, status, user_id) => {
  if (!["accepted", "rejected"].includes(status)) {
    throw new Error("Status must be 'accepted' or 'rejected'");
  }

  // First update invite status
  const [result] = await pool.query(
    `UPDATE campaign_invites SET status = ? WHERE invite_id = ?`,
    [status, invite_id]
  );

  // If accepted, add user to campaign player_ids
  if (status === "accepted") {
    const invite = await getInviteById(invite_id);
    const [campaignRows] = await pool.query(
      "SELECT player_ids FROM campaigns WHERE campaign_id = ?",
      [invite.campaign_id]
    );

    let players = JSON.parse(campaignRows[0].player_ids || "[]");
    if (!players.includes(user_id)) {
      players.push(user_id);
      await pool.query(
        "UPDATE campaigns SET player_ids = ? WHERE campaign_id = ?",
        [JSON.stringify(players), invite.campaign_id]
      );
    }
  }

  return result;
};

module.exports = {
  createInvite,
  getInvitesForUser,
  getInviteById,
  updateInviteStatus
};

