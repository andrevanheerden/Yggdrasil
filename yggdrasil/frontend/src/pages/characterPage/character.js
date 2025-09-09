import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";  
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import "./character.css";

function Character() {
  const [activeTab, setActiveTab] = useState("characterSheet"); // default to CharacterSheet

  return (
    <>
      <BookmarkNav />
      <Navbar />

      {/* Top tabs above the book */}
      <div className="char-left-tab-buttons">
        <button
          className={`char-left-tab-btn ${activeTab === "characterSheet" ? "active" : ""}`}
          onClick={() => setActiveTab("characterSheet")}
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
      <div className="campaign-container" style={{ backgroundImage: `url(${OPcover})` , marginTop: '20px' }}>
        <div className="top-block"></div>
        <div className="book-wrapper">
          <LeftP activeTab={activeTab} />  {/* renders CharacterSheet or tab content */}
          <RightP />
        </div>
      </div>
    </>
  );
}

export default Character;



