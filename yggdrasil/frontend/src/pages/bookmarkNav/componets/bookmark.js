import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../bookmarkNav.css";

const Bookmark = () => {
  const navigate = useNavigate();
  const location = useLocation(); // get current path

  // helper to check if a tab is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bookmark-tabs-container">
      <div className="bookmark-tab-buttons">
        <button
          className={`bookmark-tab-btn ${isActive("/campaign") ? "active" : ""}`}
          onClick={() => navigate("/campaign")}
        >
          Campaign
        </button>
        <button
          className={`bookmark-tab-btn ${isActive("/character") ? "active" : ""}`}
          onClick={() => navigate("/character")}
        >
          Character
        </button>
        <button
          className={`bookmark-tab-btn ${isActive("/encounter") ? "active" : ""}`}
          onClick={() => navigate("/encounter")}
        >
          Encounter
        </button>
      </div>
    </div>
  );
};

export default Bookmark;


