import React, { useState } from "react";
import "../campaign.css"; // renamed CSS file

const CampaignDescription = () => {
  const campaignName = "Aydir";

  const data = {
    Description: `The realm of Aydir has stood for centuries, its history written in the stones of ruined fortresses and whispered in the songs of traveling bards. Long ago, the land was divided into warring kingdoms, until the High Council forged a fragile unity that endures to this day. Yet beneath the polished surface of order, shadows gather.

In the north, an ancient power stirs in the frostbitten peaks, where cults devoted to forgotten gods seek to awaken slumbering titans. In the bustling cities of the south, political intrigue twists the ambitions of nobles and guildmasters, each vying for control of trade and influence. Between these forces lies a land scarred by old wars, rich with lost secrets, and alive with opportunities for those bold enough to seize them.

The adventurers find themselves drawn into Aydir’s tangled web of destiny — whether by fate, prophecy, or their own ambition. Their choices will shape not only their survival, but the very future of kingdoms. Will they become champions of the people, or pawns of powers far greater than themselves?`,
    Setting: "Medieval high fantasy, filled with political intrigue, ancient ruins, and magical secrets.",
    Factions: [
      { name: "The High Council of Aydir", role: "Ruling body that struggles to maintain unity." },
      { name: "The Frostborn Cult", role: "Worshippers of old gods who seek to awaken ancient titans." },
      { name: "The Guild of Coin", role: "A merchant guild pulling strings in southern cities." },
    ],
    Themes: ["Destiny vs Free Will", "Political Intrigue", "Ancient Powers Awakening"],
  };

  const [activeTab, setActiveTab] = useState("Description");
  const [descriptionText, setDescriptionText] = useState(data.Description);

  return (
    <div className="adventure-page">
      {/* Floating title */}
      <h1 className="adventure-title">{campaignName}</h1>

      <div className="adventure-main">
        {/* Description Container */}
        <div className="adventure-description-box">
          {activeTab === "Description" && (
            <textarea
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              className="adventure-textarea"
            />
          )}
          {activeTab === "Setting" && <p>{data.Setting}</p>}
          {activeTab === "Factions" && (
            <ul>
              {data.Factions.map((f, i) => (
                <li key={i}>
                  <strong>{f.name}</strong>: {f.role}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "Themes" && (
            <ul>
              {data.Themes.map((theme, i) => (
                <li key={i}>{theme}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Side buttons */}
        <div className="adventure-side-buttons-wrapper">
          <div className="adventure-side-buttons">
            {Object.keys(data).map((tab) => (
              <button
                key={tab}
                className={`adventure-side-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div> {/* end of adventure-main */}
    </div> /* end of adventure-page */
  );
};

export default CampaignDescription;
