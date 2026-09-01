import React, { useEffect, useState } from 'react';
import PokeBallVisual from './PokeBallVisual';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PokeBallOpeningProps {
  onComplete: () => void;
}

export default function PokeBallOpening({ onComplete }: PokeBallOpeningProps) {
  // Phase: 'shake' -> 'open' -> 'burst' -> 'fade'
  const [phase, setPhase] = useState<'shake' | 'open' | 'burst' | 'fade'>('shake');
  const [openProgress, setOpenProgress] = useState(0);

  useEffect(() => {
    // 1. Initial wobble sound
    sound.playWobble(1);

    const wobble2 = setTimeout(() => {
      sound.playWobble(1.2);
    }, 450);

    const wobble3 = setTimeout(() => {
      sound.playWobble(1.5);
    }, 900);

    // 2. Open phase at 1300ms
    const openTimer = setTimeout(() => {
      setPhase('open');
      sound.playPokeballOpen();

      // Animate open progress 0 to 1
      let start: number | null = null;
      const duration = 600;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(1, elapsed / duration);
        setOpenProgress(progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setPhase('burst');
          // Trigger particle burst
          confetti({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#f472b6', '#fb7185', '#ec4899', '#fde047', '#ffffff'],
            disableForReducedMotion: true,
          });
        }
      };
      requestAnimationFrame(step);
    }, 1300);

    // 3. Climax burst at 1900ms -> transitions to letter
    const burstTimer = setTimeout(() => {
      setPhase('fade');
    }, 2200);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(wobble2);
      clearTimeout(wobble3);
      clearTimeout(openTimer);
      clearTimeout(burstTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-900/30 backdrop-blur-xs select-none">
      {/* Dynamic Screen Flash / Burst Overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-tr from-white via-pink-100 to-white pointer-events-none transition-opacity duration-700 ${
          phase === 'burst'
            ? 'opacity-90'
            : phase === 'fade'
            ? 'opacity-100'
            : 'opacity-0'
        }`}
      />

      {/* Light Rays Bursting From Center */}
      {(phase === 'open' || phase === 'burst' || phase === 'fade') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-pink-300/60 via-amber-200/80 to-white blur-xl animate-aura-spin-fast scale-150" />
          <div className="absolute w-[600px] h-[600px] rounded-full border-4 border-white/80 animate-energy-ring-1" />
          <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-pink-400/80 animate-energy-ring-2" />
        </div>
      )}

      {/* The Central Opening Poké Ball */}
      <div className="relative z-10 flex flex-col items-center">
        <PokeBallVisual
          className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]"
          isShaking={phase === 'shake'}
          isOpen={phase === 'open' || phase === 'burst' || phase === 'fade'}
          openProgress={openProgress}
          glowIntensity={phase === 'open' || phase === 'burst' ? 2.5 : 1.5}
        />

        <div className="mt-8 text-center">
          <p className="font-display font-bold text-xl sm:text-2xl text-slate-800 tracking-wide drop-shadow-md animate-pulse">
            {phase === 'shake' && 'Catching your birthday magic... ✨'}
            {phase === 'open' && 'Opening your special surprise! 💖'}
            {(phase === 'burst' || phase === 'fade') && 'Unveiling your letter... 🌸'}
          </p>
        </div>
      </div>
    </div>
  );
}
