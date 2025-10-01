import React, { useState } from "react";
import "../encounter.css";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const EncounterSheet = ({ encounter }) => {
  const [activeTab, setActiveTab] = useState("Str");

  if (!encounter) {
    return <p>Select an encounter to view details.</p>;
  }

  // === Ability Scores from DB ===
  const abilityScores = {
    Str: encounter.encounter_ability_score_str || 10,
    Dex: encounter.encounter_ability_score_dex || 10,
    Con: encounter.encounter_ability_score_con || 10,
    Int: encounter.encounter_ability_score_int || 10,
    Wis: encounter.encounter_ability_score_wis || 10,
    Cha: encounter.encounter_ability_score_cha || 10,
  };

  // === Calculate modifier ===
  const getModifier = (score) => Math.floor((score - 10) / 2);

  const savingThrows = {
    Str: getModifier(abilityScores.Str),
    Dex: getModifier(abilityScores.Dex),
    Con: getModifier(abilityScores.Con),
    Int: getModifier(abilityScores.Int),
    Wis: getModifier(abilityScores.Wis),
    Cha: getModifier(abilityScores.Cha),
  };

  // === Chart Data ===
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
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: -2,
        suggestedMax: 20,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  // === Skills from DB ===
  const skills = [
    encounter.skill_modefed_1,
    encounter.skill_modefed_2,
    encounter.race_skill_modefed_1,
    encounter.race_skill_modefed_2,
  ].filter(Boolean); // remove null/undefined

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="encounter-header-with-portrait">
        <div className="header-text">
          <h2>{encounter.encounter_name}</h2>
          <p>{encounter.race_name}</p>
        </div>
        <img
          src={encounter.encounter_img || encounter.portrait}
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
                    ((encounter.encounter_current_HP || 0) /
                      (encounter.encounter_max_HP || 1)) *
                    100
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
              {skills.length > 0 ? (
                <ul>
                  {skills.map((skill, idx) => (
                    <li key={idx}>
                      {skill} ({savingThrows[activeTab] >= 0 ? "+" : ""}
                      {savingThrows[activeTab]})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No skills available</p>
              )}
            </div>
            <div className="skills-tabs-container">
              {["Str", "Dex", "Con", "Int", "Wis", "Cha"].map((ability) => (
                <button
                  key={ability}
                  className={`skills-tab-btn ${
                    activeTab === ability ? "active" : ""
                  }`}
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
