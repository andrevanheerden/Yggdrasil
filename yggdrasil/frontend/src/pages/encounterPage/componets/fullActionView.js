import React, { useState } from "react";
import "../encounter.css";

const FullActionView = ({ action }) => {
  const [description, setDescription] = useState(action.description);
  const [activeTab, setActiveTab] = useState("Effects");

  // Ensure effects is always an array
  const tabs = {
    Effects: Array.isArray(action.effects)
      ? action.effects
      : [action.effects || "No additional effects."]
  };

  return (
    <div className="page right-page">
      {/* Header */}
      <div className="spell-header">
        <div className="spell-info">
          <div className="spell-name">{action.name}</div>
          <div className="spell-details">
            <div className="spell-class">{action.actionType}</div>
          </div>
        </div>
        <img src={action.image} alt={action.name} className="spell-image" />
      </div>

      {/* Description Section */}
      <div className="spell-main-content" style={{ flexDirection: "row", gap: "20px", padding: "0 20px" }}>
        <div className="spell-description-container" style={{ flex: 1 }}>
          <div className="spell-description-title">Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="spell-description-textarea"
          />
        </div>
      </div>

      {/* Effects Section */}
      <div
        className="spell-effects-box"
        style={{
          width: "87%",
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
              className={`spell-effects-tab-btn ${activeTab === tab ? "active" : ""}`}
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

export default FullActionView;
