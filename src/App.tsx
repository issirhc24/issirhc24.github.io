import React, { useState } from 'react';
import { AppScene } from './types';
import BackgroundParticles from './components/BackgroundParticles';
import OpeningScene from './components/OpeningScene';
import PokeBallOpening from './components/PokeBallOpening';
import LetterScene from './components/LetterScene';
import MegaEvolutionScene from './components/MegaEvolutionScene';
import CelebrationScene from './components/CelebrationScene';
import { sound } from './utils/audio';

export default function App() {
  const [scene, setScene] = useState<AppScene>('opening');
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleStartOpening = () => {
    setScene('pokeball_opening');
  };

  const handleOpeningFinished = () => {
    setScene('letter');
  };

  const handleSurpriseClick = () => {
    setScene('mega_evolution');
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
        {/* 1. OPENING SCENE (Inspired by sa.png) */}
        {scene === 'opening' && (
          <OpeningScene
            onStartOpening={handleStartOpening}
            isOpening={false}
          />
        )}

        {/* 2. POKÉ BALL OPENING SEQUENCE */}
        {scene === 'pokeball_opening' && (
          <PokeBallOpening onComplete={handleOpeningFinished} />
        )}

        {/* 3. BIRTHDAY LETTER SCENE (Inspired by 2.png) */}
        {scene === 'letter' && (
          <LetterScene onSurpriseClick={handleSurpriseClick} />
        )}

        {/* 4. MEGA EVOLUTION SEQUENCE */}
        {scene === 'mega_evolution' && (
          <MegaEvolutionScene onEvolutionComplete={handleEvolutionComplete} />
        )}

        {/* 5. GRAND BIRTHDAY CELEBRATION */}
        {scene === 'celebration' && (
          <CelebrationScene
            onRestart={handleRestart}
            onReadLetter={handleReadLetterAgain}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}
      </div>
    </div>
  );
}
