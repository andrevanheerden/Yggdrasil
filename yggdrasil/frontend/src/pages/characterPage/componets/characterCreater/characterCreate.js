// CharacterCreater.js
import React, { useState, useRef } from "react";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CharacterSheetCreater from "./characterSheetCreater";
import ClassCreation from "./classCreater";
import CharacterDesCreater from "./characterDesCreater";
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
  const [progress, setProgress] = useState(33);

  // Character base data
  const [characterName, setCharacterName] = useState("New Character");
  const [abilityScores, setAbilityScores] = useState(
    abilities.reduce((acc, ab) => ({ ...acc, [ab]: 10 }), {})
  );
  const [hp, setHp] = useState({ current: 10, max: 10 });
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(30);
  const [activeTab, setActiveTab] = useState("Str");

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

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

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
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
      formData.append("selected_skills", JSON.stringify(selectedSkills));
      formData.append("class_name", className);
      formData.append("description", description);

      if (characterFile) formData.append("character_img", characterFile);

      const response = await axios.post("http://localhost:5000/api/characters", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Character saved:", response.data);
      alert("Character saved successfully!");
      onClose && onClose();
    } catch (err) {
      console.error("Error saving character:", err);
      alert("Failed to save character.");
    }
  };

  const handleNext = () => {
    if (currentPage === "stats") {
      setCurrentPage("description");
      setProgress(66);
    } else if (currentPage === "description") {
      setCurrentPage("class");
      setProgress(100);
    } else if (currentPage === "class") {
      saveCharacter();
    }
  };

  const handlePrev = () => {
    if (currentPage === "description") {
      setCurrentPage("stats");
      setProgress(33);
    } else if (currentPage === "class") {
      setCurrentPage("description");
      setProgress(66);
    }
  };

  const handleExit = () => onClose && onClose();

  const character = { level, speed, ac: 10 + getModifier(abilityScores.Dex) };

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
            setSpeed={setSpeed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            initialSkills={initialSkills}
            abilityData={abilityData}
            savingData={savingData}
            chartOptions={chartOptions}
            savingThrowOptions={savingThrowOptions}
            level={level}
            setLevel={setLevel}
          />
        ) : currentPage === "description" ? (
          <CharacterDesCreater description={description} setDescription={setDescription} />
        ) : currentPage === "class" ? (
          <ClassCreation
            className={className}
            setClassName={setClassName}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            initialSkills={initialSkills}
          />
        ) : null}
      </div>

      <button className="nav-arrow right" onClick={handleNext}>▶</button>
    </div>
  );
};

export default CharacterCreater;

