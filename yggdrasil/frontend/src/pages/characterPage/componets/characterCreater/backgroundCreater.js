import React, { useState } from "react";
import "../../character.css";

const BackgroundCreation = ({
  initialSkills = {},
  selectedSkills = [],       // skills for this page
  toggleSkill,               // page-specific toggle
  pageSelectedSkills = {},   // all pages skills
  pageName = "background"    // current page name
}) => {
  const [backgroundName, setBackgroundName] = useState("");
  const [languagesArray, setLanguagesArray] = useState([""]);
  const [toolsArray, setToolsArray] = useState([""]);

  const defaultSkills = {
    Str: ["Athletics"],
    Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
    Con: ["Endurance"],
    Int: ["Arcana", "History", "Investigation"],
    Wis: ["Insight", "Perception", "Survival"],
    Cha: ["Deception", "Performance", "Persuasion"],
  };

  const skills = Object.keys(initialSkills).length > 0 ? initialSkills : defaultSkills;
  const abilities = Object.keys(skills);

  const abilityLabels = { Str: "Str", Dex: "Dex", Con: "Con", Int: "Int", Wis: "Wis", Cha: "Cha" };

  const [activeTab, setActiveTab] = useState(abilities[0]);
  const [abilityScores] = useState(abilities.reduce((acc, ab) => ({ ...acc, [ab]: 10 }), {}));
  const [profTab, setProfTab] = useState("Languages");

  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Compute modifier including selections on other pages
const getSkillModifier = (skill) => {
  // find the ability, only if skills exists
  const ability = abilities.find(
    (ab) => skills[ab]?.includes(skill) // optional chaining
  );

  let bonus = ability ? getModifier(abilityScores[ability]) : 0;

  // +2 if selected on this page
  if (selectedSkills.includes(skill)) bonus += 2;

  // +2 if selected on other pages, only if pageSelectedSkills exists
  if (pageSelectedSkills) {
    Object.keys(pageSelectedSkills).forEach((page) => {
      if (
        page !== pageName &&
        pageSelectedSkills[page]?.includes(skill) // optional chaining
      ) {
        bonus += 2;
      }
    });
  }

  return bonus;
};


  return (
    <div className="character-main">
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={backgroundName}
          onChange={(e) => setBackgroundName(e.target.value)}
          placeholder="Background Name"
          style={{
            width: "300px",
            padding: "8px",
            fontSize: "18px",
            fontFamily: "'Caudex', serif",
            borderRadius: "5px",
            border: "2px solid #333",
            marginBottom: "10px",
          }}
        />
      </div>

      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        <div
          className="character-description-container"
          style={{
            width: "800px",
            height: "721px",
            background: "#D9D9D9",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Caudex', serif",
            fontSize: "16px",
            color: "#333",
          }}
        >
          <textarea
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              resize: "none",
              fontFamily: "'Caudex', serif",
              fontSize: "16px",
              color: "#333",
              textAlign: "left",
            }}
            placeholder="Write a description of the background and its information here..."
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Skills Box */}
          <div className="skills-box white-box3" style={{ width: "200px", height: "380px" }}>
            <h3>Background Skills</h3>
            <div className="skills-tab-content">
              <div style={{ marginBottom: "5px" }}>
                Selected Skills: {selectedSkills.length}/2
                {selectedSkills.length > 0 && `: ${selectedSkills.join(", ")}`}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {skills[activeTab]?.map((skill) => {
                  const bonus = getSkillModifier(skill);
                  const isSelected = selectedSkills.includes(skill);

                  return (
                    <li
                      key={skill}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span>
                        {skill} <strong style={{ marginLeft: "5px" }}>+{bonus}</strong>
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSkill && toggleSkill(skill)}
                        disabled={!isSelected && selectedSkills.length >= 2}
                      />
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
                    {abilityLabels[ability]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Languages & Tools */}
          <div className="skills-box white-box2" style={{ width: "200px", height: "500px" }}>
            <h3>Proficiencies</h3>
            <div className="skills-tabs-container2">
              <div className="skills-tab-buttons2">
                <button
                  className={`skills-tab-btn2 ${profTab === "Languages" ? "active" : ""}`}
                  onClick={() => setProfTab("Languages")}
                >
                  Languages
                </button>
                <button
                  className={`skills-tab-btn2 ${profTab === "Tools" ? "active" : ""}`}
                  onClick={() => setProfTab("Tools")}
                >
                  Tools
                </button>
              </div>
            </div>

            <div className="skills-tab-content2">
              {profTab === "Languages" &&
                languagesArray.map((lang, index) => (
                  <input
                    key={index}
                    type="text"
                    value={lang}
                    onChange={(e) => {
                      const newArr = [...languagesArray];
                      newArr[index] = e.target.value.slice(0, 20);
                      setLanguagesArray(newArr);
                    }}
                    placeholder="Type language..."
                    maxLength={20}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      fontFamily: "'Caudex', serif",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  />
                ))}
              {profTab === "Languages" && (
                <button
                  onClick={() => setLanguagesArray([...languagesArray, ""])}
                  style={{
                    marginTop: "5px",
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#199a6a",
                    color: "#fff",
                    fontFamily: "'Caudex', serif",
                    cursor: "pointer",
                  }}
                >
                  Add Language
                </button>
              )}

              {profTab === "Tools" &&
                toolsArray.map((tool, index) => (
                  <input
                    key={index}
                    type="text"
                    value={tool}
                    onChange={(e) => {
                      const newArr = [...toolsArray];
                      newArr[index] = e.target.value.slice(0, 20);
                      setToolsArray(newArr);
                    }}
                    placeholder="Type tool..."
                    maxLength={20}
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      fontFamily: "'Caudex', serif",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  />
                ))}
              {profTab === "Tools" && (
                <button
                  onClick={() => setToolsArray([...toolsArray, ""])}
                  style={{
                    marginTop: "5px",
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#199a6a",
                    color: "#fff",
                    fontFamily: "'Caudex', serif",
                    cursor: "pointer",
                  }}
                >
                  Add Tool
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundCreation;
