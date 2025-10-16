import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../character.css";
import pageBg from "../../../../assets/images/page.png";
import CreateItemPage from "./createItemPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../../../loadingPopup/loadingScreen";

const CreateItemPopup = ({ onClose, onItemCreated }) => {
  const [loading, setLoading] = useState(false);
  const pageRef = useRef();

  const handleSubmitClick = async () => {
    if (!pageRef.current) return;

    try {
      setLoading(true); // show loader

      // Assume handleSubmit returns the created item
      const newItem = await pageRef.current.handleSubmit();

      if (newItem) {
        if (onItemCreated) onItemCreated(newItem);
        toast.success("Item created successfully!");
        onClose(); // close popup on success
      } else {
        toast.error("Failed to create item.");
      }
    } catch (err) {
      console.error("Error creating item:", err);
      toast.error("Error creating item.");
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
          <CreateItemPage ref={pageRef} onItemCreated={onItemCreated} />
        </div>
      </div>

      {/* Loading overlay */}
      <LoadingScreen isVisible={loading} />
    </>,
    document.body
  );
};

export default CreateItemPopup;
