import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GameScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "easy";

  // Görseller modlara göre değişiyor
  const easyImages = [
    { id: 1, src: "/easy1.jpg", isAI: false },
    { id: 2, src: "/easy2.jpg", isAI: true },
    { id: 3, src: "/easy3.jpg", isAI: false }
  ];

  const mediumImages = [
    { id: 1, src: "/mid1.jpg", isAI: true },
    { id: 2, src: "/mid2.jpg", isAI: false },
    { id: 3, src: "/mid3.jpg", isAI: false }
  ];

  // Mod seçimine göre görüntü seti geliyor
  const images = mode === "easy" ? easyImages : mediumImages;

  const [hintVisible, setHintVisible] = useState(false);
  const [isFirstTry, setIsFirstTry] = useState(true);

  const hints = [
    "Işıklara dikkat et.",
    "Arka plan detaylarını incele.",
    "Gölgelendirmeye bak."
  ];

  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  const handleGuess = (img) => {
    if (isFirstTry) {
      if (img.isAI) {
        navigate("/result", { state: { success: true, mode } });
      } else {
        setHintVisible(true);
        setIsFirstTry(false);
      }
    } else {
      navigate("/result", { state: { success: img.isAI, mode } });
    }
  };

  return (
    <div className="screen">
      <h2>Mod: {mode === "easy" ? "Kolay" : "Orta"}</h2>

      <div className="images">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            className="game-img"
            onClick={() => handleGuess(img)}
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
