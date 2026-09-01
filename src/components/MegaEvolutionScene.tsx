import React, { useEffect, useState } from 'react';
import gardevoirImg from '../assets/gardevoir.webp';
import megaGardevoirImg from '../assets/mega-gardevoir.webp';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Zap } from 'lucide-react';

interface MegaEvolutionSceneProps {
  onEvolutionComplete: () => void;
}

export default function MegaEvolutionScene({ onEvolutionComplete }: MegaEvolutionSceneProps) {
  // Stages: 'ascend' -> 'energy_charge' -> 'flash_burst' -> 'mega_reveal'
  const [stage, setStage] = useState<'ascend' | 'energy_charge' | 'flash_burst' | 'mega_reveal'>('ascend');

  useEffect(() => {
    // 1. Start Mega Evolution sound
    sound.playMegaEvolution();

    // Stage 1: Ascending & energy gathering (0 - 1500ms)
    const chargeTimer = setTimeout(() => {
      setStage('energy_charge');
    }, 1200);

    // Stage 2: Supernova Flash Burst (2800ms)
    const flashTimer = setTimeout(() => {
      setStage('flash_burst');

      // Blast colorful mega confetti & sparkles
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#c084fc', '#67e8f9', '#ffffff', '#fbbf24', '#ec4899'],
        disableForReducedMotion: true,
      });
    }, 2800);

    // Stage 3: Mega Gardevoir revealed (3200ms)
    const revealTimer = setTimeout(() => {
      setStage('mega_reveal');
      sound.playSparkle();
    }, 3200);

    // Stage 4: Transition to Grand Celebration (5500ms)
    const finishTimer = setTimeout(() => {
      onEvolutionComplete();
    }, 5500);

    return () => {
      clearTimeout(chargeTimer);
      clearTimeout(flashTimer);
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
    };
  }, [onEvolutionComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/80 backdrop-blur-md select-none">
      
      {/* MAGICAL AMBIENT BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-purple-900/60 to-pink-950/80 pointer-events-none" />

      {/* SCREEN FLASH OVERLAY */}
      <div
        className={`fixed inset-0 bg-white pointer-events-none transition-opacity duration-500 z-40 ${
          stage === 'flash_burst' ? 'opacity-95' : 'opacity-0'
        }`}
      />

      {/* ROTATING ENERGY RINGS & DNA HELIX SYMBOL */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        
        {/* Outer Rotating Energy Ring */}
        <div className="w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full border-2 border-pink-400/50 border-dashed animate-aura-spin" />
        
        {/* Inner Counter-Rotating Energy Ring */}
        <div className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full border-2 border-cyan-300/60 border-dotted animate-aura-spin-reverse" />
        
        {/* Expanding Cosmic Waves */}
        {stage !== 'ascend' && (
          <>
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-400/20 blur-2xl animate-energy-ring-1" />
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-fuchsia-500/20 via-rose-500/20 to-amber-300/20 blur-2xl animate-energy-ring-2" />
          </>
        )}

        {/* MEGA EVOLUTION KEY STONE ICON */}
        <div className="absolute top-12 sm:top-16 flex flex-col items-center animate-bounce z-20">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-1 shadow-lg shadow-pink-500/50 flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Zap className="w-8 h-8 text-amber-300 fill-amber-300 animate-spin" />
            </div>
          </div>
          <span className="mt-2 text-xs sm:text-sm font-display font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-cyan-200 to-amber-200 uppercase drop-shadow-md">
            MEGA EVOLUTION ACTIVE
          </span>
        </div>
      </div>

      {/* CENTER TRANSFORMING POKÉMON STAGE */}
      <div className="relative z-20 flex flex-col items-center justify-center p-4">
        
        {/* Evolution Stage Title */}
        <div className="text-center mb-6">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-wider drop-shadow-lg flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-pink-400 animate-spin" />
            <span>
              {stage === 'ascend' && 'Gardevoir is resonating with your bond...'}
              {stage === 'energy_charge' && 'Mega Evolution in progress! ✨'}
              {stage === 'flash_burst' && 'MEGA TRANSFORMATION! 🌟'}
              {stage === 'mega_reveal' && 'MEGA GARDEVOIR AWAKENED! 💖'}
            </span>
            <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
          </h2>
        </div>

        {/* CHARACTER DISPLAY (Morphing from base Gardevoir to Mega Gardevoir with transparent backgrounds) */}
        <div className="relative w-64 h-64 sm:w-84 sm:h-84 flex items-center justify-center">
          
          {/* Base Gardevoir (Fading during charge/burst) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              stage === 'mega_reveal' ? 'opacity-0 scale-90 blur-md pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center animate-float-bob">
              <img
                src={gardevoirImg}
                alt="Gardevoir evolving"
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]"
              />
            </div>
          </div>

          {/* Mega Gardevoir (Ascending & Shining on reveal) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              stage === 'mega_reveal'
                ? 'opacity-100 scale-105 sm:scale-115'
                : 'opacity-0 scale-75 blur-lg pointer-events-none'
            }`}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-float-bob">
              <img
                src={megaGardevoirImg}
                alt="Mega Gardevoir in ballgown"
                className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(103,232,249,0.8)]"
              />
            </div>
          </div>

        </div>

        {/* Status Subtitle */}
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base font-medium text-pink-200/90 max-w-md px-4">
            {stage === 'mega_reveal'
              ? '✨ Mega Gardevoir brings happiness and best wishes for your special day! ✨'
              : 'Hold tight, the celebration is unlocking...'}
          </p>
        </div>

      </div>
    </div>
  );
}
