import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("easy");

  const handleStart = () => {
    navigate("/game", { state: { mode } });
  };

  return (
    <div className="screen">
      <h1>Gerçek mi? AI mı? 🎮</h1>
      <p>Modunu seç ve oyuna başla.</p>

      <div className="mode-select">
        <label>
          <input
            type="radio"
            value="easy"
            checked={mode === "easy"}
            onChange={(e) => setMode(e.target.value)}
          />
          Kolay Mod
        </label>

        <label>
          <input
            type="radio"
            value="medium"
            checked={mode === "medium"}
            onChange={(e) => setMode(e.target.value)}
          />
          Orta Mod
        </label>
      </div>

      <button className="start-btn" onClick={handleStart}>
        Başla
      </button>
    </div>
  );
}

export default StartScreen;
