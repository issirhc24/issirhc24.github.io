interface PokeBallVisualProps {
  size?: number;
  isOpen?: boolean;
  openProgress?: number; // 0 to 1
  isShaking?: boolean;
  glowIntensity?: number;
}

export default function PokeBallVisual({
  size = 220,
  isOpen = false,
  openProgress = 0,
  isShaking = false,
  glowIntensity = 1,
}: PokeBallVisualProps) {
  const topTranslateY = isOpen ? -openProgress * 80 : 0;
  const bottomTranslateY = isOpen ? openProgress * 70 : 0;
  const topRotate = isOpen ? -openProgress * 18 : 0;
  const bottomRotate = isOpen ? openProgress * 12 : 0;

  return (
    <div
      className={`relative select-none flex items-center justify-center transition-transform ${
        isShaking ? 'animate-poke-shake-violent' : 'animate-float-bob'
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: `drop-shadow(0 15px 30px rgba(244, 63, 94, ${0.25 * glowIntensity})) drop-shadow(0 0 ${20 * glowIntensity}px rgba(251, 113, 133, ${0.4 * glowIntensity}))`,
      }}
    >
      {/* Radiant inner light core when opening */}
      {isOpen && (
        <div
          className="absolute z-10 rounded-full pointer-events-none transition-all duration-300"
          style={{
            width: `${size * 0.8}px`,
            height: `${size * 0.8}px`,
            background: 'radial-gradient(circle, #ffffff 0%, #fbcfe8 45%, #ec4899 75%, transparent 100%)',
            transform: `scale(${1 + openProgress * 1.8})`,
            opacity: Math.min(1, openProgress * 1.5),
            filter: `blur(${4 + openProgress * 8}px)`,
          }}
        />
      )}

      {/* SVG Poké Ball for crisp render */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Top Red Gradient */}
          <radialGradient id="topRedGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff7688" />
            <stop offset="45%" stopColor="#ee2b47" />
            <stop offset="100%" stopColor="#c51631" />
          </radialGradient>

          {/* Bottom White Gradient */}
          <radialGradient id="bottomWhiteGrad" cx="35%" cy="65%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#d1d5db" />
          </radialGradient>

          {/* Specular highlight */}
          <linearGradient id="specularGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Inner Button Glow */}
          <radialGradient id="btnGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#38bdf8" />
          </radialGradient>
        </defs>

        {/* Outer Shadow on Ground */}
        <ellipse
          cx="100"
          cy="195"
          rx="75"
          ry="10"
          fill="rgba(0,0,0,0.15)"
          className="transition-opacity duration-300"
          style={{ opacity: isOpen ? 0.3 : 0.7 }}
        />

        {/* TOP HEMISPHERE */}
        <g
          style={{
            transform: `translateY(${topTranslateY}px) rotate(${topRotate}deg)`,
            transformOrigin: '100px 100px',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Red Dome */}
          <path
            d="M 12,100 A 88,88 0 0,1 188,100 Z"
            fill="url(#topRedGrad)"
            stroke="#1e293b"
            strokeWidth="7"
          />

          {/* Glossy top highlight curve */}
          <path
            d="M 30,85 A 72,72 0 0,1 170,85 A 65,45 0 0,0 30,85 Z"
            fill="url(#specularGrad)"
            opacity="0.45"
          />

          {/* Small shiny dot */}
          <circle cx="55" cy="45" r="9" fill="#ffffff" opacity="0.6" />
        </g>

        {/* BOTTOM HEMISPHERE */}
        <g
          style={{
            transform: `translateY(${bottomTranslateY}px) rotate(${bottomRotate}deg)`,
            transformOrigin: '100px 100px',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* White Dome */}
          <path
            d="M 12,100 A 88,88 0 0,0 188,100 Z"
            fill="url(#bottomWhiteGrad)"
            stroke="#1e293b"
            strokeWidth="7"
          />

          {/* Bottom shadow curve */}
          <path
            d="M 28,115 A 75,75 0 0,0 172,115 A 78,85 0 0,1 28,115 Z"
            fill="#9ca3af"
            opacity="0.25"
          />
        </g>

        {/* CENTER BLACK BAND (split when opening) */}
        {!isOpen && (
          <path
            d="M 12,96 L 188,96 L 188,104 L 12,104 Z"
            fill="#1e293b"
          />
        )}

        {/* CENTER RELEASE BUTTON */}
        <g
          style={{
            transform: `translateY(${topTranslateY * 0.5}px) scale(${1 + (isShaking ? 0.08 : 0)})`,
            transformOrigin: '100px 100px',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Outer Black Bezel */}
          <circle
            cx="100"
            cy="100"
            r="28"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="2"
          />

          {/* Middle Silver Ring */}
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Inner Light Core Button */}
          <circle
            cx="100"
            cy="100"
            r="12"
            fill={isOpen ? '#ffffff' : 'url(#btnGlowGrad)'}
            stroke="#cbd5e1"
            strokeWidth="1.5"
            className={isOpen ? 'animate-ping' : ''}
            style={{
              filter: `drop-shadow(0 0 ${isShaking || isOpen ? 12 : 4}px rgba(56, 189, 248, 0.9))`,
            }}
          />

          {/* Center tiny reflection */}
          <circle cx="97" cy="97" r="3" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
