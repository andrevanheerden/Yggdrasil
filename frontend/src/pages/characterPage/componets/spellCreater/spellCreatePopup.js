import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CreateSpellPage from "./craeteSpellPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../../../loadingPopup/loadingScreen";

const CreateSpellPopup = ({ onClose, onSpellCreated }) => {
  const [loading, setLoading] = useState(false);
  const pageRef = useRef();

  const handleSubmitClick = async () => {
    if (!pageRef.current) return;

    try {
      setLoading(true); // show loader

      // Assume handleSubmit returns the created spell
      const newSpell = await pageRef.current.handleSubmit();

      if (newSpell) {
        if (onSpellCreated) onSpellCreated(newSpell);
        toast.success("Spell created successfully!");
        onClose(); // close popup after success
      } else {
        toast.error("Failed to create spell.");
      }
    } catch (err) {
      console.error("Error creating spell:", err);
      toast.error("Error creating spell.");
    } finally {
      setLoading(false); // hide loader
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
          zIndex: 9999,
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
            zIndex: 10000,
          }}
        >
          <CreateSpellPage ref={pageRef} onSpellCreated={onSpellCreated} />
        </div>
      </div>

      {/* Loading overlay */}
      <LoadingScreen isVisible={loading} />
    </>,
    document.body
  );
};

export default CreateSpellPopup;
