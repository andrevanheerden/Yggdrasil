import React, { useEffect, useState } from "react";
import coverImg from '../../../assets/images/cover.png';
import campaignImg2 from '../../../assets/images/forest.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Home.css';

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
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/campaigns/my", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCampaigns(res.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err.response?.data || err.message);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="book-center-wrapper">
      <CreateCampaignBook />
      {campaigns.map(c => (
        <Book
          key={c.campaign_id}
          title={c.campaign_name}
          campaignImg={c.cover_img || campaignImg2}
          blockColor="#a65c2a"
          lineColor="#a65c2a"
          onClick={() => navigate(`/campaign/${c.campaign_id}`)}
        />
      ))}
    </div>
  );
};

export default BookCenterWrapper;
