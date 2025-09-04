import React from "react";
import pageBg from "../../../assets/images/page.png"; // Example background image
import "../campaign.css";
import Sheet from "./sheet"; // <-- Capitalize here

const LeftP = () => {
  return (
    <div
      className="page left-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      <Sheet /> {/* <-- Capitalize here */}
    </div>
  );
};

export default LeftP;

