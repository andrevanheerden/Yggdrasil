import React, { useState, useEffect } from "react";
import "../character.css";
import axios from "axios";
import FullItemView from "./fullItemView";
import CreateItemPopup from "./itemCreater/itemCreatePopup";
import fallbackImg from "../../../assets/images/noItem.jpg";

const RightPageInventory = ({ selectedCharacter }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inventory");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Fetch inventory when selectedCharacter changes
  useEffect(() => {
    if (!selectedCharacter?.id) {
      setItems([]);
      setSelectedItem(null);
      return;
    }

    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/character-inventory/character/${selectedCharacter.id}`
        );
        const fetchedItems = res.data || [];
        setItems(fetchedItems);
        setSelectedItem(fetchedItems[0] || null);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setItems([]);
        setSelectedItem(null);
      }
    };

    fetchInventory();
  }, [selectedCharacter]);

  // Parse damage types safely
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
          {!selectedCharacter ? (
            <div className="inventory-empty-message">
              <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
                Select a character to view inventory.
              </p>
            </div>
          ) : (
            <>
              {/* Selected Item Info (if exists) */}
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
                        {selectedItem.item_description || "-"}
                      </div>
                    </div>

                    <div className="damage-container">
                      {damageTypes.slice(0, 3).map((dmg, i) => (
                        <div key={i} className="damage-hexagon">{dmg}</div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Inventory Grid (always visible) */}
              <div className="inventory-container scroll-box">
                <div className="inventory-grid">
                  {items.length > 0 ? (
                    items.map((item) => (
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
                    ))
                  ) : (
                    <div className="inventory-slot-placeholder">
                      <p style={{ textAlign: "center", opacity: 0.5 }}>No items yet</p>
                    </div>
                  )}

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

      {isCreateOpen && (
        <CreateItemPopup
          characterId={selectedCharacter?.id}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
};

export default RightPageInventory;
