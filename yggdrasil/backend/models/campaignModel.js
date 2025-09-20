const pool = require("../config/db");

const createCampaign = async (campaign) => {
  const {
    campaign_id,
    campaign_name,
    cover_img,
    cover_color,
    description,
    setting,
    factions,
    themes,
    map_img,
    creator_user_id
  } = campaign;

  const [result] = await pool.query(
    `INSERT INTO campaigns 
      (campaign_id, campaign_name, cover_img, cover_color, description, setting, factions, themes, map_img, creator_user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      campaign_id,
      campaign_name,
      cover_img,
      cover_color,
      description,
      setting,
      JSON.stringify(factions),
      JSON.stringify(themes),
      map_img,
      creator_user_id
    ]
  );

  return result;
};

const getCampaigns = async () => {
  const [rows] = await pool.query("SELECT * FROM campaigns ORDER BY created_at DESC");
  return rows;
};

const deleteCampaign = async (campaign_id) => {
  const [result] = await pool.query("DELETE FROM campaigns WHERE campaign_id = ?", [campaign_id]);
  return result;
};

const removePlayerFromCampaign = async (campaign_id, user_id) => {
  // First get current player_ids
  const [rows] = await pool.query("SELECT player_ids FROM campaigns WHERE campaign_id = ?", [campaign_id]);
  if (rows.length === 0) return null;
  
  const currentPlayers = rows[0].player_ids ? JSON.parse(rows[0].player_ids) : [];
  const updatedPlayers = currentPlayers.filter(id => id !== user_id);
  
  const [result] = await pool.query(
    "UPDATE campaigns SET player_ids = ? WHERE campaign_id = ?",
    [JSON.stringify(updatedPlayers), campaign_id]
  );
  
  return result;
};

module.exports = { createCampaign, getCampaigns, deleteCampaign, removePlayerFromCampaign };

