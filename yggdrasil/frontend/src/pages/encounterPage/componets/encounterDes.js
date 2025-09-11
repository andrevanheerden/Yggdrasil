import React, { useState } from "react";
import "../encounter.css";
import goblin from "../../../assets/images/goblin.jpg"; // example encounter portrait

const EncounterDec = () => {
  const [description, setDescription] = useState(
    "This goblin scout moves swiftly through the forest, using its small size and keen senses to avoid detection. Agile and cunning, it strikes opportunistically and retreats before the enemy can respond. Unlike more brutish goblins, this scout gathers intelligence and reports back to its tribe, making it a dangerous foe in organized ambushes."
  );

  const encounter = {
    name: "Goblin Scout",
    race: "Goblin",
    portrait: goblin,
    level: 1,
    ac: 15,
    hp: { current: 19, max: 25 },
    speed: 30,
  };

  return (
    <div className="page left-page">
      {/* Header with portrait */}
      <div className="character-header">
        <div className="character-info">
          <div className="character-name">{encounter.name}</div>
          <div className="character-class">Scout</div>
          <div className="character-details">
            <div className="character-race">{encounter.race}</div>
            <div className="character-background">Monster</div>
          </div>
        </div>
        <img
          src={encounter.portrait}
          alt="Encounter Portrait"
          className="portrait-img2-header"
        />
      </div>

      {/* Description box */}
      <div className="description-box">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-textarea"
        />
      </div>
    </div>
  );
};

export default EncounterDec;
