import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Volume2, X, FileText } from 'lucide-react';
import { Article } from '../types';

interface AudioPlayerBarProps {
  currentTrack: {
    title: string;
    narrator: string;
    durationSeconds: number;
    textToSpeak?: string;
  } | null;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ currentTrack, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize SpeechSynthesis if available
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Handle track changes
  useEffect(() => {
    if (!currentTrack) return;

    setCurrentTime(0);
    setIsPlaying(true);

    if (synthRef.current && currentTrack.textToSpeak) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(currentTrack.textToSpeak);
      utterance.rate = playbackRate;
      utterance.onend = () => {
        setIsPlaying(false);
      };
      utteranceRef.current = utterance;
      try {
        synthRef.current.speak(utterance);
      } catch {
        // Fallback silently if speech synthesis blocked by browser autoplay
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [currentTrack]);

  // Tick timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            setIsPlaying(false);
            return currentTrack.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack, playbackRate]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    if (isPlaying) {
      if (synthRef.current) synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current) {
        if (synthRef.current.paused) {
          synthRef.current.resume();
        } else if (currentTrack.textToSpeak && !utteranceRef.current) {
          const u = new SpeechSynthesisUtterance(currentTrack.textToSpeak);
          u.rate = playbackRate;
          synthRef.current.speak(u);
          utteranceRef.current = u;
        }
      }
      setIsPlaying(true);
    }
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((t) => Math.max(0, Math.min(currentTrack.durationSeconds, t + seconds)));
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(next);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / (currentTrack.durationSeconds || 1)) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212] text-white border-t border-gray-800 shadow-2xl font-sans">
      {/* Mini Progress Bar on top of dock */}
      <div className="w-full bg-gray-800 h-1 cursor-pointer">
        <div
          className="bg-white h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-3 max-w-[280px] sm:max-w-sm truncate">
          <div className="w-9 h-9 rounded bg-[#222] border border-gray-700 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4 text-gray-300" />
          </div>
          <div className="truncate">
            <h4 className="text-xs font-bold text-white truncate leading-tight">
              {currentTrack.title}
            </h4>
            <span className="text-[11px] text-gray-400 block truncate">
              {currentTrack.narrator}
            </span>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleSkip(-15)}
            className="text-gray-400 hover:text-white transition p-1"
            title="Rewind 15 seconds"
          >
            <Rewind className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition shadow"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => handleSkip(15)}
            className="text-gray-400 hover:text-white transition p-1"
            title="Fast forward 15 seconds"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(currentTrack.durationSeconds)}</span>
          </div>
        </div>

        {/* Right Tools & Close */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSpeed}
            className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300"
            title="Playback Speed"
          >
            {playbackRate}x
          </button>

          <button
            onClick={() => {
              if (synthRef.current) synthRef.current.cancel();
              onClose();
            }}
            className="text-gray-400 hover:text-white p-1"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
