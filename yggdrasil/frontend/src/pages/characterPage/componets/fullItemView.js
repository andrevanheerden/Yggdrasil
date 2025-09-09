import React, { useState } from "react";
import "../character.css";
import placeholderImg from "../../../assets/images/sword.jpg";

const FullItemView = ({ item }) => {
  // Default item if none provided
  const currentItem = item || {
    name: "Sword of the Night",
    type: "Weapon - Longsword",
    image: placeholderImg,
    stats: [
      { label: "Damage", bonus: "2d6 Slashing" },
      { label: "Cold", bonus: "1d4 Cold" },
    ],
    abilities: ["Glows in darkness", "Can pierce magical shields"],
    description:
      "Forged in shadow and quenched in the thirst of dying stars, the Sword of the Night drinks the light around it.",
  };

const [description] = useState(currentItem.description || "");

  const [activeTab, setActiveTab] = useState("Abilities");

  const tabs = {
    Abilities: currentItem.abilities || [],
  };

  return (
    <div className="page right-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{currentItem.name}</div>
          <div className="background-character-details">
            <div className="background-character-background">{currentItem.type}</div>
          </div>
        </div>
        <img
          src={currentItem.image}
          alt={currentItem.name}
          className="background-portrait-img"
        />
      </div>

      {/* Two-column layout */}
      <div className="background-main-content">
        {/* Left: Description */}
        <div className="background-description-box">
          <div className="background-description-title-inside">Description</div>
          <textarea
            value={description}
            readOnly
            className="background-description-textarea"
          />
        </div>

        {/* Right: Stats Hexes + Abilities */}
        <div className="background-right-column">
          {/* Hex Stats */}
          <div className="background-hex-bonuses">
            {(currentItem.stats || []).map((stat, idx) => (
              <div key={idx} className="background-hex">
                <div className="background-hex-bonus">{stat.bonus}</div>
                <div className="background-hex-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Abilities Tab */}
          <div className="background-skills-box">
            <div className="background-skills-content">
              <h3>{activeTab}</h3>
              <ul>
                {(tabs[activeTab] || []).map((val, idx) => (
                  <li key={idx}>{val}</li>
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
