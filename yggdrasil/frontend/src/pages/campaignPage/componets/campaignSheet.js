import React, { useState } from "react";
import "../campaign.css";
import campaignMap from "../../../assets/images/map.jpg"; // adjust path

const CampaignPage = () => {
  const [dmNotes, setDmNotes] = useState("");
  const [descriptionText, setDescriptionText] = useState(
    `The realm of Aydir has stood for centuries, its history written in the stones of ruined fortresses and whispered in the songs of traveling bards. Long ago, the land was divided into warring kingdoms, until the High Council forged a fragile unity that endures to this day. Yet beneath the polished surface of order, shadows gather.

In the north, an ancient power stirs in the frostbitten peaks, where cults devoted to forgotten gods seek to awaken slumbering titans. In the bustling cities of the south, political intrigue twists the ambitions of nobles and guildmasters, each vying for control of trade and influence. Between these forces lies a land scarred by old wars, rich with lost secrets, and alive with opportunities for those bold enough to seize them.

The adventurers find themselves drawn into Aydir’s tangled web of destiny — whether by fate, prophecy, or their own ambition. Their choices will shape not only their survival, but the very future of kingdoms. Will they become champions of the people, or pawns of powers far greater than themselves?`
  );

  const campaignData = {
    name: "Aydir",
    map: campaignMap,
    players: ["Alice the Ranger", "Bob the Sorcerer", "Charlie the Paladin"],
    setting: "Medieval high fantasy, filled with political intrigue, ancient ruins, and magical secrets.",
    factions: [
      { name: "The High Council of Aydir", role: "Ruling body that struggles to maintain unity." },
      { name: "The Frostborn Cult", role: "Worshippers of old gods who seek to awaken ancient titans." },
      { name: "The Guild of Coin", role: "A merchant guild pulling strings in southern cities." },
    ],
    themes: ["Destiny vs Free Will", "Political Intrigue", "Ancient Powers Awakening"],
  };

  return (
    <div className="page left-page">
      {/* Campaign Title */}
      <h2 className="campaign-title">{campaignData.name}</h2>

      {/* Map */}
      <img src={campaignData.map} alt="Campaign Map" className="campaign-map" />

      {/* Side by side layout */}
      <div className="side-by-side">
        {/* Players */}
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
  <div className="campaign-page-description-box">
    {descriptionText}
  </div>
</div>


      </div>

      {/* Extra Info */}
      <div className="extra-info white-box">
        <h3>Setting</h3>
        <p>{campaignData.setting}</p>

        <h3>Factions</h3>
        <ul>
          {campaignData.factions.map((f, i) => (
            <li key={i}>
              <strong>{f.name}</strong>: {f.role}
            </li>
          ))}
        </ul>

        <h3>Themes</h3>
        <ul>
          {campaignData.themes.map((theme, i) => (
            <li key={i}>{theme}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignPage;
