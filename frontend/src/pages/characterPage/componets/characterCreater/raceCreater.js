import React, { useState } from "react";
import "../../character.css";

const RaceCreation = ({
  raceData,
  setRaceData,
  initialSkills = {},
  selectedSkills = [],
  toggleSkill,
}) => {
  const skills = Object.keys(initialSkills).length > 0 ? initialSkills : {
    Str: ["Athletics"],
    Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
    Con: ["Endurance"],
    Int: ["Arcana", "History", "Investigation"],
    Wis: ["Insight", "Perception", "Survival"],
    Cha: ["Deception", "Performance", "Persuasion"],
  };
  const abilities = Object.keys(skills);
  const [activeTab, setActiveTab] = useState(abilities[0]);
  const [profTab, setProfTab] = useState("Languages");

  // All fields use parent state/setter!
  return (
    <div className="character-main">
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={raceData.name}
          onChange={e => setRaceData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Race Name"
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
        <div className="character-description-container" style={{
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
        }}>
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
            value={raceData.description}
            onChange={e => setRaceData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Write a description of the race, traits, and characteristics here..."
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Skills Box */}
          <div className="skills-box white-box3" style={{ width: "200px", height: "380px" }}>
            <h3>Race Skills</h3>
            <div className="skills-tab-content">
              <div style={{ marginBottom: "5px" }}>
                Selected Skills: {selectedSkills.length}/2 {selectedSkills.length > 0 && `: ${selectedSkills.join(", ")}`}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {skills[activeTab]?.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <li key={skill} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}>
                      <span>{skill}</span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSkill && toggleSkill(skill)}
                        disabled={!isSelected && selectedSkills.length >= 2}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="skills-tabs-container">
              <div className="skills-tab-buttons">
                {abilities.map((ability) => (
                  <button
                    key={ability}
                    className={`skills-tab-btn ${activeTab === ability ? "active" : ""}`}
                    onClick={() => setActiveTab(ability)}
                  >
                    {ability}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Languages & Tools */}
          <div className="skills-box white-box2" style={{ width: "200px", height: "500px" }}>
            <h3>Race Proficiencies</h3>
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
              {profTab === "Languages" &&
                (raceData.languageProficiencies || []).map((lang, index) => (
                  <input
                    key={index}
                    type="text"
                    value={lang}
                    onChange={e => {
                      const newArr = [...raceData.languageProficiencies];
                      newArr[index] = e.target.value.slice(0, 20);
                      setRaceData(prev => ({ ...prev, languageProficiencies: newArr }));
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
              {profTab === "Languages" && (
                <button
                  onClick={() => setRaceData(prev => ({
                    ...prev,
                    languageProficiencies: [...(prev.languageProficiencies || []), ""]
                  }))}
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
              )}
              {profTab === "Tools" &&
                (raceData.toolProficiencies || []).map((tool, index) => (
                  <input
                    key={index}
                    type="text"
                    value={tool}
                    onChange={e => {
                      const newArr = [...raceData.toolProficiencies];
                      newArr[index] = e.target.value.slice(0, 20);
                      setRaceData(prev => ({ ...prev, toolProficiencies: newArr }));
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
              {profTab === "Tools" && (
                <button
                  onClick={() => setRaceData(prev => ({
                    ...prev,
                    toolProficiencies: [...(prev.toolProficiencies || []), ""]
                  }))}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceCreation;
