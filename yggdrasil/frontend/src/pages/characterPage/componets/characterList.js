import React, { useState } from "react";
import "../character.css";
import rose from "../../../assets/images/rose.jpg"; // Portrait from CharacterSheet

const CharacterList = ({ onSelectCharacter, onCreateCharacter }) => {
  const [character] = useState({
    id: 1,
    name: "Alex Black",
    race: "Human",
    class: "Shinobi",
    background: "Scholar",
    level: 1,
    ac: 19,
    hp: { current: 19, max: 25 },
    speed: 30,
    image: rose,
  });

  return (
    <div className="encounter-list-wrapper">
      <h2 className="encounter-list-title">Character</h2>

      {/* Existing Character */}
      <div
        className="encounter-box"
        onClick={() => onSelectCharacter && onSelectCharacter(character)}
      >
        <div className="encounter-img-container">
          <img
            src={character.image}
            alt={character.name}
            className="encounter-img"
          />
        </div>

        <div className="encounter-info">
          <div className="encounter-name">{character.name}</div>
          <div className="encounter-race">{character.race}</div>
          <div className="encounter-class">{character.class}</div>
          <div className="encounter-bg">{character.background}</div>
        </div>

        <div className="encounter-stats">
          <div className="encounter-level">Lvl {character.level}</div>
          <div className="encounter-ac">AC {character.ac}</div>
          <div className="encounter-speed">Speed {character.speed}</div>
          <div className="encounter-hp">
            HP {character.hp.current}/{character.hp.max}
          </div>
        </div>
      </div>

      {/* ➕ Create New Character */}
      <div
        className="encounter-box create-new"
        onClick={() => onCreateCharacter && onCreateCharacter()}
      >
        <div className="encounter-img-container">
          <div className="encounter-img placeholder">+</div>
        </div>
        <div className="encounter-info">
          <div className="encounter-name">Create New Character</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterList;


