import React from "react";
import pageBg from "../../../assets/images/page.png"; // Example background image
import "../encounter.css";
import EncounterSheet from "./encounterSheet";


const LeftP = () => {
  return (
    <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
      <EncounterSheet />
    </div>
  );
};


export default LeftP;

