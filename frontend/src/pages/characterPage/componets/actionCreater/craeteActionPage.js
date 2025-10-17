import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../../character.css";
import API from "../../../../api";

const CreateActionPage = forwardRef(({ onActionCreated }, ref) => {
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState("");
  const [actionImage, setActionImage] = useState(null);
  const [description, setDescription] = useState("");
  const [effectA, setEffectA] = useState([""]); // damage types
  const [effectB, setEffectB] = useState([{ level: "", range: "", area: "", cost: "", effect: "" }]);
  const [characterId, setCharacterId] = useState(null);

  // Load character ID from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("selectedCharacterId");
    if (storedId) setCharacterId(storedId);
    else console.warn("⚠️ No character selected in localStorage");
  }, []);

  // Expose handleSubmit to parent
  useImperativeHandle(ref, () => ({ handleSubmit }));

  const handleSubmit = async () => {
    if (!characterId) {
      alert("No character selected. Please select a character first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("character_id", characterId);
      formData.append("action_name", actionName);
      formData.append("action_type", actionType);
      formData.append("action_description", description);

      const firstEffect = effectB[0] || {};
      formData.append("action_range", firstEffect.range || "");
      formData.append("action_area", firstEffect.area || "");
      formData.append("action_cost", firstEffect.cost || "");

      // effect text array
      const allEffectTexts = effectB.map(e => e.effect || "");
      formData.append("effects", JSON.stringify(allEffectTexts));

      // Damage types array
      formData.append("damage_types", JSON.stringify(effectA.filter(d => d.trim() !== "")));

      // Image
      if (actionImage) formData.append("action_image", actionImage);

      const res = await API.post(
        "/api/character-actions",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Action created successfully!");
      if (onActionCreated) onActionCreated(res.data);

      // Reset form
      setActionName("");
      setActionType("");
      setActionImage(null);
      setDescription("");
      setEffectA([""]);
      setEffectB([{ level: "", range: "", area: "", cost: "", effect: "" }]);
    } catch (err) {
      console.error("❌ Create action error:", err);
      alert("Failed to create action.");
    }
  };

  return (
    <div className="character-main">
      {/* Top Bar */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          <input
            type="text"
            value={actionName}
            onChange={(e) => setActionName(e.target.value)}
            placeholder="Action Name"
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
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            placeholder="Action Type"
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

        <div
          style={{
            width: "125px",
            height: "125px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #333",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("action-image").click()}
        >
          {actionImage ? (
            <img
              src={URL.createObjectURL(actionImage)}
              alt="Action"
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
              }}
            >
              Click to choose image
            </div>
          )}
          <input
            id="action-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setActionImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        {/* Left: Description */}
        <div
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
            }}
            placeholder="Write action description..."
          />
        </div>

        {/* Right Column: Damage & Effects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Damage */}
          <div className="skills-box white-box3" style={{ width: "240px", height: "200px" }}>
            <h3>Damage</h3>
            {effectA.map((eff, idx) => (
              <input
                key={idx}
                type="text"
                value={eff}
                onChange={(e) => {
                  const arr = [...effectA];
                  arr[idx] = e.target.value.slice(0, 20);
                  setEffectA(arr);
                }}
                placeholder="Damage type..."
                maxLength={20}
                style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "16px", marginBottom: "5px" }}
              />
            ))}
            <button
              onClick={() => setEffectA([...effectA, ""])}
              style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#199a6a", color: "#fff", fontFamily: "'Caudex', serif", cursor: "pointer" }}
            >
              Add Damage type
            </button>
          </div>

          {/* Effects */}
          <div className="skills-box white-box3" style={{ width: "260px", height: "395px", overflowY: "auto", padding: "5px" }}>
            <h3>Effects</h3>
            {effectB.map((eff, index) => (
              <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", marginBottom: "10px" }}>
                <input
                  type="text"
                  value={eff.range}
                  onChange={(e) => {
                    const arr = [...effectB];
                    arr[index].range = e.target.value.slice(0, 18);
                    setEffectB(arr);
                  }}
                  placeholder="Range"
                  maxLength={18}
                  style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }}
                />
                <input
                  type="text"
                  value={eff.area}
                  onChange={(e) => {
                    const arr = [...effectB];
                    arr[index].area = e.target.value.slice(0, 18);
                    setEffectB(arr);
                  }}
                  placeholder="Area"
                  maxLength={18}
                  style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }}
                />
                <input
                  type="text"
                  value={eff.cost}
                  onChange={(e) => {
                    const arr = [...effectB];
                    arr[index].cost = e.target.value.slice(0, 18);
                    setEffectB(arr);
                  }}
                  placeholder="Cost"
                  maxLength={18}
                  style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif', fontSize: '14px" }}
                />
                <textarea
                  value={eff.effect}
                  onChange={(e) => {
                    const arr = [...effectB];
                    arr[index].effect = e.target.value.slice(0, 420);
                    setEffectB(arr);
                  }}
                  placeholder="Effect"
                  maxLength={420}
                  style={{ width: "240px", height: "200px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px", gridColumn: "span 2", resize: "vertical", overflowY: "auto", backgroundColor: "transparent" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateActionPage;
