import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.deck.toLowerCase().includes(query.toLowerCase()) ||
          a.author.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase())
      )
    : articles.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/50 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white max-w-2xl w-full rounded-[2px] shadow-2xl border border-nyt overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-nyt bg-gray-50">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search The New York Times archive, articles, opinions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent outline-none text-black placeholder:text-gray-400"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-black p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-nyt">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            {query.trim() ? `Search results (${filtered.length})` : 'Recent Highlights'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500 font-serif">
              No matching articles found for “{query}”.
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.id);
                  onClose();
                }}
                className="py-3 hover:bg-gray-50 cursor-pointer px-2 rounded transition-colors group flex items-start justify-between"
              >
                <div className="pr-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nyt-grayText">
                    {article.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-nyt-ink group-hover:text-nyt-blueHover leading-snug">
                    {article.title}
                  </h4>
                  <p className="font-serif text-xs text-nyt-deck line-clamp-1">
                    {article.deck}
                  </p>
                  <span className="text-[10px] text-gray-400 block">
                    By {article.author} • {article.readTime}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
