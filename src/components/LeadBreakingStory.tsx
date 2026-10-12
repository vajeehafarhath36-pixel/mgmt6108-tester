import React from 'react';
import { Play } from 'lucide-react';
import { Article } from '../types';

interface LeadBreakingStoryProps {
  leadStory: Article;
  secondaryStory: Article;
  onSelectArticle: (id: string) => void;
  onPlayAudio: (article: Article) => void;
}

export const LeadBreakingStory: React.FC<LeadBreakingStoryProps> = ({
  leadStory,
  secondaryStory,
  onSelectArticle,
  onPlayAudio
}) => {
  return (
    <section className="lg:col-span-5 lg:pr-6 lg:border-r border-nyt mb-8 lg:mb-0" data-purpose="primary-lead-story">
      {/* Primary Breaking Story */}
      <article className="space-y-3">
        <div className="flex items-center space-x-2 text-[11px] font-sans font-bold text-nyt-tagRed uppercase tracking-wider">
          <span className="inline-block w-2 h-2 rounded-full bg-nyt-tagRed animate-pulse"></span>
          <span>Breaking News</span>
        </div>

        <h2
          onClick={() => onSelectArticle(leadStory.id)}
          className="text-3xl lg:text-[34px] font-bold text-nyt-ink headline-leading hover:text-gray-700 cursor-pointer"
        >
          {leadStory.title}
        </h2>

        <p className="font-serif text-[15px] leading-relaxed text-nyt-deck">
          {leadStory.deck}
        </p>

        {/* Audio Readout Widget Bar */}
        <div
          className="bg-nyt-lightGrayBg border border-nyt rounded p-2.5 flex items-center justify-between font-sans text-xs my-3 select-none"
          data-purpose="audio-bar"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayAudio(leadStory);
              }}
              aria-label="Listen to this article"
              className="w-7 h-7 rounded-full bg-nyt-ink text-white flex items-center justify-center hover:bg-nyt-blueHover transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </button>
            <div className="leading-tight">
              <span className="font-bold text-gray-800 block">Listen to this story</span>
              <span className="text-[11px] text-nyt-grayText">
                {leadStory.audioMinutes || 4} min read • Narrated by NYT Audio
              </span>
            </div>
          </div>
          <span className="text-[11px] text-nyt-grayText">Audio</span>
        </div>

        {/* Bylines */}
        <div className="font-sans text-[11px] text-nyt-grayText pt-1 flex items-center space-x-2">
          <span>
            By <span className="font-semibold text-gray-800">Cynthia Silva</span> and{' '}
            <span className="font-semibold text-gray-800">Zach Wasser</span>
          </span>
          <span>•</span>
          <span>3 MIN READ</span>
        </div>
      </article>

      {/* Secondary Story on left rail */}
      {secondaryStory && (
        <article className="mt-7 pt-6 border-t border-nyt space-y-2">
          <h3
            onClick={() => onSelectArticle(secondaryStory.id)}
            className="text-xl font-bold font-serif leading-snug hover:text-gray-700 cursor-pointer"
          >
            {secondaryStory.title}
          </h3>
          <p className="text-[13.5px] font-serif text-gray-700 leading-normal">
            {secondaryStory.deck}
          </p>
          <div className="font-sans text-[10px] text-nyt-grayText uppercase tracking-wider">
            {secondaryStory.readTime}
          </div>
        </article>
      )}
    </section>
  );
};
