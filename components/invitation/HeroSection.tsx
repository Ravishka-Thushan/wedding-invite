'use client';

import { useEffect, useState } from 'react';
import { formatWeddingDate } from '@/lib/utils';
import { Wedding } from '@/lib/types';

interface HeroSectionProps {
  wedding: Wedding;
}

export default function HeroSection({ wedding }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedDate = formatWeddingDate(wedding.wedding_date);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: wedding.hero_image_url
            ? `url(${wedding.hero_image_url})`
            : `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Top ornament */}
        <div
          className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-champagne-400" />
            <OrnamentIcon />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-champagne-400" />
          </div>
        </div>

        {/* Together label */}
        <div
          className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="font-script text-champagne-300 text-2xl md:text-3xl mb-4 drop-shadow-lg">
            Together with their families
          </p>
        </div>

        {/* Couple Names */}
        <div
          className={`transition-all duration-1200 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <h1 className="font-display font-light text-white drop-shadow-2xl">
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-wide">
              {wedding.bride_name}
            </span>
            <span className="block font-script text-champagne-300 text-4xl md:text-5xl my-3 md:my-4">
              &amp;
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-wide">
              {wedding.groom_name}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        {wedding.tagline && (
          <div
            className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <p className="font-display italic text-white/90 text-lg md:text-xl mt-6 mb-8 max-w-lg mx-auto drop-shadow-md leading-relaxed">
              "{wedding.tagline}"
            </p>
          </div>
        )}

        {/* Divider */}
        <div
          className={`transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-400" />
            <div className="w-2 h-2 rounded-full bg-champagne-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-400" />
          </div>
        </div>

        {/* Date & Venue */}
        <div
          className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1100ms' }}
        >
          <div className="glass rounded-2xl px-8 py-5 inline-block max-w-md">
            <p className="font-display text-mocha-500 text-lg md:text-xl font-medium">
              {formattedDate}
            </p>
            <p className="font-body text-mocha-400 text-sm mt-1 opacity-80">
              {wedding.ceremony_time} · {wedding.venue_name}
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className={`mt-12 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1400ms' }}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce-soft">
            <p className="text-white/60 text-xs font-body tracking-widest uppercase">Scroll</p>
            <svg className="w-5 h-5 text-champagne-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory-100 to-transparent" />
    </section>
  );
}

function OrnamentIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="8" stroke="#E8D5A3" strokeWidth="0.8" fill="none" />
      <circle cx="20" cy="20" r="2" fill="#C9A96E" />
      <line x1="20" y1="4" x2="20" y2="12" stroke="#E8D5A3" strokeWidth="0.8" />
      <line x1="20" y1="28" x2="20" y2="36" stroke="#E8D5A3" strokeWidth="0.8" />
      <line x1="4" y1="20" x2="12" y2="20" stroke="#E8D5A3" strokeWidth="0.8" />
      <line x1="28" y1="20" x2="36" y2="20" stroke="#E8D5A3" strokeWidth="0.8" />
      <line x1="8" y1="8" x2="13.5" y2="13.5" stroke="#E8D5A3" strokeWidth="0.6" />
      <line x1="26.5" y1="26.5" x2="32" y2="32" stroke="#E8D5A3" strokeWidth="0.6" />
      <line x1="32" y1="8" x2="26.5" y2="13.5" stroke="#E8D5A3" strokeWidth="0.6" />
      <line x1="13.5" y1="26.5" x2="8" y2="32" stroke="#E8D5A3" strokeWidth="0.6" />
    </svg>
  );
}
