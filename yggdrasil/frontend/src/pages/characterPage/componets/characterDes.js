import React, { useState } from "react";
import "../character.css";
import rose from "../../../assets/images/rose.jpg"; // Example portrait

const CharacterDec = () => {
  const [description, setDescription] = useState(
    "Born under a blood moon in the shadow of the mountain village of Kaeryn, Alex Black was marked from birth as an omen child. His piercing eyes and unnerving silence unsettled even the elders, yet the Shinobi clans saw promise in him. From the age of five, Alex was taken from his family and trained in the hidden arts—stealth, deception, and the deadly precision of the blade."
    + " Unlike most Shinobi who lived by strict codes of loyalty, Alex harbored an independent streak. He questioned orders, studied forbidden scrolls, and experimented with blending martial prowess with scholarly insight. This made him both admired and distrusted. His masters nicknamed him 'The Shadow Scholar', a man who could disappear in an instant yet recite lines of ancient philosophy as if speaking with the voices of the dead."
    + " Tragedy hardened him early. When his village was razed in a border conflict, Alex was one of the few survivors. He carried the weight of that fire in silence, swearing never to bind himself blindly to another clan or ruler. Instead, he became a wanderer—an observer of men, a ghost on the battlefield, and a seeker of knowledge in the ruins of fallen kingdoms."
    + " Those who meet him describe a man wrapped in contradictions: sharp wit cloaked in quietude, quick reflexes tempered by patience, and a ruthless blade guided by an almost poetic soul. Alex Black is not simply a Shinobi—he is a reminder that shadows are not empty, but filled with secrets, memories, and the echoes of a thousand untold stories."
  );

  return (
    <div className="page left-page">
      {/* Header with portrait */}
      <div className="character-header">
        <div className="character-info">
          <div className="character-name">Alex Black</div>
          <div className="character-class">Shinobi</div>
          <div className="character-details">
            <div className="character-race">Human</div>
            <div className="character-background">Scholar</div>
          </div>
        </div>
        <img src={rose} alt="Portrait" className="portrait-img2-header" />
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

export default CharacterDec;
