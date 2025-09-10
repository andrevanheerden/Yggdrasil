import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../bookmarkNav.css";
import flipSoundFile from "../../../assets/sound/pageFlip.mp3"; // import your sound

const Bookmark = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipping, setIsFlipping] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    if (location.pathname !== path) {
      setIsFlipping(true);

      // Play flip sound
      const flipSound = new Audio(flipSoundFile);
      flipSound.play();

      setTimeout(() => {
        navigate(path);
        setIsFlipping(false);
      }, 600); // match animation duration
    }
  };

  return (
    <div className="bookmark-tabs-container">
      {/* Nav buttons */}
      <div className="bookmark-tab-buttons">
        {["/campaign", "/character", "/encounter"].map((path) => (
          <button
            key={path}
            className={`bookmark-tab-btn ${isActive(path) ? "active" : ""}`}
            onClick={() => handleNav(path)}
          >
            {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
          </button>
        ))}
      </div>

      {/* Blank flipping page overlay */}
      {isFlipping && <div className="blank-page flip-animate"></div>}
    </div>
  );
};

export default Bookmark;
