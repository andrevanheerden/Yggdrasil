import React from 'react';
import coverImg from '../../../assets/images/cover.png';
import campaignImg from '../../../assets/images/rose.jpg';
import '../Home.css';

const Book = ({ title = "Create a Campaign" }) => {
  return (
    <div
      className="book-container"
      style={{
        backgroundImage: `url(${coverImg})`
      }}
    >
      {/* Vertical line */}
      <div className="book-vertical-line"></div>
      <div className="book-title">{title}</div>
      <div className="book-campaign-img-wrapper">
        <img className="book-campaign-img" src={campaignImg} alt="Campaign" />
      </div>
      <div className="book-color-block"></div>
    </div>
  );
};

export default Book;