const pool = require('../config/db');

const addCampaignRole = async ({ campaign_id, user_id, role, invited_by }) => {
  const [result] = await pool.query(
    `INSERT INTO campaign_roles (campaign_id, user_id, role, invited_by) VALUES (?, ?, ?, ?)`,
    [campaign_id, user_id, role, invited_by || null]
  );
  return result;
};

module.exports = { addCampaignRole };
