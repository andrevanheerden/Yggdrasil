import React, { useState } from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../encounter.css";

import RightPageInventory from "./inventory";
import RightPageSpells from "./spells";
import RightPageActions from "./actions";

const RightP = ({ selectedEncounter }) => {
  const [activeTab, setActiveTab] = useState("inventory");

  const renderTabContent = () => {
    switch (activeTab) {
      case "inventory":
        return <RightPageInventory selectedEncounter={selectedEncounter} />;
      case "spells":
        return <RightPageSpells selectedEncounter={selectedEncounter} />;
      case "actions":
        return <RightPageActions selectedEncounter={selectedEncounter} />;
      default:
        return <RightPageInventory selectedEncounter={selectedEncounter} />;
    }
  };

  return (
    <div
      className="page right-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      <div className="right-page-tabs2-container">
        <div className="right-page-tabs2">
          <button
            className={`right-tab2-btn ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </button>
          <button
            className={`right-tab2-btn ${activeTab === "spells" ? "active" : ""}`}
            onClick={() => setActiveTab("spells")}
          >
            Spells
          </button>
          <button
            className={`right-tab2-btn ${activeTab === "actions" ? "active" : ""}`}
            onClick={() => setActiveTab("actions")}
          >
            Actions
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default RightP;


