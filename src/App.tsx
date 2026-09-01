import React, { useState, Suspense, lazy } from 'react';
import { AppScene } from './types';
import BackgroundParticles from './components/BackgroundParticles';
import OpeningScene from './components/OpeningScene';
import { sound } from './utils/audio';

// Lazy load subsequent scenes to optimize initial load speed
const CatchMinigame = lazy(() => import('./components/CatchMinigame'));
const PokeBallOpening = lazy(() => import('./components/PokeBallOpening'));
const LetterScene = lazy(() => import('./components/LetterScene'));
const MegaEvolutionScene = lazy(() => import('./components/MegaEvolutionScene'));
const CelebrationScene = lazy(() => import('./components/CelebrationScene'));

export default function App() {
  const [scene, setScene] = useState<AppScene>('opening');
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleStartOpening = () => {
    setScene('catch_minigame');
  };

  const handleCatchComplete = () => {
    setScene('pokeball_opening');
  };

  const handleOpeningFinished = () => {
    setScene('letter');
    // Preload Mega Evolution in the background while user reads letter
    import('./components/MegaEvolutionScene');
  };

  const handleSurpriseClick = () => {
    setScene('mega_evolution');
    // Preload Celebration scene in background while Mega Evolution plays
    import('./components/CelebrationScene');
  };

  const handleEvolutionComplete = () => {
    setScene('celebration');
  };

  const handleRestart = () => {
    sound.playClick();
    setScene('opening');
  };

  const handleReadLetterAgain = () => {
    sound.playClick();
    setScene('letter');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#fdf7f9]">
      {/* AMBIENT BACKGROUND PARTICLES & GLOWS */}
      <BackgroundParticles />

      {/* SCENE RENDERING PIPELINE */}
      <div className="w-full relative z-10">
        <Suspense fallback={<div className="min-h-[90vh] w-full" />}>
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
