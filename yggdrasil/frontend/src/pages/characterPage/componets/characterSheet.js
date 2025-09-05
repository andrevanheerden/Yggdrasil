import React, { useState } from "react";
import "../character.css";
import { Radar } from "react-chartjs-2";
import rose from "../../../assets/images/rose.jpg"; // Example background image
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

// Reusable dropdown with "Add new" option
const EditableDropdown = ({ options, value, onChange, placeholder }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "custom") {
      setIsCustom(true);
      onChange(customValue);
    } else {
      setIsCustom(false);
      onChange(selected);
    }
  };

  return (
    <>
      {!isCustom ? (
        <select value={value} onChange={handleChange} className="dropdown-inline">
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
          <option value="custom">➕ Add new...</option>
        </select>
      ) : (
        <input
          type="text"
          value={customValue}
          onChange={(e) => {
            setCustomValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="dropdown-inline"
        />
      )}
    </>
  );
};

const CharacterSheet = () => {
  const [name, setName] = useState("Alex Black");
  const [charClass, setCharClass] = useState("Shinobi");
  const [race, setRace] = useState("Human");
  const [background, setBackground] = useState("Scholar");

  const character = {
    portrait: rose,
    ac: 19,
    level: 1,
    hp: { current: 19, max: 25 },
    speed: 30,
    skills: [{ name: "Athletics", bonus: "+2" }],
  };

  // Ability Scores chart
  const abilityData = {
    labels: ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
    datasets: [
      {
        label: "Ability Score",
        data: [14, 13, 15, 10, 12, 8],
        backgroundColor: "rgba(0, 128, 255, 0.3)",
        borderColor: "rgba(0, 128, 255, 1)",
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
        data: [2, 1, 3, 0, 1, -1],
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
        suggestedMax: 5,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="page left-page">
      {/* Header with portrait on right */}
      <div className="character-header-with-portrait">
        <div className="header-dropdowns">
          <EditableDropdown
            options={["Alex Black", "New Hero"]}
            value={name}
            onChange={setName}
            placeholder="Enter name"
          />
          <EditableDropdown
            options={["Shinobi", "Warrior", "Mage"]}
            value={charClass}
            onChange={setCharClass}
            placeholder="Enter class"
          />
          <div className="two-column-inline">
            <EditableDropdown
              options={["Human", "Elf", "Dwarf"]}
              value={race}
              onChange={setRace}
              placeholder="Enter race"
            />
            <EditableDropdown
              options={["Scholar", "Soldier", "Merchant"]}
              value={background}
              onChange={setBackground}
              placeholder="Enter background"
            />
          </div>
        </div>

        <img
          src={character.portrait}
          alt="Portrait"
          className="portrait-img-header"
        />
      </div>

      <div className="character-main">
        {/* Left side: charts */}
        <div className="charts-column">
          <div className="ability-chart white-box">
            <Radar data={abilityData} options={chartOptions} />
            <p>Ability Score</p>
          </div>

          <div className="saving-chart white-box">
            <Radar data={savingData} options={chartOptions} />
            <p>Saving Throws</p>
          </div>
        </div>

{/* Right side: stats + skills */}
<div className="portrait-column">
  <div className="stats-hp-wrapper">
    {/* Hex stats stacked vertically */}
    <div className="hex-stack">
      <div className="stat-box hex">AC {character.ac}</div>
      <div className="stat-box hex">Level {character.level}</div>
      <div className="stat-box hex">Speed {character.speed}</div>
    </div>

    {/* HP Bar next to hexes */}
    <div className="hp-bar-container">
      <div
        className="hp-bar-fill"
        style={{ height: `${(character.hp.current / character.hp.max) * 100}%` }}
      ></div>
      <div className="hp-bar-label">
        {character.hp.current}/{character.hp.max}
      </div>
    </div>
  </div>

  <div className="skills-box white-box">
    <h3>Skills</h3>
    <ul>
      {character.skills.map((skill, idx) => (
        <li key={idx}>
          {skill.name} {skill.bonus}
        </li>
      ))}
    </ul>
  </div>
</div>


      </div>
    </div>
  );
};

export default CharacterSheet;

