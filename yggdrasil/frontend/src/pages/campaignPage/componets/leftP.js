import React from "react";
import pageBg from "../../../assets/images/page.png"; // Example background image
import "../campaign.css";
import CampaignSheet from "./campaignSheet";

const LeftP = () => {
  return (
    <div className="page left-page" style={{ backgroundImage: `url(${pageBg})` }}>
      <CampaignSheet />
    </div>
  );
};


export default LeftP;

