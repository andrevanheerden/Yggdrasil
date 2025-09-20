import React, { useEffect, useState } from "react";
import coverImg from '../../../assets/images/cover.png';
import campaignImg2 from '../../../assets/images/forest.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Home.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* --- Base Book Component --- */
const Book = ({ title, campaignImg, blockColor, lineColor, onClick }) => (
  <div
    className="book-container"
    style={{ backgroundImage: `url(${coverImg})` }}
    onClick={onClick}
  >
    <div className="book-vertical-line" style={{ background: lineColor }}></div>
    <div className="book-title">{title}</div>
    <div className="book-campaign-img-wrapper">
      <img className="book-campaign-img" src={campaignImg} alt="Campaign" />
    </div>
    <div className="book-color-block" style={{ background: blockColor }}></div>
  </div>
);

/* --- Create Campaign Book --- */
const CreateCampaignBook = () => {
  const navigate = useNavigate();
  return (
    <Book
      title="Create a Campaign"
      campaignImg={campaignImg2}
      blockColor="#2a6ca6"
      lineColor="#2a6ca6"
      onClick={() => navigate("/create")}
    />
  );
};

/* --- BookCenterWrapper --- */
const BookCenterWrapper = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please log in.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/campaigns/my", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCampaigns(res.data);
        toast.success("Campaigns loaded successfully!");
      } catch (err) {
        console.error("Error fetching campaigns:", err.response?.data || err.message);
        toast.error("Failed to load campaigns.");
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <div className="book-center-wrapper">
        <CreateCampaignBook />
        {campaigns.map(c => (
          <Book
            key={c.campaign_id}
            title={c.campaign_name}
            campaignImg={c.cover_img || campaignImg2}
            blockColor={c.cover_color || "#a65c2a"}
            lineColor={c.cover_color || "#a65c2a"}
            onClick={() => navigate(`/campaign/${c.campaign_id}`)}
          />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BookCenterWrapper;

