import React from "react";
import "./campaign.css";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";

const Campaign = () => {
  return (
    <div
      className="campaign-container"
      style={{ backgroundImage: `url(${OPcover})` }}
    >
      <div className="book-wrapper">
        <LeftP />
        <RightP />
      </div>
    </div>
  );
};

export default Campaign;


