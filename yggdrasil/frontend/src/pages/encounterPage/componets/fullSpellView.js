import React, { useState, useEffect } from "react";
import "../encounter.css";

const FullSpellView = ({ spell }) => {
  const [description, setDescription] = useState("");
  const [damageTypes, setDamageTypes] = useState([]);
  const [activeEffectTab, setActiveEffectTab] = useState("Page1");

  useEffect(() => {
    if (!spell) return;

    setDescription(spell.spell_description || "");

    // Parse damage types
    let dmg = [];
    if (Array.isArray(spell.damage_types)) {
      dmg = spell.damage_types;
    } else if (typeof spell.damage_types === "string") {
      try {
        dmg = JSON.parse(spell.damage_types);
        if (!Array.isArray(dmg)) dmg = [dmg];
      } catch {
        dmg = spell.damage_types.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
    setDamageTypes(dmg);
  }, [spell]);

  if (!spell) {
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
          <div className="spell-name">{spell.spell_name}</div>
          <div className="spell-details">
            <div className="spell-level">
              {spell.spell_level === "Cantrip" ? "Cantrip" : `Lvl ${spell.spell_level}`}
            </div>
            <div className="spell-class">{spell.spell_type}</div>
          </div>
        </div>
        {spell.spell_image && <img src={spell.spell_image} alt={spell.spell_name} className="spell-image" />}
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
  <div
    className="spell-effects-tabs"
    style={{
      display: "flex",
      top: "83%",
      left: "90.5%",
      flexDirection: "row",
      gap: "10px",
      marginBottom: "10px",
      color: "#fff",
    }}
  >
    <button
      className={`spell-effects-tab-btn ${activeEffectTab === "Page1" ? "active" : ""}`}
      onClick={() => setActiveEffectTab("Page1")}
    >
      about
    </button>
    <button
      className={`spell-effects-tab-btn ${activeEffectTab === "Page2" ? "active" : ""}`}
      onClick={() => setActiveEffectTab("Page2")}
    >
      Effect
    </button>
  </div>

  {/* Page Content */}
  <div className="spell-effects-content" >
    {activeEffectTab === "Page1" && (
      <>
        <div><strong>Range:</strong> {spell.spell_range || "-"}</div>
        <div><strong>Area:</strong> {spell.spell_area || "-"}</div>
        <div><strong>Cost:</strong> {spell.spell_cost || "-"}</div>
      </>
    )}
    {activeEffectTab === "Page2" && (
      <div><strong>Effect:</strong> {spell.spell_effect || "-"}</div>
    )}
  </div>
</div>

    </div>
  );
};

export default FullSpellView;



