import React, { useState, useEffect } from "react";
import "../character.css";
import axios from "axios";
import FullActionView from "./fullActionView";
import CreateActionPopup from "./actionCreater/actionCreatePopup";
import fallbackImg from "../../../assets/images/noItem.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightPageActions = ({ selectedCharacter }) => {
  const [activeTab, setActiveTab] = useState("actions");
  const [actions, setActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showCreateAction, setShowCreateAction] = useState(false);

  // Fetch actions
  useEffect(() => {
    if (!selectedCharacter?.id) {
      setActions([]);
      setSelectedAction(null);
      return;
    }

    const fetchActions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/character-actions/${selectedCharacter.id}`
        );
        const fetchedActions = Array.isArray(res.data) ? res.data : [];
        setActions(fetchedActions);
        setSelectedAction(fetchedActions[0] || null);
      } catch (err) {
        console.error("Error fetching character actions:", err);
        toast.error("Failed to load actions.");
        setActions([]);
        setSelectedAction(null);
      }
    };

    fetchActions();
  }, [selectedCharacter]);

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

      {/* Actions Tab */}
      {activeTab === "actions" && (
        <>
          {!selectedCharacter ? (
            <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
              Select a character to view actions.
            </p>
          ) : (
            <>
              {/* Selected action */}
              {selectedAction && (
                <div>
                  <div className="inventory-header">
                    <div className="inventory-title">
                      <div className="item-name">{selectedAction.action_name}</div>
                      <div className="item-type">{selectedAction.action_type}</div>
                    </div>
                    <div className="item-image-container">
                      <img
                        src={selectedAction.action_image || fallbackImg}
                        alt={selectedAction.action_name}
                        className="item-image"
                      />
                    </div>
                  </div>

                  <div className="inventory-middle">
                    <div className="inventory-description-box scroll-box">
                      {selectedAction.action_description || "No description available."}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Grid */}
              <div className="spells-container">
                <div className="spells-grid">
                  {actions.length > 0 &&
                    actions.map((action, idx) => {
                      const actionId = action?.character_action_id || action?.id || idx;
                      return (
                        <div
                          key={actionId}
                          className={`spells-slot ${
                            selectedAction?.character_action_id === action?.character_action_id
                              ? "active"
                              : ""
                          }`}
                          onClick={() => setSelectedAction(action)}
                        >
                          <img
                            src={action?.action_image || fallbackImg}
                            alt={action?.action_name || "Action"}
                            className="spells-img"
                          />
                          <div className="spells-info">
                            <div className="spells-name">{action?.action_name || "Unnamed"}</div>
                            <div className="spells-class">{action?.action_type || "Unknown"}</div>
                          </div>
                        </div>
                      );
                    })}

                  {/* Create Action Slot */}
                  <div
                    className="spells-slot create-slot"
                    onClick={() => setShowCreateAction(true)}
                  >
                    + Create Action
                  </div>
                </div>
              </div>

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
          onActionCreated={(newAction) => {
            if (newAction) {
              setActions([...actions, newAction]);
              setSelectedAction(newAction);
              setShowCreateAction(false);
              toast.success("Action created successfully!");
            }
          }}
        />
      )}
    </div>
  );
};

export default RightPageActions;
