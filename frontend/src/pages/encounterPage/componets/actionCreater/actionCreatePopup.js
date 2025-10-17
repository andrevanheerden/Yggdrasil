// CreateActionPopup.jsx
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import API from "../../../../api";
import "../../encounter.css";
import pageBg from "../../../../assets/images/page.png";
import CreateActionPage from "./craeteActionPage";
import LoadingScreen from "../../../loadingPopup/loadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateActionPopup = ({ onClose, encounterId, onActionCreated }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const pageRef = useRef();

  const effectiveEncounterId =
    encounterId || localStorage.getItem("selectedEncounterId");

  const handleSubmitClick = async () => {
    if (!pageRef.current) return;

    const {
      actionName,
      actionType,
      description,
      effectA,
      effectB,
      actionImage,
    } = pageRef.current.getFormData();

    if (!actionName || !actionType) {
      toast.error("Please enter an action name and type.");
      return;
    }

    try {
      setShowLoadingScreen(true);

      const formData = new FormData();
      formData.append("encounter_id", effectiveEncounterId);
      formData.append("action_name", actionName);
      formData.append("action_type", actionType);
      formData.append("action_description", description);

      formData.append(
        "damage_types",
        JSON.stringify(effectA.filter((d) => d.trim() !== ""))
      );

      const effectsArray = effectB
        .map((e) => e.effect || "")
        .join("\n")
        .split("\n")
        .map((e) => e.trim())
        .filter(Boolean);

      formData.append("effects", JSON.stringify(effectsArray));

      const firstEffect = effectB[0] || {};
      formData.append("action_range", firstEffect.range || "");
      formData.append("action_area", firstEffect.area || "");
      formData.append("action_cost", firstEffect.cost || "");

      if (actionImage) formData.append("action_image", actionImage);

      const res = await API.post(
        "/api/encounter-actions",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Action created successfully!");
      if (onActionCreated) onActionCreated(res.data);
      onClose();
    } catch (err) {
      console.error("Failed to create action:", err);
      toast.error("Failed to create action. Check backend logs.");
    } finally {
      setShowLoadingScreen(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Popup overlay */}
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
          zIndex: 500, // below loader
        }}
      >
        {/* Buttons */}
        <div
          style={{
            position: "absolute",
            top: "94%",
            right: 20,
            display: "flex",
            gap: "10px",
            zIndex: 500,
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

        {/* Popup content */}
        <div
          className="character-popup"
          style={{
            backgroundImage: `url(${pageBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            zIndex: 500,
          }}
        >
          <CreateActionPage ref={pageRef} />
        </div>
      </div>

      {/* Loader */}
      <LoadingScreen isVisible={showLoadingScreen} />
    </>,
    document.body
  );
};

export default CreateActionPopup;
