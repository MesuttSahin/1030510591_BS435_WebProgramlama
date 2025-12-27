import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';     
import ResultScreen from './components/ResultScreen'; 
import { gameData } from './data';

function App() {
  const [gameState, setGameState] = useState('menu'); 
  const [gameMode, setGameMode] = useState('normal'); 
  const [score, setScore] = useState(0);

  const startGame = (selectedMode) => {
    setGameMode(selectedMode);
    setScore(0);
    setGameState('playing');
  };

  const finishGame = (finalScore) => {
    setScore(finalScore);
    setGameState('result');
  };

  const resetGame = () => {
    setGameState('menu');
  };

  return (
    <div className="App">
      {gameState === 'menu' && <StartScreen onStart={startGame} />}
      
      {gameState === 'playing' && (
        <GameScreen 
          mode={gameMode} 
          data={gameData} 
          onFinish={finishGame} 
        />
      )}
      
      {gameState === 'result' && (
        <ResultScreen 
          score={score} 
          totalQuestions={gameData.length} 
          onRestart={resetGame} 
        />
      )}
    </div>
  );
}

export default App;