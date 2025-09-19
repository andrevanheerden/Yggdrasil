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

module.exports = { createCampaign, getCampaigns };

