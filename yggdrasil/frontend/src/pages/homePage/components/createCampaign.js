import React, { useState } from "react";
import coverImg from "../../../assets/images/cover.png";
import campaignImg2 from "../../../assets/images/Logo.png"; // default "create" image
import "../Home.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("Create a Campaign");
  const [color, setColor] = useState("#2a6ca6");
  const [image, setImage] = useState(campaignImg2);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
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
              src={image}
              alt="Campaign"
            />
          </div>

          <div className="book-color-block" style={{ background: color }} />
        </div>

        {/* Control Panel (styled like notepad) */}
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
                onClick={() =>
                  navigate("/Campaign", {
                    state: {
                      openPopup: true, // ✅ tell the campaign page to open the popup
                      title,
                      color,
                      image,
                    },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCampaign;





