import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StartScreen from './StartScreen';

describe('StartScreen Component', () => {
  
  it('Başlık ve kurallar ekranda görünmeli', () => {
    render(<StartScreen onStart={() => {}} />);
    
    expect(screen.getByText(/AI mı Gerçek mi?/i)).toBeInTheDocument();
    expect(screen.getByText(/Nasıl Oynanır?/i)).toBeInTheDocument();
  });

  it('Butonlara tıklanınca oyun modu seçilmeli', () => {
    const mockStart = vi.fn(); 
    render(<StartScreen onStart={mockStart} />);
    
    const normalButton = screen.getByText(/Eğitim Modu/i);
    fireEvent.click(normalButton);
    
    expect(mockStart).toHaveBeenCalledWith('normal');
  });
});