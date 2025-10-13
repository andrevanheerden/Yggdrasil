// CharacterCreater.js
import React, { useState, useRef } from "react";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CharacterSheetCreater from "./characterSheetCreater";
import ClassCreation from "./classCreater";
import CharacterDesCreater from "./characterDesCreater";
import RaceCreation from "./raceCreater";
import BackgroundCreation from "./backgroundCreater";
import axios from "axios";

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

const CharacterCreater = ({ onClose, campaignId }) => {
  const latestCampaignId = campaignId || localStorage.getItem("selectedCampaignId");

  const [currentPage, setCurrentPage] = useState("stats");
  const [progress, setProgress] = useState(20);

  // Character base data
  const [characterName, setCharacterName] = useState("New Character");
  const [abilityScores, setAbilityScores] = useState(
    abilities.reduce((acc, ab) => ({ ...acc, [ab]: 10 }), {})
  );
  const [hp, setHp] = useState({ current: 10, max: 10 });
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(30);
  const [activeTab, setActiveTab] = useState("Str");

  // Stats page data
  const [statsSkills, setStatsSkills] = useState([]);
  const [statsDescription, setStatsDescription] = useState(""); // If you want a description for stats
  const [statsToolProficiencies, setStatsToolProficiencies] = useState([]);
  const [statsLanguageProficiencies, setStatsLanguageProficiencies] = useState([]);

  // Race page data
  const [raceData, setRaceData] = useState({
    name: "",
    description: "",
    toolProficiencies: [],
    languageProficiencies: [],
    selectedSkills: [],
  });

  // Background page data
  const [backgroundData, setBackgroundData] = useState({
    name: "",
    description: "",
    toolProficiencies: [],
    languageProficiencies: [],
    selectedSkills: [],
  });

  // Class page data
  const [classData, setClassData] = useState({
    name: "",
    description: "",
    energyName: "",
    maxEnergyLevel: 6,
    energyLevels: Array(6).fill(0),
    toolProficiencies: [],
    languageProficiencies: [],
    selectedSkills: [],
  });

  // Character description (for the main character, not background/race/class)
  const [characterDescription, setCharacterDescription] = useState("");

  const fileInputRef = useRef(null);
  const [characterFile, setCharacterFile] = useState(null);
  const [characterImage, setCharacterImage] = useState(null);

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
        const newCurrent = Math.max(0, Math.min(prev.current + delta, prev.max));
        return { ...prev, current: newCurrent };
      } else {
        const newMax = Math.max(1, prev.max + delta);
        const newCurrent = Math.min(prev.current, newMax);
        return { current: newCurrent, max: newMax };
      }
    });
  };

  // Stats skills (main character skills)
  const toggleStatsSkill = (skill) => {
    setStatsSkills((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      if (prev.length < 2) return [...prev, skill];
      return prev;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCharacterFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setCharacterImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };
  const triggerFileInput = () => fileInputRef.current.click();

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

  const saveCharacter = async () => {
    if (!latestCampaignId) {
      alert("You must be in a campaign to save a character.");
      return;
    }
    try {
      // 1. Save main character
      const formData = new FormData();
      formData.append("campaign_id", latestCampaignId);
      formData.append("character_name", characterName);
      formData.append("level", level);
      formData.append("speed", speed);
      formData.append("current_hp", hp.current);
      formData.append("max_hp", hp.max);
      abilities.forEach((ab) => {
        formData.append(`ability_score_${ab.toLowerCase()}`, abilityScores[ab]);
      });
      formData.append("selected_skills", JSON.stringify(statsSkills));
      formData.append("description", characterDescription);

      if (characterFile) formData.append("character_img", characterFile);

      const response = await axios.post("http://localhost:5000/api/characters", formData);
      const { character_id } = response.data;

      // 2. Save race (separate description, skills, tools, languages)
      await axios.post("http://localhost:5000/api/character-races", {
        character_id,
        race_name: raceData.name,
        race_description: raceData.description,
        race_skill_1: raceData.selectedSkills[0] || "",
        race_skill_2: raceData.selectedSkills[1] || "",
        tool_proficiencies: JSON.stringify(raceData.toolProficiencies),
        language_proficiencies: JSON.stringify(raceData.languageProficiencies),
      });

      // 3. Save background (separate description, skills, tools, languages)
      await axios.post("http://localhost:5000/api/character-backgrounds", {
        character_id,
        background_name: backgroundData.name,
        background_description: backgroundData.description,
        skill_selected_1: backgroundData.selectedSkills[0] || "",
        skill_selected_2: backgroundData.selectedSkills[1] || "",
        tool_proficiencies: JSON.stringify(backgroundData.toolProficiencies),
        language_proficiencies: JSON.stringify(backgroundData.languageProficiencies),
      });

      // 4. Save class (separate description, skills, tools, languages)
      await axios.post("http://localhost:5000/api/character-classes", {
        character_id,
        class_name: classData.name,
        class_description: classData.description,
        energy_name: classData.energyName,
        max_energy_level: classData.maxEnergyLevel,
        amount_lv1: classData.energyLevels[0],
        amount_lv2: classData.energyLevels[1],
        amount_lv3: classData.energyLevels[2],
        amount_lv4: classData.energyLevels[3],
        amount_lv5: classData.energyLevels[4],
        amount_lv6: classData.energyLevels[5],
        tool_proficiencies: JSON.stringify(classData.toolProficiencies),
        language_proficiencies: JSON.stringify(classData.languageProficiencies),
        selected_skills: JSON.stringify(classData.selectedSkills),
      });

      alert("Character saved successfully!");
      onClose && onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save character.");
    }
  };

  const handleNext = () => {
    if (currentPage === "stats") {
      setCurrentPage("description");
      setProgress(40);
    } else if (currentPage === "description") {
      setCurrentPage("race");
      setProgress(60);
    } else if (currentPage === "race") {
      setCurrentPage("background");
      setProgress(80);
    } else if (currentPage === "background") {
      setCurrentPage("class");
      setProgress(100);
    } else if (currentPage === "class") {
      saveCharacter();
    }
  };

  const handlePrev = () => {
    if (currentPage === "description") {
      setCurrentPage("stats");
      setProgress(20);
    } else if (currentPage === "race") {
      setCurrentPage("description");
      setProgress(40);
    } else if (currentPage === "background") {
      setCurrentPage("race");
      setProgress(60);
    } else if (currentPage === "class") {
      setCurrentPage("background");
      setProgress(80);
    }
  };

  const handleExit = () => onClose && onClose();

  const character = { level, speed, ac: 10 + getModifier(abilityScores.Dex) };

  // Add these toggle functions for each page
  const toggleRaceSkill = (skill) => {
    setRaceData((prev) => {
      const already = prev.selectedSkills.includes(skill);
      let updated;
      if (already) {
        updated = prev.selectedSkills.filter((s) => s !== skill);
      } else if (prev.selectedSkills.length < 2) {
        updated = [...prev.selectedSkills, skill];
      } else {
        updated = prev.selectedSkills;
      }
      return { ...prev, selectedSkills: updated };
    });
  };

  const toggleBackgroundSkill = (skill) => {
    setBackgroundData((prev) => {
      const already = prev.selectedSkills.includes(skill);
      let updated;
      if (already) {
        updated = prev.selectedSkills.filter((s) => s !== skill);
      } else if (prev.selectedSkills.length < 2) {
        updated = [...prev.selectedSkills, skill];
      } else {
        updated = prev.selectedSkills;
      }
      return { ...prev, selectedSkills: updated };
    });
  };

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
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: "none" }} />
            </div>
          </div>
        )}

        {currentPage === "stats" && (
          <CharacterSheetCreater
            abilities={abilities}
            abilityScores={abilityScores}
            changeAbility={changeAbility}
            getModifier={getModifier}
            hp={hp}
            changeHp={changeHp}
            character={character}
            speed={speed}
            setSpeed={setSpeed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedSkills={statsSkills}
            toggleSkill={toggleStatsSkill}
            initialSkills={initialSkills}
            abilityData={abilityData}
            savingData={savingData}
            chartOptions={chartOptions}
            savingThrowOptions={savingThrowOptions}
            level={level}
            setLevel={setLevel}
            // If you want to add tool/language proficiencies for stats, pass them here
            // toolProficiencies={statsToolProficiencies}
            // setToolProficiencies={setStatsToolProficiencies}
            // languageProficiencies={statsLanguageProficiencies}
            // setLanguageProficiencies={setStatsLanguageProficiencies}
          />
        )}
        {currentPage === "description" && (
          <CharacterDesCreater description={characterDescription} setDescription={setCharacterDescription} />
        )}
        {currentPage === "race" && (
          <RaceCreation
            initialSkills={initialSkills}
            selectedSkills={raceData.selectedSkills}
            toggleSkill={toggleRaceSkill}
            raceData={raceData}
            setRaceData={setRaceData}
          />
        )}
        {currentPage === "background" && (
          <BackgroundCreation
            initialSkills={initialSkills}
            selectedSkills={backgroundData.selectedSkills}
            toggleSkill={toggleBackgroundSkill}
            backgroundData={backgroundData}
            setBackgroundData={setBackgroundData}
          />
        )}
        {currentPage === "class" && (
          <ClassCreation
            classData={classData}
            setClassData={setClassData}
            initialSkills={initialSkills}
          />
        )}
      </div>

      <button className="nav-arrow right" onClick={handleNext}>▶</button>
    </div>
  );
};

export default CharacterCreater;
