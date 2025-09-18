import React from "react";

const CharacterDesCreater = () => {
  return (
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
        placeholder="Write your character's backstory personality, and appearance here..."
      />
    </div>
  );
};

export default CharacterDesCreater;