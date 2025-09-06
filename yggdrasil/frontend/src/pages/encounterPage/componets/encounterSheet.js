import React, { useState } from "react";
import "../encounter.css";
import { Radar } from "react-chartjs-2";
import goblin from "../../../assets/images/goblin.jpg"; 
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

const EncounterSheet = () => {
  const [activeTab, setActiveTab] = useState("Dex");

  const encounter = {
    name: "Goblin Scout",
    race: "Goblin",
    portrait: goblin,
    ac: 15,
    level: 1,
    hp: { current: 19, max: 25 },
    speed: 30,
  };

  // Skills by ability (same as character sheet)
  const skillsByAbility = {
    Str: [{ name: "Athletics", bonus: "+2" }],
    Dex: [
      { name: "Acrobatics", bonus: "+4" },
      { name: "Sleight of Hand", bonus: "+2" },
      { name: "Stealth", bonus: "+6" },
    ],
    Con: [{ name: "Endurance", bonus: "+2" }],
    Int: [
      { name: "Arcana", bonus: "-1" },
      { name: "History", bonus: "-1" },
      { name: "Investigation", bonus: "+0" },
      { name: "Nature", bonus: "+0" },
      { name: "Religion", bonus: "-1" },
    ],
    Wis: [
      { name: "Animal Handling", bonus: "+0" },
      { name: "Insight", bonus: "+1" },
      { name: "Medicine", bonus: "+0" },
      { name: "Perception", bonus: "+2" },
      { name: "Survival", bonus: "+2" },
    ],
    Cha: [
      { name: "Deception", bonus: "-1" },
      { name: "Intimidation", bonus: "+0" },
      { name: "Performance", bonus: "-1" },
      { name: "Persuasion", bonus: "-1" },
    ],
  };

  // Ability Scores chart
  const abilityData = {
    labels: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
    datasets: [
      {
        label: "Ability Score",
        data: [12, 14, 11, 8, 10, 9],
        backgroundColor: "rgba(200, 50, 50, 0.3)",
        borderColor: "rgba(200, 50, 50, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Saving Throws chart
  const savingData = {
    labels: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
    datasets: [
      {
        label: "Saving Throws",
        data: [2, 4, 2, -1, 0, -1],
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
        suggestedMax: 20,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="page left-page">
      {/* Header with portrait */}
      <div className="encounter-header-with-portrait">
        <div className="header-text">
          <h2>{encounter.name}</h2>
          <p>{encounter.race}</p>
        </div>

        <img
          src={encounter.portrait}
          alt="Encounter Portrait"
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
              <div className="stat-box hex">AC {encounter.ac}</div>
              <div className="stat-box hex">Level {encounter.level}</div>
              <div className="stat-box hex">Speed {encounter.speed}</div>
            </div>

            <div className="hp-bar-container">
              <div
                className="hp-bar-fill"
                style={{
                  height: `${(encounter.hp.current / encounter.hp.max) * 100}%`,
                }}
              ></div>
              <div className="hp-bar-label">
                {encounter.hp.current}/{encounter.hp.max}
              </div>
            </div>
          </div>

          {/* Skills Box */}
          <div className="skills-box white-box">
            <div className="skills-tab-content">
              <h3>{activeTab} Skills</h3>
              <ul>
                {skillsByAbility[activeTab].map((skill, idx) => (
                  <li key={idx}>
                    {skill.name} {skill.bonus}
                  </li>
                ))}
              </ul>
            </div>

            <div className="skills-tabs-container">
              <div className="skills-tab-buttons">
                {Object.keys(skillsByAbility).map((ability) => (
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
    </div>
  );
};

export default EncounterSheet;
