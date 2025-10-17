// ClassDes.js
import React, { useState, useEffect } from "react";
import "../character.css";
import rose from "../../../assets/images/rose.jpg";
import API from "../../../api";

const ClassDes = ({ character }) => {
  const [classData, setClassData] = useState({
    name: "-",
    description: "",
    energyName: "Energy",
    maxEnergyLevel: 0,
    levels: {},
    tools: [],
    languages: [],
    portrait: rose,
  });

  

  const [activeTab, setActiveTab] = useState("Tools");

  // Helper to safely parse JSON arrays from the backend
  const parseJSONorArray = (val) => {
    if (!val) return [];
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Failed to parse tools/languages:", val);
      return [];
    }
  };

 useEffect(() => {
  if (!character || !character.id) return;

  const fetchClass = async () => {
    try {
      const res = await API.get(
        `/api/character-classes/character/${character.id}`
      );

      console.log("Raw backend response:", res.data); // ✅ LOG RAW RESPONSE

      const cls = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;
      if (!cls) return;

      // Build energy levels up to max level (max 6)
      const levels = {};
      for (let i = 1; i <= Math.min(cls.max_energy_level || 0, 6); i++) {
        levels[i] = cls[`amount_lv${i}`] || 0;
      }

      const newClassData = {
        name: cls.class_name || "-",
        description: cls.class_description || "",
        energyName: cls.energy_name || "Energy",
        maxEnergyLevel: cls.max_energy_level || 0,
        levels,
        tools: parseJSONorArray(cls.tool_proficiencies),
        languages: parseJSONorArray(cls.language_proficiencies),
        portrait: character.portrait || rose,
      };

      console.log("Parsed class data:", newClassData); // ✅ LOG PARSED DATA

      setClassData(newClassData);

    } catch (err) {
      console.error("Failed to fetch class data:", err);
    }
  };

  fetchClass();
}, [character]);



  const tabs = {
    Tools: classData.tools,
    Languages: classData.languages,
  };

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{character?.name || "-"}</div>
          <div className="background-character-details">
            <div className="background-character-background">{classData.name}</div>
          </div>
        </div>
        <img
          src={classData.portrait}
          alt="Portrait"
          className="background-portrait-img"
        />
      </div>

      {/* Two-column layout */}
      <div className="background-main-content">
        {/* Description */}
        <div className="background-description-box">
          <div className="background-description-title-inside">Description</div>
          <textarea
            value={classData.description}
            onChange={(e) =>
              setClassData({ ...classData, description: e.target.value })
            }
            className="background-description-textarea"
          />
        </div>

        {/* Right column: Energy Resource + Tools/Languages */}
        <div className="background-right-column">
          {/* Energy Resource */}
          <div className="energy-box">
            <h3 className="energy-title">{classData.energyName}</h3>
            <div className="energy-levels">
              {Object.entries(classData.levels).map(([level, count]) => (
                <div key={level} className="energy-level">
                  <span className="energy-level-label">Lv {level}</span>
<div className="energy-circles-grid">
  {Array.from({ length: count }).map((_, idx) => (
    <div key={idx} className="energy-circle"></div>
  ))}
</div>

                </div>
              ))}
            </div>
          </div>

          {/* Tools / Languages */}
          <div className="background-skills-box" style={{ height: "282px" }}>
            <div className="background-skills-content">
              <h3>{activeTab}</h3>
              {tabs[activeTab].length > 0 ? (
                <ul>
                  {tabs[activeTab].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No {activeTab.toLowerCase()} listed.</p>
              )}
            </div>

            <div className="background-skills-tabs-container">
              <div className="background-skills-tab-buttons">
                {Object.keys(tabs).map((tab) => (
                  <button
                    key={tab}
                    className={`background-skills-tab-btn ${
                      activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDes;
