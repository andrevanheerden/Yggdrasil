import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../../encounter.css";
import axios from "axios";

const CreateItemPage = forwardRef(({ onItemCreated }, ref) => {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [description, setDescription] = useState("");

  const [profA, setProfA] = useState([""]); // Damage types
  const [profB, setProfB] = useState([{ name: "", range: "", area: "", cost: "", effect: "" }]); // Abilities

  const [encounterId, setEncounterId] = useState(null);

  // 🧠 Load the most recent encounter ID from localStorage
  useEffect(() => {
    const storedEncounterId = localStorage.getItem("selectedEncounterId");
    if (storedEncounterId) {
      setEncounterId(storedEncounterId);
      console.log("🟢 Loaded Encounter ID:", storedEncounterId);
    } else {
      console.warn("⚠️ No encounter selected in localStorage");
    }
  }, []);

  // Expose handleSubmit to parent via ref
  useImperativeHandle(ref, () => ({ handleSubmit }));

  const handleSubmit = async () => {
    if (!encounterId) {
      alert("No encounter selected. Please open an encounter first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("encounter_id", encounterId);
      formData.append("item_name", itemName);
      formData.append("item_type", itemType);
      formData.append("item_description", description);
      

      // Map first ability (or leave empty)
      const firstAbility = profB[0] || {};
      formData.append("item_range", firstAbility.range || "");
      formData.append("item_area", firstAbility.area || "");
      formData.append("item_cost", firstAbility.cost || "");
      formData.append("item_effect", firstAbility.effect || "");

      // Damage types as JSON
formData.append(
  "damage_types",
  JSON.stringify(profA.filter(d => d.trim() !== ""))
);

 // profA is array of strings


      // Full abilities array as JSON
      formData.append("abilities", JSON.stringify(profB));

      // Image
      if (itemImage) {
        formData.append("item_image", itemImage);
      }

      console.log("📦 Sending payload with Encounter ID:", encounterId);

      const res = await axios.post(
        "http://localhost:5000/api/encounter-inventory",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Item created successfully!");
      if (onItemCreated) onItemCreated(res.data);

      // Reset form
      setItemName("");
      setItemType("");
      setItemImage(null);
      setDescription("");
      setProfA([""]);
      setProfB([{ name: "", range: "", area: "", cost: "", effect: "" }]);
    } catch (err) {
      console.error("❌ Create item error:", err);
      alert("Failed to create item");
    }
  };

  return (
    <div className="character-main">
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Name & Type */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
          }}
        >
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            style={{
              width: "500px",
              padding: "8px",
              fontSize: "18px",
              fontFamily: "'Caudex', serif",
              borderRadius: "5px",
              border: "2px solid #333",
            }}
          />
          <input
            type="text"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            placeholder="Item Type"
            style={{
              width: "500px",
              padding: "8px",
              fontSize: "18px",
              fontFamily: "'Caudex', serif",
              borderRadius: "5px",
              border: "2px solid #333",
            }}
          />
        </div>

        {/* Image */}
        <div
          style={{
            width: "125px",
            height: "125px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #333",
            position: "relative",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => document.getElementById("item-image").click()}
        >
          {itemImage ? (
            <img
              src={URL.createObjectURL(itemImage)}
              alt="Item"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Caudex', serif",
                color: "#666",
                textAlign: "center",
                padding: "5px",
              }}
            >
              Click to choose image
            </div>
          )}
          <input
            id="item-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setItemImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Description & Abilities */}
      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        {/* Description */}
        <div
          className="character-description-container"
          style={{
            width: "800px",
            height: "625px",
            background: "#D9D9D9",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Caudex', serif",
            fontSize: "16px",
            color: "#333",
          }}
        >
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              resize: "none",
              fontFamily: "'Caudex', serif",
              fontSize: "16px",
              color: "#333",
              textAlign: "left",
            }}
            placeholder="Write a description of the item and its information here..."
          />
        </div>

        {/* Damage & Abilities */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Damage */}
          <div
            className="skills-box white-box3"
            style={{ width: "240px", height: "200px" }}
          >
            <h3>Damage</h3>
            {profA.map((prof, index) => (
              <input
                key={index}
                type="text"
                value={prof}
                onChange={(e) => {
                  const newArr = [...profA];
                  newArr[index] = e.target.value.slice(0, 20);
                  setProfA(newArr);
                }}
                placeholder="D* type..."
                maxLength={20}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontFamily: "'Caudex', serif",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              />
            ))}
            <button
              onClick={() => setProfA([...profA, ""])}
              style={{
                marginTop: "5px",
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#199a6a",
                color: "#fff",
                fontFamily: "'Caudex', serif",
                cursor: "pointer",
              }}
            >
              Add Damage type
            </button>
          </div>

          {/* Abilities */}
          <div
            className="skills-box white-box3"
            style={{
              width: "260px",
              height: "395px",
              overflowY: "auto",
              padding: "5px",
            }}
          >
            <h3>Abilities</h3>
            {profB.map((prof, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="text"
                  value={prof.name}
                  onChange={(e) => {
                    const newArr = [...profB];
                    newArr[index].name = e.target.value.slice(0, 18);
                    setProfB(newArr);
                  }}
                  placeholder="Ability name"
                  maxLength={18}
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontFamily: "'Caudex', serif",
                    fontSize: "14px",
                  }}
                />
                <input
                  type="text"
                  value={prof.range}
                  onChange={(e) => {
                    const newArr = [...profB];
                    newArr[index].range = e.target.value.slice(0, 18);
                    setProfB(newArr);
                  }}
                  placeholder="Range"
                  maxLength={18}
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontFamily: "'Caudex', serif",
                    fontSize: "14px",
                  }}
                />
                <input
                  type="text"
                  value={prof.area}
                  onChange={(e) => {
                    const newArr = [...profB];
                    newArr[index].area = e.target.value.slice(0, 18);
                    setProfB(newArr);
                  }}
                  placeholder="Area"
                  maxLength={18}
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontFamily: "'Caudex', serif",
                    fontSize: "14px",
                  }}
                />
                <input
                  type="text"
                  value={prof.cost}
                  onChange={(e) => {
                    const newArr = [...profB];
                    newArr[index].cost = e.target.value.slice(0, 18);
                    setProfB(newArr);
                  }}
                  placeholder="Cost"
                  maxLength={18}
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontFamily: "'Caudex', serif",
                    fontSize: "14px",
                  }}
                />
                <textarea
                  value={prof.effect}
                  onChange={(e) => {
                    const newArr = [...profB];
                    newArr[index].effect = e.target.value.slice(0, 420);
                    setProfB(newArr);
                  }}
                  placeholder="Effect"
                  maxLength={420}
                  style={{
                    width: "240px",
                    height: "200px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontFamily: "'Caudex', serif",
                    fontSize: "14px",
                    gridColumn: "span 2",
                    resize: "vertical",
                    overflowY: "auto",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateItemPage;

