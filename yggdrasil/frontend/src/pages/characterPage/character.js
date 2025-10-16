import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png";
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import CreateCharacterPopup from "./componets/characterCreater/characterCreate";
import EditCharacterPopup from "./componets/characterEdit/EditCharacterPopup";
import "./character.css";

function Character() {
  const [activeTab, setActiveTab] = useState("characterList");
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); // ✅ FIXED: Added state
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // --- Create popup ---
  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  // --- Edit popup ---
  const handleOpenEditPopup = () => setShowEditPopup(true);
  const handleCloseEditPopup = () => setShowEditPopup(false);

  const handleCreateCharacter = (newCharacter) => {
    console.log("Character created:", newCharacter);
    setShowPopup(false);
  };

  return (
    <>
      <BookmarkNav />
      <Navbar />

      <div className="char-left-tab-buttons">
        <button
          className={`char-left-tab-btn ${
            activeTab === "characterList" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("characterList");
            setSelectedCharacter(null);
          }}
        >
          Character List
        </button>
        <button
          className={`char-left-tab-btn ${
            activeTab === "character" ? "active" : ""
          }`}
          onClick={() => setActiveTab("character")}
        >
          Character Sheet
        </button>
        <button
          className={`char-left-tab-btn ${
            activeTab === "desc" ? "active" : ""
          }`}
          onClick={() => setActiveTab("desc")}
        >
          Description
        </button>
        <button
          className={`char-left-tab-btn ${
            activeTab === "background" ? "active" : ""
          }`}
          onClick={() => setActiveTab("background")}
        >
          Background
        </button>
        <button
          className={`char-left-tab-btn ${
            activeTab === "class" ? "active" : ""
          }`}
          onClick={() => setActiveTab("class")}
        >
          Class
        </button>
        <button
          className={`char-left-tab-btn ${
            activeTab === "race" ? "active" : ""
          }`}
          onClick={() => setActiveTab("race")}
        >
          Race
        </button>
      </div>

      <div
        className="campaign-container"
        style={{
          backgroundImage: `url(${OPcover})`,
          marginTop: "20px",
          overflow: "visible",
        }}
      >
        <div className="top-block"></div>
        <div className="book-wrapper">
          <LeftP
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onCreateCharacter={handleOpenPopup}
            onEditCharacter={handleOpenEditPopup} // ✅ Added
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
          <RightP selectedCharacter={selectedCharacter} />
        </div>
      </div>

      {showPopup && (
        <CreateCharacterPopup
          onClose={handleClosePopup}
          onCreate={handleCreateCharacter}
        />
      )}

      {showEditPopup && selectedCharacter && (
        <EditCharacterPopup
          character={selectedCharacter}
          onClose={handleCloseEditPopup}
        />
      )}
    </>
  );
}

export default Character;



