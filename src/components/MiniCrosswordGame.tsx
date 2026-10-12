import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Clock, Check, Eye } from 'lucide-react';

interface MiniCrosswordProps {
  onBack: () => void;
}

// 5x5 Crossword Grid
// R A D A R
// E D I C T
// D O M E S
// S A L S A
// E L E E T -> E L I T E
const SOLUTION_GRID = [
  ['R', 'A', 'D', 'A', 'R'],
  ['A', 'L', 'O', 'N', 'E'],
  ['D', 'O', 'M', 'E', 'S'],
  ['I', 'N', 'E', 'P', 'T'],
  ['O', 'E', 'S', 'T', 'E']
];

const CLUES_ACROSS = [
  { num: 1, text: 'Maritime tracking tool seen in satellite imagery', answer: 'RADAR' },
  { num: 6, text: 'Without companions, like a taiga explorer', answer: 'ALONE' },
  { num: 7, text: 'Capitol building architectural features', answer: 'DOMES' },
  { num: 8, text: 'Clumsy or lacking skill', answer: 'INEPT' },
  { num: 9, text: 'Direction to Madrid from Paris, in French/Spanish (abbr.)', answer: 'OESTE' }
];

const CLUES_DOWN = [
  { num: 1, text: 'NYT spoken-word audio medium', answer: 'RADIO' },
  { num: 2, text: 'Alone in one place, or entirely', answer: 'ALONE' },
  { num: 3, text: 'Precipitous fall or ruin', answer: 'DOMES' },
  { num: 4, text: 'Proficient or skilled', answer: 'ADEPT' },
  { num: 5, text: 'Rest and pause', answer: 'RESTE' }
];

export const MiniCrosswordGame: React.FC<MiniCrosswordProps> = ({ onBack }) => {
  const [grid, setGrid] = useState<string[][]>(
    Array(5).fill(null).map(() => Array(5).fill(''))
  );
  const [activeCell, setActiveCell] = useState<[number, number]>([0, 0]);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Check victory
  useEffect(() => {
    let allCorrect = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (grid[r][c] !== SOLUTION_GRID[r][c]) {
          allCorrect = false;
          break;
        }
      }
    }
    if (allCorrect && !isCompleted) {
      setIsCompleted(true);
    }
  }, [grid, isCompleted]);

  const handleCellClick = (r: number, c: number) => {
    if (activeCell[0] === r && activeCell[1] === c) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'));
    } else {
      setActiveCell([r, c]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const [r, c] = activeCell;

    if (e.key === 'Backspace') {
      const nextGrid = grid.map((row) => [...row]);
      if (nextGrid[r][c] === '') {
        // move back
        if (direction === 'across' && c > 0) {
          nextGrid[r][c - 1] = '';
          setActiveCell([r, c - 1]);
        } else if (direction === 'down' && r > 0) {
          nextGrid[r - 1][c] = '';
          setActiveCell([r - 1, c]);
        }
      } else {
        nextGrid[r][c] = '';
      }
      setGrid(nextGrid);
      return;
    }

    if (e.key === 'ArrowRight' && c < 4) setActiveCell([r, c + 1]);
    if (e.key === 'ArrowLeft' && c > 0) setActiveCell([r, c - 1]);
    if (e.key === 'ArrowDown' && r < 4) setActiveCell([r + 1, c]);
    if (e.key === 'ArrowUp' && r > 0) setActiveCell([r - 1, c]);

    if (/^[a-zA-Z]$/.test(e.key)) {
      const letter = e.key.toUpperCase();
      const nextGrid = grid.map((row) => [...row]);
      nextGrid[r][c] = letter;
      setGrid(nextGrid);

      // Advance
      if (direction === 'across' && c < 4) {
        setActiveCell([r, c + 1]);
      } else if (direction === 'down' && r < 4) {
        setActiveCell([r + 1, c]);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleRevealAll = () => {
    setGrid(SOLUTION_GRID.map((row) => [...row]));
    setRevealed(true);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setGrid(Array(5).fill(null).map(() => Array(5).fill('')));
    setActiveCell([0, 0]);
    setTimerSeconds(0);
    setIsCompleted(false);
    setRevealed(false);
  };

  return (
    <div
      className="max-w-xl mx-auto px-4 py-8 font-sans outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
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
          <h2 className="text-xl font-serif font-bold tracking-tight">The Mini Crossword</h2>
        </div>
        <div className="flex items-center space-x-3 text-xs text-gray-700">
          <div className="flex items-center space-x-1 font-mono font-bold bg-gray-100 px-2 py-1 rounded">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timerSeconds)}</span>
          </div>
          <button
            onClick={handleReset}
            className="p-1 hover:text-black text-gray-600"
            title="Reset Puzzle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* The 5x5 Grid */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="w-[280px] h-[280px] border-2 border-black grid grid-cols-5 bg-black gap-[1px]">
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const isActive = activeCell[0] === r && activeCell[1] === c;
                const isInWord =
                  direction === 'across' ? activeCell[0] === r : activeCell[1] === c;
                let bg = 'bg-white';
                if (isActive) bg = 'bg-[#ffda00]';
                else if (isInWord) bg = 'bg-[#a7d8ff]';

                const cellNumber = r === 0 ? c + 1 : c === 0 ? r + 5 : null;

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`relative flex items-center justify-center font-bold text-xl cursor-pointer select-none transition-colors ${bg}`}
                  >
                    {cellNumber && (
                      <span className="absolute top-0.5 left-1 text-[9px] font-sans font-semibold text-gray-700">
                        {cellNumber}
                      </span>
                    )}
                    <span className="pt-1">{cell}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center space-x-3 mt-4 text-xs">
            <button
              onClick={handleRevealAll}
              className="flex items-center space-x-1 text-gray-600 hover:text-black border border-nyt px-3 py-1.5 rounded"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Solution</span>
            </button>
            <button
              onClick={() =>
                setDirection((d) => (d === 'across' ? 'down' : 'across'))
              }
              className="border border-nyt px-3 py-1.5 rounded font-medium text-gray-700 hover:text-black"
            >
              Mode: <span className="font-bold uppercase">{direction}</span>
            </button>
          </div>
        </div>

        {/* Clues Column */}
        <div className="md:col-span-5 space-y-4 text-xs font-sans">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-nyt-ink border-b border-nyt pb-1 mb-2">
              Across
            </h3>
            <ul className="space-y-1.5 text-gray-700">
              {CLUES_ACROSS.map((clue) => (
                <li key={clue.num} className="leading-snug">
                  <span className="font-bold text-black mr-1">{clue.num}.</span>
                  <span>{clue.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-nyt-ink border-b border-nyt pb-1 mb-2">
              Down
            </h3>
            <ul className="space-y-1.5 text-gray-700">
              {CLUES_DOWN.map((clue) => (
                <li key={clue.num} className="leading-snug">
                  <span className="font-bold text-black mr-1">{clue.num}.</span>
                  <span>{clue.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="mt-8 text-center bg-gray-50 border border-nyt p-6 rounded">
          <div className="flex justify-center mb-2">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-serif font-bold text-nyt-ink mb-1">
            {revealed ? 'Puzzle Revealed' : 'Solved!'}
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            Completed in <strong className="text-black">{formatTime(timerSeconds)}</strong>.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleReset}
              className="bg-nyt-blueBtn hover:bg-nyt-blueHover text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="border border-nyt px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Back to News
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
