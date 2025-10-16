import React, { useState, useEffect } from "react";
import "../encounter.css";
import fallbackImg from "../../../assets/images/profile.jpg"; // fallback portrait

const EncounterDec = ({ encounter }) => {
  const [description, setDescription] = useState("No description available.");

  // Update description when encounter prop changes
  useEffect(() => {
    if (encounter) {
      setDescription(encounter.encounter_dec || "No description available.");
    }
  }, [encounter]);

  if (!encounter) {
    return <p>Select an encounter to see its description.</p>;
  }

  return (
    <div className="page left-page">
      {/* Header with portrait */}
      <div className="character-header">
        <div className="character-info">
          <div className="character-name">{encounter.encounter_name}</div>
          <div className="character-details">
            <div className="character-race">{encounter.race_name || "Unknown"}</div>
          </div>
        </div>
        <img
          src={encounter.encounter_img || fallbackImg}
          alt={encounter.encounter_name}
          className="portrait-img2-header"
        />
      </div>

      {/* Description box */}
      <div className="description-box">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-textarea"
        />
      </div>
    </div>
  );
};

export default EncounterDec;




