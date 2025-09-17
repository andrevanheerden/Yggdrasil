// BackgroundDes.js
import React, { useState } from "react";
import "../character.css";
import rose from "../../../assets/images/rose.jpg"; // Portrait placeholder

const ClassDes = () => {
  const [description, setDescription] = useState(
    "You have dedicated your life to the pursuit of knowledge—be it arcane, historical, natural, or philosophical. Whether you were trained at a grand university, mentored by a wise master, or self-taught in dusty corners of forgotten libraries, your mind is your greatest weapon. Others may swing swords or cast spells with flair, but you shape the world with reason, insight, and understanding."
  );

  const [activeTab, setActiveTab] = useState("Tools");

  const character = {
    name: "Alex Black",
    class: "Shinobi",
    portrait: rose,
  };

  // Energy resource (replaces hex bonuses)
  const energyResource = {
    name: "Chakra Energy",
    levels: {
      1: 4,
      2: 3,
      3: 5,
      4: 2,
      5: 6,
      6: 3,
      7: 4,
      8: 5,
      9: 7,
    },
  };

  const toolProficiencies = ["Calligrapher's supplies"];
  const languages = ["Common", "Elvish"];

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
          {/* Remove class and race */}
          <div className="background-character-details">
            <div className="background-character-background">
              {character.class}
            </div>
          </div>
        </div>
        <img
          src={character.portrait}
          alt="Portrait"
          className="background-portrait-img"
        />
      </div>

      {/* Two-column layout: Description + Right column */}
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

        {/* Right column: Energy Resource + Tools/Languages */}
        <div className="background-right-column">
          {/* Energy Resource Box */}
          <div className="energy-box">
            <h3 className="energy-title">{energyResource.name}</h3>
            <div className="energy-levels">
              {Object.entries(energyResource.levels).map(([level, count]) => (
                <div key={level} className="energy-level">
                  <span className="energy-level-label">Lv {level}</span>
                  <div className="energy-circles">
                    {Array.from({ length: count }).map((_, idx) => (
                      <div key={idx} className="energy-circle"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools / Languages */}
          <div className="background-skills-box" style={{ height: "282px" }}>
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

export default ClassDes;
