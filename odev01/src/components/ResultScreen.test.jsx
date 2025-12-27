import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultScreen from './ResultScreen';

vi.mock('react-confetti', () => ({
  default: () => <div data-testid="confetti">Confetti</div>
}));

describe('ResultScreen Component', () => {
  
  it('Puan ve rozet doğru gösterilmeli (Düşük Puan)', () => {
    render(<ResultScreen score={20} totalQuestions={10} onRestart={() => {}} />);
    
    expect(screen.getByText(/20 \/ 100 Puan/i)).toBeInTheDocument();
    expect(screen.getByText(/Çaylak Gözlemci/i)).toBeInTheDocument();
  });

  it('Tam puan alınca Konfeti ve AI Avcısı rozeti çıkmalı', () => {
    render(<ResultScreen score={100} totalQuestions={10} onRestart={() => {}} />);
    
    expect(screen.getByText(/Efsanevi AI Avcısı/i)).toBeInTheDocument();
    expect(screen.getByTestId('confetti')).toBeInTheDocument();
  });

  it('Tekrar Oyna butonuna basınca fonksiyon çalışmalı', () => {
    const mockRestart = vi.fn();
    render(<ResultScreen score={50} totalQuestions={10} onRestart={mockRestart} />);
    
    const restartButton = screen.getByText(/Yeni Oyun Başlat/i);
    fireEvent.click(restartButton);
    
    expect(mockRestart).toHaveBeenCalled();
  });
});