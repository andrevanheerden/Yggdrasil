import React, { useState, useEffect } from "react";
import axios from "axios";
import "../encounter.css";
import fallbackImg from "../../../assets/images/profile.jpg"; // Fallback image

const EncounterList = ({ onSelectEncounter, onCreateEncounter }) => {
  const [encounters, setEncounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const storedCampaign = localStorage.getItem("selectedCampaignData");
    if (!storedCampaign) {
      setError("You must open a campaign to see encounters.");
      setLoading(false);
      return;
    }

    const campaignData = JSON.parse(storedCampaign);
    setCampaign(campaignData);

    const fetchEncounters = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/encounters/${campaignData.campaign_id}`
        );
        setEncounters(res.data || []);
      } catch (err) {
        console.error("Error fetching encounters:", err);
        setError("Failed to fetch encounters.");
      } finally {
        setLoading(false);
      }
    };

    fetchEncounters();
  }, []);

  // 🧠 Add logging + localStorage saving here
  const handleEncounterSelect = (enc) => {
    console.log("Opened Encounter:", enc.encounter_id, enc.encounter_name);
    localStorage.setItem("selectedEncounterId", enc.encounter_id);
    if (onSelectEncounter) onSelectEncounter(enc);
  };

  if (loading) return <p>Loading encounters...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="encounter-list-wrapper">
      <h2 className="encounter-list-title">
        Encounters for {campaign?.campaign_name || "Unknown Campaign"}
      </h2>

      <div className="encounter-list-container">
        {encounters.length > 0 ? (
          encounters.map((enc) => (
            <div
              key={enc.encounter_id}
              className="encounter-box"
              onClick={() => handleEncounterSelect(enc)} // ← use the new handler
            >
              <div className="encounter-img-container">
                <img
                  src={enc.encounter_img || fallbackImg}
                  alt={enc.encounter_name}
                  className="encounter-img"
                />
              </div>

              <div className="encounter-info">
                <div className="encounter-name">{enc.encounter_name}</div>
                <div className="encounter-race">{enc.race_name}</div>
              </div>

              <div className="encounter-stats">
                <div className="encounter-level">Lvl {enc.encounter_level}</div>
                <div className="encounter-ac">AC {enc.encounter_AC}</div>
                <div className="encounter-speed">Speed {enc.encounter_speed}</div>
                <div className="encounter-hp">
                  HP {enc.encounter_current_HP}/{enc.encounter_max_HP}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No encounters available for this campaign.</p>
        )}

        {/* ➕ Create New Encounter */}
        <div
          className="encounter-box create-new"
          onClick={() => onCreateEncounter && onCreateEncounter()}
        >
          <div className="encounter-img-container">
            <div className="encounter-img placeholder">+</div>
          </div>
          <div className="encounter-info">
            <div className="encounter-name">Add Encounter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncounterList;








