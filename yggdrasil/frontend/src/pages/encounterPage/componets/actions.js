import React, { useState, useEffect } from "react";
import "../encounter.css";
import axios from "axios";
import FullActionView from "./fullActionView";
import CreateActionPopup from "./actionCreater/actionCreatePopup";
import noSpellImg from "../../../assets/images/noItem.jpg"; // <-- Add this line

const RightPageActions = ({ selectedEncounter }) => {
  const [activeTab, setActiveTab] = useState("actions");
  const [actions, setActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showCreateAction, setShowCreateAction] = useState(false);

  // Fetch actions from backend when encounter changes
  useEffect(() => {
    if (!selectedEncounter?.encounter_id) {
      setActions([]);
      setSelectedAction(null);
      return;
    }

    const fetchActions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/encounter-actions/${selectedEncounter.encounter_id}`
        );
        const fetchedActions = res.data || [];
        setActions(fetchedActions);
        setSelectedAction(fetchedActions[0] || null);
      } catch (err) {
        console.error("Error fetching actions:", err);
        setActions([]);
        setSelectedAction(null);
      }
    };

    fetchActions();
  }, [selectedEncounter]);

  return (
    <div className="page right-page" style={{ position: "relative" }}>
      {/* Tabs */}
      <div className="right-page-tabs">
        <button
          className={`right-tab-btn ${activeTab === "actions" ? "active" : ""}`}
          onClick={() => setActiveTab("actions")}
        >
          Actions
        </button>
        <button
          className={`right-tab-btn ${activeTab === "fullActionView" ? "active" : ""}`}
          onClick={() => setActiveTab("fullActionView")}
        >
          Full Action View
        </button>
      </div>

      {/* Actions List Tab */}
      {activeTab === "actions" && (
        <>
          {!selectedEncounter ? (
            <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
              Select an encounter to view actions.
            </p>
          ) : (
            <>
              {selectedAction && (
                <>
                  <div className="inventory-header">
                    <div className="inventory-title">
                      <div className="item-name">{selectedAction.action_name}</div>
                      <div className="item-type">{selectedAction.action_type}</div>
                    </div>
                    <div className="item-image-container">
                      <img
                        src={selectedAction.action_image || noSpellImg}
                        alt={selectedAction.action_name}
                        className="item-image"
                      />
                    </div>
                  </div>

                  <div className="inventory-middle">
                    <div className="inventory-description-box">
                      <div className="description-title">Description</div>
                      {selectedAction.action_description}
                    </div>
                  </div>
                </>
              )}

              {/* Actions Grid */}
              <div className="spells-container">
                <div className="spells-grid">
                  {actions.length > 0 &&
                    actions.map((action) => (
                      <div
                        key={action.encounter_action_id}
                        className={`spells-slot ${
                          selectedAction?.encounter_action_id ===
                          action.encounter_action_id
                            ? "active"
                            : ""
                        }`}
                        onClick={() => setSelectedAction(action)}
                      >
                        <img
                          src={action.action_image || noSpellImg}
                          alt={action.action_name}
                          className="spells-img"
                        />
                        <div className="spells-info">
                          <div className="spells-name">{action.action_name}</div>
                          <div className="spells-class">{action.action_type}</div>
                        </div>
                      </div>
                    ))}

                  {/* Create Action Slot */}
                  <div
                    className="spells-slot create-slot"
                    onClick={() => setShowCreateAction(true)}
                  >
                    + Create Action
                  </div>
                </div>
              </div>

              {/* Message if no actions exist */}
              {actions.length === 0 && (
                <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.6 }}>
                  No actions created yet. Click "+ Create Action" to add one.
                </p>
              )}
            </>
          )}
        </>
      )}

      {/* Full Action View */}
      {activeTab === "fullActionView" && selectedAction && (
        <FullActionView action={selectedAction} />
      )}

      {/* Create Action Popup */}
      {showCreateAction && (
        <CreateActionPopup
          onClose={() => setShowCreateAction(false)}
          encounterId={selectedEncounter?.encounter_id}
          onActionCreated={(newAction) => {
            setActions([...actions, newAction]);
            setSelectedAction(newAction);
            setShowCreateAction(false);
          }}
        />
      )}
    </div>
  );
};

export default RightPageActions;
