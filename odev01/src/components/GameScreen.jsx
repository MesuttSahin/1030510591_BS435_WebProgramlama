import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GameScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // StartScreen'den gelen zorluk modu
  const selectedMode = location.state?.mode ?? "easy";

  const [images, setImages] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);

  const totalRounds = selectedMode === "easy" ? 5 : 8;

  // Örnek görseller (AI ve gerçek karışık)
  const imagePool = [
    { src: "/ai1.jpg", isAI: true },
    { src: "/ai2.jpg", isAI: true },
    { src: "/real1.jpg", isAI: false },
    { src: "/real2.jpg", isAI: false },
    { src: "/real3.jpg", isAI: false },
    { src: "/real4.jpg", isAI: false },
  ];

  const hintsEasy = [
    "Arka plan detaylarına dikkat et.",
    "Gölgelendirmeye bak.",
  ];

  const hintsHard = [
    "Yüz simetrisine dikkat et.",
    "Gözlerdeki yapay parlaklığa bak.",
    "Cilt dokusundaki kusursuzluğu incele.",
  ];

  const hints = selectedMode === "easy" ? hintsEasy : hintsHard;
  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  // Her tur 3 görseli karıştırıp seç
  const generateImages = () => {
    const aiImages = imagePool.filter(img => img.isAI);
    const realImages = imagePool.filter(img => !img.isAI);

    const randomAI = aiImages[Math.floor(Math.random() * aiImages.length)];
    const randomReals = realImages.sort(() => 0.5 - Math.random()).slice(0, 2);

    const combined = [...randomReals, randomAI].sort(() => Math.random() - 0.5);
    setImages(combined);
  };

  useEffect(() => {
    generateImages();
  }, [currentRound]);

  const handleSelect = (img) => {
    if (isFirstTry) {
      if (img.isAI) {
        setScore(score + 1);
        nextRound();
      } else {
        setHintVisible(true);
        setIsFirstTry(false);
      }
    } else {
      if (img.isAI) setScore(score + 1);
      nextRound();
    }
  };

  const nextRound = () => {
    if (currentRound >= totalRounds) {
      navigate("/result", { state: { score, totalRounds } });
      return;
    }

    setHintVisible(false);
    setIsFirstTry(true);
    setCurrentRound(currentRound + 1);
  };

  return (
    <div className="screen">
      <h2>Tur {currentRound} / {totalRounds}</h2>

      <div className="images">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            className="game-img"
            onClick={() => handleSelect(img)}
          />
        ))}
      </div>

      {hintVisible && (
        <div className="hint-box">
          <p>❗ İpucu: {randomHint}</p>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
