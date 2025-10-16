import React, { useState, useEffect } from "react";
import "../encounter.css";
import fallbackImg from "../../../assets/images/noItem.jpg";

const FullItemView = ({ item }) => {
  const [description, setDescription] = useState("");

  const [activeTab, setActiveTab] = useState("Abilities");
  const [tabs, setTabs] = useState({ Abilities: [] });

const [parsedDamageTypes, setParsedDamageTypes] = useState([]);

useEffect(() => {
  if (item) {
    setDescription(item.item_description || "");

    // Safely parse damage_types
    let damage = [];
    if (item.damage_types) {
      if (Array.isArray(item.damage_types)) {
        damage = item.damage_types;
      } else if (typeof item.damage_types === "string") {
        try {
          damage = JSON.parse(item.damage_types);
          if (!Array.isArray(damage)) damage = [damage];
        } catch {
          damage = item.damage_types.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
    }

    setParsedDamageTypes(damage);

    setTabs({
      Abilities: damage, // or separate abilities if you have them
    });
  } else {
    setDescription("");
    setParsedDamageTypes([]);
    setTabs({ Abilities: [] });
  }
}, [item]);

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{item.item_name}</div>
          <div className="background-character-details">
            <div className="background-character-background">{item.item_type}</div>
          </div>
        </div>
        <img
          src={item.item_image || fallbackImg}
          alt={item.item_name}
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

        {/* Right column: Hexes / Abilities */}
        <div className="background-right-column">
          <div className="background-hex-bonuses">
  {parsedDamageTypes.map((hex, idx) => (
    <div key={idx} className="damage-hexagon">
      <div className="background-hex-bonus">{hex}</div>
      
    </div>
  ))}
</div>

          {/* Abilities (if any) */}
          <div className="background-skills-box">
            <div className="background-skills-content">
              <h3>{activeTab}</h3>
              <ul>
                {tabs[activeTab]?.map((ability, idx) => (
                  <li key={idx}>{ability}</li>
                ))}
              </ul>
            </div>

            <div className="background-skills-tabs-container">
              <div className="background-skills-tab-buttons">
                {Object.keys(tabs).map((tab) => (
                  <button
                    key={tab}
                    className={`background-skills-tab-btn ${activeTab === tab ? "active" : ""}`}
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
