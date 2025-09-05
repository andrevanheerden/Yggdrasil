import React from "react";
import "./campaign.css";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav  from "../bookmarkNav/bookmarkNav";

const Campaign = () => {
  return (
    <>      <BookmarkNav />
      <Navbar />

      <div
        className="campaign-container"
        style={{ backgroundImage: `url(${OPcover})`, marginTop: '20px' }}
      >
        {/* Top block */}
        <div className="top-block"></div>

        <div className="book-wrapper">
          <LeftP />
          <RightP />
        </div>
      </div>
    </>
  );
};

export default Campaign;




