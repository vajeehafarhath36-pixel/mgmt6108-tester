import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Volume2, MessageSquare, ThumbsUp, Send, Check } from 'lucide-react';
import { Article } from '../types';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  onPlayAudio: (article: Article) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  onPlayAudio
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState(article.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: newCommentAuthor.trim() || 'Reader',
      location: 'New York, NY',
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const fontSizeClass =
    fontSize === 'normal'
      ? 'text-[17px] leading-[1.8]'
      : fontSize === 'large'
      ? 'text-[19px] leading-[1.85]'
      : 'text-[22px] leading-[1.9]';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-serif">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between border-b border-nyt pb-3 mb-8 font-sans">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-black uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Front Page</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-masthead text-xl text-nyt-ink">The New York Times</span>
          <span className="text-gray-300">|</span>
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-nyt-grayText">
            {article.category}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Font Size Adjuster */}
          <div className="flex items-center space-x-1 text-xs border border-nyt rounded px-1.5 py-0.5">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 font-bold ${fontSize === 'normal' ? 'bg-black text-white rounded' : 'text-gray-600'}`}
              title="Normal text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 font-bold text-sm ${fontSize === 'large' ? 'bg-black text-white rounded' : 'text-gray-600'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded hover:bg-gray-100 ${isBookmarked ? 'text-black' : 'text-gray-600'}`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-600 relative"
            title="Share"
          >
            {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {copiedLink && (
        <div className="bg-nyt-ink text-white text-xs font-sans py-1.5 px-3 rounded text-center mb-6 w-fit mx-auto">
          Article link copied to clipboard
        </div>
      )}

      {/* Article Header */}
      <article className="space-y-4 mb-8">
        {article.isBreaking && (
          <div className="flex items-center space-x-2 text-[11px] font-sans font-bold text-nyt-tagRed uppercase tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-nyt-tagRed animate-pulse"></span>
            <span>Breaking News</span>
          </div>
        )}
        {article.isAnalysis && (
          <span className="font-sans text-[11px] font-bold text-nyt-grayText uppercase tracking-wider block">
            Analysis
          </span>
        )}
        {article.isGreatRead && (
          <span className="font-sans text-[11px] font-bold text-black uppercase tracking-wider block">
            The Great Read
          </span>
        )}

        <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-tight text-nyt-ink">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-xl sm:text-2xl text-gray-700 font-serif leading-snug">
            {article.subtitle}
          </p>
        )}

        <p className="text-lg text-gray-600 font-serif leading-relaxed italic border-l-2 border-nyt-ink pl-4 py-1">
          {article.deck}
        </p>

        {/* Audio Bar for this story */}
        <div className="bg-nyt-lightGrayBg border border-nyt rounded p-3 flex items-center justify-between font-sans text-xs my-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onPlayAudio(article)}
              className="w-8 h-8 rounded-full bg-nyt-ink text-white flex items-center justify-center hover:bg-nyt-blueHover transition shadow-sm"
              title="Listen to narration"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <div>
              <span className="font-bold text-gray-900 block">Listen to this article</span>
              <span className="text-[11px] text-nyt-grayText">
                {article.readTime} • Narrated by NYT Audio
              </span>
            </div>
          </div>
          <button
            onClick={() => onPlayAudio(article)}
            className="text-xs font-bold uppercase tracking-wider text-nyt-blueBtn hover:underline"
          >
            Play Audio
          </button>
        </div>

        {/* Byline & Date */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-b border-nyt pb-4 font-sans text-xs text-nyt-grayText">
          <div>
            <span>By </span>
            <span className="font-bold text-black">{article.author}</span>
            {article.authorRole && <span>, {article.authorRole}</span>}
          </div>
          <div className="mt-1 sm:mt-0">
            <span>{article.publishedAt}</span>
          </div>
        </div>

        {/* Image Showcase if available */}
        {article.imageUrl && (
          <figure className="my-6">
            <div className="overflow-hidden rounded-[2px] border border-nyt">
              <img
                src={article.imageUrl}
                alt={article.imageCaption || article.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="font-sans text-xs text-nyt-grayText mt-2 px-1 flex flex-col sm:flex-row justify-between">
                <span>{article.imageCaption}</span>
                {article.imageCredit && (
                  <span className="text-gray-400 mt-1 sm:mt-0 font-medium">{article.imageCredit}</span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* In-depth Article Body */}
        <div className={`space-y-6 pt-4 text-gray-800 ${fontSizeClass}`}>
          {article.content.map((paragraph, index) => {
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-nyt-ink"
                >
                  {paragraph}
                </p>
              );
            }

            // Insert editorial pull quote on long reads
            if (index === 2 && article.content.length > 3) {
              return (
                <React.Fragment key={index}>
                  <p>{paragraph}</p>
                  <blockquote className="my-8 py-4 px-6 border-y border-nyt bg-[#fdfdfd] text-xl font-serif italic text-nyt-ink text-center max-w-xl mx-auto">
                    “{article.deck}”
                  </blockquote>
                </React.Fragment>
              );
            }

            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="pt-8 border-t border-nyt flex flex-wrap gap-2 font-sans text-xs">
            <span className="text-gray-500 font-semibold self-center mr-1">Filed under:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2.5 py-1 rounded cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Reader Comments Section */}
      <section className="mt-12 pt-8 border-t-2 border-black font-sans">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-nyt-ink" />
            <h3 className="text-xl font-serif font-bold text-nyt-ink">
              Comments ({comments.length})
            </h3>
          </div>
          <span className="text-xs text-gray-500">Moderated under NYT Standards</span>
        </div>

        {/* Post Comment Form */}
        <form onSubmit={handleAddComment} className="mb-8 p-4 bg-nyt-lightGrayBg border border-nyt rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Your Name (e.g. Eleanor V.)"
              value={newCommentAuthor}
              onChange={(e) => setNewCommentAuthor(e.target.value)}
              className="text-xs p-2.5 border border-nyt rounded bg-white"
            />
          </div>
          <textarea
            rows={3}
            placeholder="Share your perspective on this report..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full text-xs p-2.5 border border-nyt rounded bg-white mb-3"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-nyt-ink text-white hover:bg-gray-800 px-4 py-2 text-xs font-bold rounded flex items-center space-x-1.5 uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Comment</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-nyt rounded bg-white space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div>
                  <span className="font-bold text-black mr-2">{comment.author}</span>
                  <span className="text-gray-400">{comment.location}</span>
                </div>
                <span>{comment.timestamp}</span>
              </div>
              <p className="text-xs text-gray-800 leading-relaxed font-serif">
                {comment.text}
              </p>
              <div className="flex items-center space-x-2 pt-1 text-xs">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-black"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Recommend ({comment.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
