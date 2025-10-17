import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../../encounter.css";
import API from "../../../../api";

const CreateSpellPage = forwardRef(({ onSpellCreated, encounterId }, ref) => {
  const [spellName, setSpellName] = useState("");
  const [spellType, setSpellType] = useState("");
  const [spellImage, setSpellImage] = useState(null);
  const [description, setDescription] = useState("");
  const [effectA, setEffectA] = useState([""]);
  const [effectB, setEffectB] = useState([{ level: 0, range: "", area: "", cost: "", effect: "" }]);

  // Expose handleSubmit to parent
  useImperativeHandle(ref, () => ({ handleSubmit }));

const handleSubmit = async () => {
  const encounterIdToUse = encounterId || localStorage.getItem("selectedEncounterId");
  if (!encounterIdToUse) {
    alert("No encounter selected. Please open an encounter first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("encounter_id", encounterIdToUse);
    formData.append("spell_name", spellName);
    formData.append("spell_type", spellType);
    formData.append("spell_description", description);

    const firstEffect = effectB[0] || {};
    formData.append("spell_level", firstEffect.level || 0); // ✅ added
    formData.append("spell_range", firstEffect.range || "");
    formData.append("spell_area", firstEffect.area || "");
    formData.append("spell_cost", firstEffect.cost || "");
    formData.append("spell_effects", firstEffect.effect || "");
    formData.append("damage_types", JSON.stringify(effectA.filter(d => d.trim() !== "")));

    if (spellImage) formData.append("spell_image", spellImage);

    const res = await API.post(
      "/api/encounter-spells",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Spell created successfully!");
    if (onSpellCreated) onSpellCreated(res.data);

    // Reset form
    setSpellName("");
    setSpellType("");
    setSpellImage(null);
    setDescription("");
    setEffectA([""]);
    setEffectB([{ level: 0, range: "", area: "", cost: "", effect: "" }]);
  } catch (err) {
    console.error("❌ Failed to create spell:", err);
    alert("Failed to create spell");
  }
};




  return (
    <div className="character-main">
      {/* Top Bar: Name & Type, Image on Right */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
        {/* Name & Type (stacked vertically) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          <input
            type="text"
            value={spellName}
            onChange={(e) => setSpellName(e.target.value)}
            placeholder="Spell Name"
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
            value={spellType}
            onChange={(e) => setSpellType(e.target.value)}
            placeholder="Spell Type"
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

        {/* Image Block on Right */}
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
            right: '30px ',
          }}
          onClick={() => document.getElementById("spell-image").click()}
        >
          {spellImage ? (
            <img
              src={URL.createObjectURL(spellImage)}
              alt="Spell"
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
            id="spell-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setSpellImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        {/* Left: Description */}
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
            placeholder="Write a description of the spell and its information here..."
          />
        </div>

        {/* Right Column: Effect & Damage */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Effect Section */}
          <div className="skills-box white-box3" style={{ width: "240px", height: "200px" }}>
            <h3>Damage</h3>
            {effectA.map((eff, index) => (
              <input
                key={index}
                type="text"
                value={eff}
                onChange={(e) => {
                  const newArr = [...effectA];
                  newArr[index] = e.target.value.slice(0, 20);
                  setEffectA(newArr);
                }}
                placeholder="Damage type..."
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
              onClick={() => setEffectA([...effectA, ""])}
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

          {/* Abilities Section with Level Dropdown */}
          <div className="skills-box white-box3" style={{ width: "260px", height: "395px", overflowY: "auto", padding: "5px" }}>
            <h3>Effects</h3>
            {effectB.map((eff, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                  marginBottom: "10px",
                }}
              >
                {/* Level dropdown */}
                <select
                  value={eff.level}
                  onChange={(e) => {
                    const newArr = [...effectB];
                    newArr[index].level = Number(e.target.value);
                    setEffectB(newArr);
                  }}
                  style={{
                    width: "100%",
                    height: "30px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontFamily: "'Caudex', serif",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    marginTop: "8px",
                  }}
                >
                  <option value={0}>Cantrip (0)</option>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                  <option value={4}>Level 4</option>
                  <option value={5}>Level 5</option>
                  <option value={6}>Level 6</option>
                </select>

                <input
                  type="text"
                  value={eff.range}
                  onChange={(e) => {
                    const newArr = [...effectB];
                    newArr[index].range = e.target.value.slice(0, 18);
                    setEffectB(newArr);
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
                  value={eff.area}
                  onChange={(e) => {
                    const newArr = [...effectB];
                    newArr[index].area = e.target.value.slice(0, 18);
                    setEffectB(newArr);
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
                  value={eff.cost}
                  onChange={(e) => {
                    const newArr = [...effectB];
                    newArr[index].cost = e.target.value.slice(0, 18);
                    setEffectB(newArr);
                  }}
                  placeholder="cost"
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
                  value={eff.effect}
                  onChange={(e) => {
                    const newArr = [...effectB];
                    newArr[index].effect = e.target.value.slice(0, 420);
                    setEffectB(newArr);
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
                    verticalAlign: "top",
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

export default CreateSpellPage;
