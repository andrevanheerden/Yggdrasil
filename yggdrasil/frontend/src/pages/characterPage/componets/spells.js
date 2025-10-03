import React, { useState, useEffect } from "react";
import "../character.css";
import fireballImg from "../../../assets/images/fireball.jpg";
import frostboltImg from "../../../assets/images/frostbolt.jpg";
import mageHandImg from "../../../assets/images/magehand.jpg";
import eldritchBlastImg from "../../../assets/images/eldritchblast.jpg";
import minorIllusionImg from "../../../assets/images/minorillusion.jpg";
import FullSpellView from "./fullSpellView"; 
import CreateSpellPopup from "./spellCreater/spellCreatePopup"; // import popup

const RightPageSpells = () => {
  const [activeTab, setActiveTab] = useState("spells");
  const [spells] = useState([
    {
      id: 1,
      name: "Fireball",
      spellClass: "Evocation",
      level: 3,
      image: fireballImg,
      description: `You conjure a blazing orb of magical fire...`,
      damage: ["8d6 Fire"],
      effects: { type: "Fire", range: "150 feet", area: "20-foot radius sphere" },
    },
    {
      id: 2,
      name: "Frostbolt",
      spellClass: "Evocation",
      level: 1,
      image: frostboltImg,
      description: "A shard of ice streaks toward your enemy, chilling them to the bone.",
      damage: ["1d8 Cold"],
      effects: { type: "Cold", range: "60 feet", area: "Single target" },
    },
    {
      id: 3,
      name: "Mage Hand",
      spellClass: "Conjuration",
      level: "Cantrip",
      image: mageHandImg,
      description: "A spectral floating hand appears at a point you choose.",
      damage: ["Utility"],
      effects: { type: "Utility", range: "30 feet", area: "Single object" },
    },
    {
      id: 4,
      name: "Eldritch Blast",
      spellClass: "Evocation",
      level: "Cantrip",
      image: eldritchBlastImg,
      description: "A beam of crackling energy streaks toward a creature within range.",
      damage: ["1d10 Force"],
      effects: { type: "Force", range: "120 feet", area: "Single target" },
    },
    {
      id: 5,
      name: "Minor Illusion",
      spellClass: "Illusion",
      level: "Cantrip",
      image: minorIllusionImg,
      description: "You create a sound or an image of an object within range.",
      damage: ["Utility"],
      effects: { type: "Illusion", range: "30 feet", area: "5-foot cube" },
    },
  ]);

  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showCreateSpell, setShowCreateSpell] = useState(false);

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
                {selectedSpell.spellClass} -{" "}
                {selectedSpell.level === "Cantrip" ? selectedSpell.level : `Lvl ${selectedSpell.level}`}
              </div>
            </div>
            <div className="item-image-container">
              <img
                src={selectedSpell.image}
                alt={selectedSpell.name}
                className="item-image"
              />
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
                  <img src={spell.image} alt={spell.name} className="spells-img" />
                  <div className="spells-info">
                    <div className="spells-name">{spell.name}</div>
                    <div className="spells-class">{spell.spellClass}</div>
                  </div>
                  <div className="spells-level">
                    {spell.level === "Cantrip" ? spell.level : `Lvl ${spell.level}`}
                  </div>
                </div>
              ))}

              {/* Create Spell Slot */}
              <div
                className="spells-slot create-new"
                onClick={() => setShowCreateSpell(true)}
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

      {activeTab === "fullSpellView" && selectedSpell && (
        <FullSpellView spell={selectedSpell} />
      )}

      {/* Create Spell Popup */}
      {showCreateSpell && (
        <CreateSpellPopup onClose={() => setShowCreateSpell(false)} />
      )}
    </div>
  );
};

export default RightPageSpells;

