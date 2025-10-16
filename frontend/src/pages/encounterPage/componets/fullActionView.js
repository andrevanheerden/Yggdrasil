import React, { useState, useEffect } from "react";
import noSpellImg from "../../../assets/images/noItem.jpg";
import "../encounter.css";

const FullActionView = ({ action }) => {
  const [description, setDescription] = useState("");
  const [activeEffectTab, setActiveEffectTab] = useState("Page1");

  useEffect(() => {
    if (!action) return;
    setDescription(action.action_description || "");
  }, [action]);

  if (!action) {
    return (
      <div className="page right-page" style={{ textAlign: "center", paddingTop: "50px" }}>
        Select an action to view details.
      </div>
    );
  }

  return (
    <div className="page right-page">
      {/* Header */}
      <div className="spell-header">
        <div className="spell-info">
          <div className="spell-name">{action.action_name}</div>
          <div className="spell-details">
            <div className="spell-class">{action.action_type}</div>
          </div>
        </div>
        {action.action_image && (
          <img src={action.action_image} alt={action.action_name} className="spell-image" />
        )}
      </div>

      {/* Main Content */}
      <div className="spell-main-content" style={{ display: "flex", gap: "20px", padding: "0 20px" }}>
        <div className="spell-description-container" style={{ flex: 1 }}>
          <div className="spell-description-title">Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="spell-description-textarea"
          />
        </div>
      </div>

      {/* Effects Box with Tabs */}
      <div className="spell-effects-box" style={{ width: "90%", marginTop: "20px", overflow: "visible" }}>
        {/* Horizontal Tabs */}
        <div
          className="spell-effects-tabs2"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <button
            className={`spell-effects-tab2-btn ${activeEffectTab === "Page1" ? "active" : ""}`}
            onClick={() => setActiveEffectTab("Page1")}
          >
            About
          </button>
          <button
            className={`spell-effects-tab2-btn ${activeEffectTab === "Page2" ? "active" : ""}`}
            onClick={() => setActiveEffectTab("Page2")}
          >
            Effect
          </button>
        </div>

        {/* Page Content */}
        <div className="spell-effects-content">
          {activeEffectTab === "Page1" && (
            <>
              <div><strong>Range:</strong> {action.action_range || "-"}</div>
              <div><strong>Area:</strong> {action.action_area || "-"}</div>
              <div><strong>Cost:</strong> {action.action_cost || "-"}</div>
            </>
          )}
          {activeEffectTab === "Page2" && (
            <div>
              <strong>Effects:</strong>{" "}
              {Array.isArray(action.action_effects)
                ? action.action_effects.join(", ")
                : action.action_effects || "-"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullActionView;

