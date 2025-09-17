import React, { useState, useRef } from "react";
import "../character.css";
import { Radar } from "react-chartjs-2";
import pageBg from "../../../assets/images/page.png"; // Popup background
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
const initialSkills = {
  Str: ["Athletics"],
  Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
  Con: ["Endurance"],
  Int: ["Arcana", "History", "Investigation", "Nature", "Religion"],
  Wis: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
  Cha: ["Deception", "Intimidation", "Performance", "Persuasion"],
};

const CreateCharacterSheet = () => {
  const [activeTab, setActiveTab] = useState("Str");
  const [abilityScores, setAbilityScores] = useState({
    Str: 10,
    Dex: 10,
    Con: 10,
    Int: 10,
    Wis: 10,
    Cha: 10,
  });
  const [hp, setHp] = useState({ current: 10, max: 10 });
  const [acBase] = useState(10);
  const [speed] = useState(30);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [characterName, setCharacterName] = useState("New Character");
  const [characterImage, setCharacterImage] = useState(null);
  const fileInputRef = useRef(null);
  const [skillContainerHeight, setSkillContainerHeight] = useState(400); // Default height

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCharacterImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const getModifier = (score) => Math.floor((score - 10) / 2);

  const changeAbility = (ab, delta) => {
    setAbilityScores((prev) => {
      let newScore = prev[ab] + delta;
      if (newScore < 1) newScore = 1;
      if (newScore > 25) newScore = 25;
      return { ...prev, [ab]: newScore };
    });
  };

  const changeHp = (type, delta) => {
    setHp((prev) => {
      if (type === "current") {
        let newCurrent = prev.current + delta;
        // Ensure current HP doesn't go below 0 or above max
        newCurrent = Math.max(0, Math.min(newCurrent, prev.max));
        return { ...prev, current: newCurrent };
      } else {
        let newMax = prev.max + delta;
        // Ensure max HP doesn't go below 1
        newMax = Math.max(1, newMax);
        // Adjust current HP if it would exceed new max
        const newCurrent = Math.min(prev.current, newMax);
        return { current: newCurrent, max: newMax };
      }
    });
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else {
        if (prev.length < 2) {
          return [...prev, skill];
        }
        return prev;
      }
    });
  };

  const abilityData = {
    labels: abilities,
    datasets: [
      {
        label: "Ability Score",
        data: abilities.map((ab) => abilityScores[ab]),
        backgroundColor: "rgba(0, 128, 255, 0.3)",
        borderColor: "rgba(0, 128, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const savingData = {
    labels: abilities,
    datasets: [
      {
        label: "Saving Throws",
        data: abilities.map((ab) => getModifier(abilityScores[ab])),
        backgroundColor: "rgba(0, 200, 100, 0.3)",
        borderColor: "rgba(0, 200, 100, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: { 
      r: { 
        angleLines: { display: true }, 
        suggestedMin: 0, 
        suggestedMax: 20 
      } 
    },
    plugins: { legend: { display: false } },
  };

  const savingThrowOptions = {
    scales: { 
      r: { 
        angleLines: { display: true }, 
        suggestedMin: -5, 
        suggestedMax: 10 
      } 
    },
    plugins: { legend: { display: false } },
  };

  const character = {
    name: characterName,
    ac: acBase + getModifier(abilityScores.Dex),
    level: 1,
    speed,
  };

  return (
    <div className="character-popup-overlay">
      <div
        className="character-popup"
        style={{
          backgroundImage: `url(${pageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header with character name input and image upload */}
        <div className="character-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="character-name-input"
            placeholder="Character Name"
            style={{ width: "50%", marginBottom: 0 }}
          />
          
          <div className="character-image-upload" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div 
              className="character-image-preview" 
              onClick={triggerFileInput}
              style={{
                width: "125px",
                height: "125px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                backgroundImage: characterImage ? `url(${characterImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #333",
                marginBottom: "5px"
              }}
            >
              {!characterImage && <span>Click to upload</span>}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="character-main">
          <div className="top-section" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div className="charts-column">
              <div className="ability-chart white-box">
                <Radar data={abilityData} options={chartOptions} />
              </div>
              <div className="saving-chart white-box">
                <Radar data={savingData} options={savingThrowOptions} />
              </div>
            </div>

            <div className="right-column" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="stats-hp-wrapper" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                {/* Ability Scores Column */}
                <div className="ability-input" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {abilities.map((ab) => (
                    <div key={ab} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <strong>{ab}:</strong>
                      <button onClick={() => changeAbility(ab, -1)}>-</button>
                      <span>{abilityScores[ab]}</span>
                      <button onClick={() => changeAbility(ab, 1)}>+</button>
                    </div>
                  ))}
                </div>

                {/* Stats with HP Bar */}
                <div className="stats-container" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="stats-row" style={{ display: "flex", gap: "10px" }}>
                    <div className="stat-box hex">AC {character.ac}</div>
                    <div className="stat-box hex">Level {character.level}</div>
                    <div className="stat-box hex">Speed {speed}</div>
                  </div>
                  
                  {/* HP Bar with separate current and max controls */}
                  <div className="hp-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "5px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <strong>Current HP:</strong>
                        <button onClick={() => changeHp("current", -1)}>-</button>
                        <span>{hp.current}</span>
                        <button onClick={() => changeHp("current", 1)}>+</button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <strong>Max HP:</strong>
                        <button onClick={() => changeHp("max", -1)}>-</button>
                        <span>{hp.max}</span>
                        <button onClick={() => changeHp("max", 1)}>+</button>
                      </div>
                    </div>
                    <div className="hp-bar-container" style={{ 
                      width: "100%", 
                      height: "20px", 
                      backgroundColor: "#ddd", 
                      borderRadius: "10px",
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      <div
                        className="hp-bar-fill"
                        style={{ 
                          height: "100%", 
                          width: `${(hp.current / hp.max) * 100}%`,
                          backgroundColor: hp.current > hp.max * 0.5 ? "#4caf50" : 
                                          hp.current > hp.max * 0.25 ? "#ff9800" : "#f44336",
                          transition: "width 0.3s ease"
                        }}
                      ></div>
                      <div style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "12px"
                      }}>
                        {hp.current} / {hp.max}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Box with adjustable height */}
   <div className="skills-box white-box" style={{ width: '300px', maxHeight: '390px' }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
          <h3>{activeTab} Skills</h3>
        </div>
        
        <div className="skills-tab-content">
          <div style={{ marginBottom: "5px" }}>
            Selected Skills: {selectedSkills.length}/2
            {selectedSkills.length > 0 && `: ${selectedSkills.join(", ")}`}
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {initialSkills[activeTab].map((skill) => {
              const ability = Object.keys(initialSkills).find(key => 
                initialSkills[key].includes(skill)
              );
              // Skill bonus = ability modifier + proficiency bonus (2) if selected
              const bonus = getModifier(abilityScores[ability]) + 
                           (selectedSkills.includes(skill) ? 2 : 0);
              const isSelected = selectedSkills.includes(skill);
              
              return (
                <li key={skill} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  marginBottom: "5px"
                }}>
                  <span>
                    {skill} <strong style={{ marginLeft: "5px" }}>+{bonus}</strong>
                  </span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSkill(skill)}
                    disabled={!isSelected && selectedSkills.length >= 2}
                    style={{
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                      boxShadow: "none",
                      border: "1px solid #ccc",
                      borderRadius: "3px"
                    }}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterSheet;