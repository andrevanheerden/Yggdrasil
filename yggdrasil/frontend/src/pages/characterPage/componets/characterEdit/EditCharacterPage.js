import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";

// Helper to generate radar chart options
const radarOptions = (options = {}) => ({
  responsive: true,
  plugins: {
    legend: { position: "top" },
    ...options.plugins,
  },
  scales: {
    r: { beginAtZero: true, min: 0, ...options.scales?.r },
  },
  ...options,
});

const EditCharacterPage = forwardRef(({ chartOptions = {}, savingThrowOptions = {} }, ref) => {
  const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  const [energyTab, setEnergyTab] = useState("Settings");
  const [characterId, setCharacterId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    class: "",
    race: "",
    background: "",
    level: 1,
    speed: 0,
    hp: { current: 0, max: 0 },
    abilityScores: {},
    savingThrows: {},
    skills: [],
    description: "",
    ac: 0,
    image: "",
    energyName: "",
    maxEnergyLevel: 0,
    energyLevels: [],
  });

  // Load character + class data from database
  useEffect(() => {
    const id = localStorage.getItem("selectedCharacterId");
    if (!id) return;
    setCharacterId(id);

    const fetchData = async () => {
      try {
        const charRes = await axios.get(`http://localhost:5000/api/characters/id/${id}`);
        const charData = charRes.data;

        const classRes = await axios.get(`http://localhost:5000/api/character-classes/character/${id}`);
        const classData = classRes.data[0] || {};

        setForm({
          name: charData.character_name || "",
          race: charData.race || charData.character_race || "",
          class: classData.class_name || "",
          background: charData.background || "",
          level: charData.character_level || 1,
          speed: charData.character_speed || 0,
          hp: {
            current: charData.character_current_HP || 0,
            max: charData.character_max_HP || 0,
          },
          abilityScores: {
            Str: charData.encounter_ability_score_str || 0,
            Dex: charData.encounter_ability_score_dex || 0,
            Con: charData.encounter_ability_score_con || 0,
            Int: charData.encounter_ability_score_int || 0,
            Wis: charData.encounter_ability_score_wis || 0,
            Cha: charData.encounter_ability_score_cha || 0,
          },
          savingThrows: {
            Str: charData.encounter_saving_throw_str || 0,
            Dex: charData.encounter_saving_throw_dex || 0,
            Con: charData.encounter_saving_throw_con || 0,
            Int: charData.encounter_saving_throw_int || 0,
            Wis: charData.encounter_saving_throw_wis || 0,
            Cha: charData.encounter_saving_throw_cha || 0,
          },
          skills: [
            charData.skill_selected_1 || "",
            charData.skill_selected_2 || "",
          ],
          description: charData.character_description || "",
          ac: charData.character_AC || 0,
          image: charData.character_img || "",
          energyName: classData.energy_name || "",
          maxEnergyLevel: classData.max_energy_level || 0,
          energyLevels: [
            classData.amount_lv1 || 0,
            classData.amount_lv2 || 0,
            classData.amount_lv3 || 0,
            classData.amount_lv4 || 0,
            classData.amount_lv5 || 0,
            classData.amount_lv6 || 0,
          ].slice(0, classData.max_energy_level || 0),
        });
      } catch (err) {
        console.error("Failed to load character:", err);
      }
    };

    fetchData();
  }, []);

  // Submit changes
 // Inside useImperativeHandle
useImperativeHandle(ref, () => ({
  handleSubmit: async () => {
    if (!characterId) return alert("No character selected!");

    try {
      // --- Update character ---
      const existingCharRes = await axios.get(`http://localhost:5000/api/characters/id/${characterId}`);
      const existingChar = existingCharRes.data;

      const charPayload = {
        character_name: form.name,
        character_level: form.level,
        character_speed: form.speed,
        character_current_HP: form.hp.current,
        character_max_HP: form.hp.max,
        character_AC: 10 + Math.floor((form.abilityScores.Dex - 10) / 2),
        encounter_ability_score_str: form.abilityScores.Str,
        encounter_ability_score_dex: form.abilityScores.Dex,
        encounter_ability_score_con: form.abilityScores.Con,
        encounter_ability_score_int: form.abilityScores.Int,
        encounter_ability_score_wis: form.abilityScores.Wis,
        encounter_ability_score_cha: form.abilityScores.Cha,
        encounter_saving_throw_str: form.savingThrows.Str,
        encounter_saving_throw_dex: form.savingThrows.Dex,
        encounter_saving_throw_con: form.savingThrows.Con,
        encounter_saving_throw_int: form.savingThrows.Int,
        encounter_saving_throw_wis: form.savingThrows.Wis,
        encounter_saving_throw_cha: form.savingThrows.Cha,
        skill_selected_1: form.skills[0],
        skill_selected_2: form.skills[1],
        character_description: form.description || existingChar.character_description,
        character_img: existingChar.character_img, // preserve Cloudinary link if no new upload
      };

      await axios.put(`http://localhost:5000/api/characters/${characterId}`, charPayload);

      // --- Update class ---
      let existingClassRes;
      try {
        existingClassRes = await axios.get(`http://localhost:5000/api/character-classes/character/${characterId}`);
      } catch (err) {
        if (err.response?.status !== 404) throw err;
      }

      const existingClass = existingClassRes?.data[0] || {};

      const classPayload = {
        class_name: form.class || existingClass.class_name,
        class_description: existingClass.class_description || "", // preserve existing
        energy_name: form.energyName || existingClass.energy_name,
        max_energy_level: form.maxEnergyLevel || existingClass.max_energy_level,
        amount_lv1: form.energyLevels[0] ?? existingClass.amount_lv1,
        amount_lv2: form.energyLevels[1] ?? existingClass.amount_lv2,
        amount_lv3: form.energyLevels[2] ?? existingClass.amount_lv3,
        amount_lv4: form.energyLevels[3] ?? existingClass.amount_lv4,
        amount_lv5: form.energyLevels[4] ?? existingClass.amount_lv5,
        amount_lv6: form.energyLevels[5] ?? existingClass.amount_lv6,
        tool_proficiencies: existingClass.tool_proficiencies || [],
        language_proficiencies: existingClass.language_proficiencies || [],
      };

      if (existingClass?.class_id) {
        await axios.put(`http://localhost:5000/api/character-classes/${existingClass.class_id}`, classPayload);
      } else {
        await axios.post(`http://localhost:5000/api/character-classes`, {
          character_id: characterId,
          ...classPayload,
        });
      }

      alert("Character updated successfully!");
    } catch (err) {
      console.error("Failed to update character:", err);
      alert("Failed to update character.");
    }
  },
}));



  // Helpers
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
    newLevels[index] = Number(value);
    setForm((prev) => ({ ...prev, energyLevels: newLevels }));
  };

  const displayedEnergyLevels = [
    ...form.energyLevels,
    ...Array(Math.max(0, (form.maxEnergyLevel || 0) - form.energyLevels.length)).fill(0),
  ].slice(0, form.maxEnergyLevel || 0);

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

  return (
    <div className="character-main" style={{ padding: "20px", fontFamily: "'Caudex', serif" }}>
        <h2>Edit Character</h2>
        <div className="top-section" style={{ display: "flex", gap: "20px" }}>
          {/* Charts */}
          <div className="charts-column">
            <div className="ability-chart white-box">
              <Radar data={abilityData} options={radarOptions(chartOptions)} />
            </div>
            <div className="saving-chart white-box">
              <Radar data={savingData} options={radarOptions(savingThrowOptions)} />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Stats & Abilities */}
            <div className="stats-hp-wrapper" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
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

              <div className="stats-container" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Level & Speed */}
                <div className="stats-row" style={{ display: "flex", gap: "10px" }}>
                 <div className="stat-box hex">
  AC {10 + Math.floor((form.abilityScores.Dex - 10) / 2)}
</div>

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

                {/* HP */}
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
                      <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
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
});

export default EditCharacterPage;

