import React, { useState } from "react";
import OPcover from "../../assets/images/OPcover.png"; 
import LeftP from "./componets/leftP";  
import RightP from "./componets/rightP";
import Navbar from "../homePage/components/Navbar";
import BookmarkNav from "../bookmarkNav/bookmarkNav";
import "./character.css";

function Character() {
  const [activeTab, setActiveTab] = useState("characterSheet"); // default main tab
  const [inventorySubTab, setInventorySubTab] = useState("inventory"); // Inventory internal tab
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <BookmarkNav />
      <Navbar />

      {/* Top main tabs above the book */}
      <div className="char-left-tab-buttons">
        <button
          className={`char-left-tab-btn ${activeTab === "characterSheet" ? "active" : ""}`}
          onClick={() => setActiveTab("characterSheet")}
        >
          Character Sheet
        </button>
        <button
          className={`char-left-tab-btn ${activeTab === "desc" ? "active" : ""}`}
          onClick={() => setActiveTab("desc")}
        >
          Description
        </button>
        <button
          className={`char-left-tab-btn ${activeTab === "background" ? "active" : ""}`}
          onClick={() => setActiveTab("background")}
        >
          Background
        </button>
        <button
          className={`char-left-tab-btn ${activeTab === "class" ? "active" : ""}`}
          onClick={() => setActiveTab("class")}
        >
          Class
        </button>
        <button
          className={`char-left-tab-btn ${activeTab === "race" ? "active" : ""}`}
          onClick={() => setActiveTab("race")}
        >
          Race
        </button>

      </div>

      {/* Inventory sub-tabs (show only when Inventory main tab is active) */}

  <div className="inventory-nav-container">
    <div className="inv-top-tab-buttons">
      <button
        className={`inv-top-tab-btn ${activeTab === "inventory" ? "active" : ""}`}
        onClick={() => setActiveTab("inventory")}
      >
        Inventory
      </button>
      <button
        className={`inv-top-tab-btn ${activeTab === "itemView" ? "active" : ""}`}
        onClick={() => setActiveTab("itemView")}
        disabled={!selectedItem}
      >
        Item View
      </button>
    </div>
  </div>



      {/* Book pages */}
      <div
        className="campaign-container"
        style={{ backgroundImage: `url(${OPcover})`, marginTop: "20px" }}
      >
        <div className="top-block"></div>
        <div className="book-wrapper">
          {/* Show main character pages if not in Inventory */}
          {activeTab !== "inventory" && (
            <>
              <LeftP activeTab={activeTab} />
              <RightP />
            </>
          )}

          {/* Show Inventory content when Inventory tab is active */}
          {activeTab === "inventory" && inventorySubTab === "inventory" && (
            <RightP selectedItem={setSelectedItem} /> // or RightPageInventory if you rename it
          )}
          {activeTab === "inventory" && inventorySubTab === "itemView" && selectedItem && (
            <div className="page right-page">
              <h2 style={{ textAlign: "center" }}>{selectedItem.name}</h2>
              <p style={{ textAlign: "center" }}>{selectedItem.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Character;





