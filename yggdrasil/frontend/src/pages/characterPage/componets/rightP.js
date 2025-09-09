import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../character.css";
import RightPageInventory from "./inventory"; // inventory component

const RightP = () => {
  return (
    <div
      className="page right-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      {/* Just render inventory; tabs moved inside */}
      <RightPageInventory />
    </div>
  );
};

export default RightP;



