import React, { useState, useEffect } from "react";
import "./campaign.css";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import { useLocation } from "react-router-dom";
import CreateCampaignInfo from "./componets/createCampaignInfo";
import { useSEO } from "../../hook/useSEO";
import RequireLoginPopup from '../loginPopup/requireLoginPopup';

const Campaign = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  // Values passed from CreateCampaign
  const { openPopup, title, color, image } = location.state || {};

  useEffect(() => {
    if (openPopup) {
      setShowPopup(true);
    }
  }, [openPopup]);

  
  // --- SEO ---
  useSEO({
    title: "Yggdrasil — Free DnD Campaign Manager",
    description: "Create, edit, and manage your Dungeons & Dragons campaigns online for free with Yggdrasil. Organize quests, encounters, NPCs, and adventures for tabletop RPG players and dungeon masters.",
    keywords: "DnD, Dungeons & Dragons, RPG, campaign manager, adventure builder, quest tracker, tabletop RPG, online DnD, free DnD tools, campaign organizer, role-playing game tools, fantasy RPG tools, free RPG platform",
    canonical: "https://andredv.xyz/campaign",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Yggdrasil Campaign Manager",
      "url": "https://andredv.xyz/campaign",
      "description": "Create, edit, and manage your Dungeons & Dragons campaigns online for free. Organize quests, encounters, NPCs, and adventures for tabletop RPG players and dungeon masters.",
      "publisher": {
        "@type": "Organization",
        "name": "Yggdrasil",
        "url": "https://andredv.xyz/"
      }
    }
  });

  return (
    <>
      <RequireLoginPopup />
      <BookmarkNav />
      <Navbar />

      <div
        className="campaign-container"
        style={{
          backgroundImage: `url(${OPcover})`,
          marginTop: "20px",
          overflow: "visible",
        }}
      >
        {/* Top block */}
        <div className="top-block"></div>

        <div className="book-wrapper">
          <LeftP />
          <RightP />
        </div>
      </div>

      {/* Popup overlay */}
      {showPopup && (
        <div className="character-popup-overlay">
          <div className="character-popup">
            <button className="exit-x-btn" onClick={() => setShowPopup(false)}>
              ✖
            </button>
            {/* Pass down campaign data if needed */}
            <CreateCampaignInfo
              onClose={() => setShowPopup(false)}
              title={title}
              color={color}
              image={image}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Campaign;





