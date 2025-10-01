import React, { useState, useEffect } from "react";
import "../encounter.css";
import fallbackImg from "../../../assets/images/profile.jpg"; // fallback portrait

const EncounterRaceDes = ({ encounter }) => {
  const [description, setDescription] = useState("No description available.");
  const [activeTab, setActiveTab] = useState("Tools");

  useEffect(() => {
    if (encounter) {
      setDescription(encounter.race_dec || "No description available.");
    }
  }, [encounter]);

  if (!encounter) return <p>Select an encounter to view race details.</p>;

  // === Hex bonuses ===
  const hexBonuses = [
    { label: encounter.race_skill_modefed_1 || "", bonus: "+2" },
    { label: encounter.race_skill_modefed_2 || "", bonus: "+2" },
  ].filter((h) => h.label);

  // === Parse JSON strings into arrays ===
  let toolProficiencies = [];
  let languages = [];

  try {
    toolProficiencies = encounter.race_proficiencie_tools
      ? JSON.parse(encounter.race_proficiencie_tools)
      : [];
  } catch {
    toolProficiencies = [];
  }

  try {
    languages = encounter.race_proficiencie_languages
      ? JSON.parse(encounter.race_proficiencie_languages)
      : [];
  } catch {
    languages = [];
  }

  const tabs = {
    Tools: toolProficiencies,
    Languages: languages,
  };

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{encounter.race_name}</div>
        </div>
        <img
          src={encounter.encounter_img || fallbackImg}
          alt={encounter.race_name}
          className="background-portrait-img"
        />
      </div>

      {/* Main content */}
      <div className="background-main-content">
        {/* Description */}
        <div className="background-description-box">
          <div className="background-description-title-inside">Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="background-description-textarea"
          />
        </div>

        {/* Right column: Hexes + Tools/Languages */}
        <div className="background-right-column">
          <div className="background-hex-bonuses">
            {hexBonuses.map((hex, idx) => (
              <div key={idx} className="background-hex">
                <div className="background-hex-bonus">{hex.bonus}</div>
                <div className="background-hex-label">{hex.label}</div>
              </div>
            ))}
          </div>

          <div className="background-skills-box">
            <div className="background-skills-content">
              <h3>{activeTab}</h3>
              <ul>
                {Array.isArray(tabs[activeTab]) ? (
                  tabs[activeTab].map((item, idx) => <li key={idx}>{item}</li>)
                ) : (
                  <li>No data</li>
                )}
              </ul>
            </div>

            <div className="background-skills-tabs-container">
              <div className="background-skills-tab-buttons">
                {Object.keys(tabs).map((tab) => (
                  <button
                    key={tab}
                    className={`background-skills-tab-btn ${
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
      </div>
    </div>
  );
};

export default EncounterRaceDes;

