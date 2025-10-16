import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import "../../encounter.css";

const EditEncounterPage = forwardRef(({ chartOptions = {}, savingThrowOptions = {} }, ref) => {
  const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];

  const [form, setForm] = useState({
    encounter_name: "",
    ac: 10,
    level: 1,
    speed: 30,
    hp: { current: 10, max: 10 },
    abilityScores: { Str: 10, Dex: 10, Con: 10, Int: 10, Wis: 10, Cha: 10 },
    skills: ["", ""],
    description: "",
    race: "",
    race_description: "",
    race_skills: ["", ""],
    race_proficiencies_languages: [],
    race_proficiencies_tools: [],
    encounter_img: "",
  });

  // ✅ Use localStorage for encounterId
  const encounterId = localStorage.getItem("selectedEncounterId");

  useEffect(() => {
    if (!encounterId) return;
    const fetchEncounter = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/encounters/id/${encounterId}`);
        const data = res.data;
        setForm({
          encounter_name: data.encounter_name || "",
          ac: data.encounter_AC || 10,
          level: data.encounter_level || 1,
          speed: data.encounter_speed || 30,
          hp: { current: data.encounter_current_HP || 10, max: data.encounter_max_HP || 10 },
          abilityScores: {
            Str: data.encounter_ability_score_str || 10,
            Dex: data.encounter_ability_score_dex || 10,
            Con: data.encounter_ability_score_con || 10,
            Int: data.encounter_ability_score_int || 10,
            Wis: data.encounter_ability_score_wis || 10,
            Cha: data.encounter_ability_score_cha || 10,
          },
          skills: [data.skill_modefed_1 || "", data.skill_modefed_2 || ""],
          description: data.encounter_dec || "",
          race: data.race_name || "",
          race_description: data.race_dec || "",
          race_skills: [data.race_skill_modefed_1 || "", data.race_skill_modefed_2 || ""],
          race_proficiencies_languages: JSON.parse(data.race_proficiencie_languages || "[]"),
          race_proficiencies_tools: JSON.parse(data.race_proficiencie_tools || "[]"),
          encounter_img: data.encounter_img || "",
        });
      } catch (err) {
        console.error("Failed to load encounter:", err);
      }
    };
    fetchEncounter();
  }, [encounterId]);

  // ✅ Round all values for charts to integers
  const abilityData = {
    labels: abilities,
    datasets: [
      {
        label: "Abilities",
        data: abilities.map((ab) => Math.round(form.abilityScores[ab])),
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
        data: abilities.map((ab) => Math.floor((form.abilityScores[ab] - 10) / 2)), // already integer
        backgroundColor: "rgba(25,154,106,0.2)",
        borderColor: "#199a6a",
        borderWidth: 1,
      },
    ],
  };

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

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      if (!encounterId) return alert("No encounter selected!");
      try {
        const existingRes = await axios.get(`http://localhost:5000/api/encounters/id/${encounterId}`);
        const existing = existingRes.data;

        const payload = {
          encounter_name: form.encounter_name || existing.encounter_name,
          encounter_AC: form.ac || existing.encounter_AC,
          encounter_level: form.level || existing.encounter_level,
          encounter_speed: form.speed || existing.encounter_speed,
          encounter_current_HP: form.hp.current || existing.encounter_current_HP,
          encounter_max_HP: form.hp.max || existing.encounter_max_HP,
          encounter_ability_score_str: form.abilityScores.Str || existing.encounter_ability_score_str,
          encounter_ability_score_dex: form.abilityScores.Dex || existing.encounter_ability_score_dex,
          encounter_ability_score_con: form.abilityScores.Con || existing.encounter_ability_score_con,
          encounter_ability_score_int: form.abilityScores.Int || existing.encounter_ability_score_int,
          encounter_ability_score_wis: form.abilityScores.Wis || existing.encounter_ability_score_wis,
          encounter_ability_score_cha: form.abilityScores.Cha || existing.encounter_ability_score_cha,
          skill_modefed_1: form.skills[0] || existing.skill_modefed_1,
          skill_modefed_2: form.skills[1] || existing.skill_modefed_2,
          encounter_dec: form.description || existing.encounter_dec,
          race_name: form.race || existing.race_name,
          race_dec: form.race_description || existing.race_dec,
          race_skill_modefed_1: form.race_skills[0] || existing.race_skill_modefed_1,
          race_skill_modefed_2: form.race_skills[1] || existing.race_skill_modefed_2,
          race_proficiencie_languages: form.race_proficiencies_languages || JSON.parse(existing.race_proficiencie_languages || "[]"),
          race_proficiencie_tools: form.race_proficiencies_tools || JSON.parse(existing.race_proficiencie_tools || "[]"),
          encounter_img: existing.encounter_img,
        };

        await axios.put(`http://localhost:5000/api/encounters/${encounterId}`, payload);
        alert("Encounter updated successfully!");
      } catch (err) {
        console.error("Failed to update encounter:", err);
        alert("Failed to update encounter.");
      }
    },
  }));

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
        </div>
      </div>
    </div>
  );
});

export default EditEncounterPage;
