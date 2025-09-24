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

  const [players, setPlayers] = useState([
    { username: "PlayerOne", user_id: "P-101" },
    { username: "PlayerTwo", user_id: "P-102" },
  ]);

  const [inviteId, setInviteId] = useState("");

  useEffect(() => {
    const fetchDm = async () => {
      try {
        const token = localStorage.getItem("token");
        const campaignId = localStorage.getItem("selectedCampaignId"); // get current campaign

        if (!campaignId) return;

        const res = await axios.get(
          `http://localhost:5000/api/campaigns/${campaignId}/dm`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data) {
          console.log("DM User ID:", res.data.user_id); // log DM user id
          setDm({
            user_id: res.data.user_id,
            username: res.data.username,
            profile_img: res.data.profile_img || profileIMG,
          });
        }
      } catch (err) {
        console.error("Failed to fetch DM:", err);
      }
    };

    fetchDm();
  }, []);

  const handleInvite = () => {
    if (!inviteId) return;
    setPlayers([
      ...players,
      { username: `Invited (${inviteId})`, user_id: inviteId },
    ]);
    setInviteId("");
  };

  return (
    <div className="page left-page">
      <h2 className="campaign-title">Campaign Players</h2>

      {/* --- DM Info --- */}
<div className="dm-container">
  <div className="dm-title">DM</div> {/* ← DM title */}
  <div className="dm-header">
    <img
      className="dm-avatar"
      src={dm.profile_img || profileIMG}
      alt="DM Profile"
    />
    <div className="dm-username">{dm.username}</div>
    <div className="dm-id">ID: {dm.user_id}</div>
  </div>
</div>


      {/* --- Player List --- */}
      <div className="players-container" >
        <h3>Players</h3>
        <div className="players-list">
          {players.map((p, i) => (
            <div key={i} className="player-item">
              <img
                src={profileIMG} 
                alt={p.username}
                className="player-avatar"
              />
              <div className="player-details">
                <div className="player-username">{p.username}</div>
                <div className="player-id">ID: {p.user_id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Invite Player --- */}
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


