// CreateItemPopup.jsx
import React from "react";
import ReactDOM from "react-dom";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CreateItemPage from "./createItemPage";

const CreateItemPopup = ({ onClose }) => {
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
      {/* Exit button */}
      <button
        className="exit-x-btn"
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 10000,
        }}
      >
        ✖
      </button>

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
        <CreateItemPage />
      </div>
    </div>,
    document.body // ✅ Render outside React tree so it is above .top-block
  );
};

export default CreateItemPopup;

