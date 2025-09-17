import React, { useState } from "react";
import "../character.css";

const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];

const initialSkills = {
  Str: ["Athletics"],
  Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
  Con: ["Endurance"],
  Int: ["Arcana", "History", "Investigation", "Nature", "Religion"],
  Wis: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
  Cha: ["Deception", "Intimidation", "Performance", "Persuasion"],
};

const CreateCharacter = () => {
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
  const [activeTab, setActiveTab] = useState("Str");
  const [skillBonus, setSkillBonus] = useState(
    Object.fromEntries(abilities.map((a) => [a, {}]))
  );
  const [selectedExtra2, setSelectedExtra2] = useState({}); // only two per group

  // calculate modifier
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // handle ability increase/decrease
  const changeAbility = (ab, delta) => {
    setAbilityScores((prev) => {
      let newScore = prev[ab] + delta;
      if (newScore < 1) newScore = 1;
      if (newScore > 25) newScore = 25;
      return { ...prev, [ab]: newScore };
    });
  };

  const toggleSkillBonus = (ability, skill) => {
    const current = selectedExtra2[ability] || [];
    let newSelected = [...current];
    if (current.includes(skill)) {
      newSelected = newSelected.filter((s) => s !== skill);
    } else {
      if (current.length < 2) newSelected.push(skill);
    }
    setSelectedExtra2((prev) => ({ ...prev, [ability]: newSelected }));
  };

  return (
    <div className="character-popup-overlay">
      <div className="character-popup">
        <h2>Create Character</h2>

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

        <div>
          <strong>AC:</strong> {acBase + getModifier(abilityScores.Dex)}
        </div>
        <div>
          <strong>Speed:</strong> {speed}
        </div>

        <div>
          <strong>HP:</strong>
          <input
            type="number"
            value={hp.current}
            onChange={(e) =>
              setHp((prev) => ({ ...prev, current: +e.target.value }))
            }
            style={{ width: 50 }}
          />{" "}
          /{" "}
          <input
            type="number"
            value={hp.max}
            onChange={(e) =>
              setHp((prev) => ({ ...prev, max: +e.target.value }))
            }
            style={{ width: 50 }}
          />
          {" "} (Total HP: {hp.max + getModifier(abilityScores.Con)})
        </div>

        {/* Saving Throws */}
        <div>
          <h3>Saving Throws</h3>
          {abilities.map((ab) => (
            <div key={ab}>
              {ab}: {getModifier(abilityScores[ab])}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="skills-box">
          <div className="skills-tab-content">
            <h3>{activeTab} Skills</h3>
            <ul>
              {initialSkills[activeTab].map((skill) => {
                const bonus =
                  getModifier(abilityScores[activeTab]) +
                  (selectedExtra2[activeTab]?.includes(skill) ? 2 : 0);
                return (
                  <li key={skill}>
                    <input
                      type="checkbox"
                      checked={selectedExtra2[activeTab]?.includes(skill)}
                      onChange={() => toggleSkillBonus(activeTab, skill)}
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

export default CreateCharacter;
