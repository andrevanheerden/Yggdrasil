import React, { useState } from "react";
import "../character.css";
import rose from "../../../assets/images/rose.jpg"; // Placeholder item image

const FullItemView = () => {
  const [description, setDescription] = useState(
    "An ancient blade said to have been forged in dragon fire. Its edge never dulls, and it hums faintly with latent power."
  );

  const [activeTab, setActiveTab] = useState("Properties");

  const item = {
    name: "Dragonfang Blade",
    type: "Weapon — Sword",
    portrait: rose,
  };

  const hexStats = [
    { label: "Damage", value: "2d6 + 3" },
    { label: "Critical", value: "19-20/x2" },
    { label: "Weight", value: "3 lbs" },
  ];

  const tabs = {
    Properties: ["Magical", "Rare", "Requires Attunement"],
    Bonuses: ["+1 Attack Rolls", "+1 Damage Rolls"],
    Notes: ["Glows faintly near dragons", "Hilt engraved with runes"],
  };

  return (
    <div className="page right-page">
      {/* Header */}
      <div className="item-header">
        <div className="item-info">
          <div className="item-name">{item.name}</div>
          <div className="item-type">{item.type}</div>
        </div>
        <img
          src={item.portrait}
          alt="Item Portrait"
          className="item-portrait-img"
        />
      </div>

      {/* Two-column layout */}
      <div className="item-main-content">
        {/* Left column: Description */}
        <div className="item-description-box">
          <div className="item-description-title">Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="item-description-textarea"
          />
        </div>

        {/* Right column: Hex stats + Tabs */}
        <div className="item-right-column">
          {/* Hex stats */}
          <div className="item-hex-stats">
            {hexStats.map((hex, idx) => (
              <div key={idx} className="item-hex">
                <div className="item-hex-value">{hex.value}</div>
                <div className="item-hex-label">{hex.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="item-skills-box">
            <div className="item-skills-content">
              <h3>{activeTab}</h3>
              <ul>
                {tabs[activeTab].map((entry, idx) => (
                  <li key={idx}>{entry}</li>
                ))}
              </ul>
            </div>

            <div className="item-skills-tabs-container">
              <div className="item-skills-tab-buttons">
                {Object.keys(tabs).map((tab) => (
                  <button
                    key={tab}
                    className={`item-skills-tab-btn ${
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
