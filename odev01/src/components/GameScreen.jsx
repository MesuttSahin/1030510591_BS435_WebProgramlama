import React from "react";
import { useNavigate } from "react-router-dom";

const GameScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h2>Oyun Başladı!</h2>
      <p>Burada 3 görsel gösterilecek ve oyuncu tahmin yapacak.</p>
      <button onClick={() => navigate("/result")}>Sonuç Ekranına Git</button>
    </div>
  );
};

export default GameScreen;
