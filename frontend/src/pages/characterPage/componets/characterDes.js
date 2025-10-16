import React from "react";
import "../character.css";
import defaultPortrait from "../../../assets/images/rose.jpg";

const CharacterDes = ({ character }) => {
  // Fallback for header info
  const name = character?.name || "No Character Selected";
  const charClass = character?.class || "-";
  const race = character?.race || "-";
  const background = character?.background || "-";
  const portrait = character?.portrait || defaultPortrait;
  const description = character?.description || "No description available.";

  return (
    <div className="page left-page">
      {/* Header with portrait */}
      <div className="character-header">
        <div className="character-info">
          <div className="character-name">{name}</div>
          <div className="character-class">{charClass}</div>
          <div className="character-details">
            <div className="character-race">{race}</div>
            <div className="character-background">{background}</div>
          </div>
        </div>
        <img src={portrait} alt="Portrait" className="portrait-img2-header" />
      </div>

      {/* Description display */}
      <div className="description-box">
        <p className="description-text">{description}</p>
      </div>
    </div>
  );
};

export default CharacterDes;
