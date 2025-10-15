import React, { useState, useEffect } from "react";
import "../character.css";
import fallbackImg from "../../../assets/images/noItem.jpg";

const FullSpellView = ({ item }) => {
  const [description, setDescription] = useState("");
  const [damageTypes, setDamageTypes] = useState([]);
  const [activeEffectTab, setActiveEffectTab] = useState("Page1");

  useEffect(() => {
    if (!item) return;

    // Set description
    setDescription(item.spell_description || "");

    // Parse damage types safely
    let dmg = [];
    if (Array.isArray(item.damage_types)) {
      dmg = item.damage_types;
    } else if (typeof item.damage_types === "string") {
      try {
        dmg = JSON.parse(item.damage_types);
        if (!Array.isArray(dmg)) dmg = [dmg];
      } catch {
        dmg = item.damage_types.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
    setDamageTypes(dmg);
  }, [item]);

  if (!item) {
    return (
      <div className="page right-page" style={{ textAlign: "center", paddingTop: "50px" }}>
        Select a spell to view details.
      </div>
    );
  }

  return (
    <div className="page right-page">
      {/* Header */}
      <div className="spell-header">
        <div className="spell-info">
          <div className="spell-name">{item.spell_name}</div>
          <div className="spell-details">
            <div className="spell-level">
              {item.spell_level === "Cantrip" ? "Cantrip" : `Lvl ${item.spell_level}`}
            </div>
            <div className="spell-class">{item.spell_type}</div>
          </div>
        </div>
        <img
          src={item.spell_image || fallbackImg}
          alt={item.spell_name}
          className="spell-image"
        />
      </div>

      {/* Main Content: Description + Damage Hexes */}
      <div className="spell-main-content" style={{ display: "flex", gap: "20px", padding: "0 20px" }}>
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
        <div className="spell-damage-container" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {damageTypes.map((dmg, idx) => (
            <div key={idx} className="damage-hexagon">
              {dmg}
            </div>
          ))}
        </div>
      </div>

      {/* Effects Box with 2 pages */}
      <div className="spell-effects-box" style={{ width: "90%", marginTop: "20px", overflow: "visible" }}>
        {/* Horizontal Tabs */}
        <div className="spell-effects-tabs" style={{ display: "flex",
      top: "83%",
      left: "90.5%",
      flexDirection: "row",
      gap: "10px",
      marginBottom: "10px",
      color: "#fff", }}>
          <button
            className={`spell-effects-tab-btn ${activeEffectTab === "Page1" ? "active" : ""}`}
            onClick={() => setActiveEffectTab("Page1")}
          >
            About
          </button>
          <button
            className={`spell-effects-tab-btn ${activeEffectTab === "Page2" ? "active" : ""}`}
            onClick={() => setActiveEffectTab("Page2")}
          >
            Effect
          </button>
        </div>

        {/* Page Content */}
        <div className="spell-effects-content">
          {activeEffectTab === "Page1" && (
            <>
              <div><strong>Range:</strong> {item.spell_range || "-"}</div>
              <div><strong>Area:</strong> {item.spell_area || "-"}</div>
              <div><strong>Cost:</strong> {item.spell_cost || "-"}</div>
            </>
          )}
          {activeEffectTab === "Page2" && (
            <div><strong>Effect:</strong> {item.spell_effects || "No effect details."}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullSpellView;

