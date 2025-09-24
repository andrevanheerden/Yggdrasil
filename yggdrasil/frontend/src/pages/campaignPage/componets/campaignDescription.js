import React, { useState, useEffect } from "react";
import "../campaign.css"; 
import axios from "axios";

const CampaignDescription = () => {
  const [campaign, setCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("token");
      const campaignId = localStorage.getItem("selectedCampaignId");
      if (!campaignId) return;

      // ✅ Use the /my endpoint to include campaigns where user is a player
      const res = await axios.get("http://localhost:5000/api/campaigns/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.find((c) => c.campaign_id === campaignId);
      setCampaign(found || null);
    } catch (err) {
      console.error("Error loading campaign description:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCampaign();
}, []);


  if (loading) return <p>Loading campaign...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="adventure-page">
      {/* Floating title */}
      <h1 className="adventure-title">{campaign.campaign_name}</h1>

      <div className="adventure-main">
        {/* Description Container */}
        <div className="adventure-description-box">
          {activeTab === "Description" && (
            <p>{campaign.description}</p>
          )}

          {activeTab === "Setting" && (
            <p>{campaign.setting}</p>
          )}

          {activeTab === "Factions" && (
            <ul>
              {campaign.factions &&
                JSON.parse(campaign.factions).map((f, i) => (
                  <li key={i}>
                    <strong>{f.name}</strong>: {f.role}
                  </li>
                ))}
            </ul>
          )}

          {activeTab === "Themes" && (
            <ul>
              {campaign.themes &&
                JSON.parse(campaign.themes).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
            </ul>
          )}
        </div>

        {/* Side buttons */}
        <div className="adventure-side-buttons-wrapper">
          <div className="adventure-side-buttons">
            {["Description", "Setting", "Factions", "Themes"].map((tab) => (
              <button
                key={tab}
                className={`adventure-side-btn ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDescription;

