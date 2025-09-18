import React, { useState } from "react";
import "../encounter.css";
import goblinImg from "../../../assets/images/goblin.jpg";
import orcImg from "../../../assets/images/orc.jpg";
import elfImg from "../../../assets/images/elf.jpg";

const EncounterList = ({ onSelectEncounter, onCreateEncounter }) => {
  const [encounters] = useState([
    { id: 1, name: "Grik Nok", race: "Goblin", level: 3, image: goblinImg, ac: 15, hp: { current: 19, max: 25 }, speed: 30 },
    { id: 2, name: "Throg", race: "Orc", level: 5, image: orcImg, ac: 17, hp: { current: 40, max: 50 }, speed: 30 },
    { id: 3, name: "Lyria", race: "Elf", level: 4, image: elfImg, ac: 14, hp: { current: 28, max: 32 }, speed: 35 },
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

        {/* === Add Encounter Box (opens popup) === */}
        <div
          className="encounter-box add-encounter-box"
          onClick={() => onCreateEncounter && onCreateEncounter()}
        >
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

