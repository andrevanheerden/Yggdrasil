import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../character.css";
import Inventory from "./inventory";


const RightP = () => {
  return (
    <div
      className="page right-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      <Inventory />


    </div>
  );
};

export default RightP;
