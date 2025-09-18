import React from "react";
import { Radar } from "react-chartjs-2";

const CharacterSheetCreater = ({
  abilities,
  abilityScores,
  changeAbility,
  getModifier,
  hp,
  changeHp,
  character,
  speed,
  activeTab,
  setActiveTab,
  selectedSkills,
  toggleSkill,
  initialSkills,
  abilityData,
  savingData,
  chartOptions,
  savingThrowOptions,
}) => {
  return (
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
                <div className="hp-bar-container" style={{ width: "100%", height: "20px", backgroundColor: "#ddd", borderRadius: "10px", position: "relative", overflow: "hidden" }}>
                  <div
                    className="hp-bar-fill"
                    style={{
                      height: "100%",
                      width: `${(hp.current / hp.max) * 100}%`,
                      backgroundColor:
                        hp.current > hp.max * 0.5 ? "#4caf50" : hp.current > hp.max * 0.25 ? "#ff9800" : "#f44336",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", fontSize: "12px" }}>
                    {hp.current} / {hp.max}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Box */}
          <div className="skills-box white-box" style={{ width: "300px", maxHeight: "390px" }}>
            <h3>{activeTab} Skills</h3>
            <div className="skills-tab-content">
              <div style={{ marginBottom: "5px" }}>
                Selected Skills: {selectedSkills.length}/2
                {selectedSkills.length > 0 && `: ${selectedSkills.join(", ")}`}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {initialSkills[activeTab].map((skill) => {
                  const ability = Object.keys(initialSkills).find((key) => initialSkills[key].includes(skill));
                  const bonus = getModifier(abilityScores[ability]) + (selectedSkills.includes(skill) ? 2 : 0);
                  const isSelected = selectedSkills.includes(skill);

                  return (
                    <li key={skill} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                      <span>
                        {skill} <strong style={{ marginLeft: "5px" }}>+{bonus}</strong>
                      </span>
                      <input type="checkbox"  checked={isSelected} onChange={() => toggleSkill(skill)} disabled={!isSelected && selectedSkills.length >= 2} />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="skills-tabs-container">
              <div className="skills-tab-buttons">
                {abilities.map((ability) => (
                  <button key={ability} className={`skills-tab-btn ${activeTab === ability ? "active" : ""}`} onClick={() => setActiveTab(ability)}>
                    {ability}
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

export default CharacterSheetCreater;
