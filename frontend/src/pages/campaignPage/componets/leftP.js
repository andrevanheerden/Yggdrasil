import React, { useState } from "react";
import pageBg from "../../../assets/images/page.png";
import "../campaign.css";

// Import your left-page sub components
import CampaignDescription from "./campaignDescription";
import CampaignPlayers from "./campaignPlayers";
import CampaignSheet from "./campaignSheet";

const LeftP = () => {
  const [activeTab, setActiveTab] = useState("campaign");

  const renderTabContent = () => {
    switch (activeTab) {
      case "campaign":
        return <CampaignSheet />;
      case "description":
        return <CampaignDescription />;
      case "players":
        return <CampaignPlayers />;
      default:
        return <CampaignSheet />;
    }
  };

  return (
    <>
      {/* Floating Tab Buttons */}
      <div className="campaign-left-tab-buttons">
        <button
          className={`campaign-left-tab-btn ${
            activeTab === "campaign" ? "active" : ""
          }`}
          onClick={() => setActiveTab("campaign")}
        >
          Campaign
        </button>
        <button
          className={`campaign-left-tab-btn ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`campaign-left-tab-btn ${
            activeTab === "players" ? "active" : ""
          }`}
          onClick={() => setActiveTab("players")}
        >
          Players
        </button>
      </div>

      {/* Page itself */}
      <div
        className="page left-page"
        style={{ backgroundImage: `url(${pageBg})` }}
      >
        {renderTabContent()}
      </div>
    </>
  );
};

export default LeftP;
