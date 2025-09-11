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
  const [activeTab, setActiveTab] = useState("Dex");

  if (!encounter) {
    return <p>Select an encounter to view details.</p>;
  }

  // Example ability data → You can attach real stats per encounter later
  const abilityData = {
    labels: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
    datasets: [
      {
        label: "Ability Score",
        data: [12, 14, 11, 8, 10, 9], // TODO: map from encounter.stats if available
        backgroundColor: "rgba(200, 50, 50, 0.3)",
        borderColor: "rgba(200, 50, 50, 1)",
        borderWidth: 2,
      },
    ],
  };

  const savingData = {
    labels: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
    datasets: [
      {
        label: "Saving Throws",
        data: [2, 4, 2, -1, 0, -1], // TODO: map from encounter.savingThrows if available
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
      {/* Header */}
      <div className="encounter-header-with-portrait">
        <div className="header-text">
          <h2>{encounter.name}</h2>
          <p>{encounter.race}</p>
        </div>
        <img
          src={encounter.image || encounter.portrait}
          alt={encounter.name}
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
              <div className="stat-box hex">AC {encounter.ac || 15}</div>
              <div className="stat-box hex">Level {encounter.level}</div>
              <div className="stat-box hex">Speed {encounter.speed || 30}</div>
            </div>
            <div className="hp-bar-container">
              <div
                className="hp-bar-fill"
                style={{
                  height: `${
                    ((encounter.hp?.current || 20) /
                      (encounter.hp?.max || 25)) *
                    100
                  }%`,
                }}
              ></div>
              <div className="hp-bar-label">
                {encounter.hp?.current || 20}/{encounter.hp?.max || 25}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="skills-box white-box">
            <div className="skills-tab-content">
              <h3>{activeTab} Skills</h3>
              <p>(Skills could go here per character)</p>
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
