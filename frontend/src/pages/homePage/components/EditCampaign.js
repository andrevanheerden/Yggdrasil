import React, { useState, useEffect } from "react";
import coverImg from "../../../assets/images/cover.png";
import campaignImg2 from "../../../assets/images/Logo.png";
import "../Home.css";
import Navbar from "./Navbar";
import EditCampaignInfo from "../../campaignPage/componets/EditCampaignInfo";
import { toast } from "react-toastify";
import axios from "axios";

const EditCampaign = () => {
  const [title, setTitle] = useState("Edit Campaign");
  const [color, setColor] = useState("#2a6ca6");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(campaignImg2);
  const [showPopup, setShowPopup] = useState(false);

const campaignId = (localStorage.getItem("editCampaignId") || "").split(":")[0];



  useEffect(() => {
    if (!campaignId) return;

    const fetchCampaign = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/campaigns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const campaign = res.data.find((c) => c.campaign_id === campaignId);
        if (campaign) {
          setTitle(campaign.campaign_name);
          setColor(campaign.cover_color || "#2a6ca6");
          setImagePreview(campaign.cover_img || campaignImg2);
          setShowPopup(true);
        }
      } catch (err) {
        console.error("Error loading campaign for edit:", err);
        toast.error("Failed to load campaign data.");
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast.info("Campaign image selected!");
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

        {/* Popup */}
        {showPopup && (
          <EditCampaignInfo
            coverImage={imageFile}
            coverColor={color}
            onClose={() => setShowPopup(false)}
            initialCampaignName={title}
            editCampaignId={campaignId}
          />
        )}
      </div>
    </>
  );
};

export default EditCampaign;
