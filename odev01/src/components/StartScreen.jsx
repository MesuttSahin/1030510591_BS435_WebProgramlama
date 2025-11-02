import React from "react";
import { useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h1>AI Detector Game</h1>
      <p>
        Gerçek mi yoksa yapay mı? Üç görsel arasından AI tarafından üretilmiş olanı tahmin et!
      </p>
      <button onClick={() => navigate("/game")}>Başla</button>
    </div>
  );
}

export default StartScreen;
