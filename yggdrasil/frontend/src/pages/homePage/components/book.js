import React from 'react';
import coverImg from '../../../assets/images/cover.png';
import campaignImg1 from '../../../assets/images/rose.jpg';
import campaignImg2 from '../../../assets/images/forest.jpg';
import { useNavigate } from "react-router-dom";
import '../Home.css';

/* --- Base Book Component --- */
const Book = ({ title, campaignImg, blockColor, lineColor }) => {
  return (
    <div
      className="book-container"
      style={{
        backgroundImage: `url(${coverImg})`
      }}
    >
      {/* Vertical line */}
      <div
        className="book-vertical-line"
        style={{ background: lineColor }}
      ></div>

      <div className="book-title">{title}</div>

      <div className="book-campaign-img-wrapper">
        <img className="book-campaign-img" src={campaignImg} alt="Campaign" />
      </div>

      <div
        className="book-color-block"
        style={{ background: blockColor }}
      ></div>
    </div>
  );
};

/* --- Create Campaign Book --- */
const CreateCampaignBook = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/create")} style={{ cursor: "pointer" }}>
      <Book
        title="Create a Campaign"
        campaignImg={campaignImg2}
        blockColor="#2a6ca6"
        lineColor="#2a6ca6"
      />
    </div>
  );
};

/* --- Normal Campaign Book --- */
const CampaignBook = ({ title, img }) => (
  <Book
    title={title}
    campaignImg={img}
    blockColor="#a65c2a"
    lineColor="#a65c2a"
  />
);

/* --- Wrapper for all Books --- */
const BookCenterWrapper = () => (
  <div className="book-center-wrapper">
    <CreateCampaignBook />
    <CampaignBook title="Campaign One" img={campaignImg1} />
  </div>
);

export default BookCenterWrapper;
