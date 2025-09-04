import React from "react";
import pageBg from "../../../assets/images/page.png"; 
import "../campaign.css";

const RightP = () => {
  return (
    <div
      className="page right-page"
      style={{ backgroundImage: `url(${pageBg})` }}
    >

      <h2>Inventory</h2>
    </div>
  );
};

export default RightP;
