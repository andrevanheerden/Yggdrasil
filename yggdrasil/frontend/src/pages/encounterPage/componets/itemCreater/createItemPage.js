import React, { useState } from "react";
import "../../encounter.css";

const CreateItemPage = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  // two separate proficiencies arrays
  const [profA, setProfA] = useState([""]);
  const [profB, setProfB] = useState([""]);

  return (
    <div className="character-main">
      {/* Item Name Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          style={{
            width: "300px",
            padding: "8px",
            fontSize: "18px",
            fontFamily: "'Caudex', serif",
            borderRadius: "5px",
            border: "2px solid #333",
            marginBottom: "10px",
          }}
        />
      </div>

      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        {/* Left: Description */}
        <div
          className="character-description-container"
          style={{
            width: "800px",
            height: "721px",
            background: "#D9D9D9",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Caudex', serif",
            fontSize: "16px",
            color: "#333",
          }}
        >
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            placeholder="Write a description of the item and its information here..."
          />
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Proficiency Section A */}
          <div className="skills-box white-box3" style={{ width: "200px", height: "350px" }}>
            <h3>Proficiencies A</h3>
            {profA.map((prof, index) => (
              <input
                key={index}
                type="text"
                value={prof}
                onChange={(e) => {
                  const newArr = [...profA];
                  newArr[index] = e.target.value.slice(0, 20);
                  setProfA(newArr);
                }}
                placeholder="Type proficiency..."
                maxLength={20}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontFamily: "'Caudex', serif",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              />
            ))}
            <button
              onClick={() => setProfA([...profA, ""])}
              style={{
                marginTop: "5px",
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#199a6a",
                color: "#fff",
                fontFamily: "'Caudex', serif",
                cursor: "pointer",
              }}
            >
              Add Proficiency
            </button>
          </div>

          {/* Proficiency Section B */}
          <div className="skills-box white-box3" style={{ width: "200px", height: "350px" }}>
            <h3>Proficiencies B</h3>
            {profB.map((prof, index) => (
              <input
                key={index}
                type="text"
                value={prof}
                onChange={(e) => {
                  const newArr = [...profB];
                  newArr[index] = e.target.value.slice(0, 20);
                  setProfB(newArr);
                }}
                placeholder="Type proficiency..."
                maxLength={20}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontFamily: "'Caudex', serif",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              />
            ))}
            <button
              onClick={() => setProfB([...profB, ""])}
              style={{
                marginTop: "5px",
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#199a6a",
                color: "#fff",
                fontFamily: "'Caudex', serif",
                cursor: "pointer",
              }}
            >
              Add Proficiency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItemPage;
