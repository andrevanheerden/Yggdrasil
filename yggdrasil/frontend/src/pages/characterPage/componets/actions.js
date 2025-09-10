import React, { useState, useEffect } from "react";
import "../character.css";
import dashImg from "../../../assets/images/dash.jpg";
import attackImg from "../../../assets/images/attack.jpg";
import dodgeImg from "../../../assets/images/dodge.jpg";

const RightPageActions = () => {
  const [actions] = useState([
    {
      id: 1,
      name: "Dash",
      actionType: "Movement",
      image: dashImg,
      description: "Move up to your speed in addition to your regular movement.",
    },
    {
      id: 2,
      name: "Attack",
      actionType: "Combat",
      image: attackImg,
      description: "Make a melee or ranged attack with your weapon or spell.",
    },
    {
      id: 3,
      name: "Dodge",
      actionType: "Defense",
      image: dodgeImg,
      description:
        "Focus entirely on avoiding attacks. Attack rolls against you have disadvantage until your next turn.",
    },
  ]);

  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    if (!selectedAction && actions.length > 0) {
      setSelectedAction(actions[0]);
    }
  }, [actions, selectedAction]);

  return (
    <div className="page right-page" style={{ position: "relative" }}>
      {selectedAction && (
        <>
          {/* Header */}
          <div className="inventory-header">
            <div className="inventory-title">
              <div className="item-name">{selectedAction.name}</div>
              <div className="item-type">{selectedAction.actionType}</div>
            </div>
            <div className="item-image-container">
              <img
                src={selectedAction.image}
                alt={selectedAction.name}
                className="item-image"
              />
            </div>
          </div>

          {/* Middle Section */}
          <div className="inventory-middle">
            <div className="inventory-description-box scroll-box">
              {selectedAction.description}
            </div>
          </div>

          {/* Actions Grid */}
          <div className="spells-container">
            <div className="spells-grid">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className={`spells-slot ${
                    selectedAction?.id === action.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedAction(action)}
                >
                  {/* Left: image */}
                  <img src={action.image} alt={action.name} className="spells-img" />

                  {/* Middle: name + type */}
                  <div className="spells-info">
                    <div className="spells-name">{action.name}</div>
                    <div className="spells-class">{action.actionType}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RightPageActions;
