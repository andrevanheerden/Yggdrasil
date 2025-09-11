import React, { useState } from "react";
import pageBg from "../../../assets/images/page.png";
import "../encounter.css";

import EncounterSheet from "./encounterSheet";
import EncounterDes from "./encounterDes";
import Races from "./raceDes";

const LeftP = () => {
  const [activeTab, setActiveTab] = useState("sheet");

  const renderTabContent = () => {
    switch (activeTab) {
      case "sheet":
        return <EncounterSheet />;
      case "description":
        return <EncounterDes />;
      case "races":
        return <Races />;
      default:
        return <EncounterSheet />;
    }
  };

  return (
    <>
      {/* Floating Tab Buttons */}
      <div className="encounter-left-tab-buttons">
        <button
          className={`encounter-left-tab-btn ${
            activeTab === "sheet" ? "active" : ""
          }`}
          onClick={() => setActiveTab("sheet")}
        >
          Sheet
        </button>
        <button
          className={`encounter-left-tab-btn ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`encounter-left-tab-btn ${
            activeTab === "races" ? "active" : ""
          }`}
          onClick={() => setActiveTab("races")}
        >
          Races
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

