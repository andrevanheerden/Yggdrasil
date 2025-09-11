import React, { useState, useEffect } from "react";
import "../encounter.css";
import daggerImg from "../../../assets/images/dagger.jpg"; // placeholder for dagger
import armorImg from "../../../assets/images/brokenArmor.jpg";   // placeholder for pouch
import pouchImg from "../../../assets/images/pouch.jpg"; // placeholder for dagger
import FullItemView from "./fullItemView"; // import your full item view

const RightPageInventory = () => {
  const [items] = useState([
    {
      id: "dagger",
      name: "Crude Goblin Dagger",
      type: "Weapon - Dagger",
      image: daggerImg, // replace with a dagger image if you have one
      description:
        "A jagged dagger fashioned from scrap metal. It’s rusted and uneven, but still sharp enough to be dangerous.",
      damage: ["1d4 Piercing"],
    },
    {
      id: "armor",
      name: "Tattered Leather Armor",
      type: "Armor - Light",
      image: armorImg, // replace with an armor image if you have one
      description:
        "Patchwork leather armor held together with crude stitching. Offers minimal protection.",
      damage: [],
    },
    {
      id: "pouch",
      name: "Small Coin Pouch",
      type: "Misc - Currency",
      image: pouchImg, // replace with a pouch/coin image if you have one
      description:
        "A small pouch containing a handful of copper coins. Likely stolen.",
      damage: [],
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inventory");

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
                  className={`inventory-slot ${
                    selectedItem?.id === item.id ? "active" : ""
                  }`}
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
