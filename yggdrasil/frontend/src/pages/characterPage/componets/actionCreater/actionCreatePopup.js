import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CreateActionPage from "./craeteActionPage";

const CreateActionPopup = ({ onClose, onActionCreated }) => {
  const pageRef = useRef();

  const handleSubmitClick = () => {
    if (pageRef.current) pageRef.current.handleSubmit();
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
      {/* Submit + Close buttons */}
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
        <CreateActionPage ref={pageRef} onActionCreated={onActionCreated} />
      </div>
    </div>,
    document.body
  );
};

export default CreateActionPopup;
