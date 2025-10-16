import React, { useEffect, useState } from "react";
import "./loadingScreen.css";

const LoadingScreen = ({ isVisible }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible) {
      setShouldShow(true);
      // enforce at least 4 seconds visible
      timer = setTimeout(() => {
        if (!isVisible) {
          setShouldShow(false);
        }
      }, 4000);
    } else {
      // wait until 4 sec has passed
      timer = setTimeout(() => {
        setShouldShow(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!shouldShow) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="bat-container">
          <div className="bat"></div>
        </div>
        <p className="loading-text">Loading your experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
