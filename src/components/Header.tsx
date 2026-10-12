import React from 'react';
import { Search, Volume2 } from 'lucide-react';
import { Edition, SectionType } from '../types';

interface HeaderProps {
  currentEdition: Edition;
  onSelectEdition: (edition: Edition) => void;
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onOpenSubscribe: () => void;
  onOpenTodaysPaper: () => void;
  onPlayHeadlinesAudio: () => void;
  onOpenSearch: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentEdition,
  onSelectEdition,
  activeSection,
  onSelectSection,
  onOpenSubscribe,
  onOpenTodaysPaper,
  onPlayHeadlinesAudio,
  onOpenSearch,
  onGoHome
}) => {
  const sections: SectionType[] = [
    'World',
    'U.S.',
    'Politics',
    'Business',
    'Tech',
    'Science',
    'Arts',
    'Lifestyle',
    'Opinion',
    'Audio',
    'Games',
    'Cooking',
    'Wirecutter',
    'The Athletic'
  ];

  return (
    <header className="max-w-[1280px] mx-auto px-4 lg:px-8 font-sans" data-purpose="top-utility-bar">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between text-[11px] leading-tight border-b border-nyt pt-2.5 pb-2 mb-3">
        {/* Edition Switcher */}
        <nav aria-label="Edition Navigation" className="flex items-center space-x-3 tracking-wider font-semibold text-gray-700">
          <button
            onClick={() => onSelectEdition('US')}
            className={`transition-colors ${currentEdition === 'US' ? 'text-black font-bold' : 'text-gray-500 hover:text-black font-normal'}`}
          >
            U.S.
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onSelectEdition('INTERNATIONAL')}
            className={`transition-colors ${currentEdition === 'INTERNATIONAL' ? 'text-black font-bold' : 'text-gray-500 hover:text-black font-normal'}`}
          >
            INTERNATIONAL
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onSelectEdition('CANADA')}
            className={`transition-colors ${currentEdition === 'CANADA' ? 'text-black font-bold' : 'text-gray-500 hover:text-black font-normal'}`}
          >
            CANADA
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onSelectEdition('ESPANOL')}
            className={`transition-colors ${currentEdition === 'ESPANOL' ? 'text-black font-bold' : 'text-gray-500 hover:text-black font-normal'}`}
          >
            ESPAÑOL
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onSelectEdition('CHINESE')}
            className={`transition-colors ${currentEdition === 'CHINESE' ? 'text-black font-bold' : 'text-gray-500 hover:text-black font-normal'}`}
          >
            中文
          </button>
        </nav>

        {/* Right utility buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-1 text-gray-600 hover:text-black mr-1"
            title="Search The Times"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white px-2.5 py-1.5 rounded-[2px] font-bold text-[10px] tracking-wider uppercase transition-colors"
            type="button"
          >
            Subscribe for $1/week
          </button>
          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white px-3 py-1.5 rounded-[2px] font-bold text-[10px] tracking-wider uppercase transition-colors"
            type="button"
          >
            Log In
          </button>
        </div>
      </div>

      {/* Date, Section Indicator, Today's Paper & Audio link */}
      <div className="flex items-center justify-between text-xs text-nyt-grayText pt-0.5 pb-1">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-black">Monday, October 12, 2026</span>
          <button
            onClick={onOpenTodaysPaper}
            className="hover:underline flex items-center space-x-1 font-sans text-gray-600 hover:text-black cursor-pointer"
          >
            <span>Today's Paper</span>
          </button>
        </div>
        <div className="hidden sm:flex items-center space-x-5 text-gray-600 text-[11px]">
          <button
            onClick={onPlayHeadlinesAudio}
            className="flex items-center space-x-1.5 hover:text-black transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-nyt-blueBtn" />
            <span>Listen to Today's Headlines (9 min)</span>
          </button>
        </div>
      </div>

      {/* Masthead */}
      <div className="text-center my-1" data-purpose="masthead">
        <button
          onClick={onGoHome}
          className="inline-block cursor-pointer group"
          title="The New York Times Home"
        >
          <h1 className="font-masthead text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight font-normal text-nyt-ink group-hover:opacity-95 transition-opacity py-1">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Primary Navigation with broadsheet double border */}
      <nav aria-label="Main Navigation" className="mb-6 font-sans">
        <div className="nyt-double-border py-1.5">
          <ul className="flex flex-wrap items-center justify-between text-[11px] lg:text-[12px] font-medium tracking-wide text-gray-800">
            {sections.map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => onSelectSection(sec)}
                  className={`transition-colors whitespace-nowrap cursor-pointer hover:text-nyt-blueHover ${
                    activeSection === sec ? 'font-bold text-black border-b border-black' : ''
                  }`}
                >
                  {sec}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
