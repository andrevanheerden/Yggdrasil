import React, { useState } from "react";
import "../character.css";
import pageBg from "../../../assets/images/page.png";

const CharacterDescriptionPage = ({ characterName, characterImage, onBack, onNext, onExit }) => {
  const [description, setDescription] = useState("");

  return (
    <div className="character-popup-overlay">
      {/* Exit button (X) */}
      <button className="exit-x-btn" onClick={onExit}>
        ✖
      </button>

      {/* Previous Arrow (left side) */}
      <button className="nav-arrow left" onClick={onBack}>
        ◀
      </button>

      <div
        className="character-popup"
        style={{
          backgroundImage: `url(${pageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Progress bar at top */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `50%` }}
          ></div>
        </div>

        {/* HEADER - Same as previous page */}
        <div
          className="character-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div className="character-name-input" style={{ width: "50%", marginBottom: 0, pointerEvents: "none" }}>
            {characterName}
          </div>

          <div
            className="character-image-upload"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="character-image-preview"
              style={{
                width: "125px",
                height: "125px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                backgroundImage: characterImage
                  ? `url(${characterImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "2px solid #333",
                marginBottom: "5px",
              }}
            >
              {!characterImage && <span>No Image</span>}
            </div>
          </div>
        </div>

        {/* DESCRIPTION CONTENT */}
        <div className="dm-notes-container">
          <h2 className="dm-notes-title">Character Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="dm-notes-textarea"
            placeholder="Write your character's backstory, personality, and appearance here..."
          />
        </div>
      </div>

      {/* Next Arrow (right side) */}
      <button className="nav-arrow right" onClick={onNext}>
        ▶
      </button>
    </div>
  );
};

export default CharacterDescriptionPage;