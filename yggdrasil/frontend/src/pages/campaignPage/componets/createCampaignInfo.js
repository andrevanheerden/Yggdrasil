import React, { useState } from "react";
import "../campaign.css"; // ✅ uses same popup styling as campaign description
import pageBg from "../../../assets/images/page.png"; // parchment-style background

const CreateCampaignInfo = ({ onClose }) => {
  const [campaignName, setCampaignName] = useState("New Campaign");
  const [description, setDescription] = useState("");
  const [setting, setSetting] = useState("");
  const [factions, setFactions] = useState([{ name: "", role: "" }]);
  const [themes, setThemes] = useState([""]);
  const [activeTab, setActiveTab] = useState("Description");

  // Add/remove faction rows
  const addFaction = () => setFactions([...factions, { name: "", role: "" }]);

  const updateFaction = (index, field, value) => {
    const updated = [...factions];
    updated[index][field] = value;
    setFactions(updated);
  };

  const removeFaction = (index) => {
    setFactions(factions.filter((_, i) => i !== index));
  };

  // Add/remove theme rows
  const addTheme = () => setThemes([...themes, ""]);

  const updateTheme = (index, value) => {
    const updated = [...themes];
    updated[index] = value;
    setThemes(updated);
  };

  const removeTheme = (index) => {
    setThemes(themes.filter((_, i) => i !== index));
  };

  return (
    <div className="character-popup-overlay">
      <div
        className="character-popup"
        style={{
          backgroundImage: `url(${pageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Exit button (X) */}
        <button className="exit-x-btn" onClick={onClose}>
          ✖
        </button>

        {/* Floating title input */}
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className="adventure-title"
          placeholder="Campaign Name"
        />

        <div className="adventure-main2">
          {/* Editable content */}
          <div className="adventure-description-box2">
            {activeTab === "Description" && (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="adventure-textarea"
                placeholder="Write the campaign description here..."
              />
            )}

            {activeTab === "Setting" && (
              <textarea
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                className="adventure-textarea"
                placeholder="Describe the world, tone, and setting..."
              />
            )}

            {activeTab === "Factions" && (
              <div className="factions-container">
                {factions.map((f, i) => (
                  <div key={i} className="faction-row">
                    <input
                      type="text"
                      value={f.name}
                      onChange={(e) =>
                        updateFaction(i, "name", e.target.value)
                      }
                      placeholder="Faction Name"
                      className="faction-input"
                    />
                    <input
                      type="text"
                      value={f.role}
                      onChange={(e) =>
                        updateFaction(i, "role", e.target.value)
                      }
                      placeholder="Faction Role"
                      className="faction-input"
                    />
                    <button onClick={() => removeFaction(i)}>✖</button>
                  </div>
                ))}
                <button onClick={addFaction}>+ Add Faction</button>
              </div>
            )}

            {activeTab === "Themes" && (
              <div className="themes-container">
                {themes.map((theme, i) => (
                  <div key={i} className="theme-row">
                    <input
                      type="text"
                      value={theme}
                      onChange={(e) => updateTheme(i, e.target.value)}
                      placeholder="Theme (e.g. Betrayal, Hope, Destiny)"
                      className="theme-input"
                    />
                    <button onClick={() => removeTheme(i)}>✖</button>
                  </div>
                ))}
                <button onClick={addTheme}>+ Add Theme</button>
              </div>
            )}
          </div>

          {/* Side buttons for navigation */}
          <div className="adventure-side-buttons-wrapper">
            <div className="adventure-side-buttons">
              {["Description", "Setting", "Factions", "Themes"].map((tab) => (
                <button
                  key={tab}
                  className={`adventure-side-btn ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignInfo;

