import React, { useState } from "react";
import "../encounter.css";
import goblinImg from "../../../assets/images/goblin.jpg";
import orcImg from "../../../assets/images/orc.jpg";
import elfImg from "../../../assets/images/elf.jpg";

const EncounterList = ({ onSelectEncounter }) => {
  const [encounters] = useState([
    { 
      id: 1, 
      name: "Grik Nok", 
      race: "Goblin", 
      level: 3, 
      image: goblinImg,
      ac: 15,
      hp: { current: 19, max: 25 },
      speed: 30,
      abilityScores: [12, 14, 11, 8, 10, 9],
      savingThrows: [2, 4, 2, -1, 0, -1],
    },
    { 
      id: 2, 
      name: "Throg", 
      race: "Orc", 
      level: 5, 
      image: orcImg,
      ac: 17,
      hp: { current: 40, max: 50 },
      speed: 30,
      abilityScores: [16, 12, 15, 8, 10, 9],
      savingThrows: [3, 1, 3, -1, 0, -1],
    },
    { 
      id: 3, 
      name: "Lyria", 
      race: "Elf", 
      level: 4, 
      image: elfImg,
      ac: 14,
      hp: { current: 28, max: 32 },
      speed: 35,
      abilityScores: [10, 16, 12, 14, 13, 12],
      savingThrows: [0, 3, 1, 2, 1, 1],
    },
  ]);

  return (
    <div className="encounter-list-wrapper">
      <h2 className="encounter-list-title">Encounter List</h2>
      <div className="encounter-list-container">
        {encounters.map((enc) => (
          <div
            key={enc.id}
            className="encounter-box"
            onClick={() => onSelectEncounter && onSelectEncounter(enc)}
          >
            <div className="encounter-img-container">
              <img src={enc.image} alt={enc.name} className="encounter-img" />
            </div>
            <div className="encounter-info">
              <div className="encounter-name">{enc.name}</div>
              <div className="encounter-race">{enc.race}</div>
            </div>
            <div className="encounter-level">Lvl {enc.level}</div>
          </div>
        ))}

        {/* === Add Encounter Box === */}
        <div className="encounter-box add-encounter-box">
          <div className="encounter-img-container">
            <div className="add-plus">+</div>
          </div>
          <div className="encounter-info">
            <div className="encounter-name">Add Encounter</div>
            <div className="encounter-race">Click to add</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncounterList;
