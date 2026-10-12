import React from 'react';
import { Article } from '../types';

interface OpinionSectionProps {
  opinionArticles: Article[];
  onSelectArticle: (id: string) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  opinionArticles,
  onSelectArticle
}) => {
  return (
    <section className="mt-8 border-b border-nyt pb-8" data-purpose="opinion-columns">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-nyt-ink pb-1 mb-5">
        <h3 className="font-serif text-2xl font-bold tracking-tight">Opinion</h3>
        <button
          onClick={() => {
            if (opinionArticles.length > 0) {
              onSelectArticle(opinionArticles[0].id);
            }
          }}
          className="font-sans text-xs font-semibold hover:underline text-nyt-grayText"
        >
          Explore All Opinions →
        </button>
      </div>

      {/* 4 Column Opinion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {opinionArticles.map((article) => (
          <article key={article.id} className="space-y-2">
            <div className="font-sans text-[11px] text-nyt-grayText font-semibold uppercase">
              {article.author}
            </div>

            <h4
              onClick={() => onSelectArticle(article.id)}
              className="font-serif text-[17px] font-bold leading-snug hover:text-gray-600 cursor-pointer"
            >
              {article.title}
            </h4>

            <p className="font-serif text-xs text-nyt-deck">
              {article.deck}
            </p>

            {article.authorRole && article.authorRole.includes('Guest') && (
              <span className="font-sans text-[11px] text-nyt-grayText block">
                By {article.author}
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
