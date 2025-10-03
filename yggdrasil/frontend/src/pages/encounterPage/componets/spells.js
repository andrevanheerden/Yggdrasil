import React, { useState, useEffect } from "react";
import "../encounter.css";
import catImg from "../../../assets/images/cat.jpg";
import catTraitsImg from "../../../assets/images/catTraits.jpg";
import FullSpellView from "./fullSpellView";
import CreateSpellPopup from "./spellCreater/spellCreatePopup"; // Import your popup

const RightPageSpells = () => {
  const [activeTab, setActiveTab] = useState("spells");
  const [spells, setSpells] = useState([
    {
      id: 1,
      name: "Summon Cat",
      spellClass: "Conjuration",
      level: 1,
      image: catImg,
      description: "You summon a small cat companion that can aid you in subtle ways.",
      damage: ["None"],
      effects: { type: "Conjuration", range: "30 feet", area: "Single cat" },
    },
    {
      id: 2,
      name: "Get Cat Traits",
      spellClass: "Divination",
      level: 2,
      image: catTraitsImg,
      description: "Temporarily grants you the keen senses and reflexes of a cat.",
      damage: ["None"],
      effects: { type: "Buff", range: "Self", area: "Personal" },
    },
  ]);

  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false); // new state for popup

  useEffect(() => {
    if (!selectedSpell && spells.length > 0) setSelectedSpell(spells[0]);
  }, [spells, selectedSpell]);

  return (
    <div className="page right-page" style={{ position: "relative" }}>
      {/* Nav Tabs */}
      <div className="right-page-tabs">
        <button
          className={`right-tab-btn ${activeTab === "spells" ? "active" : ""}`}
          onClick={() => setActiveTab("spells")}
        >
          Spells
        </button>
        <button
          className={`right-tab-btn ${activeTab === "fullSpellView" ? "active" : ""}`}
          onClick={() => setActiveTab("fullSpellView")}
        >
          Full Spell View
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "spells" && selectedSpell && (
        <>
          {/* Header */}
          <div className="inventory-header">
            <div className="inventory-title">
              <div className="item-name">{selectedSpell.name}</div>
              <div className="item-type">
                {selectedSpell.level === "Cantrip"
                  ? selectedSpell.level
                  : `Lvl ${selectedSpell.level}`}{" "}
                - {selectedSpell.spellClass}
              </div>
            </div>
            <div className="item-image-container">
              <img src={selectedSpell.image} alt={selectedSpell.name} className="item-image" />
            </div>
          </div>

          {/* Middle Section */}
          <div className="inventory-middle">
            <div className="inventory-description-box">
              <div
                className="description-title"
                style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "18px" }}
              >
                Description
              </div>
              {selectedSpell.description}
            </div>

            <div className="damage-container">
              {selectedSpell.damage.slice(0, 3).map((dmg, i) => (
                <div key={i} className="damage-hexagon">
                  {dmg}
                </div>
              ))}
            </div>
          </div>

          {/* Spells Grid */}
          <div className="spells-container">
            <div className="spells-grid">
              {spells.map((spell) => (
                <div
                  key={spell.id}
                  className={`spells-slot ${selectedSpell?.id === spell.id ? "active" : ""}`}
                  onClick={() => setSelectedSpell(spell)}
                >
                  {spell.image && <img src={spell.image} alt={spell.name} className="spells-img" />}
                  <div className="spells-info">
                    <div className="spells-name">{spell.name}</div>
                    <div className="spells-class">{spell.spellClass}</div>
                  </div>
                  <div className="spells-level">
                    {spell.level === "Cantrip" ? spell.level : `Lvl ${spell.level}`}
                  </div>
                </div>
              ))}

              {/* Create Spell Box */}
              <div
                className="spells-slot create-spell-box"
                onClick={() => setShowCreatePopup(true)}
                style={{
                  display: "flex",
                  height: "60px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #666",
                  cursor: "pointer",
                  padding: "10px",
                  fontFamily: "'Caudex', serif",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                + Create Spell
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "fullSpellView" && selectedSpell && <FullSpellView spell={selectedSpell} />}

      {/* Create Spell Popup */}
      {showCreatePopup && <CreateSpellPopup onClose={() => setShowCreatePopup(false)} />}
    </div>
  );
};

export default RightPageSpells;

