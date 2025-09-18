import React, { useState } from "react";
import "../../character.css";

const ClassCreation = ({
  initialSkills = {},
  selectedSkills = [],
  toggleSkill,
  className,
  setClassName,
}) => {
  const [languagesArray, setLanguagesArray] = useState([""]);
  const [toolsArray, setToolsArray] = useState([""]);
  const [profTab, setProfTab] = useState("Languages");

  // Energy system states
  const [energyName, setEnergyName] = useState("");
  const [hasLevels, setHasLevels] = useState(false);
  const [amountOfLevels, setAmountOfLevels] = useState(6);

  // Always keep 12 levels
  const defaultLevels = Array.from({ length: 12 }, (_, i) => ({
    level: i + 1,
    amountReceive: 1,
    energyLevel: "Ⅰ",
  }));
  const [levels, setLevels] = useState(defaultLevels);

  const [energyTab, setEnergyTab] = useState("Settings"); // Energy tabs

  const defaultSkills = {
    Strength: ["Athletics"],
    Dexterity: ["Acrobatics", "Sleight of Hand", "Stealth"],
    Constitution: ["Endurance"],
    Intelligence: ["Arcana", "History", "Investigation"],
    Wisdom: ["Insight", "Perception", "Survival"],
    Charisma: ["Deception", "Performance", "Persuasion"],
  };
  const skills = Object.keys(initialSkills).length > 0 ? initialSkills : defaultSkills;
  const abilities = Object.keys(skills);
  const abilityLabels = { Str: "STR", Dex: "DEX", Con: "CON", Int: "INT", Wis: "WIS", Cha: "CHA" };
  const [activeTab, setActiveTab] = useState(abilities[0]);
  const [abilityScores] = useState(abilities.reduce((acc, ab) => ({ ...acc, [ab]: 10 }), {}));

  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Handle level changes
  const handleLevelChange = (index, field, value) => {
    const newLevels = [...levels];
    if (field === "amountReceive") {
      const newValue = Math.min(parseInt(value) || 0, amountOfLevels); // cap by amountOfLevels
      newLevels[index][field] = newValue;
    } else if (field === "energyLevel") {
      newLevels[index][field] = value;
    }
    setLevels(newLevels);
  };

  // Update the maximum level amount
  const handleAmountOfLevelsChange = (value) => {
    const newAmount = Math.max(1, parseInt(value) || 1);
    setAmountOfLevels(newAmount);
  };

  // Handle checkbox toggle: remove or restore energyLevel
  const handleHasLevelsChange = (checked) => {
    setHasLevels(checked);
    if (!checked) {
      // Remove energyLevel from all levels
      const newLevels = levels.map((lvl) => ({ ...lvl, energyLevel: "" }));
      setLevels(newLevels);
    } else {
      // Restore default energyLevel if empty
      const newLevels = levels.map((lvl) => ({
        ...lvl,
        energyLevel: lvl.energyLevel || "Ⅰ",
      }));
      setLevels(newLevels);
    }
  };

  return (
    <div className="character-main">
      {/* Class Name Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Class Name"
          style={{
            width: "300px",
            padding: "8px",
            fontSize: "18px",
            fontFamily: "'Caudex', serif",
            borderRadius: "5px",
            border: "2px solid #333",
            marginBottom: "10px",
          }}
        />
      </div>

      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        {/* Left: Description */}
        <div
          className="character-description-container"
          style={{
            width: "800px",
            height: "721px",
            background: "#D9D9D9",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Caudex', serif",
            fontSize: "16px",
            color: "#333",
          }}
        >
          <textarea
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              resize: "none",
              fontFamily: "'Caudex', serif",
              fontSize: "16px",
              color: "#333",
              textAlign: "left",
            }}
            placeholder="Write a description of the class, its abilities, and traits here..."
          />
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Energy System Box with Tabs */}
          <div className="energy-box white-box3" style={{ width: "200px", height: "380px" }}>
            <h3>Energy System</h3>

            {/* Energy Tabs Container */}
            <div className="skills-tabs-container3">
              <div className="skills-tab-buttons3">
                <button
                  className={`skills-tab-btn3 ${energyTab === "Settings" ? "active" : ""}`}
                  onClick={() => setEnergyTab("Settings")}
                >
                  Settings
                </button>
                <button
                  className={`skills-tab-btn ${energyTab === "Levels" ? "active" : ""}`}
                  onClick={() => setEnergyTab("Levels")}
                >
                  Levels
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="skills-tab-content">
              {energyTab === "Settings" && (
                <div>
                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                        Energy Name
                      </label>
                      <input
                        type="text"
                        value={energyName}
                        onChange={(e) => setEnergyName(e.target.value)}
                        placeholder="Enter energy name"
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          fontFamily: "'Caudex', serif",
                          fontSize: "14px",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                        <input
                          type="checkbox"
                          checked={hasLevels}
                          onChange={(e) => handleHasLevelsChange(e.target.checked)}
                          style={{ marginRight: "5px" }}
                        />
                        Remove Energy Levels
                      </label>
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                        Maximum amount per level
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={amountOfLevels}
                        onChange={(e) => handleAmountOfLevelsChange(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          fontFamily: "'Caudex', serif",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {energyTab === "Levels" && (
                <div>
                  <h4 style={{ margin: "10px 0", fontSize: "16px" }}>LEVEL</h4>
                  <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                    {levels.map((levelData, index) => (
                      <div key={levelData.level} style={{ marginBottom: "8px", fontSize: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                          <span>lv{levelData.level}</span>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "5px" }}>Amount receive:</span>
                            <input
                              type="number"
                              min="0"
                              max={amountOfLevels}
                              value={levelData.amountReceive}
                              onChange={(e) => handleLevelChange(index, "amountReceive", e.target.value)}
                              style={{
                                width: "40px",
                                padding: "2px",
                                borderRadius: "3px",
                                border: "1px solid #ccc",
                                fontFamily: "'Caudex', serif",
                                fontSize: "12px",
                              }}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "5px" }}>Energy level:</span>
                          <select
                            value={levelData.energyLevel}
                            onChange={(e) => handleLevelChange(index, "energyLevel", e.target.value)}
                            style={{
                              padding: "2px",
                              borderRadius: "3px",
                              border: "1px solid #ccc",
                              fontFamily: "'Caudex', serif",
                              fontSize: "12px",
                            }}
                          >
                            <option value="Ⅰ">Ⅰ</option>
                            <option value="Ⅱ">Ⅱ</option>
                            <option value="Ⅲ">Ⅲ</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Languages & Tools Box */}
          <div className="skills-box white-box2" style={{ width: "200px", height: "500px" }}>
            <h3>Proficiencies</h3>

            <div className="skills-tabs-container2">
              <div className="skills-tab-buttons2">
                <button
                  className={`skills-tab-btn2 ${profTab === "Languages" ? "active" : ""}`}
                  onClick={() => setProfTab("Languages")}
                >
                  Languages
                </button>
                <button
                  className={`skills-tab-btn2 ${profTab === "Tools" ? "active" : ""}`}
                  onClick={() => setProfTab("Tools")}
                >
                  Tools
                </button>
              </div>
            </div>

            <div className="skills-tab-content2">
              {profTab === "Languages" && (
                <div>
                  {languagesArray.map((lang, index) => (
                    <input
                      key={index}
                      type="text"
                      value={lang}
                      onChange={(e) => {
                        const newArr = [...languagesArray];
                        newArr[index] = e.target.value.slice(0, 20);
                        setLanguagesArray(newArr);
                      }}
                      placeholder="Type language..."
                      maxLength={20}
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontFamily: "'Caudex', serif",
                        fontSize: "16px",
                        marginBottom: "5px",
                      }}
                    />
                  ))}
                  <button
                    onClick={() => setLanguagesArray([...languagesArray, ""])}
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#199a6a",
                      color: "#fff",
                      fontFamily: "'Caudex', serif",
                      cursor: "pointer",
                    }}
                  >
                    Add Language
                  </button>
                </div>
              )}

              {profTab === "Tools" && (
                <div>
                  {toolsArray.map((tool, index) => (
                    <input
                      key={index}
                      type="text"
                      value={tool}
                      onChange={(e) => {
                        const newArr = [...toolsArray];
                        newArr[index] = e.target.value.slice(0, 20);
                        setToolsArray(newArr);
                      }}
                      placeholder="Type tool..."
                      maxLength={20}
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontFamily: "'Caudex', serif",
                        fontSize: "16px",
                        marginBottom: "5px",
                      }}
                    />
                  ))}
                  <button
                    onClick={() => setToolsArray([...toolsArray, ""])}
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#199a6a",
                      color: "#fff",
                      fontFamily: "'Caudex', serif",
                      cursor: "pointer",
                    }}
                  >
                    Add Tool
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCreation;
