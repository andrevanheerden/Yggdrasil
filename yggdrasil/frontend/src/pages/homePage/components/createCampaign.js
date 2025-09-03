import React, { useState } from "react";
import coverImg from "../../../assets/images/cover.png";
import campaignImg2 from "../../../assets/images/Logo.png"; // default "create" image
import "../Home.css";

const CreateCampaignPage = () => {
  const [title, setTitle] = useState("Create a Campaign");
  const [color, setColor] = useState("#2a6ca6");
  const [image, setImage] = useState(campaignImg2);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="create-campaign-page">
      {/* Book Preview */}
      <div
        className="book-container large-preview"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        <div className="book-vertical-line" style={{ background: color }} />
        <div className="book-title">{title}</div>

        <div className="book-campaign-img-wrapper" >
          <img className="book-campaign-img" style={{maxHeight: '400px' , maxWidth: '100%' }} src={image} alt="Campaign" />
        </div>

        <div className="book-color-block" style={{ background: color }} />
      </div>

      {/* Content Collector - OUTSIDE the book */}
      <div className="content-panel">
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
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        <label>
          Accent Color
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default CreateCampaignPage;


