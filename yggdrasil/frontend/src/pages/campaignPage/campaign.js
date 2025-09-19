import React, { useState, useEffect } from "react";
import "./campaign.css";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import { useLocation } from "react-router-dom";
import CreateCampaignInfo from "./componets/createCampaignInfo";

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

  return (
    <>
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





