import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "../../encounter.css";
import pageBg from "../../../../assets/images/page.png";
import CreateSpellPage from "./craeteSpellPage";

const CreateSpellPopup = ({ onClose, encounterId, onSpellCreated }) => {
  const pageRef = useRef();

  // Always ensure we have an encounter ID: prop first, then localStorage
  const effectiveEncounterId = encounterId || localStorage.getItem("selectedEncounterId");

  const handleSubmitClick = () => {
    if (!effectiveEncounterId) {
      alert("No encounter selected. Please open an encounter first.");
      return;
    }
    if (pageRef.current) {
      pageRef.current.handleSubmit(effectiveEncounterId); // pass the ID to child
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
      {/* Top Buttons */}
      <div style={{ position: "absolute", top: "94%", right: 20, display: "flex", gap: "10px", zIndex: 10000 }}>
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
        <CreateSpellPage
          ref={pageRef}
          encounterId={effectiveEncounterId} // always passes the ID
          onSpellCreated={onSpellCreated}
        />
      </div>
    </div>,
    document.body
  );
};

export default CreateSpellPopup;
