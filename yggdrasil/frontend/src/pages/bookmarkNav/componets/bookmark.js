import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../bookmarkNav.css";
import flipSoundFile from "../../../assets/sound/mFlip.wav";

const Bookmark = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [nextPath, setNextPath] = useState(null);

  // Keep track of active audio instances
  const activeSounds = useRef([]);

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    if (location.pathname !== path) {
      setIsFlipping(true);
      setNextPath(path); // preload next page behind flips

      const totalFlips = 15;
      const flipDelay = 40; // ms per mini flip

      for (let i = 0; i < totalFlips; i++) {
        setTimeout(() => {
          setFlipCount(i + 1);

          // Play flip sound and track it
          const flipSound = new Audio(flipSoundFile);
          flipSound.play();
          activeSounds.current.push(flipSound);

          // On last flip, navigate and stop all sounds
          if (i === totalFlips - 1) {
            setTimeout(() => {
              // Stop all currently playing sounds
              activeSounds.current.forEach((sound) => {
                sound.pause();
                sound.currentTime = 0;
              });
              activeSounds.current = [];

              navigate(path);
              setIsFlipping(false);
              setFlipCount(0);
              setNextPath(null);
            }, 200); // linger before landing
          }
        }, i * flipDelay);
      }
    }
  };

  return (
    <div className="bookmark-tabs-container">
      {/* Preload upcoming page behind flips */}
      {nextPath && <div className="upcoming-page"></div>}

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

      {/* Flipping blank pages overlay */}
      {isFlipping &&
        Array.from({ length: flipCount }).map((_, idx) => (
          <div
            key={idx}
            className="blank-page flip-animate"
            style={{ zIndex: 30 + idx }}
          ></div>
        ))}
    </div>
  );
};

export default Bookmark;
