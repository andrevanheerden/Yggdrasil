import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../campaign.css";
import DMNotes from "./dmNotes";

const RightP = () => {
  return (
    <div
      className="page right-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      <DMNotes />

    </div>
  );
};

export default RightP;
