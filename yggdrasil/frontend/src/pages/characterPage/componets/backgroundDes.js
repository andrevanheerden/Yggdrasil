import React, { useState, useEffect } from "react";
import axios from "axios";
import "../character.css";
import defaultPortrait from "../../../assets/images/rose.jpg";

const BackgroundDes = ({ character }) => {
  const [backgroundData, setBackgroundData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tools");

  // ✅ Helper to safely parse double-encoded JSON arrays
  const parseJSONorArray = (val) => {
    if (!val) return [];
    try {
      const parsed = JSON.parse(val); // first parse
      if (Array.isArray(parsed)) return parsed; // already array
      if (typeof parsed === "string") {
        const doubleParsed = JSON.parse(parsed); // second parse
        return Array.isArray(doubleParsed) ? doubleParsed : [];
      }
      return [];
    } catch (err) {
      console.warn("Failed to parse tools/languages:", val);
      return [];
    }
  };

  useEffect(() => {
    if (!character || !character.id) {
      console.warn("⚠️ No character ID provided to BackgroundDes");
      setLoading(false);
      return;
    }

    const fetchBackground = async () => {
      try {
        console.log("Fetching background for character:", character.id);
        const res = await axios.get(
          `http://localhost:5000/api/character-backgrounds/character/${character.id}`
        );

        console.log("✅ Background response:", res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          const bg = res.data[0];
          setBackgroundData({
            name: bg.background_name,
            description: bg.background_description,
            skill1: bg.skill_selected_1,
            skill2: bg.skill_selected_2,
            tools: parseJSONorArray(bg.tool_proficiencies),
            languages: parseJSONorArray(bg.language_proficiencies),
          });
        } else {
          console.warn("❌ No background rows returned for this character");
          setBackgroundData(null);
        }
      } catch (err) {
        console.error("🚨 Failed to fetch background:", err);
        setBackgroundData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBackground();
  }, [character]);

  if (loading) return <div>Loading background...</div>;
  if (!backgroundData)
    return <div>No background data found for this character.</div>;

  const tabs = {
    Tools: backgroundData.tools,
    Languages: backgroundData.languages,
  };

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">
            {character?.name || "Unknown"}
          </div>
          <div className="background-character-details">
            <div className="background-character-background">
              {backgroundData.name || "No Background"}
            </div>
          </div>
        </div>
        <img
          src={character?.portrait || defaultPortrait}
          alt="Portrait"
          className="background-portrait-img"
        />
      </div>

      {/* Description and Skills */}
      <div className="background-main-content">
        <div className="background-description-box">
          <div className="background-description-title-inside">Description</div>
          <textarea
            value={backgroundData.description || ""}
            readOnly
            className="background-description-textarea"
          />
        </div>

        <div className="background-right-column">
          {/* Skills */}
          <div className="background-hex-bonuses">
            {backgroundData.skill1 && (
              <div className="background-hex">
                <div className="background-hex-bonus">+2</div>
                <div className="background-hex-label">{backgroundData.skill1}</div>
              </div>
            )}
            {backgroundData.skill2 && (
              <div className="background-hex">
                <div className="background-hex-bonus">+2</div>
                <div className="background-hex-label">{backgroundData.skill2}</div>
              </div>
            )}
          </div>

          {/* Tools / Languages */}
          <div className="background-skills-box">
            <div className="background-skills-content">
              <h3>{activeTab}</h3>
              {Array.isArray(tabs[activeTab]) && tabs[activeTab].length > 0 ? (
                <ul>
                  {tabs[activeTab].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No {activeTab.toLowerCase()} listed.</p>
              )}
            </div>

            <div className="background-skills-tabs-container">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  className={`background-skills-tab-btn ${
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

export default BackgroundDes;
