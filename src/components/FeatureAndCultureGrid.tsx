import React from 'react';
import { Article, Recipe } from '../types';

interface FeatureAndCultureGridProps {
  greatReadArticle: Article;
  recipe: Recipe;
  onSelectArticle: (id: string) => void;
  onOpenRecipe: () => void;
  onOpenWordle: () => void;
  onOpenConnections: () => void;
  onOpenMiniCrossword: () => void;
}

export const FeatureAndCultureGrid: React.FC<FeatureAndCultureGridProps> = ({
  greatReadArticle,
  recipe,
  onSelectArticle,
  onOpenRecipe,
  onOpenWordle,
  onOpenConnections,
  onOpenMiniCrossword
}) => {
  return (
    <section className="mt-8 border-b border-nyt pb-10" data-purpose="features-and-culture">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* The Great Read Showcase (7 Columns) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center space-x-2 border-b border-nyt pb-1">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-nyt-ink">
              The Great Read
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="space-y-2">
              <h3
                onClick={() => onSelectArticle(greatReadArticle.id)}
                className="font-serif text-2xl font-bold leading-tight hover:text-gray-700 cursor-pointer"
              >
                {greatReadArticle.title}
              </h3>
              <p className="font-serif text-sm text-nyt-deck leading-relaxed">
                {greatReadArticle.deck}
              </p>
              <div className="font-sans text-[11px] text-nyt-grayText pt-2">
                By <span className="text-black font-semibold">{greatReadArticle.author}</span> • {greatReadArticle.readTime}
              </div>
            </div>

            <div
              onClick={() => onSelectArticle(greatReadArticle.id)}
              className="cursor-pointer group overflow-hidden rounded-[2px]"
            >
              <img
                src={greatReadArticle.imageUrl}
                alt="Snowy subarctic forest landscape"
                referrerPolicy="no-referrer"
                className="w-full h-48 md:h-full object-cover rounded-[2px] group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Games & Lifestyle Modules (5 Columns) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* NYT Games Card */}
          <div className="bg-nyt-lightGrayBg p-4 border border-nyt rounded-[2px]">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black border-b border-nyt pb-1.5 mb-3">
              Play &amp; Solve
            </h4>

            <ul className="space-y-2.5 font-sans text-xs">
              <li
                onClick={onOpenWordle}
                className="flex items-center justify-between pb-2 border-b border-nyt cursor-pointer hover:bg-white/60 p-1 rounded transition-colors group"
              >
                <div>
                  <span className="font-bold block text-nyt-ink group-hover:text-nyt-blueHover">Wordle</span>
                  <span className="text-nyt-grayText text-[11px]">Guess the 5-letter word</span>
                </div>
                <span className="text-xs font-bold text-nyt-blueBtn group-hover:translate-x-0.5 transition-transform">→</span>
              </li>

              <li
                onClick={onOpenConnections}
                className="flex items-center justify-between pb-2 border-b border-nyt cursor-pointer hover:bg-white/60 p-1 rounded transition-colors group"
              >
                <div>
                  <span className="font-bold block text-nyt-ink group-hover:text-nyt-blueHover">Connections</span>
                  <span className="text-nyt-grayText text-[11px]">Group words that share a common thread</span>
                </div>
                <span className="text-xs font-bold text-nyt-blueBtn group-hover:translate-x-0.5 transition-transform">→</span>
              </li>

              <li
                onClick={onOpenMiniCrossword}
                className="flex items-center justify-between cursor-pointer hover:bg-white/60 p-1 rounded transition-colors group"
              >
                <div>
                  <span className="font-bold block text-nyt-ink group-hover:text-nyt-blueHover">The Mini Crossword</span>
                  <span className="text-nyt-grayText text-[11px]">Solve in 60 seconds</span>
                </div>
                <span className="text-xs font-bold text-nyt-blueBtn group-hover:translate-x-0.5 transition-transform">→</span>
              </li>
            </ul>
          </div>

          {/* NYT Cooking Card */}
          <div
            onClick={onOpenRecipe}
            className="bg-nyt-lightGrayBg p-4 border border-nyt rounded-[2px] flex flex-col justify-between cursor-pointer group hover:bg-[#f3f3f3] transition-colors"
          >
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black border-b border-nyt pb-1.5 mb-2">
                NYT Cooking
              </h4>

              <div className="overflow-hidden rounded-[2px] mb-2">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-24 object-cover rounded-[2px] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h5 className="font-serif text-[15px] font-bold leading-tight group-hover:text-nyt-blueHover">
                {recipe.title}
              </h5>

              <p className="font-serif text-xs text-nyt-deck mt-1 line-clamp-2">
                {recipe.deck}
              </p>
            </div>

            <span className="font-sans text-[10px] text-nyt-grayText mt-3 uppercase tracking-wider font-semibold block">
              Recipe by {recipe.author}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
