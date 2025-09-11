import React, { useState } from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../encounter.css";



// Import your right-page sub components
import RightPageInventory from "./inventory";
import RightPageSpells from "./spells";
import RightPageActions from "./actions";

const RightP = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  const renderTabContent = () => {
    switch (activeTab) {
      case "inventory":
        return <RightPageInventory />;
      case "spells":
        return <RightPageSpells />;
      case "actions":
        return <RightPageActions />;
      default:
        return <RightPageInventory />;
    }
  };

  return (
    <div
      className="page right-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      {/* Nav Container */}
      <div className="right-page-tabs2-container">
        <div className="right-page-tabs2">
          <button
            className={`right-tab2-btn ${
              activeTab === "inventory" ? "active" : ""
            }`}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </button>
          <button
            className={`right-tab2-btn ${
              activeTab === "spells" ? "active" : ""
            }`}
            onClick={() => setActiveTab("spells")}
          >
            Spells
          </button>
          <button
            className={`right-tab2-btn ${
              activeTab === "actions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("actions")}
          >
            Actions
          </button>
        </div>
      </div>

      {/* Render selected content */}
      {renderTabContent()}
    </div>
  );
};

export default RightP;

