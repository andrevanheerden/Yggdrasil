import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import EncounterCreater from "./componets/encounterCreater/encounterCreater"; 
import EditEncounterPopup from "./componets/encounterEdit/EditEncounterPopup";
import "./encounter.css";

function Encounter() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  // --- Create Popup ---
  const handleOpenCreatePopup = () => setShowCreatePopup(true);
  const handleCloseCreatePopup = () => setShowCreatePopup(false);

  const handleCreateEncounter = (newEncounter) => {
    console.log("Encounter created:", newEncounter);
    setShowCreatePopup(false);
  };

  // --- Edit Popup ---
  const handleOpenEditPopup = () => setShowEditPopup(true);
  const handleCloseEditPopup = () => setShowEditPopup(false);

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
          <LeftP 
            onCreateEncounter={handleOpenCreatePopup} 
            onSelectEncounter={setSelectedEncounter} 
            onEditEncounter={handleOpenEditPopup} // Added for editing
          />
          <RightP selectedEncounter={selectedEncounter} />
        </div>
      </div>

      {/* Create Encounter Popup */}
      {showCreatePopup && (
        <EncounterCreater
          onClose={handleCloseCreatePopup}
          onCreate={handleCreateEncounter}
        />
      )}

      {/* Edit Encounter Popup */}
      {showEditPopup && selectedEncounter && (
        <EditEncounterPopup
          encounter={selectedEncounter}
          onClose={handleCloseEditPopup}
        />
      )}
    </>
  );
}

export default Encounter;



