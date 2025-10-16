import React, { useState } from "react";
import "../encounter.css";
import { Radar } from "react-chartjs-2";
import fallbackImg from "../../../assets/images/profile.jpg";
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

const EncounterSheet = ({ encounter, onEdit }) => {
  const [activeTab, setActiveTab] = useState("Str");

  if (!encounter) return <p>Select an encounter to view details.</p>;

  // --- Ability Scores & Modifier ---
  const abilityScores = {
    Str: encounter.encounter_ability_score_str || 10,
    Dex: encounter.encounter_ability_score_dex || 10,
    Con: encounter.encounter_ability_score_con || 10,
    Int: encounter.encounter_ability_score_int || 10,
    Wis: encounter.encounter_ability_score_wis || 10,
    Cha: encounter.encounter_ability_score_cha || 10,
  };

  const getModifier = (score) => Math.floor((score - 10) / 2);

  // --- Skills ---
  const allSkills = {
    Str: ["Athletics"],
    Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
    Con: ["Endurance"],
    Int: ["Arcana", "History", "Investigation", "Nature", "Religion"],
    Wis: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
    Cha: ["Deception", "Intimidation", "Performance", "Persuasion"],
  };

  const extraModifiers = [
    encounter.skill_modefed_1,
    encounter.skill_modefed_2,
    encounter.race_skill_modefed_1,
    encounter.race_skill_modefed_2,
  ].filter(Boolean);

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
        backgroundColor: "rgba(200, 50, 50, 0.3)",
        borderColor: "rgba(200, 50, 50, 1)",
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
      {onEdit && (
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
      )}

      {/* Header */}
      <div className="encounter-header-with-portrait">
        <div className="header-text">
          <h2>{encounter.encounter_name}</h2>
          <p>{encounter.race_name}</p>
        </div>
        <img
          src={encounter.encounter_img || fallbackImg}
          alt={encounter.encounter_name}
          className="portrait-img-header"
        />
      </div>

      <div className="encounter-main">
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
              <div className="stat-box hex">AC {encounter.encounter_AC}</div>
              <div className="stat-box hex">Level {encounter.encounter_level}</div>
              <div className="stat-box hex">Speed {encounter.encounter_speed}</div>
            </div>
            <div className="hp-bar-container">
              <div
                className="hp-bar-fill"
                style={{
                  height: `${
                    ((encounter.encounter_current_HP || 0) / (encounter.encounter_max_HP || 1)) * 100
                  }%`,
                }}
              ></div>
              <div className="hp-bar-label">
                {encounter.encounter_current_HP}/{encounter.encounter_max_HP}
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

export default EncounterSheet;
