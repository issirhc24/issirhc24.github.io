import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AppScene } from './types';
import BackgroundParticles from './components/BackgroundParticles';
import OpeningScene from './components/OpeningScene';

// Reusable lazy-load functions for scenes
const loadCatchMinigame = () => import('./components/CatchMinigame');
const loadPokeBallOpening = () => import('./components/PokeBallOpening');
const loadLetterScene = () => import('./components/LetterScene');
const loadMegaEvolutionScene = () => import('./components/MegaEvolutionScene');
const loadCelebrationScene = () => import('./components/CelebrationScene');

// Lazy-loaded components using reusable loader functions
const CatchMinigame = lazy(loadCatchMinigame);
const PokeBallOpening = lazy(loadPokeBallOpening);
const LetterScene = lazy(loadLetterScene);
const MegaEvolutionScene = lazy(loadMegaEvolutionScene);
const CelebrationScene = lazy(loadCelebrationScene);

// Aesthetic Suspense fallback matching the birthday theme
function SceneSuspenseFallback() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 animate-spin blur-xs opacity-75" />
        <div className="absolute w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-pink-100">
          <span className="text-xl animate-bounce">✨</span>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-pink-200/80 shadow-xs backdrop-blur-xs">
        <span className="text-pink-600 font-bold text-sm sm:text-base tracking-wide animate-pulse">
          ✨ Preparing your surprise...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [scene, setScene] = useState<AppScene>('opening');
  const [isMuted, setIsMuted] = useState(false);

  // Progressive background prefetching for upcoming scene chunks (NOT on opening)
  useEffect(() => {
    if (scene === 'catch_minigame') {
      loadPokeBallOpening();
    } else if (scene === 'pokeball_opening') {
      loadLetterScene();
    } else if (scene === 'letter') {
      // Prefetch MegaEvolutionScene and CelebrationScene in background while reading letter
      loadMegaEvolutionScene();
      loadCelebrationScene();
    } else if (scene === 'mega_evolution') {
      loadCelebrationScene();
    }
  }, [scene]);

  const handleToggleMute = async () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      const { sound } = await import('./utils/audio');
      sound.setMuted(nextMuted);
    } catch {
      // safe fallback
    }
  };

  const handleStartOpening = () => {
    loadCatchMinigame();
    setScene('catch_minigame');
  };

  const handleCatchComplete = () => {
    setScene('pokeball_opening');
  };

  const handleOpeningFinished = () => {
    setScene('letter');
  };

  const handleSurpriseClick = async () => {
    try {
      const { sound } = await import('./utils/audio');
      await sound.playClick();
      // Ensure MegaEvolutionScene is ready before transition
      await loadMegaEvolutionScene();
    } catch {
      // safe fallback
    }
    setScene('mega_evolution');
  };

  const handleEvolutionComplete = () => {
    setScene('celebration');
  };

  const handleRestart = async () => {
    try {
      const { sound } = await import('./utils/audio');
      sound.playClick();
    } catch {
      // safe fallback
    }
    setScene('opening');
  };

  const handleReadLetterAgain = async () => {
    try {
      const { sound } = await import('./utils/audio');
      sound.playClick();
    } catch {
      // safe fallback
    }
    setScene('letter');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#fdf7f9]">
      {/* AMBIENT BACKGROUND PARTICLES & GLOWS (only after leaving opening screen) */}
      {scene !== 'opening' && <BackgroundParticles />}

      {/* SCENE RENDERING PIPELINE */}
      <div className="w-full relative z-10">
        <Suspense fallback={<SceneSuspenseFallback />}>
          {/* 1. OPENING SCENE */}
          {scene === 'opening' && (
            <OpeningScene
              onStartOpening={handleStartOpening}
              isOpening={false}
            />
          )}

          {/* 2. CATCH MINIGAME (Tap to catch before opening) */}
          {scene === 'catch_minigame' && (
            <CatchMinigame onComplete={handleCatchComplete} />
          )}

          {/* 3. POKÉ BALL OPENING SEQUENCE */}
          {scene === 'pokeball_opening' && (
            <PokeBallOpening onComplete={handleOpeningFinished} />
          )}

          {/* 4. BIRTHDAY LETTER SCENE */}
          {scene === 'letter' && (
            <LetterScene onSurpriseClick={handleSurpriseClick} />
          )}

          {/* 5. MEGA EVOLUTION SEQUENCE */}
          {scene === 'mega_evolution' && (
            <MegaEvolutionScene onEvolutionComplete={handleEvolutionComplete} />
          )}

          {/* 6. GRAND BIRTHDAY CELEBRATION */}
          {scene === 'celebration' && (
            <CelebrationScene
              onRestart={handleRestart}
              onReadLetter={handleReadLetterAgain}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
