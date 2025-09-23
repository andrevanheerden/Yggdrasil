import React, { useState, useEffect } from "react";
import "../dice.css";
import diceRollSound from "../../../assets/sound/rollSound.mp3"; // <-- import your sound

const DICE_TYPES = [
  { label: "D4", sides: 4 },
  { label: "D6", sides: 6 },
  { label: "D8", sides: 8 },
  { label: "D10", sides: 10 },
  { label: "D12", sides: 12 },
  { label: "D20", sides: 20 },
  { label: "D100", sides: 100 },
];

export default function DiceRoller() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDice, setSelectedDice] = useState({});
  const [results, setResults] = useState([]);

  // Create audio object
  const diceSound = new Audio(diceRollSound);

  const addDie = (label) => {
    const totalDice = Object.values(selectedDice).reduce((a, b) => a + b, 0);
    if (totalDice >= 6) return; // max 6 dice
    setSelectedDice((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  const rollDice = () => {
    // Play sound
    diceSound.currentTime = 0;
    diceSound.play();

    const newResults = [];
    for (const [label, count] of Object.entries(selectedDice)) {
      const sides = DICE_TYPES.find((d) => d.label === label).sides;
      for (let i = 0; i < count; i++) {
        newResults.push(Math.floor(Math.random() * sides) + 1);
      }
    }
    setResults(newResults);
    setSelectedDice({}); // reset selection
  };

  useEffect(() => {
    if (results.length === 0) return;
    const timer = setTimeout(() => setResults([]), 5000);
    return () => clearTimeout(timer);
  }, [results]);

  return (
    <>
      {/* Bottom-left launcher */}
      <div className={`dice-launcher ${menuOpen ? "open" : ""}`}>
        <button
          className="launcher-btn"
          aria-label="Open dice menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          🎲
        </button>

        {/* Menu */}
        <div className={`menu ${menuOpen ? "visible" : ""}`} role="menu">
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {DICE_TYPES.map((die) => (
              <div key={die.label} style={{ position: "relative" }}>
                <button
                  className="roll-btn"
                  onClick={() => addDie(die.label)}
                  title={`Add ${die.label}`}
                >
                  {die.label}
                </button>
                {selectedDice[die.label] > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      background: "red",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 18,
                      height: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {selectedDice[die.label]}
                  </span>
                )}
              </div>
            ))}
          </div>
          {Object.keys(selectedDice).length > 0 && (
            <div className="menu-actions" style={{ marginTop: "8px" }}>
              <button className="roll-btn" onClick={rollDice}>
                Roll
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results popup */}
      {results.length > 0 && (
        <div className="toast">
          <div className="toast-content">
            <div className="toast-title">Roll Results</div>
            <div className="toast-value">
              {results.join(" + ")} = {results.reduce((a, b) => a + b, 0)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
