import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; 
import GameScreen from './GameScreen';

const mockData = [
  {
    id: 1,
    images: [
      { id: 'img1', src: 'gercek.jpg', isAi: false },
      { id: 'img2', src: 'ai.jpg', isAi: true }, 
      { id: 'img3', src: 'gercek2.jpg', isAi: false },
    ],
    hint: "Bu bir ipucudur."
  }
];

describe('GameScreen Component', () => {
  
  it('Resimler ve puan bilgisi ekrana gelmeli', () => {
    render(<GameScreen mode="normal" data={mockData} onFinish={() => {}} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    
    
    const scoreElement = screen.getByText(/Puan:/i);
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement).toHaveTextContent('0');
  });

  it('AI resmine (doğru cevap) tıklayınca tebrik mesajı çıkmalı', () => {
    render(<GameScreen mode="normal" data={mockData} onFinish={() => {}} />);
    
    const images = screen.getAllByRole('img');
   
    const aiImage = images.find(img => img.src.includes('ai.jpg'));
    
    if (aiImage) {
        fireEvent.click(aiImage);
        expect(screen.getByText(/Tebrikler/i)).toBeInTheDocument();
    } else {
        throw new Error("AI resmi bulunamadı");
    }
  });

  it('Yanlış resme tıklayınca ipucu çıkmalı (Normal Mod)', () => {
    render(<GameScreen mode="normal" data={mockData} onFinish={() => {}} />);
    
    const images = screen.getAllByRole('img');
    const realImage = images.find(img => img.src.includes('gercek.jpg'));
    
    if (realImage) {
        fireEvent.click(realImage);
        expect(screen.getByText(/Yanlış! İpucu açıldı/i)).toBeInTheDocument();
        expect(screen.getByText(/Bu bir ipucudur/i)).toBeInTheDocument();
    } else {
        throw new Error("Gerçek resim bulunamadı");
    }
  });
});