import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import EncounterCreater from "./componets/encounterCreater/encounterCreater"; 
import EditEncounterPopup from "./componets/encounterEdit/EditEncounterPopup";
import "./encounter.css";
import { useSEO } from "../../hook/useSEO"; 
import RequireLoginPopup from '../loginPopup/requireLoginPopup';


function Encounter() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  
  // --- SEO ---
  useSEO({
    title: "Yggdrasil — DnD Encounter Manager",
    description: "Create and manage Dungeons & Dragons encounters online for free. Track encounters, manage NPCs, and organize your campaigns with Yggdrasil, the free DnD adventure and character manager.",
    keywords: "DnD, Dungeons & Dragons, RPG, encounter manager, campaign manager, NPC tracker, adventure builder, tabletop RPG, role-playing game tools, free DnD tools, online DnD",
    canonical: "https://andredv.xyz/encounter",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Yggdrasil Encounter Manager",
      "url": "https://andredv.xyz/encounter",
      "description": "Manage Dungeons & Dragons encounters online for free. Track encounters, manage NPCs, and organize your campaigns with Yggdrasil.",
      "publisher": {
        "@type": "Organization",
        "name": "Yggdrasil",
        "url": "https://andredv.xyz/"
      }
    }
  });

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
     <RequireLoginPopup />
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



