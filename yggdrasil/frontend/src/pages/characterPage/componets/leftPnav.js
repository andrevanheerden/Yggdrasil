import React, { useState } from "react";
import CharacterDes from "./characterDes";
import BackgroundDes from "./backgroundDes";
import ClassDes from "./classDes";
import RaceDes from "./raceDes";
import "../character.css";

const CharacterLeftP = () => {
  const [activeTab, setActiveTab] = useState("desc"); // default to Description

  return (
    <div className="char-left-tab-container">
      {/* Horizontal Tabs */}
      <div className="char-left-tab-buttons">
        <button 
          className={`char-left-tab-btn ${activeTab === "desc" ? "active" : ""}`} 
          onClick={() => setActiveTab("desc")}
        >
          Description
        </button>
        <button 
          className={`char-left-tab-btn ${activeTab === "background" ? "active" : ""}`} 
          onClick={() => setActiveTab("background")}
        >
          Background
        </button>
        <button 
          className={`char-left-tab-btn ${activeTab === "class" ? "active" : ""}`} 
          onClick={() => setActiveTab("class")}
        >
          Class
        </button>
        <button 
          className={`char-left-tab-btn ${activeTab === "race" ? "active" : ""}`} 
          onClick={() => setActiveTab("race")}
        >
          Race
        </button>
      </div>

      {/* Render selected tab content */}
      <div className="char-left-tab-content">
        {activeTab === "desc" && <CharacterDes />}
        {activeTab === "background" && <BackgroundDes />}
        {activeTab === "class" && <ClassDes />}
        {activeTab === "race" && <RaceDes />}
      </div>
    </div>
  );
};

export default CharacterLeftP;


