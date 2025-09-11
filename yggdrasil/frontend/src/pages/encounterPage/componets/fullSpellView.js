import React, { useState } from "react";
import "../encounter.css";

const FullSpellView = ({ spell }) => {
  const [description, setDescription] = useState(spell.description);
  const [activeTab, setActiveTab] = useState("Effects");

  // Use spell.effects for detailed effect info
const tabs = {
  Effects: Array.isArray(spell.effects) ? spell.effects : [spell.effects || "No additional effects."]
};


  return (
    <div className="page right-page">
      {/* Header */}
      <div className="spell-header">
        <div className="spell-info">
          <div className="spell-name">{spell.name}</div>
          <div className="spell-details">
            <div className="spell-level">
              {spell.level === "Cantrip" ? spell.level : `Lvl ${spell.level}`}
            </div>
            <div className="spell-class">{spell.spellClass}</div>
          </div>
        </div>
        <img src={spell.image} alt={spell.name} className="spell-image" />
      </div>

      {/* Main Content: Description + Damage Hexes */}
      <div
        className="spell-main-content"
        style={{
          flexDirection: "row",
          gap: "20px",
          padding: "0 20px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {/* Description */}
        <div className="spell-description-container" style={{ flex: 1 }}>
          <div className="spell-description-title">Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="spell-description-textarea"
          />
        </div>

        {/* Damage Hexes */}
        <div
          className="spell-damage-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {spell.damage?.map((dmg, idx) => (
            <div key={idx} className="damage-hexagon">
              {dmg}
            </div>
          ))}
        </div>
      </div>

      {/* Effects / Abilities Box */}
      <div
        className="spell-effects-box"
        style={{
          width: "87%", // align with description width
          margin: "20px 0 0 20px",
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
        }}
      >
        <div className="spell-effects-tabs" style={{ marginBottom: "10px" }}>
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              className={`spell-effects-tab-btn ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
<div className="spell-effects-content">
  <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
    {tabs[activeTab].map((effect, idx) => (
      <li key={idx} style={{ marginBottom: "12px" }}>
        {typeof effect === "object" ? (
          <>
            <div><strong>Type:</strong> {effect.type}</div>
            <div><strong>Range:</strong> {effect.range}</div>
            <div><strong>Area:</strong> {effect.area}</div>
          </>
        ) : (
          effect
        )}
      </li>
    ))}
  </ul>
</div>



      </div>
    </div>
  );
};

export default FullSpellView;
