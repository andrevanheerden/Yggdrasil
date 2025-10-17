import React, { useEffect, useState } from "react";
import "../campaign.css";
import API from "../../../api";
import { useNavigate } from "react-router-dom";

const CampaignPage = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchCampaign = async () => {
    try {
      const token = localStorage.getItem("token");
      const campaignId = localStorage.getItem("selectedCampaignId");
      if (!campaignId) return;

      // ✅ Use /my endpoint to include campaigns user is a player of
      const res = await API.get("/api/campaigns/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Find the campaign by ID
      const found = res.data.find((c) => c.campaign_id === campaignId);

      setCampaign(found);
    } catch (err) {
      console.error("Error loading campaign:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCampaign();
}, []);


  if (loading) return <p>Loading campaign...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="page left-page" style={{ position: "relative" }}>
      {/* Floating Edit Button */}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "8px 12px",
          background: "#2a6ca6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
              localStorage.setItem("editCampaignId", campaign.campaign_id);
              navigate("/edit-campaign"); // <-- go to EditCampaign page
        }}
      >
        Edit
      </button>

      <h2 className="campaign-title">{campaign.campaign_name}</h2>

      {campaign.map_img && (
        <img src={campaign.map_img} alt="Campaign Map" className="campaign-map" />
      )}

      <div className="description-container white-box">
        <h3>Description</h3>
        <p>{campaign.description}</p>
      </div>

      <div className="extra-info white-box">
        <h3>Setting</h3>
        <p>{campaign.setting}</p>

        <h3>Factions</h3>
        <ul>
          {campaign.factions &&
            JSON.parse(campaign.factions).map((f, i) => (
              <li key={i}>
                <strong>{f.name}</strong>: {f.role}
              </li>
            ))}
        </ul>

        <h3>Themes</h3>
        <ul>
          {campaign.themes &&
            JSON.parse(campaign.themes).map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default CampaignPage;


