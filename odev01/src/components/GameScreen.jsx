import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GameScreen() {
  const navigate = useNavigate();
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [images, setImages] = useState([]);

  // Rastgele görsel üret
  const generateImages = () => {
    const correctIndex = Math.floor(Math.random() * 3);
    const colors = ["FF0000", "00FF00", "0000FF"];
    const imgs = colors.map((c, i) => ({
      id: i,
      src: `https://via.placeholder.com/150/${c}`,
      correct: i === correctIndex,
    }));
    setImages(imgs);
  };

  useEffect(() => {
    generateImages();
  }, [round]);

  const handleSelect = (img) => {
    const newScore = img.correct ? score + 1 : score;
    const nextRound = round + 1;

    if (nextRound <= 5) {
      // 5 tur oynanacak
      setScore(newScore);
      setRound(nextRound);
    } else {
      // 5. turdan sonra sonuç ekranına git
      navigate("/result", { state: { finalScore: newScore } });
    }
  };

  return (
    <div className="screen">
      <h2>Tur {round} / 5</h2>
      <p>Skor: {score}</p>

      <div className="image-container">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt="Görsel"
            onClick={() => handleSelect(img)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
