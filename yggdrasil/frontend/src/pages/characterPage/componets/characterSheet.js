import React, { useState } from "react";
import "../character.css";
import { Radar } from "react-chartjs-2";
import defaultPortrait from "../../../assets/images/rose.jpg";
import { useNavigate } from "react-router-dom";
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

const CharacterSheet = ({ character , onEdit }) => {
  const [activeTab, setActiveTab] = useState("Str");
  const navigate = useNavigate();

  if (!character) {
    return <p>No character selected.</p>;
  }

  // --- Ability Scores & Modifier ---
  const abilityScores = {
    Str: character.abilityScores?.Str || 10,
    Dex: character.abilityScores?.Dex || 10,
    Con: character.abilityScores?.Con || 10,
    Int: character.abilityScores?.Int || 10,
    Wis: character.abilityScores?.Wis || 10,
    Cha: character.abilityScores?.Cha || 10,
  };

  const getModifier = (score) => Math.floor((score - 10) / 2);

  // --- Standard skills per ability ---
  const allSkills = {
    Str: ["Athletics"],
    Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
    Con: ["Endurance"],
    Int: ["Arcana", "History", "Investigation", "Nature", "Religion"],
    Wis: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
    Cha: ["Deception", "Intimidation", "Performance", "Persuasion"],
  };

  // --- Extra modifiers from character ---
  const extraModifiers = [
    character.skill_modefed_1,
    character.skill_modefed_2,
    character.race_skill_modefed_1,
    character.race_skill_modefed_2,
  ].filter(Boolean);

  // --- Build skills with total values ---
  const skillsByAbility = {};
  Object.keys(allSkills).forEach((ability) => {
    const abilityMod = getModifier(abilityScores[ability]);
    skillsByAbility[ability] = allSkills[ability].map((skill) => {
      const extra = extraModifiers.includes(skill) ? 2 : 0;
      return { name: skill, value: abilityMod + extra };
    });
  });

  // --- Chart Data ---
  const savingThrows = Object.fromEntries(
    Object.entries(abilityScores).map(([k, v]) => [k, getModifier(v)])
  );

  const abilityData = {
    labels: Object.keys(abilityScores),
    datasets: [
      {
        label: "Ability Scores",
        data: Object.values(abilityScores),
        backgroundColor: "rgba(0, 128, 255, 0.3)",
        borderColor: "rgba(0, 128, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const savingData = {
    labels: Object.keys(savingThrows),
    datasets: [
      {
        label: "Saving Throws",
        data: Object.values(savingThrows),
        backgroundColor: "rgba(0, 200, 100, 0.3)",
        borderColor: "rgba(0, 200, 100, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: { r: { angleLines: { display: true }, suggestedMin: -2, suggestedMax: 20 } },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="page left-page" style={{ position: "relative" }}>
      {/* Floating Edit Button */}
<button
  style={{
    position: "absolute",
    top: "10px",
    right: "20px",
    zIndex: 1000,
    padding: "8px 12px",
    background: "#2a6ca6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
  onClick={onEdit}
>
  Edit
</button>


      {/* Header */}
      <div className="character-header-with-portrait">
        <div className="header-dropdowns">
          <div className="static-info">{character.name}</div>
          <div className="static-info">{character.class}</div>
          <div className="two-column-inline">
            <div className="static-info">{character.race}</div>
            <div className="static-info">{character.background}</div>
          </div>
        </div>
        <img
          src={character.portrait || defaultPortrait}
          alt="Portrait"
          className="portrait-img-header"
        />
      </div>

      <div className="character-main2">
        {/* Charts */}
        <div className="charts-column">
          <div className="ability-chart white-box">
            <Radar data={abilityData} options={chartOptions} />
          </div>
          <div className="saving-chart white-box">
            <Radar data={savingData} options={chartOptions} />
          </div>
        </div>

        {/* Stats + Skills */}
        <div className="portrait-column">
          <div className="stats-hp-wrapper">
            <div className="hex-stack">
              <div className="stat-box hex">AC {character.ac}</div>
              <div className="stat-box hex">Level {character.level}</div>
              <div className="stat-box hex">Speed {character.speed}</div>
            </div>
            <div className="hp-bar-container">
              <div
                className="hp-bar-fill"
                style={{
                  height: character.hp?.max
                    ? `${(character.hp.current / character.hp.max) * 100}%`
                    : "0%",
                }}
              ></div>
              <div className="hp-bar-label">
                {character.hp?.current}/{character.hp?.max}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="skills-box white-box">
            <div className="skills-tab-content">
              <h3>{activeTab} Skills</h3>
              <ul>
                {skillsByAbility[activeTab].map((skill, idx) => (
                  <li key={idx}>
                    {skill.name} {skill.value >= 0 ? "+" : ""}
                    {skill.value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="skills-tabs-container">
              {Object.keys(skillsByAbility).map((ability) => (
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
  );
};

export default CharacterSheet;

