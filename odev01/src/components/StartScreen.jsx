import React from 'react';

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <h1>AI mı Gerçek mi?</h1>
      
      <div style={{ background: '#2a2a2a', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h3>Nasıl Oynanır?</h3>
        <p>Karşına 3 görsel çıkacak. Sadece biri <strong>Yapay Zeka</strong> üretimi.</p>
        <p>Amacın sahte olanı bulmak!</p>
      </div>

      <div className="game-modes">
        <button className="btn-primary" onClick={() => onStart('normal')}>
          Eğitim Modu (Kolay)
        </button>
        <button className="btn-danger" onClick={() => onStart('hardcore')}>
          Zaman Karşı Yarış (Zor)
        </button>
      </div>
    </div>
  );
}