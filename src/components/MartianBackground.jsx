import React, { useMemo } from 'react';

export default function MartianBackground({ mousePos = { x: 0, y: 0 } }) {
  const dustParticles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      depth: Math.random() * 2 + 0.5, // Used for parallax intensity
    }));
  }, []);

  return (
    <div className="martian-dawn-bg absolute inset-0 -z-10 overflow-hidden">
      {dustParticles.map((particle) => (
        <span
          key={particle.id}
          className="absolute bg-mars-dust/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `drift-dust ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            transform: `translate(${mousePos.x * particle.depth}px, ${mousePos.y * particle.depth}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
}
