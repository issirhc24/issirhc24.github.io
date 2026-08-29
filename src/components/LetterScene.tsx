import React, { useState, useEffect, useRef } from 'react';
import gardevoirImg from '../assets/gardevoir.png';
import gengarImg from '../assets/gengar.png';
import pichuImg from '../assets/pichu.png';
import { sound } from '../utils/audio';
import { Sparkles, Heart, FastForward } from 'lucide-react';

interface LetterSceneProps {
  onSurpriseClick: () => void;
}

const FULL_LETTER_TEXT = `Hey luds! I don't normally write like this out of character Kase, but I just wanna say, everytime na nag nonotif pangalan mo saken, I automatically smile. btw di ko need Ng RS, syempre mga Bata patayo, focus muna Tayo sa pag papayaman, unless icrushback moko 🤣. and if dimo me trip, ok lang Kase I just want you to be happy. chinachat lang kita Kase I enjoy talking to you, kaya sana wag Kang maging awkward sa mga chat ko kahit Ang kulit ko 🤣. and if nakukulitan kana, Sabihin molang 🤣. Pag na iinsecure ka sa Sarili mo, tandaan mo, maganda ka! Maganda, mabait, caring, kaya nga naging crush kita simula Nung g11 palang Tayo eh. Yun lang, cringe ko noh? 🤣 Happy birthday and enjoy your day!!`;

