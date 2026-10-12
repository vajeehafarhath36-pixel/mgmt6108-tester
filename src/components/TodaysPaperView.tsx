import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, FileText, Printer, Check } from 'lucide-react';
import { Article } from '../types';

interface TodaysPaperProps {
  onBack: () => void;
  onSelectArticle: (id: string) => void;
}

export const TodaysPaperView: React.FC<TodaysPaperProps> = ({ onBack, onSelectArticle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const pages = [
    {
      pageNumber: 'A1',
      title: 'The Front Page',
      leadStory: {
        id: 'saudi-yemeni-airports',
        headline: 'Saudi and Yemeni Airports Hit in New Round of Strikes',
        summary: 'At least 10 killed as key transportation hubs come under drone and cruise missile assault. Diplomats warn Red Sea transit is imperiled.',
        column: 'Col. 1-3'
      },
      secondaryStory: {
        id: 'saudi-arabia-options-analysis',
        headline: 'Crown Prince Faced With Stark Dilemma as Ambitions Targeted',
        summary: 'Domestic mega-investments stand vulnerable to recurring missile barrages from southern borders.',
        column: 'Col. 4-5'
      },
      briefs: [
        { id: 'flight-corridors-diverted', title: 'Airlines reroute tens of thousands around conflict zones' },
        { id: 'geneva-maritime-frameworks', title: 'Six-nation emergency coalition gathers in Geneva' }
      ]
    },
    {
      pageNumber: 'A2',
      title: 'Inside The Times & Global Digest',
      leadStory: {
        id: 'tokyo-inflation-decade-high',
        headline: 'Tokyo Inflation Hits Decade High as Currency Volatility Rattles Markets',
        summary: 'BoJ under intensified scrutiny as food import costs strain Japanese urban households.',
        column: 'Col. 1-2'
      },
      secondaryStory: {
        id: 'french-rail-high-speed-madrid',
        headline: 'High-Speed Rail Connects Paris and Madrid Directly in Under Six Hours',
        summary: 'SNCF and Renfe mount direct challenge to short-haul commercial aviation.',
        column: 'Col. 3-5'
      },
      briefs: [
        { id: 'german-coalition-renewable-quotas', title: 'German industrial groups protest new green power mandates' }
      ]
    },
    {
      pageNumber: 'A3',
      title: 'The Great Read & Enterprise Dispatches',
      leadStory: {
        id: 'epic-wilderness-adventure',
        headline: 'He Ventured Into the Frozen Taiga. Only His Sled Dogs Returned.',
        summary: 'A surveyor’s enigmatic disappearance into the Yukon wilderness prompts months of search operations.',
        column: 'Full Spread A3'
      },
      secondaryStory: {
        id: 'manchester-city-pressing',
        headline: 'Tactical Breakdown: The Relentless Pressing That Broke Manchester City',
        summary: 'How aggressive half-space interception stunned the reigning champions in stoppage time.',
        column: 'Sports Desk'
      },
      briefs: []
    },
    {
      pageNumber: 'A14',
      title: 'Opinion, Analysis & Editorial Notebook',
      leadStory: {
        id: 'krugman-economic-illusions',
        headline: 'Paul Krugman: The Enduring Illusions of Tariff Remedies',
        summary: 'Why protectionist trade barriers worsen monetary imbalances rather than curing them.',
        column: 'Col. 1-2'
      },
      secondaryStory: {
        id: 'inuit-warming-arctic',
        headline: 'Sheila Watt-Cloutier: Words for Ice in a Warming World',
        summary: 'Inuk ancestral memory meets the vanishing winter sea ice of the northern circumpolar basin.',
        column: 'Col. 3-4'
      },
      briefs: [
        { id: 'friedman-red-sea-taiwan', title: 'Thomas L. Friedman on asymmetrical shipping choke points' },
        { id: 'douthat-cultural-pessimism', title: 'Ross Douthat on the spiritual roots of Western cultural fatigue' }
      ]
    }
  ];

  const current = pages[currentPage - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-serif">
      {/* Top Controls */}
      <div className="flex items-center justify-between border-b border-nyt pb-4 mb-6 font-sans">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-black uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Front Page</span>
        </button>

        <div className="text-center">
          <span className="font-masthead text-2xl text-nyt-ink block">The New York Times</span>
          <span className="text-xs text-nyt-grayText">
            Print Broadsheet Replica • Monday, October 12, 2026
          </span>
        </div>

        {/* Page Navigators */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 border border-nyt rounded disabled:opacity-30 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold">
            Page {current.pageNumber} ({currentPage}/{totalPages})
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 border border-nyt rounded disabled:opacity-30 hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Broadsheet Page Simulation Box */}
      <div className="bg-[#faf8f5] border-2 border-[#121212] p-6 sm:p-10 shadow-lg min-h-[600px] flex flex-col justify-between">
        <div>
          {/* Running Page Folio */}
          <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-6 text-xs font-sans">
            <span className="font-bold tracking-widest uppercase">The New York Times</span>
            <span className="font-semibold text-gray-700">{current.title}</span>
            <span className="font-bold font-mono">Page {current.pageNumber}</span>
          </div>

          {/* Newspaper Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Lead Story on this print page */}
            <div className="md:col-span-7 space-y-3 border-b md:border-b-0 md:border-r border-nyt pb-6 md:pb-0 md:pr-6">
              <span className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest block">
                {current.leadStory.column}
              </span>
              <h2
                onClick={() => onSelectArticle(current.leadStory.id)}
                className="text-2xl sm:text-3xl font-bold leading-tight hover:text-gray-700 cursor-pointer"
              >
                {current.leadStory.headline}
              </h2>
              <p className="text-sm font-serif leading-relaxed text-gray-800">
                {current.leadStory.summary}
              </p>
              <button
                onClick={() => onSelectArticle(current.leadStory.id)}
                className="text-xs font-sans font-bold text-nyt-blueBtn hover:underline uppercase tracking-wider block pt-2"
              >
                Read Complete Report →
              </button>
            </div>

            {/* Secondary Story & Column Digest */}
            <div className="md:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest block">
                  {current.secondaryStory.column}
                </span>
                <h3
                  onClick={() => onSelectArticle(current.secondaryStory.id)}
                  className="text-xl font-bold leading-snug hover:text-gray-700 cursor-pointer"
                >
                  {current.secondaryStory.headline}
                </h3>
                <p className="text-xs font-serif leading-relaxed text-gray-700">
                  {current.secondaryStory.summary}
                </p>
                <button
                  onClick={() => onSelectArticle(current.secondaryStory.id)}
                  className="text-xs font-sans font-bold text-nyt-blueBtn hover:underline uppercase tracking-wider block"
                >
                  Read Story →
                </button>
              </div>

              {current.briefs.length > 0 && (
                <div className="pt-4 border-t border-nyt space-y-2">
                  <span className="text-[10px] font-sans font-bold text-black uppercase tracking-wider block">
                    Also in this Section
                  </span>
                  <ul className="space-y-2 text-xs">
                    {current.briefs.map((b) => (
                      <li key={b.id}>
                        <button
                          onClick={() => onSelectArticle(b.id)}
                          className="text-left font-serif hover:underline text-gray-800 font-medium"
                        >
                          • {b.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Physical Paper Footer */}
        <div className="mt-12 pt-3 border-t border-black flex items-center justify-between text-[11px] font-sans text-gray-600">
          <span>THE NEW YORK TIMES • INTERNATIONAL BROADSHEET • VOL. CLXXV No. 60,342</span>
          <span>PRINTED IN LONDON, FRANKFURT, PARIS & DUBAI</span>
        </div>
      </div>
    </div>
  );
};
