import React, { useState, useEffect } from 'react';

export default function GameScreen({ mode, data, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0); 
  const [showHint, setShowHint] = useState(false); 
  const [timer, setTimer] = useState(10); 
  const [feedback, setFeedback] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const currentQuestion = data[currentIndex];

  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (currentQuestion) {
      setShuffledImages(shuffleArray(currentQuestion.images));
    }
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (mode === 'hardcore') {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleNextQuestion(false); 
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, currentIndex]); 

  const handleImageClick = (isAi) => {
    if (feedback) return;
    if (isAi) {
      setFeedback("Tebrikler! Doğru Bildin.");
      setScore(score + 10); 
      setTimeout(() => handleNextQuestion(true), 1500); 
    } else {
      if (mode === 'normal') {
        if (attempts === 0) {
          setShowHint(true);
          setAttempts(1);
          setFeedback("Yanlış! İpucu açıldı.");
          setTimeout(() => setFeedback(null), 2000); 
        } else {
          setFeedback("Bilemedin :(");
          setTimeout(() => handleNextQuestion(false), 1500);
        }
      } else {
        setFeedback("Yanlış! Süre doldu.");
        setTimeout(() => handleNextQuestion(false), 1500);
      }
    }
  };

  const handleNextQuestion = (isCorrect) => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAttempts(0);
      setShowHint(false);
      setFeedback(null);
      setTimer(10); 
    } else {
      onFinish(isCorrect ? score + 10 : score); 
    }
  };

  return (
    <div className="game-container">
      
      <div className="stats-bar">
        <span>Puan: <strong>{score}</strong></span>
        {mode === 'hardcore' && (
           <span style={{ color: timer < 4 ? '#ff4444' : 'white' }}>Süre: {timer}</span>
        )}
        <span>Soru: {currentIndex + 1} / {data.length}</span>
      </div>

      {showHint && (
        <div className="hint-box">
          <strong>💡 İpucu:</strong> {currentQuestion.hint}
        </div>
      )}

      {feedback && (
        <div className="feedback" style={{ color: feedback.includes("Tebrikler") ? '#00cc66' : '#ff4444' }}>
          {feedback}
        </div>
      )}

      <div className="image-grid">
        {shuffledImages.map((img) => (
          <div 
            key={img.id} 
            className="image-card"
            onClick={() => handleImageClick(img.isAi)}
            style={{ 
              opacity: (showHint && !img.isAi && attempts > 0) ? 0.3 : 1,
              cursor: feedback ? 'default' : 'pointer'
            }}
          >
            <img src={img.src} alt="tahmin" />
          </div>
        ))}
      </div>
    </div>
  );
}