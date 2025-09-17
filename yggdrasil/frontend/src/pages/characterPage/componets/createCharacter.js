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
    name: "New Character",
    class: "Class",
    race: "Race",
    background: "Background",
    portrait: pageBg,
    ac: acBase,
    level: 1,
    hp,
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
        {/* Header with portrait */}
        <div className="character-header-with-portrait">
          <div className="header-dropdowns">
            <div className="static-info">{character.name}</div>
            <div className="static-info">{character.class}</div>
            <div className="two-column-inline">
              <div className="static-info">{character.race}</div>
              <div className="static-info">{character.background}</div>
            </div>
          </div>
        </div>

        <div className="character-main">
          <div className="charts-column">
            <div className="ability-chart white-box">
              <Radar data={abilityData} options={chartOptions} />
            </div>
            <div className="saving-chart white-box">
              <Radar data={savingData} options={chartOptions} />
            </div>
          </div>

          <div className="portrait-column">
            <div className="stats-hp-wrapper">
              <div className="hex-stack">
                <div className="stat-box hex">AC {acBase + getModifier(abilityScores.Dex)}</div>
                <div className="stat-box hex">Level {character.level}</div>
                <div className="stat-box hex">Speed {speed}</div>
              </div>

              <div className="hp-bar-container">
                <input
                  type="number"
                  value={hp.current}
                  onChange={(e) => setHp({ ...hp, current: +e.target.value })}
                  style={{ width: 50 }}
                />
                /
                <input
                  type="number"
                  value={hp.max}
                  onChange={(e) => setHp({ ...hp, max: +e.target.value })}
                  style={{ width: 50 }}
                />
                <div
                  className="hp-bar-fill"
                  style={{ height: `${(hp.current / hp.max) * 100}%` }}
                ></div>
              </div>
            </div>

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

            <div className="ability-input">
              {abilities.map((ab) => (
                <div key={ab}>
                  <strong>{ab}:</strong>
                  <button onClick={() => changeAbility(ab, -1)}>-</button>
                  <span>{abilityScores[ab]}</span>
                  <button onClick={() => changeAbility(ab, 1)}>+</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterSheet;
