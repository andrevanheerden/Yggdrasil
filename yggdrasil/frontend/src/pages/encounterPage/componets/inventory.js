import React, { useState, useEffect } from "react";
import "../encounter.css";
import axios from "axios";
import FullItemView from "./fullItemView";
import CreateItemPopup from "./itemCreater/itemCreatePopup";  // ✅ import popup

const RightPageInventory = () => {
  const [items, setItems] = useState([]); // dynamic items from backend
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inventory");
  const [isCreateOpen, setIsCreateOpen] = useState(false); // popup toggle

  // Fetch items whenever the encounter changes
useEffect(() => {
  const fetchItems = async () => {
    const encounterIdRaw = localStorage.getItem("selectedEncounterId");
    if (!encounterIdRaw) return;

    const encounterId = encounterIdRaw.split(":")[0].trim();

    try {
      const res = await axios.get(
        `http://localhost:5000/api/encounter-inventory/encounter/${encounterId}`
      );

      const fetchedItems = res.data || [];
      setItems(fetchedItems);
      setSelectedItem(fetchedItems[0] || null); // null if no items
    } catch (err) {
      console.error("Error fetching encounter items:", err);
      setItems([]);
      setSelectedItem(null);
    }
  };

  fetchItems();
}, []);

let damageTypes = [];
if (selectedItem) {
  if (Array.isArray(selectedItem.damage_types)) {
    damageTypes = selectedItem.damage_types;
  } else if (typeof selectedItem.damage_types === "string") {
    try {
      damageTypes = JSON.parse(selectedItem.damage_types);
      if (!Array.isArray(damageTypes)) {
        damageTypes = selectedItem.damage_types.split(",").map(s => s.trim()).filter(Boolean);
      }
    } catch {
      damageTypes = selectedItem.damage_types.split(",").map(s => s.trim()).filter(Boolean);
    }
  }
}

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
              <div className="item-name">{selectedItem.item_name}</div>
              <div className="item-type">{selectedItem.item_type}</div>
            </div>
            <div className="item-image-container">
              <img
                src={selectedItem.item_image || "/fallback-image.jpg"} // fallback image if none
                alt={selectedItem.item_name}
                className="item-image"
              />
            </div>
          </div>

          {/* Middle Section */}
          <div className="inventory-middle">
            <div className="inventory-description-container">
              <div className="inventory-description-box">
                <div className="inventory-description-title">Description</div>
                {selectedItem.item_description}
              </div>
            </div>

            <div className="damage-container">
  {damageTypes.slice(0, 3).map((dmg, i) => (
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
                  key={item.encounter_item_id}
                  className={`inventory-slot ${selectedItem?.encounter_item_id === item.encounter_item_id ? "active" : ""}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.item_image || "/fallback-image.jpg"}
                    alt={item.item_name}
                    className="inventory-img"
                  />
                </div>
              ))}

              {/* Create New Item Block */}
              <div
                className="inventory-slot create-new"
                onClick={() => setIsCreateOpen(true)}
              >
                <span>+ Create New Item</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "fullItemView" && <FullItemView item={selectedItem} />}

      {/* Popup */}
      {isCreateOpen && <CreateItemPopup onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
};

export default RightPageInventory;



