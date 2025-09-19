import React, { useState } from "react";
import coverImg from "../../../assets/images/cover.png";
import campaignImg2 from "../../../assets/images/Logo.png"; // default "create" image
import "../Home.css";
import Navbar from "./Navbar";
import CreateCampaignInfo from "../../campaignPage/componets/createCampaignInfo";

const CreateCampaign = () => {
  const [title, setTitle] = useState("Create a Campaign");
  const [color, setColor] = useState("#2a6ca6");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(campaignImg2);
  const [showPopup, setShowPopup] = useState(false);

  const userId = localStorage.getItem("user_id"); // logged-in user ID

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // store actual file for submission
      setImagePreview(URL.createObjectURL(file)); // preview in book
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-campaign-page">
        {/* Book Preview */}
        <div
          className="book-container large-preview"
          style={{ backgroundImage: `url(${coverImg})` }}
        >
          <div className="book-vertical-line" style={{ background: color }} />
          <div className="book-title">{title}</div>

          <div className="book-campaign-img-wrapper">
            <img
              className="book-campaign-img"
              style={{ maxHeight: "350px", maxWidth: "100%" }}
              src={imagePreview}
              alt="Campaign"
            />
          </div>

          <div className="book-color-block" style={{ background: color }} />
        </div>

        {/* Control Panel */}
        <div className="notepad-panel">
          <div className="form-wrapper">
            <div className="login-form">
              <label>
                Campaign Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label>
                Campaign Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>

              <label>
                Accent Color
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>

              <button
                className="submit-btn"
                onClick={() => setShowPopup(true)}
                style={{ cursor: "pointer" }}
              >
                Next: Campaign Details
              </button>
            </div>
          </div>
        </div>

        {/* Popup for additional campaign info */}
        {showPopup && (
          <CreateCampaignInfo
            coverImage={imageFile} // pass the actual file
            coverColor={color}
            onClose={() => setShowPopup(false)}
            creatorUserId={userId}
            initialCampaignName={title} // ✅ pass title to popup
          />
        )}
      </div>
    </>
  );
};

export default CreateCampaign;







