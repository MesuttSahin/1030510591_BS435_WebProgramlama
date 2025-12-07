import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultScreen() {
  const navigate = useNavigate();
  const { score, totalRounds } = useLocation().state || {};

  return (
    <div className="screen">
      <h2>Oyun Bitti!</h2>
      <div className="result-box">
        <h3>Skorun: {score} / {totalRounds}</h3>
      </div>

      <button onClick={() => navigate("/")}>Yeni Oyun</button>
    </div>
  );
}

export default ResultScreen;
