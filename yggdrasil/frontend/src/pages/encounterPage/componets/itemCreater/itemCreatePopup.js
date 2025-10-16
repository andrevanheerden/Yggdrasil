import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../encounter.css";
import pageBg from "../../../../assets/images/page.png";
import CreateItemPage from "./createItemPage";
import LoadingScreen from "../../../loadingPopup/loadingScreen";
import { toast } from "react-toastify"; // import toast
import "react-toastify/dist/ReactToastify.css"; // import toast styles

const CreateItemPopup = ({ onClose, encounterId, onItemCreated }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const pageRef = useRef();

  const handleSubmitClick = async () => {
    if (pageRef.current) {
      try {
        setShowLoadingScreen(true); // show loader

        // wait for child submission (should return a promise)
        await pageRef.current.handleSubmit();

        // call item created callback
        if (onItemCreated) onItemCreated();

        // show success toast
        toast.success("Item created successfully!");

        // close popup
        onClose();
      } catch (err) {
        console.error("Error creating item:", err);
        toast.error("Failed to create item.");
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
        {/* Popup buttons */}
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
          <CreateItemPage
            ref={pageRef}
            encounterId={encounterId}
            onItemCreated={onItemCreated}
          />
        </div>
      </div>

      {/* Loader on top */}
      <LoadingScreen isVisible={showLoadingScreen} />
    </>,
    document.body
  );
};

export default CreateItemPopup;
