import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import pageBg from "../../../../assets/images/page.png";
import EditCharacterPage from "./EditEncounterPage";
import "../../encounter.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../../../loadingPopup/loadingScreen";

const EditEncounterPopup = ({ character, onClose, chartOptions = {}, savingThrowOptions = {} }) => {
  const pageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitClick = async () => {
    if (!pageRef.current || !pageRef.current.handleSubmit) return;

    try {
      setLoading(true);

      // Assume handleSubmit returns updated encounter data
      const updatedEncounter = await pageRef.current.handleSubmit();

      if (updatedEncounter) {
        toast.success("Encounter updated successfully!");
        onClose(); // close popup after success
      } else {
        toast.error("Failed to update encounter.");
      }
    } catch (err) {
      console.error("Error updating encounter:", err);
      toast.error("Error updating encounter.");
    } finally {
      setLoading(false);
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
            width: "800px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            zIndex: 10000,
          }}
        >
          <EditCharacterPage
            ref={pageRef}
            character={character || {}}
            chartOptions={chartOptions}
            savingThrowOptions={savingThrowOptions}
          />
        </div>
      </div>

      {/* Loading overlay */}
      <LoadingScreen isVisible={loading} />
    </>,
    document.body
  );
};

export default EditEncounterPopup;
