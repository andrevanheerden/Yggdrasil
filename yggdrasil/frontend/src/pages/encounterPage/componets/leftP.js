import React, { useState } from "react";
import pageBg from "../../../assets/images/page.png";
import "../encounter.css";

import EncounterSheet from "./encounterSheet";
import EncounterDes from "./encounterDes";
import Races from "./raceDes";
import EncounterList from "./encounterList";

const LeftP = () => {
  const [activeTab, setActiveTab] = useState("encounters"); // first tab
  const [selectedEncounter, setSelectedEncounter] = useState(null); // store clicked encounter

  const renderTabContent = () => {
    switch (activeTab) {
      case "encounters":
        return (
          <EncounterList
            onSelectEncounter={(enc) => {
              setSelectedEncounter(enc);
              setActiveTab("sheet"); // go to sheet after click
            }}
          />
        );
      case "sheet":
        return selectedEncounter ? <EncounterSheet encounter={selectedEncounter} /> : null;
      case "description":
        return selectedEncounter ? <EncounterDes encounter={selectedEncounter} /> : null;
      case "races":
        return selectedEncounter ? <Races encounter={selectedEncounter} /> : null;
      default:
        return <EncounterList onSelectEncounter={(enc) => setSelectedEncounter(enc)} />;
    }
  };

  return (
    <>
      <div className="encounter-left-tab-buttons">
        <button
          className={`encounter-left-tab-btn ${activeTab === "encounters" ? "active" : ""}`}
          onClick={() => setActiveTab("encounters")}
        >
          Encounters
        </button>
        <button
          className={`encounter-left-tab-btn ${activeTab === "sheet" ? "active" : ""}`}
          onClick={() => setActiveTab("sheet")}
        >
          Sheet
        </button>
        <button
          className={`encounter-left-tab-btn ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`encounter-left-tab-btn ${activeTab === "races" ? "active" : ""}`}
          onClick={() => setActiveTab("races")}
        >
          Races
        </button>
      </div>

      <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
        {renderTabContent()}
      </div>
    </>
  );
};

export default LeftP;
