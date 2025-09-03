import React from 'react';
import coverImg from '../../../assets/images/cover.png';
import campaignImg1 from '../../../assets/images/rose.jpg';
import campaignImg2 from '../../../assets/images/Logo.png';
import campaignImg3 from '../../../assets/images/forest.jpg'; // Example third image
import '../Home.css';

const Book = ({
  title = "Create a Campaign",
  campaignImg,
  blockColor = "#a65c2a",
  lineColor = "#a65c2a"
}) => {
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

const BookCenterWrapper = () => (
  <div className="book-center-wrapper">
    <Book
      title="Campaign One"
      campaignImg={campaignImg1}
      blockColor="#a65c2a"
      lineColor="#a65c2a"
    />
    <Book
      title="Campaign Two"
      campaignImg={campaignImg3}
      blockColor="#199A6A"
      lineColor="#199A6A"
    />
    <Book
      title="Campaign Three"
      campaignImg={campaignImg3}
      blockColor="#3b2fa6"
      lineColor="#3b2fa6"
    />
    <Book
      title="Campaign One"
      campaignImg={campaignImg1}
      blockColor="#a65c2a"
      lineColor="#a65c2a"
    />
    <Book
      title="Campaign Two"
      campaignImg={campaignImg3}
      blockColor="#199A6A"
      lineColor="#199A6A"
    />
    <Book
      title="Campaign Three"
      campaignImg={campaignImg3}
      blockColor="#3b2fa6"
      lineColor="#3b2fa6"
    />
  </div>
);

export default BookCenterWrapper;