import React, { useState } from "react";
import "../encounter.css";
import goblinImg from "../../../assets/images/goblin.jpg"; // Goblin portrait

const EncounterRaceDes = () => {
  const [description, setDescription] = useState(
    "Goblins are small, cunning, and quick-witted creatures. Known for their resourcefulness and adaptability, they thrive in chaotic environments and often use their intelligence to survive. Despite their mischievous nature, goblins can be loyal allies to those they trust."
  );

  const [activeTab, setActiveTab] = useState("Tools");

  const character = {
    name: "Grik Nok",
    race: "Goblin",
    portrait: goblinImg,
  };

  const hexBonuses = [
    { label: "Dexterity", bonus: "+2" },
    { label: "Stealth", bonus: "+1" },
  ];

  const toolProficiencies = ["Tinkerer's tools", "Poisoner's kit"];
  const languages = ["Goblin", "Common"];

  const tabs = {
    Tools: toolProficiencies,
    Languages: languages,
  };

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{character.name}</div>
          <div className="background-character-details">
            <div className="background-character-background">{character.race}</div>
          </div>
        </div>
        <img
          src={character.portrait}
          alt="Portrait"
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
                {tabs[activeTab].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
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
