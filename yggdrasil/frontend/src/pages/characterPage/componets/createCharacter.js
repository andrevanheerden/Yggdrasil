import React, { useState } from "react";
import "../character.css";
import pageBg from "../../../assets/images/page.png";

const initialAbilities = {
  Str: 10,
  Dex: 10,
  Con: 10,
  Int: 10,
  Wis: 10,
  Cha: 10,
};

// Helper
const getModifier = (score) => Math.floor((score - 10) / 2);

const skillsByAbility = {
  Str: [{ name: "Athletics" }],
  Dex: [
    { name: "Acrobatics" },
    { name: "Sleight of Hand" },
    { name: "Stealth" },
  ],
  Con: [{ name: "Endurance" }],
  Int: [
    { name: "Arcana" },
    { name: "History" },
    { name: "Investigation" },
    { name: "Nature" },
    { name: "Religion" },
  ],
  Wis: [
    { name: "Animal Handling" },
    { name: "Insight" },
    { name: "Medicine" },
    { name: "Perception" },
    { name: "Survival" },
  ],
  Cha: [
    { name: "Deception" },
    { name: "Intimidation" },
    { name: "Performance" },
    { name: "Persuasion" },
  ],
};

const CreateCharacterPopup = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Character Info",
    "Description",
    "Background",
    "Race",
    "Class & Energy",
  ];

