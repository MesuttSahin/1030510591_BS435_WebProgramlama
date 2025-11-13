import React from "react";
import { useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h1>Görsel Tahmin Oyunu 🎯</h1>
      <p>Her turda doğru görseli seçerek puan kazan!</p>
      <button onClick={() => navigate("/game")}>Oyunu Başlat</button>
    </div>
  );
}

export default StartScreen;
