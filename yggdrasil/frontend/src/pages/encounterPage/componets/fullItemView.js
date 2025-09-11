// BackgroundDes.js
import React, { useState } from "react";
import "../encounter.css";
import daggerImg from "../../../assets/images/dagger.jpg"; // Goblin dagger image

const FullItemView = () => {
  const [description, setDescription] = useState(
    "A jagged dagger fashioned from scrap metal. It’s rusted and uneven, but still sharp enough to be dangerous."
  );

  const [activeTab, setActiveTab] = useState("Abilities");

  // Goblin dagger item
  const item = {
    name: "Crude Goblin Dagger",
    type: "Weapon - Dagger",
    image: daggerImg,
    hexes: [
      { label: "Damage", bonus: "1d4 Piercing" },
    ],
    abilities: ["Lightweight and easy to conceal", "Often coated with grime or poison"],
  };

  const tabs = {
    Abilities: item.abilities,
  };

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{item.name}</div>
          <div className="background-character-details">
            <div className="background-character-background">{item.type}</div>
          </div>
        </div>
        <img
          src={item.image}
          alt={item.name}
          className="background-portrait-img"
        />
      </div>

      {/* Two-column layout: Description + Hexes/Abilities */}
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

        {/* Right column: Hexes + Abilities */}
        <div className="background-right-column">
          {/* Hexes */}
          <div className="background-hex-bonuses">
            {item.hexes.map((hex, idx) => (
              <div key={idx} className="damage-hexagon">
                <div className="background-hex-bonus">{hex.bonus}</div>
                <div className="background-hex-label">{hex.label}</div>
              </div>
            ))}
          </div>

          {/* Abilities */}
          <div className="background-skills-box">
            <div className="background-skills-content">
              <h3>{activeTab}</h3>
              <ul>
                {tabs[activeTab].map((ability, idx) => (
                  <li key={idx}>{ability}</li>
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

export default FullItemView;
