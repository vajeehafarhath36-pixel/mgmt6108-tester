import React, { useState, useEffect } from 'react';
import { RotateCcw, ArrowLeft, Trophy, Share2, HelpCircle } from 'lucide-react';

interface WordleGameProps {
  onBack: () => void;
}

const TARGET_WORDS = ['RADAR', 'OCEAN', 'FLIGHT', 'STRIKE', 'CARGO', 'PORTS'];
const SOLUTION = 'RADAR';

export const WordleGame: React.FC<WordleGameProps> = ({ onBack }) => {
  const [solution] = useState(SOLUTION);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');
  const [showHowTo, setShowHowTo] = useState(false);

  const handleKey = (char: string) => {
    if (gameOver) return;

    if (char === 'ENTER') {
      if (currentGuess.length !== 5) {
        showMessage('Not enough letters');
        return;
      }
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      if (currentGuess.toUpperCase() === solution) {
        setWon(true);
        setGameOver(true);
        showMessage('Magnificent! You solved today’s Wordle.');
      } else if (newGuesses.length === 6) {
        setGameOver(true);
        showMessage(`Game Over! The word was ${solution}`);
      }
      setCurrentGuess('');
      return;
    }

    if (char === 'BACKSPACE' || char === 'DEL') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(char) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + char.toUpperCase());
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleKey('ENTER');
      else if (e.key === 'Backspace') handleKey('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver, guesses]);

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
    setMessage('');
  };

  const getTileStatus = (rowIndex: number, colIndex: number) => {
    if (rowIndex > guesses.length) return 'empty';
    if (rowIndex === guesses.length) {
      return currentGuess[colIndex] ? 'tbd' : 'empty';
    }
    const guess = guesses[rowIndex];
    const letter = guess[colIndex];
    if (solution[colIndex] === letter) return 'correct';
    if (solution.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyStatus = (key: string) => {
    let status = '';
    guesses.forEach((guess) => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (solution[i] === key) return (status = 'correct');
          if (solution.includes(key) && status !== 'correct') status = 'present';
          else if (!solution.includes(key) && !status) status = 'absent';
        }
      }
    });
    return status;
  };

  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-nyt pb-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-black uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Front Page</span>
        </button>
        <div className="text-center">
          <span className="font-masthead text-2xl block text-nyt-ink">The New York Times</span>
          <h2 className="text-xl font-serif font-bold tracking-tight">Wordle</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="p-1.5 text-gray-600 hover:text-black rounded"
            title="How to Play"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={resetGame}
            className="p-1.5 text-gray-600 hover:text-black rounded"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showHowTo && (
        <div className="bg-[#f8f8f8] border border-nyt p-4 rounded mb-6 text-xs text-gray-700 space-y-2">
          <h3 className="font-bold text-sm text-black">How to Play Wordle</h3>
          <p>Guess the Wordle in 6 tries. Each guess must be a valid 5-letter word.</p>
          <div className="flex items-center space-x-2 pt-1">
            <span className="w-6 h-6 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-xs">R</span>
            <span>Green: Letter is in the word and in the correct spot.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-[#c9b458] text-white flex items-center justify-center font-bold text-xs">A</span>
            <span>Yellow: Letter is in the word but in the wrong spot.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-[#787c7e] text-white flex items-center justify-center font-bold text-xs">P</span>
            <span>Gray: Letter is not in the word in any spot.</span>
          </div>
        </div>
      )}

      {message && (
        <div className="bg-black text-white text-xs font-bold py-2 px-4 rounded text-center mb-4 transition-all animate-bounce">
          {message}
        </div>
      )}

      {/* Wordle Grid */}
      <div className="grid grid-rows-6 gap-2 w-[280px] sm:w-[320px] mx-auto mb-8">
        {[0, 1, 2, 3, 4, 5].map((rowIndex) => {
          const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : '');
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((colIndex) => {
                const char = guess[colIndex] || '';
                const status = getTileStatus(rowIndex, colIndex);
                let bgClass = 'bg-white border-2 border-gray-300 text-black';
                if (status === 'tbd') {
                  bgClass = 'bg-white border-2 border-black text-black';
                } else if (status === 'correct') {
                  bgClass = 'bg-[#6aaa64] text-white border-[#6aaa64]';
                } else if (status === 'present') {
                  bgClass = 'bg-[#c9b458] text-white border-[#c9b458]';
                } else if (status === 'absent') {
                  bgClass = 'bg-[#787c7e] text-white border-[#787c7e]';
                }

                return (
                  <div
                    key={colIndex}
                    className={`w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center text-2xl font-bold uppercase transition-all duration-300 ${bgClass}`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* On-screen Keyboard */}
      <div className="max-w-md mx-auto space-y-1.5 select-none">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5">
            {row.map((k) => {
              const status = getKeyStatus(k);
              let btnBg = 'bg-[#d3d6da] text-black hover:bg-[#c2c5c9]';
              if (status === 'correct') btnBg = 'bg-[#6aaa64] text-white';
              else if (status === 'present') btnBg = 'bg-[#c9b458] text-white';
              else if (status === 'absent') btnBg = 'bg-[#787c7e] text-white';

              return (
                <button
                  key={k}
                  onClick={() => handleKey(k)}
                  className={`h-12 px-2.5 sm:px-3 text-xs sm:text-sm font-bold rounded flex items-center justify-center transition-colors ${btnBg} ${
                    k === 'ENTER' || k === 'DEL' ? 'px-3 text-[11px]' : ''
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="mt-8 text-center bg-gray-50 border border-nyt p-6 rounded-[2px]">
          <div className="flex justify-center mb-2">
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-serif font-bold text-nyt-ink mb-1">
            {won ? 'Congratulations!' : 'Better luck next time!'}
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            The solution was <strong className="text-black font-mono">{solution}</strong>. Solved in {guesses.length}/6 attempts.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={resetGame}
              className="bg-nyt-blueBtn hover:bg-nyt-blueHover text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="border border-nyt hover:bg-gray-100 text-gray-800 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Back to News
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
