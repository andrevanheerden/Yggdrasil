import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "../../character.css";
import API from "../../../../api";

const CreateSpellPage = forwardRef(({ onSpellCreated }, ref) => {
  const [spellName, setSpellName] = useState("");
  const [spellType, setSpellType] = useState("");
  const [spellImage, setSpellImage] = useState(null);
  const [description, setDescription] = useState("");

  const [damageTypes, setDamageTypes] = useState([""]);
  const [effects, setEffects] = useState([{ level: 0, range: "", area: "", cost: "", effect: "" }]);
  const [characterId, setCharacterId] = useState(null);

  // Load current character ID
  useEffect(() => {
    const storedId = localStorage.getItem("selectedCharacterId");
    if (storedId) setCharacterId(storedId);
    else console.warn("⚠️ No character selected in localStorage");
  }, []);

  // Expose handleSubmit
  useImperativeHandle(ref, () => ({ handleSubmit }));

  const handleSubmit = async () => {
  if (!characterId) {
    alert("No character selected. Please select a character first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("character_id", characterId);
    formData.append("spell_name", spellName);
    formData.append("spell_type", spellType);
    formData.append("spell_description", description);

    // Take the **first effect** for main columns
    const firstEffect = effects[0] || {};
    formData.append("spell_level", firstEffect.level || 0);
    formData.append("spell_range", firstEffect.range || "");
    formData.append("spell_area", firstEffect.area || "");
    formData.append("spell_cost", firstEffect.cost || "");

    // The effect text itself goes into spell_effects as JSON array
    const allEffectTexts = effects.map(e => e.effect || "");
    formData.append("spell_effects", JSON.stringify(allEffectTexts));

    // Damage types
    formData.append("damage_types", JSON.stringify(damageTypes.filter(d => d.trim() !== "")));

    // Image
    if (spellImage) formData.append("spell_image", spellImage);

    const res = await API.post("/api/character-spells", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Spell created successfully!");
    if (onSpellCreated) onSpellCreated(res.data);

    // Reset form
    setSpellName("");
    setSpellType("");
    setSpellImage(null);
    setDescription("");
    setDamageTypes([""]);
    setEffects([{ level: 0, range: "", area: "", cost: "", effect: "" }]);
  } catch (err) {
    console.error("❌ Create spell error:", err);
    alert("Failed to create spell.");
  }
};


  return (
    <div className="character-main">
      {/* Top Bar */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          <input
            type="text"
            value={spellName}
            onChange={(e) => setSpellName(e.target.value)}
            placeholder="Spell Name"
            style={{ width: "500px", padding: "8px", fontSize: "18px", fontFamily: "'Caudex', serif", borderRadius: "5px", border: "2px solid #333" }}
          />
          <input
            type="text"
            value={spellType}
            onChange={(e) => setSpellType(e.target.value)}
            placeholder="Spell Type"
            style={{ width: "500px", padding: "8px", fontSize: "18px", fontFamily: "'Caudex', serif", borderRadius: "5px", border: "2px solid #333" }}
          />
        </div>

        <div
          style={{ width: 125, height: 125, borderRadius: "50%", overflow: "hidden", border: "2px solid #333", cursor: "pointer" }}
          onClick={() => document.getElementById("spell-image").click()}
        >
          {spellImage ? (
            <img src={URL.createObjectURL(spellImage)} alt="Spell" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#ccc", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Caudex', serif", color: "#666" }}>
              Click to choose image
            </div>
          )}
          <input id="spell-image" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setSpellImage(e.target.files[0])} />
        </div>
      </div>

      {/* Description & Effects */}
      <div className="top-section" style={{ display: "flex", gap: "20px" }}>
        {/* Description */}
        <div style={{ width: "800px", height: "625px", background: "#D9D9D9", padding: "10px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", fontFamily: "'Caudex', serif", fontSize: "16px", color: "#333" }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write spell description..."
            style={{ flex: 1, width: "100%", border: "none", outline: "none", background: "transparent", resize: "none", fontFamily: "'Caudex', serif", fontSize: "16px", color: "#333" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Damage Types */}
          <div className="skills-box white-box3" style={{ width: "240px", height: "200px" }}>
            <h3>Damage</h3>
            {damageTypes.map((d, i) => (
              <input key={i} type="text" value={d} onChange={(e) => { const arr = [...damageTypes]; arr[i] = e.target.value.slice(0, 20); setDamageTypes(arr); }} placeholder="Damage type..." maxLength={20} style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "16px", marginBottom: "5px" }} />
            ))}
            <button onClick={() => setDamageTypes([...damageTypes, ""])} style={{ marginTop: "5px", width: "100%", padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#199a6a", color: "#fff", fontFamily: "'Caudex', serif", cursor: "pointer" }}>
              Add Damage type
            </button>
          </div>

          {/* Effects */}
          <div className="skills-box white-box3" style={{ width: "260px", height: "395px", overflowY: "auto", padding: "5px" }}>
            <h3>Effects</h3>
            {effects.map((eff, idx) => (
              <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", marginBottom: "10px" }}>
                <select value={eff.level} onChange={(e) => { const arr = [...effects]; arr[idx].level = Number(e.target.value); setEffects(arr); }} style={{ width: "100%", height: "30px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px", backgroundColor: "transparent", marginTop: "8px" }}>
                  <option value={0}>Cantrip (0)</option>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                  <option value={4}>Level 4</option>
                  <option value={5}>Level 5</option>
                  <option value={6}>Level 6</option>
                </select>
                <input type="text" value={eff.range} onChange={(e) => { const arr = [...effects]; arr[idx].range = e.target.value.slice(0, 18); setEffects(arr); }} placeholder="Range" maxLength={18} style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }} />
                <input type="text" value={eff.area} onChange={(e) => { const arr = [...effects]; arr[idx].area = e.target.value.slice(0, 18); setEffects(arr); }} placeholder="Area" maxLength={18} style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }} />
                <input type="text" value={eff.cost} onChange={(e) => { const arr = [...effects]; arr[idx].cost = e.target.value.slice(0, 18); setEffects(arr); }} placeholder="Cost" maxLength={18} style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px" }} />
                <textarea value={eff.effect} onChange={(e) => { const arr = [...effects]; arr[idx].effect = e.target.value.slice(0, 420); setEffects(arr); }} placeholder="Effect" maxLength={420} style={{ width: "240px", height: "200px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "'Caudex', serif", fontSize: "14px", gridColumn: "span 2", resize: "vertical", overflowY: "auto", backgroundColor: "transparent" }} />
              </div>
            ))}
            <button onClick={() => setEffects([...effects, { level: 0, range: "", area: "", cost: "", effect: "" }])} style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "none", backgroundColor: "#199a6a", color: "#fff", fontFamily: "'Caudex', serif", cursor: "pointer" }}>
              Add Effect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateSpellPage;
