import React, { useState, useRef } from "react";
import "../../../characterPage/character.css";
import pageBg from "../../../../assets/images/page.png";
import EncounterSheetCreater from "./encounterSheetCreater";
import RaceCreation from "./raceCreater";
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

const EncounterCreater = ({ onClose, campaignId }) => {
  // Use latest campaign from localStorage if prop is missing
  const latestCampaignId = campaignId || localStorage.getItem("selectedCampaignId");

  const [activeTab, setActiveTab] = useState("Str");
  const [abilityScores, setAbilityScores] = useState(
    abilities.reduce((acc, ab) => ({ ...acc, [ab]: 10 }), {})
  );
  const [hp, setHp] = useState({ current: 10, max: 10 });
  const [acBase] = useState(10);
  const [speed] = useState(30);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [encounterName, setEncounterName] = useState("New Encounter");
  const [encounterImage, setEncounterImage] = useState(null);
  const [currentPage, setCurrentPage] = useState("stats");
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(33);

  const [raceName, setRaceName] = useState("");
  const [languagesArray, setLanguagesArray] = useState([""]);
  const [toolsArray, setToolsArray] = useState([""]);
  const [description, setDescription] = useState("");

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setEncounterImage(event.target.result);
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

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill);
      } else {
        if (prev.length < 2) return [...prev, skill];
        return prev;
      }
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

  const encounter = {
    name: encounterName,
    ac: acBase + getModifier(abilityScores.Dex),
    level: 1,
    speed,
  };

  // SAVE ENCOUNTER TO BACKEND
  const saveEncounter = async () => {
    const usedCampaignId = latestCampaignId;
    if (!usedCampaignId) {
      alert("You must be in a campaign to create an encounter.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("campaign_id", usedCampaignId);
      formData.append("encounter_name", encounterName);
      formData.append("encounter_AC", acBase + getModifier(abilityScores.Dex));
      formData.append("encounter_level", 1);
      formData.append("encounter_speed", speed);
      formData.append("encounter_current_HP", hp.current);
      formData.append("encounter_max_HP", hp.max);
      formData.append("encounter_ability_score_str", abilityScores.Str);
      formData.append("encounter_ability_score_dex", abilityScores.Dex);
      formData.append("encounter_ability_score_con", abilityScores.Con);
      formData.append("encounter_ability_score_int", abilityScores.Int);
      formData.append("encounter_ability_score_wis", abilityScores.Wis);
      formData.append("encounter_ability_score_cha", abilityScores.Cha);
      formData.append("skill_modefed_1", selectedSkills[0] || "");
      formData.append("skill_modefed_2", selectedSkills[1] || "");
      formData.append("encounter_dec", description);
      formData.append("race_name", raceName);
      formData.append("race_dec", description);
      formData.append("race_skill_modefed_1", selectedSkills[0] || "");
      formData.append("race_skill_modefed_2", selectedSkills[1] || "");
      formData.append("race_proficiencie_languages", JSON.stringify(languagesArray));
      formData.append("race_proficiencie_tools", JSON.stringify(toolsArray));

      if (fileInputRef.current && fileInputRef.current.files[0]) {
        formData.append("encounter_img", fileInputRef.current.files[0]);
      }

      const response = await axios.post("http://localhost:5000/api/encounters", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Encounter saved:", response.data);
      alert("Encounter saved successfully!");
      onClose && onClose();
    } catch (err) {
      console.error("Error saving encounter:", err);
      alert("Failed to save encounter.");
    }
  };

  const handleNext = () => {
    if (currentPage === "stats") {
      setCurrentPage("description");
      setProgress(66);
    } else if (currentPage === "description") {
      setCurrentPage("race");
      setProgress(100);
    } else if (currentPage === "race") {
      saveEncounter();
    }
  };

  const handlePrev = () => {
    if (currentPage === "description") {
      setCurrentPage("stats");
      setProgress(33);
    } else if (currentPage === "race") {
      setCurrentPage("description");
      setProgress(66);
    }
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
              value={encounterName}
              onChange={(e) => setEncounterName(e.target.value)}
              className="character-name-input"
              placeholder="Encounter Name"
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
                  backgroundImage: encounterImage ? `url(${encounterImage})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: currentPage === "stats" ? "pointer" : "default",
                  border: "2px solid #333",
                  marginBottom: "5px",
                }}
              >
                {!encounterImage && <span>{currentPage === "stats" ? "Click to upload" : "No Image"}</span>}
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
          <EncounterSheetCreater
            abilities={abilities}
            abilityScores={abilityScores}
            changeAbility={changeAbility}
            getModifier={getModifier}
            hp={hp}
            changeHp={changeHp}
            character={encounter}
            speed={speed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            initialSkills={initialSkills}
            abilityData={abilityData}
            savingData={savingData}
            chartOptions={chartOptions}
            savingThrowOptions={savingThrowOptions}
          />
        ) : currentPage === "description" ? (
          <div
            className="character-description-container"
            style={{
              width: "800px",
              height: "650px",
              background: "#D9D9D9",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
              textAlign: "center",
              margin: "20px auto",
              fontFamily: "'Caudex', serif",
              fontSize: "16px",
              color: "#333",
              display: "flex",
              flexDirection: "column",
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
              placeholder="Write your encounter's description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ) : currentPage === "race" ? (
          <RaceCreation
            initialSkills={initialSkills}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            abilityScores={abilityScores}
            raceName={raceName}
            setRaceName={setRaceName}
            languagesArray={languagesArray}
            setLanguagesArray={setLanguagesArray}
            toolsArray={toolsArray}
            setToolsArray={setToolsArray}
          />
        ) : null}
      </div>

      <button className="nav-arrow right" onClick={handleNext}>▶</button>
    </div>
  );
};

export default EncounterCreater;
