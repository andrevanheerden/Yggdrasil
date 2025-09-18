import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import EncounterCreater from "./componets/encounterCreater/encounterCreater"; // ✅ fixed import
import "./encounter.css";

function Encounter() {
  const [showPopup, setShowPopup] = useState(false); // popup visibility
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleCreateEncounter = (newEncounter) => {
    console.log("Encounter created:", newEncounter);
    setShowPopup(false);
  };

  return (
    <>      
      <BookmarkNav />
      <Navbar />

      <div
        className="campaign-container"
        style={{ backgroundImage: `url(${OPcover})`, marginTop: "20px", overflow: "visible" }}
      >
        <div className="top-block"></div>

        <div className="book-wrapper">
          {/* pass handler into LeftP so EncounterList can open the popup */}
          <LeftP 
            onCreateEncounter={handleOpenPopup} 
            onSelectEncounter={setSelectedEncounter} 
          />
          <RightP selectedEncounter={selectedEncounter} /> {/* ✅ now uses the state */}
        </div>
      </div>

      {/* Popup at top level */}
      {showPopup && (
        <EncounterCreater   // ✅ use EncounterCreater not EncounterPopup
          onClose={handleClosePopup} 
          onCreate={handleCreateEncounter} 
        />
      )}
    </>
  );
}

export default Encounter;