// eslint-disable-next-line no-unused-vars
const [abilities] = useState(initialAbilities);


  const [character, setCharacter] = useState({
    name: "",
    level: 1,
    portrait: null,
    hp: 10,
    conMod: 0,
    description: "",
    backgroundName: "",
    backgroundDesc: "",
    raceName: "",
    raceDesc: "",
    className: "",
    classDesc: "",
    proficiencies: [""],
    raceProficiencies: [""],
    classProficiencies: [""],
    languages: ["Common", "Elvish"],
    weapons: ["", "", ""],
    energies: [
      {
        name: "Energy",
        ability: "Str",
        hasLevels: true,
        maxLevel: 3,
        levels: [{ lvl: 1, amount: 1 }, { lvl: 2, amount: 1 }, { lvl: 3, amount: 1 }],
      },
    ],
    selectedSkills: [],
  });

  const handleNext = () => step < steps.length - 1 ? setStep(step + 1) : onCreate && onCreate(character);
  const handlePrev = () => step > 0 && setStep(step - 1);

  const toggleSkill = (skill) => {
    const sel = character.selectedSkills;
    if (sel.includes(skill)) {
      setCharacter({ ...character, selectedSkills: sel.filter((s) => s !== skill) });
    } else if (sel.length < 2) {
      setCharacter({ ...character, selectedSkills: [...sel, skill] });
    }
  };

  const handleAddField = (listName) => {
    setCharacter({ ...character, [listName]: [...character[listName], ""] });
  };

  const handleRemoveField = (listName, idx) => {
    const newList = [...character[listName]];
    newList.splice(idx, 1);
    setCharacter({ ...character, [listName]: newList });
  };

  const ac = 10 + getModifier(abilities.Dex);
  const speed = 30;

  return (
    <div className="character-popup-overlay">
      <div className="character-popup" style={{ backgroundImage: `url(${pageBg})` }}>
        <div className="popup-progress-bar">
          <div className="popup-progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <h2 className="popup-title">{steps[step]}</h2>
        <div className="popup-content">
          {step === 0 && (
            <div>
              {/* Character Info */}
              <div className="character-header">
                <div className="portrait-circle">
                  <input type="file" accept="image/*" onChange={(e) => setCharacter({ ...character, portrait: URL.createObjectURL(e.target.files[0]) })} />
                  {character.portrait && <img src={character.portrait} alt="portrait" />}
                </div>
                <div>
                  <label>Name: <input type="text" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} /></label>
                  <label>Level: <input type="number" value={character.level} min="1" onChange={(e) => setCharacter({ ...character, level: Number(e.target.value) })} /></label>
                </div>
              </div>
              <div className="stats-row">
                <div className="stat-box">AC: {ac}</div>
                <div className="stat-box">Speed: {speed}</div>
                <div className="stat-box">HP: <input type="number" value={character.hp} onChange={(e) => setCharacter({ ...character, hp: Number(e.target.value) })} /> + {character.conMod}</div>
              </div>

              <h3>Abilities</h3>
              <div className="ability-scores">
                {Object.keys(abilities).map((a) => (
                  <div key={a} className="ability-box">
                    {a}: {abilities[a]} (Mod {getModifier(abilities[a]) >= 0 ? "+" : ""}{getModifier(abilities[a])})
                  </div>
                ))}
              </div>

              <h3>Skills</h3>
              <div className="skills-container">
                {Object.entries(skillsByAbility).map(([ab, skills]) => (
                  <div key={ab} className="skills-group">
                    <h4>{ab}</h4>
                    {skills.map((s) => (
                      <label key={s.name}>
                        <input
                          type="checkbox"
                          checked={character.selectedSkills.includes(s.name)}
                          onChange={() => toggleSkill(s.name)}
                          disabled={!character.selectedSkills.includes(s.name) && character.selectedSkills.length >= 2}
                        />
                        {s.name} {character.selectedSkills.includes(s.name) ? "(+2)" : ""}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <textarea placeholder="Character Description..." value={character.description} onChange={(e) => setCharacter({ ...character, description: e.target.value })} className="big-textarea" />
            </div>
          )}

          {step === 2 && (
            <div>
              <label>Background Name: <input type="text" value={character.backgroundName} onChange={(e) => setCharacter({ ...character, backgroundName: e.target.value })} /></label>
              <textarea placeholder="Background Description..." value={character.backgroundDesc} onChange={(e) => setCharacter({ ...character, backgroundDesc: e.target.value })} className="big-textarea" />
              <h4>Proficiencies</h4>
              {character.proficiencies.map((p, idx) => (
                <div key={idx}>
                  <input type="text" value={p} onChange={(e) => { const newList = [...character.proficiencies]; newList[idx] = e.target.value; setCharacter({ ...character, proficiencies: newList }); }} />
                  <button onClick={() => handleRemoveField("proficiencies", idx)}>-</button>
                  {idx === character.proficiencies.length - 1 && <button onClick={() => handleAddField("proficiencies")}>+</button>}
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <label>Race Name: <input type="text" value={character.raceName} onChange={(e) => setCharacter({ ...character, raceName: e.target.value })} /></label>
              <textarea placeholder="Race Description..." value={character.raceDesc} onChange={(e) => setCharacter({ ...character, raceDesc: e.target.value })} className="big-textarea" />
              <h4>Race Proficiencies</h4>
              {character.raceProficiencies.map((p, idx) => (
                <div key={idx}>
                  <input type="text" value={p} onChange={(e) => { const newList = [...character.raceProficiencies]; newList[idx] = e.target.value; setCharacter({ ...character, raceProficiencies: newList }); }} />
                  <button onClick={() => handleRemoveField("raceProficiencies", idx)}>-</button>
                  {idx === character.raceProficiencies.length - 1 && <button onClick={() => handleAddField("raceProficiencies")}>+</button>}
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <label>Class Name: <input type="text" value={character.className} onChange={(e) => setCharacter({ ...character, className: e.target.value })} /></label>
              <textarea placeholder="Class Description..." value={character.classDesc} onChange={(e) => setCharacter({ ...character, classDesc: e.target.value })} className="big-textarea" />

              <h4>Energy</h4>
              {character.energies.map((en, idx) => (
                <div key={idx} className="energy-container">
                  <input placeholder="Energy Name" value={en.name} onChange={(e) => { const newList = [...character.energies]; newList[idx].name = e.target.value; setCharacter({ ...character, energies: newList }); }} />
                  <select value={en.ability} onChange={(e) => { const newList = [...character.energies]; newList[idx].ability = e.target.value; setCharacter({ ...character, energies: newList }); }}>
                    {Object.keys(abilities).map((a) => <option key={a}>{a}</option>)}
                  </select>
                  <label><input type="checkbox" checked={en.hasLevels} onChange={(e) => { const newList = [...character.energies]; newList[idx].hasLevels = e.target.checked; setCharacter({ ...character, energies: newList }); }} /> Has Levels</label>

                  {/* Visual circles for energy levels */}
                  {en.hasLevels && (
                    <div className="energy-levels">
                      {Array.from({ length: en.maxLevel }).map((_, i) => (
                        <span key={i} className={`energy-circle ${i < en.levels.length && en.levels[i].amount > 0 ? "filled" : ""}`}></span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <h4>Class Proficiencies</h4>
              {character.classProficiencies.map((p, idx) => (
                <div key={idx}>
                  <input type="text" value={p} onChange={(e) => { const newList = [...character.classProficiencies]; newList[idx] = e.target.value; setCharacter({ ...character, classProficiencies: newList }); }} />
                  <button onClick={() => handleRemoveField("classProficiencies", idx)}>-</button>
                  {idx === character.classProficiencies.length - 1 && <button onClick={() => handleAddField("classProficiencies")}>+</button>}
                </div>
              ))}
              <label><input type="checkbox" /> Extra Attack at Level 5</label>
            </div>
          )}
        </div>

        <div className="popup-buttons">
          {step > 0 && <button onClick={handlePrev}>Previous</button>}
          <button onClick={handleNext}>{step === steps.length - 1 ? "Create" : "Next"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterPopup;
