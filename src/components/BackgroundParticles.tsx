import { useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  type: 'star' | 'heart' | 'sparkle' | 'circle';
}

const COLORS = ['#f472b6', '#fb7185', '#c084fc', '#fde047', '#67e8f9', '#a7f3d0'];
const TYPES: ('star' | 'heart' | 'sparkle' | 'circle')[] = ['star', 'heart', 'sparkle', 'circle'];

// Deterministic or immediate initialization for 0 re-render layout shift
function createInitialParticles(): Particle[] {
  const count = 20;
  const list: Particle[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: i,
      x: (i * 17.3 + 7) % 95,
      y: (i * 23.7 + 11) % 92,
      size: 11 + (i % 6) * 2.2,
      duration: 7 + (i % 5) * 1.5,
      delay: (i % 7) * 0.7,
      color: COLORS[i % COLORS.length],
      type: TYPES[i % TYPES.length]
    });
  }
  return list;
}

export default function BackgroundParticles() {
  const [particles] = useState<Particle[]>(createInitialParticles);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-strict" aria-hidden="true">
      {/* Soft gradient background glow circles */}
      <div className="absolute top-10 left-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-amber-100/40 blur-3xl" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none opacity-60 will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `floatBob ${p.duration}s ease-in-out ${p.delay}s infinite`,
            color: p.color,
            fontSize: `${p.size}px`
          }}
        >
          {p.type === 'star' && '✨'}
          {p.type === 'heart' && '💖'}
          {p.type === 'sparkle' && '⭐'}
          {p.type === 'circle' && '🌸'}
        </div>
      ))}
    </div>
  );
}
