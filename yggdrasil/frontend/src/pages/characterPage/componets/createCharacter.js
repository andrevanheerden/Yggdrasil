import React, { useState } from "react";
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
  const [acBase, setAcBase] = useState(10);
  const [speed, setSpeed] = useState(30);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [characterName, setCharacterName] = useState("New Character");

  const getModifier = (score) => Math.floor((score - 10) / 2);

  const changeAbility = (ab, delta) => {
    setAbilityScores((prev) => {
      let newScore = prev[ab] + delta;
      if (newScore < 1) newScore = 1;
      if (newScore > 25) newScore = 25;
      return { ...prev, [ab]: newScore };
    });
  };

  const toggleSkill = (ability, skill) => {
    const current = selectedSkills[ability] || [];
    let newSelected = [...current];
    if (current.includes(skill)) {
      newSelected = newSelected.filter((s) => s !== skill);
    } else {
      if (current.length < 2) newSelected.push(skill);
    }
    setSelectedSkills((prev) => ({ ...prev, [ability]: newSelected }));
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
    scales: { r: { angleLines: { display: true }, suggestedMin: 0, suggestedMax: 20 } },
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
        {/* Header with character name input */}
        <div className="character-header">
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="character-name-input"
            placeholder="Character Name"
          />
        </div>

        <div className="character-main">
          <div className="top-section" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div className="charts-column">
              <div className="ability-chart white-box">
                <Radar data={abilityData} options={chartOptions} />
              </div>
              <div className="saving-chart white-box">
                <Radar data={savingData} options={chartOptions} />
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
                  
                  {/* HP Bar */}
                  <div className="hp-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>HP</div>
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
                    <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                      <input
                        type="number"
                        value={hp.current}
                        onChange={(e) => setHp({ ...hp, current: +e.target.value })}
                        style={{ width: "50px" }}
                      />
                      <span>/</span>
                      <input
                        type="number"
                        value={hp.max}
                        onChange={(e) => setHp({ ...hp, max: +e.target.value })}
                        style={{ width: "50px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Box - Now positioned directly under the ability scores and HP */}
              <div className="skills-box white-box">
                <div className="skills-tab-content">
                  <h3>{activeTab} Skills</h3>
                  <ul>
                    {initialSkills[activeTab].map((skill) => {
                      const bonus =
                        getModifier(abilityScores[activeTab]) +
                        (selectedSkills[activeTab]?.includes(skill) ? 2 : 0);
                      return (
                        <li key={skill}>
                          <input
                            type="checkbox"
                            checked={selectedSkills[activeTab]?.includes(skill) || false}
                            onChange={() => toggleSkill(activeTab, skill)}
                          />
                          {skill} +{bonus}
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