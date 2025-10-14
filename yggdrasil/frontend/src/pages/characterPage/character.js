import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";  
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import CreateCharacterPopup from "./componets/characterCreater/characterCreate";
import "./character.css";

function Character() {
  const [activeTab, setActiveTab] = useState("characterList"); // default tab
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const handleCreateCharacter = (newCharacter) => {
    console.log("Character created:", newCharacter);
    setShowPopup(false);
  };

  return (
    <>
      <BookmarkNav />
      <Navbar />

      {/* Top tabs above the book */}
      <div className="char-left-tab-buttons">
        <button
          className={`char-left-tab-btn ${activeTab === "characterList" ? "active" : ""}`}
          onClick={() => setActiveTab("characterList")}
        >
          Character List
        </button>
        <button
          className={`char-left-tab-btn ${activeTab === "character" ? "active" : ""}`}
          onClick={() => setActiveTab("character")}
        >
          Character Sheet
        </button>
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

      {/* Book pages */}
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
            setActiveTab={setActiveTab} // ✅ pass setActiveTab so LeftP can switch tabs
            onCreateCharacter={handleOpenPopup}
          />  
          <RightP />
        </div>
      </div>

      {showPopup && (
        <CreateCharacterPopup
          onClose={handleClosePopup}
          onCreate={handleCreateCharacter}
        />
      )}
    </>
  );
}

export default Character;






