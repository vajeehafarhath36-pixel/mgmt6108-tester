/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { LeadBreakingStory } from './components/LeadBreakingStory';
import { AnalysisColumn } from './components/AnalysisColumn';
import { BriefAndSportsColumn } from './components/BriefAndSportsColumn';
import { OpinionSection } from './components/OpinionSection';
import { FeatureAndCultureGrid } from './components/FeatureAndCultureGrid';
import { Footer } from './components/Footer';
import { ArticleView } from './components/ArticleView';
import { RecipeView } from './components/RecipeView';
import { TodaysPaperView } from './components/TodaysPaperView';
import { WordleGame } from './components/WordleGame';
import { ConnectionsGame } from './components/ConnectionsGame';
import { MiniCrosswordGame } from './components/MiniCrosswordGame';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { SubscribeModal } from './components/SubscribeModal';
import { SearchModal } from './components/SearchModal';
import { ARTICLES, RECIPE_DATA } from './data/nytData';
import { Edition, SectionType, ViewState, Article } from './types';

export default function App() {
  const [currentEdition, setCurrentEdition] = useState<Edition>('INTERNATIONAL');
  const [activeSection, setActiveSection] = useState<SectionType>('All');
  const [viewState, setViewState] = useState<ViewState>({ type: 'frontpage' });

  // Modals & Audio state
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentAudioTrack, setCurrentAudioTrack] = useState<{
    title: string;
    narrator: string;
    durationSeconds: number;
    textToSpeak?: string;
  } | null>(null);

  // Article Lookups
  const leadStory = ARTICLES.find((a) => a.id === 'saudi-yemeni-airports') || ARTICLES[0];
  const secondaryLeadStory = ARTICLES.find((a) => a.id === 'flight-corridors-diverted') || ARTICLES[1];
  const analysisStory = ARTICLES.find((a) => a.id === 'saudi-arabia-options-analysis') || ARTICLES[2];
  const liveUpdateStory = ARTICLES.find((a) => a.id === 'geneva-maritime-frameworks') || ARTICLES[3];
  const briefArticles = ARTICLES.filter((a) =>
    ['tokyo-inflation-decade-high', 'german-coalition-renewable-quotas', 'french-rail-high-speed-madrid'].includes(a.id)
  );
  const sportsArticle = ARTICLES.find((a) => a.id === 'manchester-city-pressing') || ARTICLES[7];
  const opinionArticles = ARTICLES.filter((a) => a.isOpinion);
  const greatReadArticle = ARTICLES.find((a) => a.id === 'epic-wilderness-adventure') || ARTICLES[12];

  // Navigation handlers
  const handleSelectArticle = (id: string) => {
    setViewState({ type: 'article', articleId: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (section: SectionType) => {
    setActiveSection(section);
    if (section === 'Games') {
      setViewState({ type: 'wordle' });
    } else if (section === 'Cooking') {
      setViewState({ type: 'recipe', recipeId: RECIPE_DATA.id });
    } else if (section === 'Audio') {
      handlePlayHeadlinesAudio();
    } else if (section === 'The Athletic') {
      handleSelectArticle(sportsArticle.id);
    } else {
      setViewState({ type: 'frontpage' });
    }
  };

  const handlePlayStoryAudio = (article: Article) => {
    setCurrentAudioTrack({
      title: article.title,
      narrator: `Narrated by NYT Audio • ${article.author}`,
      durationSeconds: (article.audioMinutes || 4) * 60,
      textToSpeak: `${article.title}. ${article.deck}. Reported by ${article.author}. ${article.content.slice(0, 3).join(' ')}`
    });
  };

  const handlePlayHeadlinesAudio = () => {
    setCurrentAudioTrack({
      title: "Today's Broadsheet Headlines",
      narrator: "The New York Times Morning Audio Briefing",
      durationSeconds: 9 * 60,
      textToSpeak: "Good morning. Here are the top stories from The New York Times for Monday, October 12, 2026. Saudi and Yemeni airports are hit in a new round of strikes, threatening regional transit corridors. Crown Prince Mohammed bin Salman faces a strategic dilemma. In Tokyo, inflation reaches a decade high. And in the Yukon taiga, a search continues for an explorer whose sled dogs returned alone."
    });
  };

  // Render sub-screens
  if (viewState.type === 'article') {
    const article = ARTICLES.find((a) => a.id === viewState.articleId) || leadStory;
    return (
      <div className="min-h-screen bg-white">
        <ArticleView
          article={article}
          onBack={() => setViewState({ type: 'frontpage' })}
          onSelectArticle={handleSelectArticle}
          onPlayAudio={handlePlayStoryAudio}
        />
        <Footer
          onSelectSection={handleSelectSection}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onGoHome={() => setViewState({ type: 'frontpage' })}
        />
        <AudioPlayerBar
          currentTrack={currentAudioTrack}
          onClose={() => setCurrentAudioTrack(null)}
        />
        <SubscribeModal
          isOpen={isSubscribeOpen}
          onClose={() => setIsSubscribeOpen(false)}
        />
      </div>
    );
  }

  if (viewState.type === 'recipe') {
    return (
      <div className="min-h-screen bg-white">
        <RecipeView onBack={() => setViewState({ type: 'frontpage' })} />
        <Footer
          onSelectSection={handleSelectSection}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onGoHome={() => setViewState({ type: 'frontpage' })}
        />
        <AudioPlayerBar
          currentTrack={currentAudioTrack}
          onClose={() => setCurrentAudioTrack(null)}
        />
        <SubscribeModal
          isOpen={isSubscribeOpen}
          onClose={() => setIsSubscribeOpen(false)}
        />
      </div>
    );
  }

  if (viewState.type === 'todays_paper') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <TodaysPaperView
          onBack={() => setViewState({ type: 'frontpage' })}
          onSelectArticle={handleSelectArticle}
        />
        <Footer
          onSelectSection={handleSelectSection}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onGoHome={() => setViewState({ type: 'frontpage' })}
        />
        <AudioPlayerBar
          currentTrack={currentAudioTrack}
          onClose={() => setCurrentAudioTrack(null)}
        />
        <SubscribeModal
          isOpen={isSubscribeOpen}
          onClose={() => setIsSubscribeOpen(false)}
        />
      </div>
    );
  }

  if (viewState.type === 'wordle') {
    return (
      <div className="min-h-screen bg-white">
        <WordleGame onBack={() => setViewState({ type: 'frontpage' })} />
        <Footer
          onSelectSection={handleSelectSection}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onGoHome={() => setViewState({ type: 'frontpage' })}
        />
      </div>
    );
  }

  if (viewState.type === 'connections') {
    return (
      <div className="min-h-screen bg-white">
        <ConnectionsGame onBack={() => setViewState({ type: 'frontpage' })} />
        <Footer
          onSelectSection={handleSelectSection}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onGoHome={() => setViewState({ type: 'frontpage' })}
        />
      </div>
    );
  }

  if (viewState.type === 'mini_crossword') {
    return (
      <div className="min-h-screen bg-white">
        <MiniCrosswordGame onBack={() => setViewState({ type: 'frontpage' })} />
        <Footer
          onSelectSection={handleSelectSection}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onGoHome={() => setViewState({ type: 'frontpage' })}
        />
      </div>
    );
  }

  // Default: Authentic Broadsheet Front Page
  return (
    <div className="min-h-screen bg-white text-nyt-ink font-serif antialiased selection:bg-nyt-accentYellow selection:text-black">
      {/* Top Header & Broadsheet Nav */}
      <Header
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenTodaysPaper={() => setViewState({ type: 'todays_paper' })}
        onPlayHeadlinesAudio={handlePlayHeadlinesAudio}
        onOpenSearch={() => setIsSearchOpen(true)}
        onGoHome={() => {
          setActiveSection('All');
          setViewState({ type: 'frontpage' });
        }}
      />

      {/* Main Content Broadsheet Grid */}
      <main className="max-w-[1280px] mx-auto px-4 lg:px-8 pb-12">
        {/* Top Broadsheet Layout (3 Main Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-nyt pb-8">
          {/* Column 1: Lead Breaking Story (5 Columns) */}
          <LeadBreakingStory
            leadStory={leadStory}
            secondaryStory={secondaryLeadStory}
            onSelectArticle={handleSelectArticle}
            onPlayAudio={handlePlayStoryAudio}
          />

          {/* Column 2: Analytical Context & Photo Feature (4 Columns) */}
          <AnalysisColumn
            analysisStory={analysisStory}
            liveUpdateStory={liveUpdateStory}
            onSelectArticle={handleSelectArticle}
          />

          {/* Column 3: Right Sidebar / World Digest & The Athletic (3 Columns) */}
          <BriefAndSportsColumn
            briefArticles={briefArticles}
            sportsArticle={sportsArticle}
            onSelectArticle={handleSelectArticle}
          />
        </div>

        {/* Opinion Section (4 Columns) */}
        <OpinionSection
          opinionArticles={opinionArticles}
          onSelectArticle={handleSelectArticle}
        />

        {/* Feature & Culture Grid (The Great Read, Games, NYT Cooking) */}
        <FeatureAndCultureGrid
          greatReadArticle={greatReadArticle}
          recipe={RECIPE_DATA}
          onSelectArticle={handleSelectArticle}
          onOpenRecipe={() => setViewState({ type: 'recipe', recipeId: RECIPE_DATA.id })}
          onOpenWordle={() => setViewState({ type: 'wordle' })}
          onOpenConnections={() => setViewState({ type: 'connections' })}
          onOpenMiniCrossword={() => setViewState({ type: 'mini_crossword' })}
        />
      </main>

      {/* Broadsheet Site Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onGoHome={() => {
          setActiveSection('All');
          setViewState({ type: 'frontpage' });
        }}
      />

      {/* Persistent Audio Dock */}
      <AudioPlayerBar
        currentTrack={currentAudioTrack}
        onClose={() => setCurrentAudioTrack(null)}
      />

      {/* Modals */}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
