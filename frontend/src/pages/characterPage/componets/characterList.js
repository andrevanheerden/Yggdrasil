import React, { useEffect, useState } from "react";
import "../character.css";
import rose from "../../../assets/images/noItem.jpg";
import API from "../../../api";

const CharacterList = ({ campaignId, onSelectCharacter, onCreateCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!campaignId) {
      setLoading(false);
      return;
    }

    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/characters/${campaignId}`);
        setCharacters(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch characters");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [campaignId]);

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="encounter-list-wrapper">
      <h2 className="encounter-list-title">Characters</h2>

      {/* Scrollable container */}
      <div className="character-list-scroll">
        {characters.map((char) => (
          <div
            key={char.character_id}
            className="encounter-box"
            onClick={() => {
              localStorage.setItem("selectedCharacterId", char.character_id);
              onSelectCharacter(char);
            }}
          >
            <div className="encounter-img-container">
              <img
                src={char.character_img || rose}
                alt={char.character_name}
                className="encounter-img"
              />
            </div>

            <div className="encounter-info">
              <div className="encounter-name">{char.character_name}</div>
              <div className="encounter-race">{char.race || "-"}</div>
              <div className="encounter-class">{char.class || "-"}</div>
              <div className="encounter-bg">{char.background || "-"}</div>
            </div>

            <div className="encounter-stats">
              <div className="encounter-level">Lvl {char.character_level}</div>
              <div className="encounter-ac">AC {char.character_AC}</div>
              <div className="encounter-speed">Speed {char.character_speed}</div>
              <div className="encounter-hp">
                HP {char.character_current_HP}/{char.character_max_HP}
              </div>
            </div>
          </div>
        ))}

        {/* ➕ Create New Character */}
        <div
          className="encounter-box create-new"
          onClick={() => onCreateCharacter && onCreateCharacter()}
        >
          <div className="encounter-img-container">
            <div className="encounter-img placeholder">+</div>
          </div>
          <div className="encounter-info">
            <div className="encounter-name">Create New Character</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
