import React, { useState } from "react";
import "../campaign.css";
import campaignMap from "../../../assets/images/map.jpg"; // adjust path

const CampaignPage = () => {
  const [dmNotes, setDmNotes] = useState("");

  const campaignData = {
    name: "Aydir",
    map: campaignMap,
    players: ["Alice", "Bob", "Charlie"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut labore et dolore magna aliqua.",
  };

  return (
    <div className="page left-page">
      <h2 className="campaign-title">{campaignData.name}</h2>

      <img
        src={campaignData.map}
        alt="Campaign Map"
        className="campaign-map"
      />

      {/* Side by side containers */}
      <div className="side-by-side">
        <div className="players-container white-box">
          <h3>Players</h3>
          <ul>
            {campaignData.players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>

        <div className="description-container white-box">
          <h3>Description</h3>
          <p>{campaignData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;