export default function LetterScene({ onSurpriseClick }: LetterSceneProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isBlinkingEye, setIsBlinkingEye] = useState(false);
  const [typingSpeed] = useState<number>(26); // ms per char
  const textEndRef = useRef<HTMLDivElement>(null);

  // Gardevoir cute blink interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinkingEye(true);
      setTimeout(() => setIsBlinkingEye(false), 200);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < FULL_LETTER_TEXT.length) {
        setDisplayedText(FULL_LETTER_TEXT.slice(0, currentIndex + 1));
        
        // Play soft typewriter sound on alphanumeric characters occasionally
        if (currentIndex % 3 === 0) {
          sound.playTypewriterTap();
        }
        
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        sound.playSparkle();
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [typingSpeed]);

  const handleSkipTyping = () => {
    setDisplayedText(FULL_LETTER_TEXT);
    setIsTypingComplete(true);
    sound.playSparkle();
  };

  const handleSurpriseClick = () => {
    sound.playClick();
    onSurpriseClick();
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center py-8 px-3 sm:px-6 w-full max-w-4xl mx-auto z-10">
      {/* BACKGROUND FLOATING DECORATIONS */}
      <div className="absolute top-2 left-4 text-pink-400/60 animate-float-gentle text-xl select-none">
        🌸 ✨
      </div>
      <div className="absolute top-8 right-6 text-amber-400/60 animate-float-bob text-xl select-none">
        ⭐ 💖
      </div>

      {/* THE MAIN LETTER CARD CONTAINER WITH PEEKING GARDEVOIR */}
      <div className="relative w-full max-w-2xl flex flex-col items-center mt-12 sm:mt-16">
        
        {/* PEEKING GARDEVOIR (Sitting/peeking directly behind top edge of letter as in 2.png - transparent background) */}
        <div 
          className="relative -mb-8 sm:-mb-12 z-0 transition-transform duration-300 pointer-events-none select-none animate-float-bob"
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Gardevoir Image with transparent background peeking over top edge */}
          <div className="relative w-48 sm:w-60 h-44 sm:h-52 flex items-start justify-center overflow-hidden">
            <img
              src={gardevoirImg}
              alt="Gardevoir smiling warmly"
              className={`w-full h-auto max-h-none object-contain object-top drop-shadow-md transition-all duration-300 ${
                isBlinkingEye ? 'brightness-110 scale-[1.02]' : 'scale-100'
              }`}
            />
          </div>
        </div>

        {/* PHYSICAL LETTER CARD (Sits in FRONT of Gardevoir's body) */}
        <div className="relative z-10 w-full paper-texture rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-[#eeddc7] text-slate-800 transition-all duration-300">
          
          {/* Cute Washi Tape at Top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/80 border border-pink-300/80 rounded-sm shadow-xs rotate-[-1deg] flex items-center justify-center select-none backdrop-blur-xs">
            <span className="text-[10px] font-bold tracking-widest text-pink-700 uppercase">
              BIRTHDAY LETTER
            </span>
          </div>

          {/* Letter Stamp at Top-Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-14 sm:w-14 sm:h-16 border-2 border-dashed border-pink-300 rounded-md bg-pink-50/70 p-1 flex flex-col items-center justify-center shadow-xs select-none rotate-3">
            <span className="text-lg sm:text-xl">🎂</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-pink-600 tracking-tighter uppercase mt-0.5">
              POKÉ-POST
            </span>
          </div>

          {/* Letter Header */}
          <div className="border-b border-amber-200/60 pb-3 mb-4 flex items-center justify-between pr-14 sm:pr-18">
            <div className="flex items-center gap-2">
              <span className="text-xl">💌</span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-800 tracking-wide">
                Special Birthday Letter
              </h2>
            </div>
            {/* Skip Typing / Speed Button */}
            {!isTypingComplete && (
              <button
                id="skip-typing-button"
                onClick={handleSkipTyping}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100/80 hover:bg-amber-200/80 text-amber-800 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                title="Reveal all text immediately"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Skip</span>
              </button>
            )}
          </div>

          {/* LETTER BODY: HANDWRITTEN TYPEWRITER TEXT */}
          <div className="min-h-[190px] sm:min-h-[220px] relative">
            <p className="font-handwriting text-xl sm:text-2xl sm:leading-relaxed text-slate-800 tracking-wide whitespace-pre-line select-text">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-1.5 h-6 bg-pink-600 ml-1 translate-y-1 animate-cursor-blink" />
              )}
            </p>
            <div ref={textEndRef} />
          </div>

          {/* LETTER FOOTER WITH POKÉMON SIGNATURE & SURPRISE BUTTON */}
          <div className="mt-6 pt-4 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Cute handwritten signature */}
            <div className="flex items-center gap-2 text-slate-500 font-handwriting text-lg select-none">
              <span>Always cheering for you,</span>
              <span className="font-bold text-pink-600 font-handwriting text-xl">✨ With Best Wishes ✨</span>
            </div>

            {/* SURPRISE BUTTON (Reveals once typing is completed) */}
            <div className="w-full sm:w-auto flex justify-center">
              {isTypingComplete ? (
                <button
                  id="surprise-button"
                  onClick={handleSurpriseClick}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-display font-bold text-base sm:text-lg shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-glow"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>CLICK FOR YOUR SURPRISE</span>
                  <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-amber-50/80 px-3.5 py-2 rounded-full border border-amber-200/60">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Typing birthday letter...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDE DECORATIVE POKÉMON CHARACTERS (Gengar & Pichu) - Transparent Cutouts */}
        
        {/* Gengar with burger at top-right side */}
        <div className="absolute -right-4 sm:-right-16 top-16 sm:top-24 hidden md:flex flex-col items-center select-none pointer-events-auto transition-transform hover:scale-105 animate-float-gentle">
          <img
            src={gengarImg}
            alt="Gengar enjoying burger"
            className="w-20 h-20 sm:w-26 sm:h-26 object-contain drop-shadow-lg"
          />
        </div>

        {/* Pichu at bottom-left side */}
        <div className="absolute -left-4 sm:-left-16 bottom-6 hidden md:flex flex-col items-center select-none pointer-events-auto transition-transform hover:scale-105 animate-float-bob">
          <img
            src={pichuImg}
            alt="Cute Pichu"
            className="w-20 h-20 sm:w-26 sm:h-26 object-contain drop-shadow-lg"
          />
        </div>

      </div>

      {/* MOBILE COMPANION ROW (For phones where side absolute is hidden) */}
      <div className="flex md:hidden items-center justify-around w-full mt-6 select-none">
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-amber-100 shadow-xs">
          <img src={pichuImg} alt="Pichu" className="w-9 h-9 object-contain" />
          <span className="text-xs font-bold text-amber-800">Pikachu 🎉</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-purple-100 shadow-xs">
          <img src={gengarImg} alt="Gengar" className="w-9 h-9 object-contain" />
          <span className="text-xs font-bold text-purple-800">Gengar 🍔</span>
        </div>
      </div>
    </div>
  );
}
