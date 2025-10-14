import React from "react";
import ReactDOM from "react-dom";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CreateSpellPage from "./craeteSpellPage";

const CreateSpellPopup = ({ onClose, onSpellCreated }) => {
  const pageRef = React.createRef();

  const handleSubmitClick = () => {
    if (pageRef.current) pageRef.current.handleSubmit();
  };

  return ReactDOM.createPortal(
    <div className="character-popup-overlay">
      <div style={{ position: "absolute", top: "94%", right: 20, display: "flex", gap: "10px", zIndex: 10000 }}>
        <button onClick={handleSubmitClick} style={{ padding: "8px 16px", backgroundColor: "#199a6a", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer" }}>Submit</button>
        <button onClick={onClose} style={{ padding: "8px 16px", backgroundColor: "#c0392b", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer" }}>✖</button>
      </div>
      <div className="character-popup" style={{ backgroundImage: `url(${pageBg})` }}>
        <CreateSpellPage ref={pageRef} onSpellCreated={onSpellCreated} />
      </div>
    </div>,
    document.body
  );
};

export default CreateSpellPopup;
