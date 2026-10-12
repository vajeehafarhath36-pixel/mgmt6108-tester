import React from 'react';
import { Article } from '../types';

interface BriefAndSportsColumnProps {
  briefArticles: Article[];
  sportsArticle: Article;
  onSelectArticle: (id: string) => void;
}

export const BriefAndSportsColumn: React.FC<BriefAndSportsColumnProps> = ({
  briefArticles,
  sportsArticle,
  onSelectArticle
}) => {
  return (
    <section className="lg:col-span-3 lg:pl-6 space-y-6" data-purpose="right-digest-column">
      {/* Live Briefing / Highlights Box */}
      <div className="bg-nyt-lightGrayBg p-4 border border-nyt rounded-[2px]">
        <h4 className="font-sans text-xs font-bold uppercase tracking-wider border-b border-nyt pb-1.5 mb-3 text-black">
          The World in Brief
        </h4>

        <ul className="space-y-3 font-serif text-[13.5px] leading-snug divide-y divide-nyt">
          {briefArticles.map((article, idx) => (
            <li key={article.id} className={idx === 0 ? 'first:pt-0' : 'pt-3'}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(article.id);
                }}
                className="hover:underline font-semibold block text-nyt-ink cursor-pointer"
                href={`#${article.id}`}
              >
                {article.title}
              </a>
              <span className="font-sans text-[10px] text-nyt-grayText block mt-1">
                {article.readTime}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The Athletic Feature Box */}
      {sportsArticle && (
        <div className="border-t-2 border-black pt-3">
          <div className="flex items-center justify-between mb-2 font-sans">
            <span className="font-black text-xs tracking-tighter uppercase">The Athletic</span>
            <span className="text-[10px] text-nyt-grayText uppercase font-semibold">Premier League</span>
          </div>

          <article className="space-y-1.5">
            <h4
              onClick={() => onSelectArticle(sportsArticle.id)}
              className="font-serif text-[16px] font-bold leading-snug hover:text-gray-700 cursor-pointer"
            >
              {sportsArticle.title}
            </h4>
            <p className="font-serif text-xs text-nyt-deck">
              {sportsArticle.deck}
            </p>
            <span className="font-sans text-[10px] text-nyt-grayText block">
              By {sportsArticle.author}
            </span>
          </article>
        </div>
      )}
    </section>
  );
};
