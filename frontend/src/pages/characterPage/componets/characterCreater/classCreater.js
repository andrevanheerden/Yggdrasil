import React, { useState } from "react";
import "../../character.css";

const ClassCreation = ({
  classData,
  setClassData,
  initialSkills = {},
  selectedSkills = [],
  toggleSkill,
}) => {
  const [profTab, setProfTab] = useState("Languages");
  const [energyTab, setEnergyTab] = useState("Settings");
  const maxEnergyLevels = 6;

  // Use parent state for all fields!
  const handleClassNameChange = (e) => setClassData((prev) => ({ ...prev, name: e.target.value }));
  const handleDescriptionChange = (e) => setClassData((prev) => ({ ...prev, description: e.target.value }));
  const handleEnergyNameChange = (e) => setClassData((prev) => ({ ...prev, energyName: e.target.value }));
  const handleMaxEnergyLevelChange = (e) => {
    let val = Math.max(1, Math.min(maxEnergyLevels, parseInt(e.target.value) || 1));
    setClassData((prev) => ({ ...prev, maxEnergyLevel: val }));
  };
  const handleEnergyLevelAmountChange = (index, value) => {
    const newLevels = [...classData.energyLevels];
    newLevels[index] = parseInt(value) || 0;
    setClassData((prev) => ({ ...prev, energyLevels: newLevels }));
  };
  const handleToolChange = (index, value) => {
    const arr = [...(classData.toolProficiencies || [])];
    arr[index] = value;
    setClassData((prev) => ({ ...prev, toolProficiencies: arr }));
  };
  const handleAddTool = () => setClassData((prev) => ({
    ...prev,
    toolProficiencies: [...(prev.toolProficiencies || []), ""]
  }));
  const handleLanguageChange = (index, value) => {
    const arr = [...(classData.languageProficiencies || [])];
    arr[index] = value;
    setClassData((prev) => ({ ...prev, languageProficiencies: arr }));
  };
  const handleAddLanguage = () => setClassData((prev) => ({
    ...prev,
    languageProficiencies: [...(prev.languageProficiencies || []), ""]
  }));

  // ...skills tab logic as before...

  return (
    <div className="character-main">
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={classData.name}
          onChange={handleClassNameChange}
          placeholder="Class Name"
          style={{ width: "300px", padding: "8px", fontSize: "18px", fontFamily: "'Caudex', serif", borderRadius: "5px", border: "2px solid #333", marginBottom: "10px" }}
        />
      </div>
      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        <div className="character-description-container" style={{ width: "800px", height: "721px", background: "#D9D9D9", padding: "10px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", fontFamily: "'Caudex', serif", fontSize: "16px", color: "#333" }}>
          <textarea
            style={{ flex: 1, width: "100%", border: "none", outline: "none", background: "transparent", resize: "none", fontFamily: "'Caudex', serif", fontSize: "16px", color: "#333", textAlign: "left" }}
            value={classData.description}
            onChange={handleDescriptionChange}
            placeholder="Write a description of the class, its abilities, and traits here..."
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Energy System */}
          <div className="energy-box white-box3" style={{ width: "200px", height: "380px" }}>
            <h3>Energy System</h3>
            <div className="skills-tabs-container3">
              <div className="skills-tab-buttons3">
                <button className={`skills-tab-btn3 ${energyTab === "Settings" ? "active" : ""}`} onClick={() => setEnergyTab("Settings")}>Settings</button>
                <button className={`skills-tab-btn3 ${energyTab === "Levels" ? "active" : ""}`} onClick={() => setEnergyTab("Levels")}>Levels</button>
              </div>
            </div>
            <div className="skills-tab-content">
              {energyTab === "Settings" && (
                <div>
                  <div style={{ marginBottom: "15px" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Energy Name</label>
                      <input
                        type="text"
                        value={classData.energyName}
                        onChange={handleEnergyNameChange}
                        placeholder="Enter energy name"
                        style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Amount of Levels (max 6)</label>
                      <input
                        type="number"
                        min="1"
                        max={maxEnergyLevels}
                        value={classData.maxEnergyLevel}
                        onChange={handleMaxEnergyLevelChange}
                        style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {energyTab === "Levels" && (
                <div>
                  <h4 style={{ margin: "10px 0", fontSize: "16px" }}>Levels</h4>
                  <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                    {(classData.energyLevels || []).slice(0, classData.maxEnergyLevel).map((amount, index) => (
                      <div key={index} style={{ marginBottom: "8px", fontSize: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                          <span>Level {index + 1}</span>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "5px" }}>Amount :</span>
                            <input
                              type="number"
                              min="0"
                              value={amount}
                              onChange={e => handleEnergyLevelAmountChange(index, e.target.value)}
                              style={{ width: "40px", padding: "2px", borderRadius: "3px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "12px" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Proficiencies */}
          <div className="skills-box white-box2" style={{ width: "200px", height: "500px" }}>
            <h3>Proficiencies</h3>
            <div className="skills-tabs-container2">
              <div className="skills-tab-buttons2">
                <button className={`skills-tab-btn2 ${profTab === "Languages" ? "active" : ""}`} onClick={() => setProfTab("Languages")}>Languages</button>
                <button className={`skills-tab-btn2 ${profTab === "Tools" ? "active" : ""}`} onClick={() => setProfTab("Tools")}>Tools</button>
              </div>
            </div>
            <div className="skills-tab-content2">
              {profTab === "Languages" && (
                <div>
                  {(classData.languageProficiencies || []).map((lang, index) => (
                    <input
                      key={index}
                      type="text"
                      value={lang}
                      onChange={e => handleLanguageChange(index, e.target.value)}
                      placeholder="Type language..."
                      maxLength={20}
                      style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "16px", marginBottom: "5px" }}
                    />
                  ))}
                  <button onClick={handleAddLanguage} style={{ marginTop: "5px", width: "100%", padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#199a6a", color: "#fff", fontFamily: "'Caudex', serif", cursor: "pointer" }}>Add Language</button>
                </div>
              )}
              {profTab === "Tools" && (
                <div>
                  {(classData.toolProficiencies || []).map((tool, index) => (
                    <input
                      key={index}
                      type="text"
                      value={tool}
                      onChange={e => handleToolChange(index, e.target.value)}
                      placeholder="Type tool..."
                      maxLength={20}
                      style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "16px", marginBottom: "5px" }}
                    />
                  ))}
                  <button onClick={handleAddTool} style={{ marginTop: "5px", width: "100%", padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#199a6a", color: "#fff", fontFamily: "'Caudex', serif", cursor: "pointer" }}>Add Tool</button>
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
