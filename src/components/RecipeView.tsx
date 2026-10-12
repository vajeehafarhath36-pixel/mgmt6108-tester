import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock, Users, Bookmark, Share2, Play, Pause, RotateCcw, Check } from 'lucide-react';
import { RECIPE_DATA } from '../data/nytData';

interface RecipeViewProps {
  onBack: () => void;
}

export const RecipeView: React.FC<RecipeViewProps> = ({ onBack }) => {
  const [servings, setServings] = useState(RECIPE_DATA.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Live Timer State
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleIngredient = (idx: number) => {
    if (checkedIngredients.includes(idx)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== idx));
    } else {
      setCheckedIngredients([...checkedIngredients, idx]);
    }
  };

  const startTimerForMinutes = (mins: number) => {
    setTimerSeconds(mins * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${hrs}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-serif">
      {/* Top Utility Nav */}
      <div className="flex items-center justify-between border-b border-nyt pb-4 mb-8 font-sans">
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
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#d9381e]">Cooking</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
              isSaved ? 'bg-black text-white border-black' : 'border-nyt hover:bg-gray-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Recipe Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 text-xs font-sans text-gray-500 uppercase tracking-widest">
          <span>Main Dishes</span>
          <span>•</span>
          <span>Beef & Braises</span>
          <span>•</span>
          <span>Winter Specials</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-tight text-nyt-ink">
          {RECIPE_DATA.title}
        </h1>

        <p className="text-lg text-gray-700 font-serif leading-relaxed">
          {RECIPE_DATA.deck}
        </p>

        <div className="flex flex-wrap items-center justify-between pt-2 border-b border-nyt pb-4 text-xs font-sans text-gray-700">
          <div>
            <span>Recipe by </span>
            <span className="font-bold text-black">{RECIPE_DATA.author}</span>
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center space-x-1 text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{RECIPE_DATA.rating}</span>
              <span className="text-gray-500">({RECIPE_DATA.ratingCount.toLocaleString()} ratings)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-8 overflow-hidden rounded-[2px] border border-nyt">
        <img
          src={RECIPE_DATA.imageUrl}
          alt={RECIPE_DATA.title}
          referrerPolicy="no-referrer"
          className="w-full h-80 sm:h-[460px] object-cover"
        />
        <div className="p-2.5 bg-gray-50 text-[11px] font-sans text-gray-600 flex justify-between">
          <span>Star anise and fresh citrus peel create a deeply aromatic sauce for fork-tender short ribs.</span>
          <span className="text-gray-400">Photo: Andrew Scrivani for The New York Times</span>
        </div>
      </div>

      {/* Recipe Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-nyt-lightGrayBg border border-nyt rounded-[2px] mb-8 font-sans text-xs">
        <div>
          <span className="text-gray-500 block">Prep Time</span>
          <span className="font-bold text-sm text-black">{RECIPE_DATA.prepTime}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Cook Time</span>
          <span className="font-bold text-sm text-black">{RECIPE_DATA.cookTime}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Total Time</span>
          <span className="font-bold text-sm text-black">{RECIPE_DATA.totalTime}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Yield</span>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <button
              onClick={() => setServings(Math.max(2, servings - 2))}
              className="w-5 h-5 bg-white border border-nyt flex items-center justify-center font-bold text-xs hover:bg-gray-100 rounded"
            >
              -
            </button>
            <span className="font-bold text-sm text-black">{servings} servings</span>
            <button
              onClick={() => setServings(servings + 2)}
              className="w-5 h-5 bg-white border border-nyt flex items-center justify-center font-bold text-xs hover:bg-gray-100 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Floating Kitchen Timer Widget if running */}
      {timerSeconds !== null && (
        <div className="sticky top-4 z-30 mb-8 bg-nyt-ink text-white p-4 rounded shadow-xl flex items-center justify-between font-sans">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-amber-400 animate-spin" />
            <div>
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Kitchen Timer</span>
              <span className="text-2xl font-mono font-bold">{formatTimer(timerSeconds)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setTimerSeconds(null);
                setIsTimerRunning(false);
              }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Recipe Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Ingredients Column */}
        <div className="md:col-span-5 font-sans">
          <h2 className="text-base font-bold uppercase tracking-wider text-black border-b border-nyt pb-2 mb-4">
            Ingredients ({servings} servings)
          </h2>
          <p className="text-xs text-gray-500 mb-3 italic">Check off ingredients as you prepare them:</p>

          <ul className="space-y-2.5 text-xs text-gray-800">
            {RECIPE_DATA.ingredients.map((ing, i) => {
              const isChecked = checkedIngredients.includes(i);
              return (
                <li
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`flex items-start space-x-2.5 p-2 rounded cursor-pointer transition-colors ${
                    isChecked ? 'bg-gray-100 text-gray-400 line-through' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 rounded text-nyt-blueBtn"
                  />
                  <div className="leading-snug">
                    <span className="font-bold mr-1">{ing.amount}</span>
                    <span>{ing.item}</span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-gray-50 border border-nyt rounded text-xs space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-black">Nutritional Summary</h3>
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div>
                <span className="text-gray-500 block">Calories</span>
                <span className="font-bold">{RECIPE_DATA.nutrition.calories}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Fat</span>
                <span className="font-bold">{RECIPE_DATA.nutrition.fat}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Protein</span>
                <span className="font-bold">{RECIPE_DATA.nutrition.protein}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Carbs</span>
                <span className="font-bold">{RECIPE_DATA.nutrition.carbs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Steps Column */}
        <div className="md:col-span-7">
          <h2 className="text-base font-sans font-bold uppercase tracking-wider text-black border-b border-nyt pb-2 mb-4">
            Preparation
          </h2>

          <div className="space-y-6">
            {RECIPE_DATA.instructions.map((step) => (
              <div
                key={step.step}
                className="space-y-2 pb-6 border-b border-nyt last:border-b-0"
              >
                <div className="flex items-center justify-between font-sans">
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                    Step {step.step}: {step.title}
                  </h3>
                  {step.timerMinutes && (
                    <button
                      onClick={() => startTimerForMinutes(step.timerMinutes!)}
                      className="flex items-center space-x-1 text-xs text-nyt-blueBtn hover:text-nyt-blueHover font-bold"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Start {step.timerMinutes}m timer</span>
                    </button>
                  )}
                </div>
                <p className="text-base text-gray-800 leading-relaxed font-serif">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-[#fdfaf2] border border-[#e6dece] rounded text-sm text-[#4a3f2c]">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#7a5a22] mb-1">
              Cook’s Note
            </h4>
            <p className="leading-relaxed font-serif italic">{RECIPE_DATA.chefsNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
