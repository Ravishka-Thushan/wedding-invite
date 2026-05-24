'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

const PETAL_SVG = `
<svg viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 2 C8 2, 2 10, 2 20 C2 30, 8 38, 15 38 C22 38, 28 30, 28 20 C28 10, 22 2, 15 2Z" 
    fill="currentColor" opacity="0.8"/>
  <path d="M15 2 C15 2, 22 10, 20 20 C18 30, 15 38, 15 38 C15 38, 8 30, 10 20 C12 10, 15 2, 15 2Z" 
    fill="currentColor" opacity="0.4"/>
</svg>
`;

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 6,
      animationDelay: Math.random() * 8,
      size: 12 + Math.random() * 14,
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute petal"
          style={{
            left: `${petal.left}%`,
            top: '-40px',
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            color: petal.id % 3 === 0 ? '#F2C4CE' : petal.id % 3 === 1 ? '#E8D5A3' : '#D4789A',
            opacity: petal.opacity,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
          }}
          dangerouslySetInnerHTML={{ __html: PETAL_SVG }}
        />
      ))}
    </div>
  );
}
