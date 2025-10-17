import React, { useState, useEffect } from "react";
import API from "../../../api";
import "../character.css";
import defaultPortrait from "../../../assets/images/rose.jpg";

const RaceDes = ({ character }) => {
  const [raceData, setRaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tools");

  // Helper to safely parse double-encoded JSON arrays
  const parseJSONorArray = (val) => {
    if (!val) return [];
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === "string") {
        const doubleParsed = JSON.parse(parsed);
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
      console.warn("⚠️ No character ID provided to RaceDes");
      setLoading(false);
      return;
    }

    const fetchRace = async () => {
      try {
        const res = await API.get(
          `/api/character-races/character/${character.id}`
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          const race = res.data[0];
          setRaceData({
            name: race.race_name,
            description: race.race_description,
            skill1: race.race_skill_1,
            skill2: race.race_skill_2,
            tools: parseJSONorArray(race.tool_proficiencies),
            languages: parseJSONorArray(race.language_proficiencies),
          });
        } else {
          setRaceData(null);
        }
      } catch (err) {
        console.error("Failed to fetch race:", err);
        setRaceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRace();
  }, [character]);

  if (loading) return <div>Loading race...</div>;
  if (!raceData) return <div>No race data found for this character.</div>;

  const tabs = {
    Tools: raceData.tools,
    Languages: raceData.languages,
  };

  return (
    <div className="page left-page">
      {/* Header */}
      <div className="background-header">
        <div className="background-character-info">
          <div className="background-character-name">{character?.name || "Unknown"}</div>
          <div className="background-character-details">
            <div className="background-character-background">{raceData.name || "No Race"}</div>
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
            value={raceData.description || ""}
            readOnly
            className="background-description-textarea"
          />
        </div>

        <div className="background-right-column">
          {/* Skills */}
          <div className="background-hex-bonuses">
            {raceData.skill1 && (
              <div className="background-hex">
                <div className="background-hex-bonus">+2</div>
                <div className="background-hex-label">{raceData.skill1}</div>
              </div>
            )}
            {raceData.skill2 && (
              <div className="background-hex">
                <div className="background-hex-bonus">+2</div>
                <div className="background-hex-label">{raceData.skill2}</div>
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

export default RaceDes;
