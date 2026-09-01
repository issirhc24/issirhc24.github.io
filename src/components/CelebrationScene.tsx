import React, { useEffect } from 'react';
import megaGardevoirImg from '../assets/mega-gardevoir.webp';
import gengarImg from '../assets/gengar.webp';
import pichuImg from '../assets/pichu.webp';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, FileText } from 'lucide-react';

interface CelebrationSceneProps {
  onRestart: () => void;
  onReadLetter: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function CelebrationScene({
  onRestart,
  onReadLetter,
}: CelebrationSceneProps) {
  // Trigger celebration confetti cannon on mount & play celebration tune
  useEffect(() => {
    // Blast 3 staggered celebratory confetti bursts
    const blast1 = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#38bdf8', '#a855f7'],
      });
    }, 200);

    const blast2 = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#38bdf8', '#a855f7'],
      });
    }, 600);

    const blast3 = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff', '#a855f7'],
      });
    }, 1100);

    // Auto-play sweet birthday music
    sound.playCelebrationMusic();

    return () => {
      clearTimeout(blast1);
      clearTimeout(blast2);
      clearTimeout(blast3);
    };
  }, []);

  const handlePlayMusic = () => {
    sound.playCelebrationMusic();
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-between py-6 sm:py-10 px-3 sm:px-6 w-full max-w-5xl mx-auto z-10">
      
      {/* TOP BANNER / HEADLINES */}
      <header className="text-center w-full flex flex-col items-center select-none">
        {/* REQUESTED TITLE: " HAPPY BIRTHDAY!" */}
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 drop-shadow-sm leading-tight max-w-3xl">
          <br className="hidden sm:inline" />  HAPPY BIRTHDAY!
        </h1>

        {/* SUBHEADING: "Happy Birthday! ❤️" */}
        <p className="font-display font-bold text-2xl sm:text-3xl text-pink-600 mt-2 flex items-center justify-center gap-2">
          <span>Happy Birthday!</span>
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 inline-block animate-bounce" />
        </p>
      </header>

      {/* CENTER STAGE: MEGA GARDEVOIR & COMPANIONS */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 relative w-full">
        
        {/* Radial magic aura behind Mega Gardevoir */}
        <div className="absolute w-80 sm:w-[460px] h-80 sm:h-[460px] rounded-full bg-gradient-to-tr from-pink-300/30 via-purple-300/30 to-amber-200/30 blur-3xl -z-10 animate-aura-spin" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 w-full max-w-3xl">
          
          {/* Pichu Cheering with Party Vibes (Left) */}
          <div className="hidden sm:flex flex-col items-center select-none animate-float-gentle">
            <div className="relative group">
              <img
                src={pichuImg}
                alt="Pichu celebrating"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-xl"
              />
              <span className="absolute -top-3 -right-2 text-2xl">👑</span>
            </div>
          </div>

          {/* CENTER: MEGA GARDEVOIR SHOWCASE */}
          <div className="relative group select-none flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-float-bob">
              <img
                src={megaGardevoirImg}
                alt="Mega Gardevoir Birthday Star"
                className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(244,114,182,0.7)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Gengar Celebrating (Right) */}
          <div className="hidden sm:flex flex-col items-center select-none animate-float-bob">
            <div className="relative group">
              <img
                src={gengarImg}
                alt="Gengar enjoying"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-xl"
              />
              <span className="absolute -top-3 -left-2 text-2xl">🎈</span>
            </div>
          </div>

        </div>

        {/* MOBILE COMPANIONS ROW */}
        <div className="flex sm:hidden items-center justify-around w-full mt-4 select-none">
          <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-amber-100 shadow-xs">
            <img src={pichuImg} alt="Pichu" className="w-8 h-8 object-contain" />
            <span className="text-[11px] font-bold text-amber-800">Pichu🎉</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full border border-purple-100 shadow-xs">
            <img src={gengarImg} alt="Gengar" className="w-8 h-8 object-contain" />
            <span className="text-[11px] font-bold text-purple-800">Gengar 🍔</span>
          </div>
        </div>

        {/* INTERACTIVE ACTION BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 select-none">
          
          {/* Play Birthday Melody */}
          <button
            id="play-melody-button"
            onClick={handlePlayMusic}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-display font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-amber-500/20"
          >
            <span>🎵 Replay Melody</span>
          </button>

          {/* Re-read Letter */}
          <button
            id="reread-letter-button"
            onClick={onReadLetter}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-pink-700 font-display font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Re-read Letter</span>
          </button>
        </div>

      </main>

      {/* BOTTOM UTILITY FOOTER */}
      <footer className="w-full flex items-center justify-center px-2 sm:px-6 pt-3 border-t border-pink-200/50 select-none">
        
        {/* Restart from Poké Ball */}
        <button
          id="restart-surprise-button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay from Start</span>
        </button>

      </footer>
    </div>
  );
}
