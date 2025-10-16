import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Radar } from "react-chartjs-2";
import "../../character";

const EditCharacterPage = forwardRef(
  ({ character = {}, chartOptions = {}, savingThrowOptions = {} }, ref) => {
    const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
    const [energyTab, setEnergyTab] = useState("Settings");

    const [form, setForm] = useState({
      name: character?.name || "",
      class: character?.class || "",
      race: character?.race || "",
      background: character?.background || "",
      level: character?.level || 1,
      speed: character?.speed || 30,
      hp: character?.hp || { current: 10, max: 10 },
      abilityScores:
        character?.abilityScores || { Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10 },
      energyName: character?.energyName || "Energy",
      maxEnergyLevel: character?.maxEnergyLevel || 3,
      // Always start with 6 elements
      energyLevels: character?.energyLevels || [1, 1, 1, 1, 1, 1],
    });

    const abilityData = {
      labels: abilities,
      datasets: [
        {
          label: "Abilities",
          data: abilities.map((ab) => form.abilityScores[ab] || 0),
          backgroundColor: "rgba(25,154,106,0.2)",
          borderColor: "#199a6a",
          borderWidth: 1,
        },
      ],
    };

    const savingData = {
      labels: abilities,
      datasets: [
        {
          label: "Saving Throws",
          data: abilities.map((ab) => Math.floor((form.abilityScores[ab] - 10) / 2)),
          backgroundColor: "rgba(25,154,106,0.2)",
          borderColor: "#199a6a",
          borderWidth: 1,
        },
      ],
    };

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        console.log("Character updated:", form);
        alert("Character updated (frontend only)");
      },
    }));

    const changeAbility = (ab, amount) => {
      setForm((prev) => ({
        ...prev,
        abilityScores: { ...prev.abilityScores, [ab]: prev.abilityScores[ab] + amount },
      }));
    };

    const changeHp = (type, amount) => {
      setForm((prev) => ({
        ...prev,
        hp: { ...prev.hp, [type]: prev.hp[type] + amount },
      }));
    };

    const handleEnergyLevelAmountChange = (index, value) => {
      const newLevels = [...form.energyLevels];
      newLevels[index] = parseInt(value) || 0;
      setForm((prev) => ({ ...prev, energyLevels: newLevels }));
    };

    // Ensure energyLevels array always has 6 elements
    const displayedEnergyLevels = [
      ...form.energyLevels,
      ...Array(6 - form.energyLevels.length).fill(1),
    ].slice(0, form.maxEnergyLevel);

    return (
      <div className="character-main" style={{ padding: "20px", fontFamily: "'Caudex', serif" }}>
        <h2>Edit Character</h2>
        <div className="top-section" style={{ display: "flex", gap: "20px" }}>
          {/* Charts */}
          <div className="charts-column">
            <div className="ability-chart white-box">
              <Radar data={abilityData} options={chartOptions} />
            </div>
            <div className="saving-chart white-box">
              <Radar data={savingData} options={savingThrowOptions} />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="stats-hp-wrapper" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              {/* Ability Scores */}
              <div className="ability-input" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {abilities.map((ab) => (
                  <div key={ab} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <strong>{ab}:</strong>
                    <button onClick={() => changeAbility(ab, -1)}>-</button>
                    <span>{form.abilityScores[ab]}</span>
                    <button onClick={() => changeAbility(ab, 1)}>+</button>
                  </div>
                ))}
              </div>

              {/* Stats + HP */}
              <div className="stats-container" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="stats-row" style={{ display: "flex", gap: "10px" }}>
                  <div className="stat-box hex">AC {character.ac || 10}</div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input
                      type="text"
                      value={form.level}
                      onChange={(e) => setForm((prev) => ({ ...prev, level: Number(e.target.value) || 1 }))}
                      style={{ width: "40px", textAlign: "center" }}
                    />
                    Level
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input
                      type="text"
                      value={form.speed}
                      onChange={(e) => setForm((prev) => ({ ...prev, speed: Number(e.target.value) || 0 }))}
                      style={{ width: "50px", textAlign: "center" }}
                    />
                    Speed
                  </div>
                </div>

                <div className="hp-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <strong>Current HP:</strong>
                      <button onClick={() => changeHp("current", -1)}>-</button>
                      <span>{form.hp.current}</span>
                      <button onClick={() => changeHp("current", 1)}>+</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <strong>Max HP:</strong>
                      <button onClick={() => changeHp("max", -1)}>-</button>
                      <span>{form.hp.max}</span>
                      <button onClick={() => changeHp("max", 1)}>+</button>
                    </div>
                  </div>
                  <div
                    className="hp-bar-container"
                    style={{
                      width: "100%",
                      height: "20px",
                      backgroundColor: "#ddd",
                      borderRadius: "10px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="hp-bar-fill"
                      style={{
                        height: "100%",
                        width: `${(form.hp.current / form.hp.max) * 100}%`,
                        backgroundColor:
                          form.hp.current > form.hp.max * 0.5
                            ? "#4caf50"
                            : form.hp.current > form.hp.max * 0.25
                            ? "#ff9800"
                            : "#f44336",
                        transition: "width 0.3s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {form.hp.current} / {form.hp.max}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy System */}
            <div className="energy-box white-box3" style={{ width: "200px", height: "380px" }}>
              <h3>Energy System</h3>
              <div className="skills-tabs-container4">
                <div className="skills-tab-buttons4">
                  <button
                    className={`skills-tab-btn4 ${energyTab === "Settings" ? "active" : ""}`}
                    onClick={() => setEnergyTab("Settings")}
                  >
                    Settings
                  </button>
                  <button
                    className={`skills-tab-btn4 ${energyTab === "Levels" ? "active" : ""}`}
                    onClick={() => setEnergyTab("Levels")}
                  >
                    Levels
                  </button>
                </div>
              </div>
              <div className="skills-tab-content">
                {energyTab === "Settings" && (
                  <div style={{ marginTop: "10px" }}>
                    <label>Energy Name:</label>
                    <input
                      type="text"
                      value={form.energyName}
                      onChange={(e) => setForm((prev) => ({ ...prev, energyName: e.target.value }))}
                      style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <label>Max Levels (1-6):</label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={form.maxEnergyLevel}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, maxEnergyLevel: parseInt(e.target.value) || 1 }))
                      }
                      style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                  </div>
                )}
                {energyTab === "Levels" && (
                  <div style={{ maxHeight: "250px", overflowY: "auto", marginTop: "10px" }}>
                    {displayedEnergyLevels.map((amount, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}
                      >
                        <span>Level {index + 1}</span>
                        <input
                          type="number"
                          min="0"
                          value={amount}
                          onChange={(e) => handleEnergyLevelAmountChange(index, e.target.value)}
                          style={{ width: "50px", padding: "2px", borderRadius: "3px", border: "1px solid #ccc" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default EditCharacterPage;
