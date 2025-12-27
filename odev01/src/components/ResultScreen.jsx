import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; 

export default function ResultScreen({ score, totalQuestions, onRestart }) {
  const maxScore = totalQuestions * 10;
  const successRate = (score / maxScore) * 100;
  
  let badge = "🔍 Çaylak Gözlemci";
  let badgeColor = "#bdc3c7";
  let feedback = "Biraz daha dikkatli bakmalısın.";

  if (successRate >= 50) {
    badge = "🕵️ Dikkatli Dedektif";
    badgeColor = "#f1c40f";
    feedback = "İyi iş! Çoğunu yakaladın.";
  }
  
  if (successRate === 100) {
    badge = "🤖🚫 Efsanevi AI Avcısı";
    badgeColor = "#e74c3c";
    feedback = "İnanılmaz! Hiçbir yapay zeka seni kandıramaz.";
  }

  return (
    <div className="result-screen" style={{ position: 'relative', overflow: 'hidden' }}>
      {}
      {successRate === 100 && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <h1>Sonuçlar</h1>
      
      <div style={{ 
        background: '#2a2a2a', 
        padding: '30px', 
        borderRadius: '15px', 
        border: `2px solid ${badgeColor}`,
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
            {successRate === 100 ? '🏆' : (successRate >= 50 ? '⭐' : '🧩')}
        </div>
        
        <h2 style={{ color: badgeColor, marginTop: 0 }}>{badge}</h2>
        
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>{feedback}</p>

        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '20px 0', color: '#fff' }}>
          {score} / {maxScore} Puan
        </div>
      </div>

      <button className="btn-restart" onClick={onRestart} style={{ marginTop: '30px' }}>
        Yeni Oyun Başlat ↻
      </button>
    </div>
  );
}