import React, { useState, useEffect } from "react";
import "../character.css";
import FullItemView from "./fullItemView";
import CreateItemPopup from "./itemCreater/itemCreatePopup";
import axios from "axios";
import fallbackImg from "../../../assets/images/noItem.jpg";

const RightPageInventory = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inventory");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [characterId, setCharacterId] = useState(null);

  useEffect(() => {
    // Load selected character ID from localStorage
    const storedId = localStorage.getItem("selectedCharacterId");
    if (storedId) setCharacterId(storedId);
  }, []);

  useEffect(() => {
    if (!characterId) {
      setItems([]);
      setSelectedItem(null);
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/character-inventory/character/${characterId}`
        );
        const fetchedItems = res.data || [];
        setItems(fetchedItems);
        setSelectedItem(fetchedItems[0] || null);
      } catch (err) {
        console.error("Error fetching character items:", err);
        setItems([]);
        setSelectedItem(null);
      }
    };

    fetchItems();
  }, [characterId]);

  // handle damage types
  let damageTypes = [];
  if (selectedItem) {
    if (Array.isArray(selectedItem.damage_types)) {
      damageTypes = selectedItem.damage_types;
    } else if (typeof selectedItem.damage_types === "string") {
      try {
        damageTypes = JSON.parse(selectedItem.damage_types);
        if (!Array.isArray(damageTypes)) {
          damageTypes = selectedItem.damage_types
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      } catch {
        damageTypes = selectedItem.damage_types
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  }

  return (
    <div className="page right-page" style={{ position: "relative" }}>
      {/* Tabs */}
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

      {activeTab === "inventory" && (
        <>
          {items.length === 0 ? (
            <div className="inventory-empty-message">
              <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
                No items found for this character.
              </p>
            </div>
          ) : (
            <>
              {selectedItem && (
                <>
                  <div className="inventory-header">
                    <div className="inventory-title">
                      <div className="item-name">{selectedItem.item_name}</div>
                      <div className="item-type">{selectedItem.item_type}</div>
                    </div>
                    <div className="item-image-container">
                      <img
                        src={selectedItem.item_image || fallbackImg}
                        alt={selectedItem.item_name}
                        className="item-image"
                      />
                    </div>
                  </div>

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
                </>
              )}

              <div className="inventory-container scroll-box">
                <div className="inventory-grid">
                  {items.map((item) => (
                    <div
                      key={item.character_inventory_id}
                      className={`inventory-slot ${
                        selectedItem?.character_inventory_id === item.character_inventory_id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.item_image || fallbackImg}
                        alt={item.item_name}
                        className="inventory-img"
                      />
                    </div>
                  ))}

                  {/* Create Item Slot */}
                  <div
                    className="inventory-slot create-new"
                    onClick={() => setIsCreateOpen(true)}
                  >
                    <span>+ Create Item</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {activeTab === "fullItemView" && <FullItemView item={selectedItem} />}

      {isCreateOpen && <CreateItemPopup onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
};

export default RightPageInventory;
