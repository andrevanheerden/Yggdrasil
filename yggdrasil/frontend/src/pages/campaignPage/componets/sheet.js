import React, { useState } from "react";
import "../campaign.css";
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

const Sheet = () => {
  const [activeSkillGroup, setActiveSkillGroup] = useState("STR");

  // Example Ability Scores
  const abilityScores = {
    STR: 14,
    DEX: 16,
    CON: 12,
    INT: 10,
    WIS: 13,
    CHA: 8,
  };

  // Saving Throws (example)
  const savingThrows = {
    STR: 2,
    DEX: 3,
    CON: 1,
    INT: 0,
    WIS: 1,
    CHA: -1,
  };

  // Skills grouped by ability
  const skills = {
    STR: ["Athletics"],
    DEX: ["Acrobatics", "Sleight of Hand", "Stealth"],
    CON: ["(No default skills)"],
    INT: ["Arcana", "History", "Investigation", "Nature", "Religion"],
    WIS: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
    CHA: ["Deception", "Intimidation", "Performance", "Persuasion"],
  };

  // Chart.js configs
  const abilityData = {
    labels: Object.keys(abilityScores),
    datasets: [
      {
        label: "Ability Scores",
        data: Object.values(abilityScores),
        backgroundColor: "rgba(25, 154, 106, 0.4)",
        borderColor: "#199A6A",
        borderWidth: 2,
        pointBackgroundColor: "#05512C",
      },
    ],
  };

  const savingThrowData = {
    labels: Object.keys(savingThrows),
    datasets: [
      {
        label: "Saving Throws",
        data: Object.values(savingThrows),
        backgroundColor: "rgba(42, 108, 166, 0.4)",
        borderColor: "#2a6ca6",
        borderWidth: 2,
        pointBackgroundColor: "#054477",
      },
    ],
  };

  return (
    <div className="book-wrapper">
      {/* LEFT PAGE */}
      <div className="page">
        <h2 className="page-title">Character Info</h2>

        {/* Character Image */}
        <div className="char-img-wrapper">
          <input type="file" accept="image/*" />
        </div>

        <label>
          Name:
          <input type="text" placeholder="Character Name" />
        </label>

        <label>
          Class:
          <select>
            <option>Fighter</option>
            <option>Wizard</option>
            <option>Rogue</option>
            <option>Cleric</option>
          </select>
        </label>

        <label>
          Race:
          <select>
            <option>Human</option>
            <option>Elf</option>
            <option>Dwarf</option>
            <option>Orc</option>
          </select>
        </label>

        <label>
          Background:
          <select>
            <option>Noble</option>
            <option>Soldier</option>
            <option>Acolyte</option>
            <option>Criminal</option>
          </select>
        </label>

        <div className="stats-grid">
          <div>
            <label>AC</label>
            <input type="number" defaultValue={12} />
          </div>
          <div>
            <label>Level</label>
            <input type="number" defaultValue={1} />
          </div>
          <div>
            <label>Speed</label>
            <input type="number" defaultValue={30} />
          </div>
          <div>
            <label>HP</label>
            <input type="number" defaultValue={10} />
          </div>
        </div>
      </div>

      {/* RIGHT PAGE */}
      <div className="page">
        <h2 className="page-title">Stats</h2>

        {/* Ability Scores */}
        <div className="stat-block">
          <h3>Ability Scores</h3>
          <Radar data={abilityData} />
        </div>

        {/* Saving Throws */}
        <div className="stat-block">
          <h3>Saving Throws</h3>
          <Radar data={savingThrowData} />
        </div>

        {/* Skills */}
        <div className="stat-block">
          <h3>Skills</h3>
          <div className="skill-tabs">
            {Object.keys(skills).map((ability) => (
              <button
                key={ability}
                className={activeSkillGroup === ability ? "active" : ""}
                onClick={() => setActiveSkillGroup(ability)}
              >
                {ability}
              </button>
            ))}
          </div>
          <ul className="skill-list">
            {skills[activeSkillGroup].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sheet;
