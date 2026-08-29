import { useEffect, useState } from 'react';

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

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#f472b6', '#fb7185', '#c084fc', '#fde047', '#67e8f9', '#a7f3d0'];
    const types: ('star' | 'heart' | 'sparkle' | 'circle')[] = ['star', 'heart', 'sparkle', 'circle'];
    
    const count = 28;
    const generated: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft gradient background glow circles */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-3xl" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none opacity-60 transition-opacity"
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
