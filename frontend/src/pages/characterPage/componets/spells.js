
import React, { useState, useEffect } from "react";
import "../character.css";
import API from "../../../api";
import FullSpellView from "./fullSpellView";
import CreateSpellPopup from "./spellCreater/spellCreatePopup";
import fallbackImg from "../../../assets/images/noItem.jpg";

const RightPageSpells = ({ selectedCharacter }) => {
  const [activeTab, setActiveTab] = useState("spells");
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  // Fetch spells whenever selectedCharacter changes
  useEffect(() => {
    if (!selectedCharacter?.id) {
      setSpells([]);
      setSelectedSpell(null);
      return;
    }

    const fetchSpells = async () => {
      try {
        const res = await API.get(
          `/api/character-spells/character/${selectedCharacter.id}`
        );
        const fetchedSpells = res.data || [];
        setSpells(fetchedSpells);
        setSelectedSpell(fetchedSpells[0] || null);
      } catch (err) {
        console.error("Error fetching spells:", err);
        setSpells([]);
        setSelectedSpell(null);
      }
    };

    fetchSpells();
  }, [selectedCharacter]);

  // Parse damage types safely
  let damageTypes = [];
  if (selectedSpell) {
    if (Array.isArray(selectedSpell.damage_types)) {
      damageTypes = selectedSpell.damage_types;
    } else if (typeof selectedSpell.damage_types === "string") {
      try {
        damageTypes = JSON.parse(selectedSpell.damage_types);
        if (!Array.isArray(damageTypes)) damageTypes = [damageTypes];
      } catch {
        damageTypes = selectedSpell.damage_types
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  }

  return (
    <div className="page right-page" style={{ position: "relative" }}>
      {/* Tabs */}
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

      {/* Spells Grid Tab */}
      {activeTab === "spells" && (
        <>
          {!selectedCharacter ? (
            <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
              Select a character to view spells.
            </p>
          ) : (
            <>
              {/* Selected Spell Header (always visible container) */}
              <div className="inventory-header">
                <div className="inventory-title">
                  <div className="item-name">{selectedSpell?.spell_name || "-"}</div>
                  <div className="item-type">
                    {selectedSpell
                      ? selectedSpell.spell_level === "Cantrip"
                        ? "Cantrip"
                        : `Lvl ${selectedSpell.spell_level}`
                      : "-"}{" "}
                    - {selectedSpell?.spell_type || "-"}
                  </div>
                </div>
                <div className="item-image-container">
                  <img
                    src={selectedSpell?.spell_image || fallbackImg}
                    alt={selectedSpell?.spell_name || "No Spell Selected"}
                    className="item-image"
                  />
                </div>
              </div>

              {/* Description (always visible container) */}
              <div className="inventory-middle">
                <div className="inventory-description-box">
                  <div className="description-title">Description</div>
                  <div>
                    {selectedSpell?.spell_description || "No description available."}
                  </div>
                </div>

                {/* Damage types */}
                <div className="damage-container">
                  {damageTypes.slice(0, 3).map((dmg, i) => (
                    <div key={i} className="damage-hexagon">
                      {dmg}
                    </div>
                  ))}
                </div>
              </div>

              {/* Spells Grid */}
              <div className="spells-container scroll-box">
                <div className="spells-grid">
                  {spells.map((spell) => (
                    <div
                      key={spell.character_spell_id}
                      className={`spells-slot ${
                        selectedSpell?.character_spell_id === spell.character_spell_id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => setSelectedSpell(spell)}
                    >
                      <img
                        src={spell.spell_image || fallbackImg}
                        alt={spell.spell_name}
                        className="spells-img"
                      />
                      <div className="spells-info">
                        <div className="spells-name">{spell.spell_name}</div>
                        <div className="spells-class">{spell.spell_type}</div>
                      </div>
                      <div className="spells-level">
                        {spell.spell_level === "Cantrip" ? "Cantrip" : `Lvl ${spell.spell_level}`}
                      </div>
                    </div>
                  ))}

                  {/* Always show Create Spell Box */}
                  <div
                    className="spells-slot create-spell-box"
                    onClick={() => setShowCreatePopup(true)}
                  >
                    + Create Spell
                  </div>
                </div>
              </div>

              {/* Message if no spells exist */}
              {spells.length === 0 && (
                <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.6 }}>
                  No spells created yet. Click "+ Create Spell" to add one.
                </p>
              )}
            </>
          )}
        </>
      )}

      {/* Full Spell View */}
      {activeTab === "fullSpellView" && selectedSpell && (
        <FullSpellView item={selectedSpell} />
      )}

      {/* Create Spell Popup */}
      {showCreatePopup && (
        <CreateSpellPopup
          onClose={() => setShowCreatePopup(false)}
          characterId={selectedCharacter?.id}
          onSpellCreated={(newSpell) => {
            setSpells([...spells, newSpell]);
            setSelectedSpell(newSpell);
            setShowCreatePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default RightPageSpells;
