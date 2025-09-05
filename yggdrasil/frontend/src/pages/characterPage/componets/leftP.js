import React from "react";
import pageBg from "../../../assets/images/page.png"; // Example background image
import "../character.css";
import CharacterSheet from "./characterSheet";


const LeftP = () => {
  return (
    <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
      <CharacterSheet />
    </div>
  );
};


export default LeftP;

