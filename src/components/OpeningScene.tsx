import React, { useState, useEffect } from 'react';
import PokeBallVisual from './PokeBallVisual';
import { sound } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface OpeningSceneProps {
  onStartOpening: () => void;
  isOpening: boolean;
}

export default function OpeningScene({ onStartOpening, isOpening }: OpeningSceneProps) {
  const [isIdleShaking, setIsIdleShaking] = useState(false);

  // Periodic tiny shake every 4.5 seconds for idle life
  useEffect(() => {
    if (isOpening) return;
    const interval = setInterval(() => {
      setIsIdleShaking(true);
      setTimeout(() => setIsIdleShaking(false), 900);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpening]);

  const handleClick = async () => {
    if (isOpening) return;
    try {
      await sound.unlock();
      await sound.playClick();
    } catch {
      // safe fallback
    }
    onStartOpening();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-between py-6 sm:py-10 px-4 w-full max-w-5xl mx-auto z-10">
      {/* TOP HEADER: Large Centered "HAPPY BIRTHDAY" */}
      <header className="text-center w-full flex flex-col items-center mt-2 sm:mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs sm:text-sm font-bold tracking-wider mb-2 shadow-xs backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span>LUDS</span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 drop-shadow-sm select-none">
          HAPPY BIRTHDAY
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-medium mt-1">
          A magical surprise is waiting inside the Poké Ball...
        </p>
      </header>

      {/* CENTER: LARGE POKÉ BALL & CLICK ME BUTTON */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 sm:my-8 relative w-full">
        {/* Glow halo behind Poké Ball */}
        <div className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gradient-to-tr from-pink-300/30 to-amber-200/30 blur-2xl -z-10 animate-pulse-glow" />

        {/* The Poké Ball */}
        <div 
          onClick={handleClick}
          className="cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-200 p-2"
          role="button"
          tabIndex={0}
          aria-label="Interactive Poké Ball. Click to open your birthday surprise."
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          <PokeBallVisual
            className="w-[190px] h-[190px] sm:w-[250px] sm:h-[250px]"
            isShaking={isIdleShaking}
            glowIntensity={1.2}
          />
        </div>

        {/* CLICK ME Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            id="open-pokeball-button"
            onClick={handleClick}
            disabled={isOpening}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-display font-bold text-lg sm:text-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>CLICK ME</span>
            <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>
          <span className="text-xs text-slate-600 mt-2 font-medium">
            Tap the button or the Poké Ball to open!
          </span>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full flex items-center justify-center px-4 py-2 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-pink-100 shadow-xs backdrop-blur-xs text-xs font-semibold text-pink-700/90">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Tap to begin the adventure!</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </footer>
    </div>
  );
}
