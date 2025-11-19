import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GameScreen() {
  const navigate = useNavigate();

  // ÖRNEK GÖRSELLER (ileride backend veya gerçek linklerle değiştirilebilir)
  const images = [
    { id: 1, src: "/img1.jpg", isAI: false },
    { id: 2, src: "/img2.jpg", isAI: true }, // AI üretilmiş görsel
    { id: 3, src: "/img3.jpg", isAI: false },
  ];

  const [hintVisible, setHintVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isFirstTry, setIsFirstTry] = useState(true);

  const hints = [
    "Arka plandaki dokulara dikkat et.",
    "Yüz hatlarındaki simetriyi incele.",
    "Gölgelendirme yapay geliyor olabilir."
  ];

  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  const handleSelect = (img) => {
    setSelectedId(img.id);

    if (isFirstTry) {
      if (img.isAI) {
        navigate("/result", { state: { success: true } });
      } else {
        setHintVisible(true);
        setIsFirstTry(false);
      }
    } else {
      navigate("/result", { state: { success: img.isAI } });
    }
  };

  return (
    <div className="screen">
      <h2>AI Üretilmiş Görseli Bul!</h2>

      <div className="images">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            className="game-img"
            onClick={() => handleSelect(img)}
          />
        ))}
      </div>

      {hintVisible && (
        <div className="hint-box">
          <p>❗ İpucu: {randomHint}</p>
          <p>Tekrar seçim yap!</p>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
