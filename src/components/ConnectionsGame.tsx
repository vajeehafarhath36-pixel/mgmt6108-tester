import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Shuffle, CheckCircle2 } from 'lucide-react';

interface ConnectionsProps {
  onBack: () => void;
}

interface Group {
  category: string;
  items: string[];
  color: string;
  bgClass: string;
  level: number;
}

const GROUPS: Group[] = [
  {
    category: 'PORTS & CHOKE POINTS',
    items: ['ADEN', 'JEDDAH', 'HODEIDAH', 'ABHA'],
    color: '#f9df6d',
    bgClass: 'bg-[#f9df6d] text-black',
    level: 1
  },
  {
    category: 'AIRPORT & FLIGHT TERMS',
    items: ['APRON', 'CORRIDOR', 'RUNWAY', 'ENVELOPE'],
    color: '#a0c35a',
    bgClass: 'bg-[#a0c35a] text-black',
    level: 2
  },
  {
    category: 'NEWSPAPER SECTIONS',
    items: ['OPINION', 'CULTURE', 'BUSINESS', 'GAMES'],
    color: '#b0c4de',
    bgClass: 'bg-[#b0c4de] text-black',
    level: 3
  },
  {
    category: 'TYPES OF CITRUS',
    items: ['BLOOD', 'VALENCIA', 'MANDARIN', 'SEVILLE'],
    color: '#ba81c5',
    bgClass: 'bg-[#ba81c5] text-white',
    level: 4
  }
];

export const ConnectionsGame: React.FC<ConnectionsProps> = ({ onBack }) => {
  const initialItems = GROUPS.flatMap((g) => g.items).sort(() => Math.random() - 0.5);
  const [availableItems, setAvailableItems] = useState<string[]>(initialItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<Group[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [message, setMessage] = useState('');

  const showToast = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  };

  const toggleSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      if (selectedItems.length >= 4) return;
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleShuffle = () => {
    setAvailableItems([...availableItems].sort(() => Math.random() - 0.5));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleSubmit = () => {
    if (selectedItems.length !== 4) {
      showToast('Select 4 words to submit');
      return;
    }

    const matchedGroup = GROUPS.find((group) =>
      group.items.every((it) => selectedItems.includes(it))
    );

    if (matchedGroup) {
      setSolvedGroups([...solvedGroups, matchedGroup]);
      setAvailableItems(availableItems.filter((it) => !matchedGroup.items.includes(it)));
      setSelectedItems([]);
      showToast('Correct group solved!');
    } else {
      // Check if 1 away
      const oneAway = GROUPS.some((group) => {
        const count = group.items.filter((it) => selectedItems.includes(it)).length;
        return count === 3;
      });

      if (oneAway) {
        showToast('One away...');
      } else {
        showToast('Incorrect guess');
      }

      setMistakesRemaining((prev) => Math.max(0, prev - 1));
    }
  };

  const handleReset = () => {
    setSolvedGroups([]);
    setAvailableItems(initialItems.sort(() => Math.random() - 0.5));
    setSelectedItems([]);
    setMistakesRemaining(4);
    setMessage('');
  };

  const isWon = solvedGroups.length === 4;
  const isLost = mistakesRemaining === 0 && !isWon;

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
          <h2 className="text-xl font-serif font-bold tracking-tight">Connections</h2>
        </div>
        <button
          onClick={handleReset}
          className="p-1.5 text-gray-600 hover:text-black rounded"
          title="Reset Game"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mb-6">
        <p className="text-xs text-gray-600">
          Create four groups of four items that share a common thread.
        </p>
      </div>

      {message && (
        <div className="bg-black text-white text-xs font-bold py-2 px-4 rounded text-center mb-4 transition-all">
          {message}
        </div>
      )}

      {/* Solved Groups List */}
      <div className="space-y-2 mb-4">
        {solvedGroups.map((g) => (
          <div
            key={g.category}
            className={`p-3.5 rounded text-center font-bold animate-fadeIn ${g.bgClass}`}
          >
            <div className="text-xs uppercase tracking-wider mb-0.5">{g.category}</div>
            <div className="text-sm font-semibold tracking-wide">
              {g.items.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {/* Available Cards Grid */}
      {!isWon && !isLost && (
        <div className="grid grid-cols-4 gap-2 mb-6">
          {availableItems.map((item) => {
            const isSelected = selectedItems.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleSelect(item)}
                className={`h-16 rounded-[4px] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center p-1.5 text-center transition-all ${
                  isSelected
                    ? 'bg-[#5a594e] text-white'
                    : 'bg-[#efefe6] hover:bg-[#e6e6dc] text-nyt-ink'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}

      {/* Mistakes remaining */}
      {!isWon && !isLost && (
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-700 mb-6">
          <span>Mistakes remaining:</span>
          <div className="flex space-x-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < mistakesRemaining ? 'bg-[#5a594e]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isWon && !isLost && (
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={handleShuffle}
            className="flex items-center space-x-1.5 border border-nyt rounded-full px-4 py-2 text-xs font-bold hover:bg-gray-100"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
          <button
            onClick={handleDeselectAll}
            disabled={selectedItems.length === 0}
            className="border border-nyt rounded-full px-4 py-2 text-xs font-bold hover:bg-gray-100 disabled:opacity-40"
          >
            Deselect all
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedItems.length !== 4}
            className="bg-nyt-ink text-white rounded-full px-5 py-2 text-xs font-bold hover:bg-gray-800 disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      )}

      {/* End state notifications */}
      {isWon && (
        <div className="mt-8 text-center bg-gray-50 border border-nyt p-6 rounded text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-serif font-bold text-nyt-ink mb-1">Brilliant!</h3>
          <p className="text-xs text-gray-600 mb-4">You solved all four Connections categories.</p>
          <button
            onClick={onBack}
            className="bg-nyt-blueBtn hover:bg-nyt-blueHover text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider"
          >
            Back to Front Page
          </button>
        </div>
      )}

      {isLost && (
        <div className="mt-8 text-center bg-gray-50 border border-nyt p-6 rounded">
          <h3 className="text-xl font-serif font-bold text-nyt-ink mb-2">Out of guesses!</h3>
          <p className="text-xs text-gray-600 mb-4">You used all 4 attempts. Better luck tomorrow!</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleReset}
              className="bg-nyt-blueBtn hover:bg-nyt-blueHover text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="border border-nyt px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
