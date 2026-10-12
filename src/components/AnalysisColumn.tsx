import React from 'react';
import { Article } from '../types';

interface AnalysisColumnProps {
  analysisStory: Article;
  liveUpdateStory: Article;
  onSelectArticle: (id: string) => void;
}

export const AnalysisColumn: React.FC<AnalysisColumnProps> = ({
  analysisStory,
  liveUpdateStory,
  onSelectArticle
}) => {
  return (
    <section className="lg:col-span-4 lg:px-6 lg:border-r border-nyt mb-8 lg:mb-0 space-y-6" data-purpose="secondary-lead-analysis">
      <article className="space-y-2.5">
        <span className="font-sans text-[11px] font-bold text-nyt-grayText uppercase tracking-wider block">
          Analysis
        </span>

        <h2
          onClick={() => onSelectArticle(analysisStory.id)}
          className="text-2xl font-bold font-serif headline-leading hover:text-gray-700 cursor-pointer"
        >
          {analysisStory.title}
        </h2>

        {/* Editorial Image: Satellite Radar Map */}
        {analysisStory.imageUrl && (
          <div
            onClick={() => onSelectArticle(analysisStory.id)}
            className="mt-3 overflow-hidden rounded-[2px] bg-gray-100 border border-nyt cursor-pointer group"
            data-purpose="editorial-image"
          >
            <img
              src={analysisStory.imageUrl}
              alt="Air traffic and coastal defense map in the Red Sea region"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
            />
            {analysisStory.imageCaption && (
              <p className="font-sans text-[11px] text-nyt-grayText p-1.5 leading-normal bg-white">
                {analysisStory.imageCaption}
              </p>
            )}
          </div>
        )}

        <p className="font-serif text-[14px] leading-relaxed text-nyt-deck mt-2">
          {analysisStory.deck}
        </p>

        <div className="font-sans text-[11px] text-nyt-grayText">
          <span>
            By <span className="font-semibold text-gray-800">Vivian Nereim</span>
          </span>
          <span className="mx-1">•</span>
          <span>{analysisStory.readTime}</span>
        </div>
      </article>

      {/* Live Updates Section */}
      {liveUpdateStory && (
        <article className="pt-5 border-t border-nyt space-y-1.5">
          <span className="font-sans text-[11px] font-bold text-nyt-tagRed uppercase tracking-wider">
            Live Updates
          </span>
          <h3
            onClick={() => onSelectArticle(liveUpdateStory.id)}
            className="text-lg font-bold font-serif hover:text-gray-700 cursor-pointer"
          >
            {liveUpdateStory.title}
          </h3>
          <p className="text-[13px] text-nyt-deck font-serif">
            {liveUpdateStory.deck}
          </p>
        </article>
      )}
    </section>
  );
};
