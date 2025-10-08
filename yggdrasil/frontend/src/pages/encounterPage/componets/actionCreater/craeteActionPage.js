import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../../encounter.css";

const CreateActionPage = forwardRef((props, ref) => {
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState("");
  const [actionImage, setActionImage] = useState(null);
  const [description, setDescription] = useState("");
  const [effectA, setEffectA] = useState([""]);
  const [effectB, setEffectB] = useState([{ type: "", range: "", area: "", cost: "", effect: "" }]);

  // Expose form data to parent via ref
  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      actionName,
      actionType,
      actionImage,
      description,
      effectA,
      effectB,
    }),
  }));

  return (
    <div className="character-main">
      {/* Top Bar: Name, Type Dropdown, Image */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Left side: Name + Type */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
          }}
        >
          {/* Action Name */}
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

          {/* 🔽 Movement Type Dropdown */}
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            style={{
              width: "500px",
              padding: "8px",
              fontSize: "18px",
              fontFamily: "'Caudex', serif",
              marginLeft: "150px",
              borderRadius: "5px",
              border: "2px solid #333",
              backgroundColor: "transparent",
            }}
          >
            <option value="">Select Movement Type</option>
            <option value="Movement">Movement</option>
            <option value="Defense">Defense</option>
            <option value="Combat">Combat</option>
          </select>
        </div>

        {/* Right: Image Upload */}
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
            right: "30px",
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
                padding: "5px",
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
            placeholder="Write a description of the action and its information here..."
          />
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Damage Types */}
          <div
            className="skills-box white-box3"
            style={{ width: "240px", height: "200px" }}
          >
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
              Add Damage Type
            </button>
          </div>

          {/* Effects */}
          <div
            className="skills-box white-box3"
            style={{
              width: "260px",
              height: "395px",
              overflowY: "auto",
              padding: "5px",
            }}
          >
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
                {/* Effect Action Type Dropdown */}
                <select
                  value={eff.type}
                  onChange={(e) => {
                    const newArr = [...effectB];
                    newArr[index].type = e.target.value;
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
                  <option value="">Action Type</option>
                  <option value="Movement">Movement</option>
                  <option value="Defense">Defense</option>
                  <option value="Combat">Combat</option>
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

export default CreateActionPage;

