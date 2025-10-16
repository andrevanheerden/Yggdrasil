// CreateActionPopup.jsx
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CreateActionPage from "./craeteActionPage";
import LoadingScreen from "../../../loadingPopup/loadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateActionPopup = ({ onClose, onActionCreated }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const pageRef = useRef();

  const handleSubmitClick = async () => {
    if (!pageRef.current) return;

    try {
      setShowLoadingScreen(true);

      // Wait for the child page's handleSubmit to finish
      const newAction = await pageRef.current.handleSubmit();

      // Show success toast
      toast.success("Action created successfully!");

      // Call callback
      if (onActionCreated) onActionCreated(newAction);

      // Close popup
      onClose();
    } catch (err) {
      console.error("Failed to create action:", err);
      toast.error("Failed to create action.");
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
          <CreateActionPage ref={pageRef} onActionCreated={onActionCreated} />
        </div>
      </div>

      {/* Loader */}
      <LoadingScreen isVisible={showLoadingScreen} />
    </>,
    document.body
  );
};

export default CreateActionPopup;
