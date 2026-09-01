import React, { useState, useEffect } from 'react';
import PokeBallVisual from './PokeBallVisual';
import { sound } from '../utils/audio';
import gardevoirImg from '../assets/gardevoir.webp';
import pichuImg from '../assets/pichu.webp';
import gengarImg from '../assets/gengar.webp';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crosshair, ArrowRight, Star } from 'lucide-react';

interface CatchMinigameProps {
  onComplete: () => void;
}

type CatchPhase = 
  | 'encounter' 
  | 'throwing' 
  | 'absorbing' 
  | 'ground_drop' 
  | 'wobble_1' 
  | 'pause_1' 
  | 'wobble_2' 
  | 'pause_2' 
  | 'wobble_3' 
  | 'clicking' 
  | 'caught';

export default function CatchMinigame({ onComplete }: CatchMinigameProps) {
  const [phase, setPhase] = useState<CatchPhase>('encounter');

  // Play a soft encounter chime on mount
  useEffect(() => {
    sound.playSparkle();
  }, []);

  const handleCatch = () => {
    if (phase !== 'encounter') return;
    
    // 1. Throw Pokéball
    setPhase('throwing');
    sound.playThrow();

    // 2. Absorb Pokémon after ball reaches target (~650ms)
    setTimeout(() => {
      setPhase('absorbing');
      sound.playPokeballOpen();

      // 3. Drop to ground after absorption (~850ms)
      setTimeout(() => {
        setPhase('ground_drop');

        // 4. First Wobble (~600ms after drop)
        setTimeout(() => {
          setPhase('wobble_1');
          sound.playWobble(1);

          // Pause after wobble 1
          setTimeout(() => {
            setPhase('pause_1');

            // 5. Second Wobble
            setTimeout(() => {
              setPhase('wobble_2');
              sound.playWobble(1.15);

              // Pause after wobble 2
              setTimeout(() => {
                setPhase('pause_2');

                // 6. Third Wobble
                setTimeout(() => {
                  setPhase('wobble_3');
                  sound.playWobble(1.3);

                  // 7. The Click & Catch Victory!
                  setTimeout(() => {
                    setPhase('clicking');
                    sound.playCatchClick();

                    setTimeout(() => {
                      setPhase('caught');
                      sound.playCatchFanfare();

                      // Confetti blast
                      confetti({
                        particleCount: 80,
                        spread: 80,
                        origin: { y: 0.5 },
                        colors: ['#f472b6', '#fb7185', '#ec4899', '#fde047', '#a855f7', '#38bdf8'],
                        disableForReducedMotion: true,
                      });

                      // Auto-transition to letter after celebration
                      setTimeout(() => {
                        onComplete();
                      }, 1800);
                    }, 180);
                  }, 650);
                }, 350);
              }, 600);
            }, 350);
          }, 600);
        }, 550);
      }, 850);
    }, 650);
  };

  const isWobbling = phase === 'wobble_1' || phase === 'wobble_2' || phase === 'wobble_3';

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-between py-6 sm:py-8 px-4 w-full max-w-4xl mx-auto z-10 select-none">
      
      {/* HEADER / STATUS */}
      <header className="text-center w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs sm:text-sm font-bold tracking-wider mb-2 shadow-xs backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span>
            {phase === 'caught' || phase === 'clicking'
              ? 'POKÉMON CAUGHT!'
              : phase === 'wobble_1' || phase === 'pause_1'
              ? 'SHAKE... (1/3)'
              : phase === 'wobble_2' || phase === 'pause_2'
              ? 'SHAKE... (2/3)'
              : phase === 'wobble_3'
              ? 'SHAKE... (3/3)'
              : phase === 'absorbing' || phase === 'ground_drop' || phase === 'throwing'
              ? 'CATCHING...'
              : 'WILD POKÉMON ENCOUNTER'}
          </span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
        </div>

        <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-800 tracking-wide drop-shadow-xs">
          {phase === 'caught' || phase === 'clicking' ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
              Gotcha! Gardevoir was caught! ✨
            </span>
          ) : phase === 'throwing' || phase === 'absorbing' ? (
            <span className="text-pink-600">Go, Poké Ball! 🎯</span>
          ) : isWobbling || phase === 'pause_1' || phase === 'pause_2' || phase === 'ground_drop' ? (
            <span className="text-pink-600">Hold on... Wobbling... ✨</span>
          ) : (
            <span>Tap the Pokémon to Catch!</span>
          )}
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
          {phase === 'encounter' && 'Tap Gardevoir or the button below to throw your Poké Ball!'}
          {(isWobbling || phase === 'pause_1' || phase === 'pause_2' || phase === 'ground_drop') && 'Click click click... almost caught!'}
          {phase === 'caught' && 'Unlocking your special birthday letter... 💌'}
        </p>
      </header>

      {/* ARENA / CENTER STAGE */}
      <main className="flex-1 flex flex-col items-center justify-center my-4 relative w-full min-h-[320px] sm:min-h-[380px]">
        
        {/* Soft Arena Ground Aura */}
        <div className="absolute w-72 sm:w-96 h-40 sm:h-52 rounded-full bg-gradient-to-t from-pink-200/40 via-purple-100/30 to-transparent blur-xl bottom-4 -z-10" />

        {/* 1. ENCOUNTER & ABSORBING: WILD GARDEVOIR */}
        {(phase === 'encounter' || phase === 'throwing' || phase === 'absorbing') && (
          <div
            id="pokemon-catch-target"
            onClick={handleCatch}
            className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${
              phase === 'encounter' ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
            }`}
            role="button"
            tabIndex={0}
            aria-label="Wild Gardevoir. Tap to catch."
            onKeyDown={(e) => e.key === 'Enter' && handleCatch()}
          >
            {/* Capture Target Reticle (during encounter) */}
            {phase === 'encounter' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -top-4">
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border-2 border-dashed border-pink-400/60 animate-spin-slow flex items-center justify-center">
                  <Crosshair className="w-8 h-8 text-pink-500/70 animate-pulse" />
                </div>
              </div>
            )}

            {/* Pokémon Artwork */}
            <div className={`relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center ${
              phase === 'absorbing' ? 'animate-pokemon-absorb' : ''
            }`}>
              <img
                src={gardevoirImg}
                alt="Wild Gardevoir"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(244,114,182,0.4)] animate-gentle-bounce"
              />
            </div>

            {/* Tap prompt badge */}
            {phase === 'encounter' && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-pink-300 shadow-md text-pink-700 text-xs font-bold animate-bounce">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                <span>TAP TO CATCH</span>
              </div>
            )}
          </div>
        )}

        {/* 2. THROWING ANIMATION (Flying Poké Ball Arc) */}
        {phase === 'throwing' && (
          <div className="absolute left-1/2 bottom-12 pointer-events-none z-30 animate-poke-throw">
            <PokeBallVisual size={75} isShaking={false} glowIntensity={1.3} />
          </div>
        )}

        {/* 3. ABSORPTION BEAM FLASH */}
        {phase === 'absorbing' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-40 h-40 rounded-full bg-radial from-red-500/80 via-pink-400/50 to-transparent blur-md animate-ping" />
            <div className="absolute top-1/2 -translate-y-8">
              <PokeBallVisual size={90} isOpen={true} openProgress={0.8} glowIntensity={2.5} />
            </div>
          </div>
        )}

        {/* 4. GROUND DROP & 3 WOBBLES & CLICK / CAUGHT */}
        {(phase === 'ground_drop' ||
          phase === 'wobble_1' ||
          phase === 'pause_1' ||
          phase === 'wobble_2' ||
          phase === 'pause_2' ||
          phase === 'wobble_3' ||
          phase === 'clicking' ||
          phase === 'caught') && (
          <div className="flex flex-col items-center justify-center relative">
            {/* Ambient Aura */}
            <div className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-pink-300/40 via-amber-200/40 to-purple-300/40 blur-2xl -z-10" />

            {/* Pokéball Container with specific wobble animations */}
            <div
              className={`relative p-4 transition-transform ${
                phase === 'ground_drop'
                  ? 'animate-poke-drop'
                  : phase === 'wobble_1'
                  ? 'animate-poke-wobble-left'
                  : phase === 'wobble_2'
                  ? 'animate-poke-wobble-right'
                  : phase === 'wobble_3'
                  ? 'animate-poke-wobble-left'
                  : ''
              }`}
            >
              <PokeBallVisual
                size={window.innerWidth < 640 ? 160 : 190}
                isShaking={false}
                glowIntensity={phase === 'caught' ? 2.2 : isWobbling ? 1.6 : 1}
              />

              {/* Red Button Flash when wobbling */}
              {isWobbling && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-red-500/70 animate-ping blur-2xs" />
                </div>
              )}

              {/* Click burst flash on caught */}
              {(phase === 'clicking' || phase === 'caught') && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Golden Star bursts */}
                  <div className="absolute -top-6 -left-6 text-amber-400 animate-catch-stars">
                    <Star className="w-8 h-8 fill-amber-400" />
                  </div>
                  <div className="absolute -top-8 text-yellow-300 animate-catch-stars delay-75">
                    <Sparkles className="w-9 h-9 fill-yellow-300" />
                  </div>
                  <div className="absolute -top-6 -right-6 text-amber-400 animate-catch-stars delay-150">
                    <Star className="w-8 h-8 fill-amber-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Click / Caught Badge */}
            {phase === 'caught' && (
              <div className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-display font-bold text-sm sm:text-base shadow-md shadow-emerald-500/30 animate-bounce">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Gotcha! Gardevoir was caught!</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER CONTROLS & COMPANIONS */}
      <footer className="w-full flex flex-col items-center gap-3">
        {/* Main Catch Action Button (if in encounter stage) */}
        {phase === 'encounter' ? (
          <div className="flex flex-col items-center">
            <button
              id="catch-pokemon-action-button"
              onClick={handleCatch}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-display font-bold text-base sm:text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span>THROW POKÉ BALL</span>
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        ) : phase === 'caught' ? (
          <button
            id="proceed-to-letter-button"
            onClick={onComplete}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-display font-bold text-sm sm:text-base shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Open Birthday Letter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}

        {/* Cheering Pokémon Companions */}
        <div className="flex items-center justify-between w-full px-2 sm:px-6 pt-2 pointer-events-none select-none">
          <div className="flex items-center gap-1.5 opacity-90">
            <img src={pichuImg} alt="Pichu" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="text-[11px] font-bold text-amber-700 hidden sm:inline">Pichu is cheering! ⚡</span>
          </div>

          <div className="flex items-center gap-1.5 opacity-90">
            <span className="text-[11px] font-bold text-purple-700 hidden sm:inline">Gengar is cheering! 👻</span>
            <img src={gengarImg} alt="Gengar" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
        </div>
      </footer>
    </div>
  );
}
