import React from "react";
import { useNavigate } from "react-router-dom";

function ResultScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <h2>Sonuç Ekranı</h2>
      <p>Burada oyuncuya doğru/yanlış bilgisi gösterilecek.</p>
      <button onClick={() => navigate("/")}>Yeni Tur Başlat</button>
    </div>
  );
}

export default ResultScreen;
