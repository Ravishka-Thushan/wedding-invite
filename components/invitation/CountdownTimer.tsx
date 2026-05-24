'use client';

import { useState, useEffect } from 'react';
import { getCountdown } from '@/lib/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface CountdownTimerProps {
  weddingDate: string;
}

export default function CountdownTimer({ weddingDate }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(getCountdown(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  if (countdown.isPast) {
    return (
      <section className="py-16 bg-ivory-100">
        <div className="text-center">
          <p className="font-script text-champagne-500 text-4xl">We are married! 🎉</p>
        </div>
      </section>
    );
  }

  const units = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9A96E,
            #C9A96E 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-champagne-600 text-3xl mb-3">Counting Down To</p>
          <h2 className="font-display text-4xl md:text-5xl text-mocha-500 font-light">
            Our Special Day
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {units.map(({ label, value }, i) => (
              <div key={label} className="text-center">
                <div
                  className="relative bg-white rounded-2xl p-4 md:p-6 shadow-soft border border-champagne-300/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Number */}
                  <div className="font-display font-light text-4xl md:text-6xl text-mocha-500 tabular-nums leading-none">
                    {String(value).padStart(2, '0')}
                  </div>

                  {/* Decorative line */}
                  <div className="w-8 h-px bg-champagne-400 mx-auto my-3" />

                  {/* Label */}
                  <p className="font-body text-mocha-300 text-xs md:text-sm tracking-widest uppercase">
                    {label}
                  </p>

                  {/* Corner ornaments */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-champagne-300/40" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-champagne-300/40" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-champagne-300/40" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-champagne-300/40" />
                </div>

                {/* Separator dot */}
                {i < 3 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex-col gap-2 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
