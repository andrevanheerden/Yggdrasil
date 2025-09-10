import React, { useState, useEffect } from "react";
import "../character.css";
import swordImg from "../../../assets/images/sword.jpg";
import ringImg from "../../../assets/images/ring.jpg";
import FullItemView from "./fullItemView"; // import your full item view

const RightPageInventory = () => {
  const [items] = useState([
    {
      id: 1,
      name: "Sword of the Night",
      type: "Weapon - Longsword",
      image: swordImg,
      description:
        "Forged in shadow and quenched in the thirst of dying stars, the Sword of the Night is a blade that drinks the light around it.",
      damage: ["2d6 Slashing", "1d4 Cold"],
    },
    {
      id: 2,
      name: "Golden Ring",
      type: "Accessory",
      image: ringImg,
      description: "An ornate golden ring, humming with a faint magical aura.",
      damage: [],
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inventory"); // NEW: active tab state

  useEffect(() => {
    if (!selectedItem && items.length > 0) {
      setSelectedItem(items[0]);
    }
  }, [items, selectedItem]);

  return (
    <div className="page right-page" style={{ position: "relative" }}>
      {/* Nav Tabs */}
      <div className="right-page-tabs">
        <button
          className={`right-tab-btn ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
        <button
          className={`right-tab-btn ${activeTab === "fullItemView" ? "active" : ""}`}
          onClick={() => setActiveTab("fullItemView")}
        >
          Full Item View
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "inventory" && selectedItem && (
        <>
          {/* Header */}
          <div className="inventory-header">
            <div className="inventory-title">
              <div className="item-name">{selectedItem.name}</div>
              <div className="item-type">{selectedItem.type}</div>
            </div>
            <div className="item-image-container">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="item-image"
              />
            </div>
          </div>

          {/* Middle Section */}
          <div className="inventory-middle">
<div className="inventory-description-container">
  
  <div className="inventory-description-box">
    <div className="inventory-description-title">Description</div>
    {selectedItem.description}
  </div>
</div>

            <div className="damage-container">
              {selectedItem.damage.slice(0, 3).map((dmg, i) => (
                <div key={i} className="damage-hexagon">
                  {dmg}
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Grid */}
          <div className="inventory-container scroll-box">
            <div className="inventory-grid">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`inventory-slot ${selectedItem?.id === item.id ? "active" : ""}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img src={item.image} alt={item.name} className="inventory-img" />
                </div>
              ))}
              {Array.from({ length: 16 - items.length }).map((_, i) => (
                <div key={`empty-${i}`} className="inventory-slot empty"></div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "fullItemView" && <FullItemView item={selectedItem} />}
    </div>
  );
};

export default RightPageInventory;
