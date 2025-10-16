import React, { useState } from "react";
import pageBg from "../../../assets/images/page.png";
import "../encounter.css";

import EncounterSheet from "./encounterSheet";
import EncounterDes from "./encounterDes";
import Races from "./raceDes";
import EncounterList from "./encounterList";

const LeftP = ({ onCreateEncounter, onEditEncounter, onSelectEncounter }) => {
  const [activeTab, setActiveTab] = useState("encounters");
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  const handleSelectEncounter = (enc) => {
    setSelectedEncounter(enc);
    setActiveTab("sheet");
    if (onSelectEncounter) onSelectEncounter(enc); // notify parent
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "encounters":
        return (
          <EncounterList
            onSelectEncounter={handleSelectEncounter}
            onCreateEncounter={onCreateEncounter} // open create popup
            onEditEncounter={onEditEncounter} // open edit popup
          />
        );
      case "sheet":
        return selectedEncounter ? (
          <EncounterSheet
            encounter={selectedEncounter}
            onEdit={onEditEncounter} // pass edit handler to sheet
          />
        ) : null;
      case "description":
        return selectedEncounter ? <EncounterDes encounter={selectedEncounter} /> : null;
      case "races":
        return selectedEncounter ? <Races encounter={selectedEncounter} /> : null;
      default:
        return (
          <EncounterList
            onSelectEncounter={handleSelectEncounter}
            onCreateEncounter={onCreateEncounter}
            onEditEncounter={onEditEncounter}
          />
        );
    }
  };

  return (
    <>
      <div className="encounter-left-tab-buttons">
        <button
          className={`encounter-left-tab-btn ${activeTab === "encounters" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("encounters");
            setSelectedEncounter(null);
            if (onSelectEncounter) onSelectEncounter(null); // clear right page
          }}
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
