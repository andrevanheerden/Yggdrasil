import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../encounter.css";
import pageBg from "../../../../assets/images/page.png";
import CreateSpellPage from "./craeteSpellPage";
import LoadingScreen from "../../../loadingPopup/loadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSpellPopup = ({ onClose, encounterId, onSpellCreated }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const pageRef = useRef();

  // Ensure we have an encounter ID (prop or localStorage)
  const effectiveEncounterId = encounterId || localStorage.getItem("selectedEncounterId");

  const handleSubmitClick = async () => {
    if (!effectiveEncounterId) {
      toast.error("No encounter selected. Please open an encounter first.");
      return;
    }

    if (pageRef.current) {
      try {
        setShowLoadingScreen(true); // show loader

        // Wait for child submission (must return a Promise)
        await pageRef.current.handleSubmit(effectiveEncounterId);

        // Call callback
        if (onSpellCreated) onSpellCreated();

        // Show success toast
        toast.success("Spell created successfully!");

        // Close popup automatically
        onClose();
      } catch (err) {
        console.error("Error creating spell:", err);
        toast.error("Failed to create spell.");
      } finally {
        setShowLoadingScreen(false); // hide loader
      }
    }
  };

  return ReactDOM.createPortal(
    <>
      {/* Popup overlay below */}
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
          zIndex: 500, // lower than loader
        }}
      >
        {/* Top Buttons */}
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
            onClick={onClose} // just closes popup
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
          <CreateSpellPage
            ref={pageRef}
            encounterId={effectiveEncounterId} // always pass ID
            onSpellCreated={onSpellCreated}
          />
        </div>
      </div>

      {/* Loader on top */}
      <LoadingScreen isVisible={showLoadingScreen} />
    </>,
    document.body
  );
};

export default CreateSpellPopup;
