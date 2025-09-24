import React, { useState, useEffect } from "react"; 
import profileIMG from "../../../assets/images/profile.jpg";
import "../campaign.css";
import axios from "axios";

const CampaignPlayers = () => {
  const [dm, setDm] = useState({
    username: "DungeonMaster42",
    user_id: "DM-001",
    profile_img: profileIMG,
  });
  const [players, setPlayers] = useState([]);
  const [inviteId, setInviteId] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem("token");
        const campaignId = localStorage.getItem("selectedCampaignId");
        if (!campaignId) return;

        // Fetch DM info
        const dmRes = await axios.get(
          `http://localhost:5000/api/campaigns/${campaignId}/dm`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (dmRes.data) setDm({
          user_id: dmRes.data.user_id,
          username: dmRes.data.username,
          profile_img: dmRes.data.profile_img || profileIMG
        });

        // Fetch players
        const rolesRes = await axios.get(
          `http://localhost:5000/api/campaigns/${campaignId}/roles`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const playerRoles = rolesRes.data.filter(r => r.role === "player");
        setPlayers(playerRoles.map(p => ({ username: `User_${p.user_id}`, user_id: p.user_id })));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlayers();
  }, []);

const handleInvite = async () => {
  if (!inviteId) return;
  try {
    const token = localStorage.getItem("token");
    const campaignId = localStorage.getItem("selectedCampaignId");

await axios.post(
  "http://localhost:5000/api/campaigns/invite",
  { campaign_id: campaignId, receiver_id: inviteId }, // <-- use receiver_id
  { headers: { Authorization: `Bearer ${token}` } }
);




    alert(`Invite sent to user ${inviteId}. They must accept to join.`);
    setInviteId("");
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="page left-page">
      <h2 className="campaign-title">Campaign Players</h2>

      {/* DM Info */}
      <div className="dm-container">
        <div className="dm-header">
          <img className="dm-avatar" src={dm.profile_img} alt="DM Profile" />
          <div className="dm-title">DM</div>
          <div className="dm-username">{dm.username}</div>
          <div className="dm-id">ID: {dm.user_id}</div>
        </div>
      </div>

      {/* Player List */}
      <div className="players-container">
        <h3>Players</h3>
        <div className="players-list">
          {players.length === 0 ? (
            <div className="no-players">No players invited</div>
          ) : (
            players.map((p, i) => (
              <div key={i} className="player-item">
                <img src={profileIMG} alt={p.username} className="player-avatar" />
                <div className="player-details">
                  <div className="player-username">{p.username}</div>
                  <div className="player-id">ID: {p.user_id}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Invite Player */}
      <div className="invite-container">
        <h3>Invite Player</h3>
        <div className="invite-box">
          <input
            type="text"
            placeholder="Enter Player User ID"
            className="invite-input"
            value={inviteId}
            onChange={(e) => setInviteId(e.target.value)}
          />
          <button className="invite-button" onClick={handleInvite}>
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPlayers;



