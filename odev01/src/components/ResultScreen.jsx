import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, mode } = location.state || {};

  return (
    <div className="screen">
      <h1>{success ? "Tebrikler! 🎉" : "Yanlış tahmin!"}</h1>

      <p>Oynadığın mod: {mode === "easy" ? "Kolay" : "Orta"}</p>

      <button onClick={() => navigate("/")}>Yeni Oyun</button>
    </div>
  );
}

export default ResultScreen;
