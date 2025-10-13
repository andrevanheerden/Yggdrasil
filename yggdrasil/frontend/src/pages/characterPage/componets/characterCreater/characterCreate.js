import React, { useState, useRef } from "react";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CharacterSheetCreater from "./characterSheetCreater";
import CharacterDesCreater from "./characterDesCreater";
import BackgroundCreation from "./backgroundCreater";
import RaceCreation from "./raceCreater";
import ClassCreation from "./classCreater";

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

const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
const initialSkills = {
  Str: ["Athletics"],
  Dex: ["Acrobatics", "Sleight of Hand", "Stealth"],
  Con: ["Endurance"],
  Int: ["Arcana", "History", "Investigation", "Nature", "Religion"],
  Wis: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
  Cha: ["Deception", "Intimidation", "Performance", "Persuasion"],
};

const CharacterCreate = ({ onClose }) => {
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
  const [acBase] = useState(10);
  const [speed] = useState(30);

  // Skills per page
  const [pageSelectedSkills, setPageSelectedSkills] = useState({
    stats: [],
    background: [],
    race: [],
  });

  const [characterName, setCharacterName] = useState("New Character");
  const [characterImage, setCharacterImage] = useState(null);
  const [backgroundName, setBackgroundName] = useState("");
  const [raceName, setRaceName] = useState("");
  const [className, setClassName] = useState("");
  const [currentPage, setCurrentPage] = useState("stats"); 
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(20);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCharacterImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };
  const triggerFileInput = () => fileInputRef.current.click();

  const getModifier = (score) => Math.floor((score - 10) / 2);

  const changeAbility = (ab, delta) => {
    setAbilityScores((prev) => {
      let newScore = prev[ab] + delta;
      if (newScore < 1) newScore = 1;
      if (newScore > 25) newScore = 25;
      return { ...prev, [ab]: newScore };
    });
  };

  const changeHp = (type, delta) => {
    setHp((prev) => {
      if (type === "current") {
        let newCurrent = Math.max(0, Math.min(prev.current + delta, prev.max));
        return { ...prev, current: newCurrent };
      } else {
        let newMax = Math.max(1, prev.max + delta);
        const newCurrent = Math.min(prev.current, newMax);
        return { current: newCurrent, max: newMax };
      }
    });
  };

  // Toggle skill per page (max 2 per page)
  const toggleSkill = (page, skill) => {
    setPageSelectedSkills((prev) => {
      const pageSkills = prev[page];
      let newSkills;
      if (pageSkills.includes(skill)) {
        newSkills = pageSkills.filter((s) => s !== skill);
      } else {
        if (pageSkills.length < 2) {
          newSkills = [...pageSkills, skill];
        } else {
          newSkills = pageSkills;
        }
      }
      return { ...prev, [page]: newSkills };
    });
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
  const savingThrowOptions = {
    scales: { r: { angleLines: { display: true }, suggestedMin: -5, suggestedMax: 10 } },
    plugins: { legend: { display: false } },
  };

  const character = {
    name: characterName,
    ac: acBase + getModifier(abilityScores.Dex),
    level: 1,
    speed,
  };

  const handleNext = () => {
    if (currentPage === "stats") setCurrentPage("description");
    else if (currentPage === "description") setCurrentPage("background");
    else if (currentPage === "background") setCurrentPage("race");
    else if (currentPage === "race") setCurrentPage("class");
    else if (currentPage === "class") alert("Character creation complete!");

    setProgress((prev) => Math.min(prev + 20, 100));
  };

  const handlePrev = () => {
    if (currentPage === "description") setCurrentPage("stats");
    else if (currentPage === "background") setCurrentPage("description");
    else if (currentPage === "race") setCurrentPage("background");
    else if (currentPage === "class") setCurrentPage("race");
    else setProgress(0);

    setProgress((prev) => Math.max(prev - 20, 0));
  };

  const handleExit = () => onClose && onClose();

  return (
    <div className="character-popup-overlay">
      <button className="exit-x-btn" onClick={handleExit}>✖</button>
      <button className="nav-arrow left" onClick={handlePrev}>◀</button>

      <div
        className="character-popup"
        style={{
          backgroundImage: `url(${pageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {(currentPage === "stats" || currentPage === "description") && (
          <div className="character-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="character-name-input"
              placeholder="Character Name"
              style={{ width: "50%", marginBottom: 0 }}
            />
            <div className="character-image-upload" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className="character-image-preview"
                onClick={currentPage === "stats" ? triggerFileInput : undefined}
                style={{
                  width: "125px",
                  height: "125px",
                  borderRadius: "50%",
                  backgroundColor: "#ddd",
                  backgroundImage: characterImage ? `url(${characterImage})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: currentPage === "stats" ? "pointer" : "default",
                  border: "2px solid #333",
                  marginBottom: "5px",
                }}
              >
                {!characterImage && <span>{currentPage === "stats" ? "Click to upload" : "No Image"}</span>}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}

        {currentPage === "stats" ? (
          <CharacterSheetCreater
            abilities={abilities}
            abilityScores={abilityScores}
            changeAbility={changeAbility}
            getModifier={getModifier}
            hp={hp}
            changeHp={changeHp}
            character={character}
            speed={speed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedSkills={pageSelectedSkills.stats}
            toggleSkill={(skill) => toggleSkill("stats", skill)}
            initialSkills={initialSkills}
            abilityData={abilityData}
            savingData={savingData}
            chartOptions={chartOptions}
            savingThrowOptions={savingThrowOptions}
            pageSelectedSkills={pageSelectedSkills}
          />
        ) : currentPage === "description" ? (
          <CharacterDesCreater />
        ) : currentPage === "background" ? (
          <BackgroundCreation
            initialSkills={initialSkills}
            selectedSkills={pageSelectedSkills.background}
            toggleSkill={(skill) => toggleSkill("background", skill)}
            backgroundName={backgroundName}
            setBackgroundName={setBackgroundName}
            abilityScores={abilityScores}
            pageSelectedSkills={pageSelectedSkills}
          />
        ) : currentPage === "race" ? (
          <RaceCreation
            initialSkills={initialSkills}
            selectedSkills={pageSelectedSkills.race}
            toggleSkill={(skill) => toggleSkill("race", skill)}
            raceName={raceName}
            setRaceName={setRaceName}
            abilityScores={abilityScores}
            pageSelectedSkills={pageSelectedSkills}
          />
        ) : currentPage === "class" ? (
          <ClassCreation
            initialSkills={initialSkills}
            selectedSkills={pageSelectedSkills.class}
            toggleSkill={(skill) => toggleSkill("class", skill)}
            className={className}
            setClassName={setClassName}
          />
        ) : null}
      </div>

      <button className="nav-arrow right" onClick={handleNext}>▶</button>
    </div>
  );
};

export default CharacterCreate;

