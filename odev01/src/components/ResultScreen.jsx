import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { finalScore } = location.state || { finalScore: 0 };

  return (
    <div className="screen">
      <h2>Oyun Bitti 🎉</h2>
      <p>Toplam Skor: {finalScore} / 5</p>
      {finalScore === 5 ? (
        <p>Mükemmel! Tüm görselleri doğru seçtin 🏆</p>
      ) : finalScore >= 3 ? (
        <p>Harika iş çıkardın 👏</p>
      ) : (
        <p>Daha iyisini yapabilirsin 💪</p>
      )}
      <button onClick={() => navigate("/game")}>Tekrar Oyna</button>
      <button onClick={() => navigate("/")}>Ana Menü</button>
    </div>
  );
}

export default ResultScreen;
