// CreateActionPopup.jsx
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../../encounter.css";
import pageBg from "../../../../assets/images/page.png";
import CreateActionPage from "./craeteActionPage";

const CreateActionPopup = ({ onClose, encounterId, onActionCreated }) => {
  const pageRef = useRef();

  // ✅ Get encounter ID from props or localStorage
  const effectiveEncounterId =
    encounterId || localStorage.getItem("selectedEncounterId");

  // ✅ Submit button logic
const handleSubmitClick = async () => {
  if (!pageRef.current) return;

  const { actionName, actionType, description, effectA, effectB, actionImage } =
    pageRef.current.getFormData();

  if (!actionName || !actionType) {
    alert("Please enter an action name and type.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("encounter_id", effectiveEncounterId);
    formData.append("action_name", actionName);
    formData.append("action_type", actionType);
    formData.append("action_description", description);

    // Damage types
    formData.append(
      "damage_types",
      JSON.stringify(effectA.filter((d) => d.trim() !== ""))
    );

    // Effects: only the text goes to action_effects
    const effectTexts = effectB.map((e) => e.effect || "");
    formData.append("effects", JSON.stringify(effectTexts));

    // First effect's range/area/cost
    const firstEffect = effectB[0] || {};
    formData.append("action_range", firstEffect.range || "");
    formData.append("action_area", firstEffect.area || "");
    formData.append("action_cost", firstEffect.cost || "");

    if (actionImage) formData.append("action_image", actionImage);

    const res = await axios.post(
      "http://localhost:5000/api/encounter-actions",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Action created:", res.data);
    alert("Action successfully created!");
    if (onActionCreated) onActionCreated(res.data);
    onClose();
  } catch (err) {
    console.error("Failed to create action:", err);
    alert("Error creating action. Check backend logs.");
  }
};


  return ReactDOM.createPortal(
    <div
      className="character-popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* ✅ Buttons positioned same as Spell Popup */}
      <div
        style={{
          position: "absolute",
          top: "94%",
          right: 20,
          display: "flex",
          gap: "10px",
          zIndex: 10000,
        }}
      >
        <button
          onClick={handleSubmitClick}
          style={{
            padding: "8px 16px",
            fontFamily: "'Caudex', serif",
            backgroundColor: "#199a6a",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        <button
          className="exit-x-btn"
          onClick={onClose}
          style={{
            padding: "8px 16px",
            fontFamily: "'Caudex', serif",
            backgroundColor: "#c0392b",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      {/* ✅ Popup main content */}
      <div
        className="character-popup"
        style={{
          backgroundImage: `url(${pageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: 10000,
        }}
      >
        {/* Pass ref for collecting form data */}
        <CreateActionPage ref={pageRef} />
      </div>
    </div>,
    document.body
  );
};

export default CreateActionPopup;
