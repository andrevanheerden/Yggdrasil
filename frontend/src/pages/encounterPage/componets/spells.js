import React, { useState, useEffect } from "react";
import "../encounter.css";
import API from "../../../api";
import FullSpellView from "./fullSpellView";
import CreateSpellPopup from "./spellCreater/spellCreatePopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightPageSpells = ({ selectedEncounter }) => {
  const [activeTab, setActiveTab] = useState("spells");
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  // Fetch spells whenever encounter changes
  useEffect(() => {
    if (!selectedEncounter?.encounter_id) {
      setSpells([]);
      setSelectedSpell(null);
      return;
    }

    const fetchSpells = async () => {
      try {
        const res = await API.get(
          `/api/encounter-spells/encounter/${selectedEncounter.encounter_id}`
        );
        const fetchedSpells = Array.isArray(res.data) ? res.data : [];
        setSpells(fetchedSpells);
        setSelectedSpell(fetchedSpells[0] || null);
      } catch (err) {
        console.error("Error fetching spells:", err);
        toast.error("Failed to fetch spells.");
        setSpells([]);
        setSelectedSpell(null);
      }
    };

    fetchSpells();
  }, [selectedEncounter]);

  // Safely parse damage types for the selected spell
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

      {/* Spells Tab */}
      {activeTab === "spells" && (
        <>
          {!selectedEncounter ? (
            <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
              Select an encounter to view spells.
            </p>
          ) : (
            <>
              {/* Header and Description only if a spell exists */}
              {selectedSpell && (
                <>
                  <div className="inventory-header">
                    <div className="inventory-title">
                      <div className="item-name">{selectedSpell.spell_name || "Unknown Spell"}</div>
                      <div className="item-type">
                        {selectedSpell.spell_level === "Cantrip"
                          ? "Cantrip"
                          : `Lvl ${selectedSpell.spell_level || "?"}`}{" "}
                        - {selectedSpell.spell_type || "Unknown"}
                      </div>
                    </div>
                    <div className="item-image-container">
                      {selectedSpell.spell_image && (
                        <img
                          src={selectedSpell.spell_image}
                          alt={selectedSpell.spell_name}
                          className="item-image"
                        />
                      )}
                    </div>
                  </div>

                  <div className="inventory-middle">
                    <div className="inventory-description-box">
                      <div className="description-title">Description</div>
                      {selectedSpell.spell_description || "No description available."}
                    </div>
                    <div className="damage-container">
                      {damageTypes.slice(0, 3).map((dmg, i) => (
                        <div key={i} className="damage-hexagon">
                          {dmg}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Spells Grid (safe mapping) */}
              <div className="spells-container">
                <div className="spells-grid">
                  {(spells || [])
                    .filter(spell => spell && spell.encounter_spell_id)
                    .map((spell) => (
                      <div
                        key={spell.encounter_spell_id}
                        className={`spells-slot ${
                          selectedSpell?.encounter_spell_id === spell.encounter_spell_id
                            ? "active"
                            : ""
                        }`}
                        onClick={() => setSelectedSpell(spell)}
                      >
                        {spell.spell_image && (
                          <img
                            src={spell.spell_image}
                            alt={spell.spell_name}
                            className="spells-img"
                          />
                        )}
                        <div className="spells-info">
                          <div className="spells-name">{spell.spell_name || "Unnamed Spell"}</div>
                          <div className="spells-class">{spell.spell_type || "Unknown"}</div>
                        </div>
                        <div className="spells-level">
                          {spell.spell_level === "Cantrip" ? "Cantrip" : `Lvl ${spell.spell_level || "?"}`}
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
              {(!spells || spells.length === 0) && (
                <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.6 }}>
                  No spells created yet. Click "+ Create Spell" to add one.
                </p>
              )}
            </>
          )}
        </>
      )}

      {/* Full Spell View Tab */}
      {activeTab === "fullSpellView" && selectedSpell && <FullSpellView spell={selectedSpell} />}

      {/* Create Spell Popup */}
      {showCreatePopup && (
        <CreateSpellPopup
          onClose={() => setShowCreatePopup(false)}
          encounterId={selectedEncounter?.encounter_id}
          onSpellCreated={(newSpell) => {
            if (newSpell) {
              setSpells([...spells, newSpell]);
              setSelectedSpell(newSpell); // auto-select newly created spell
              toast.success("Spell created successfully!");
            }
            setShowCreatePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default RightPageSpells;
