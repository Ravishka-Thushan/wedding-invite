'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { Wedding } from '@/lib/types';

interface DressCodeProps {
  wedding: Wedding;
}

export default function DressCode({ wedding }: DressCodeProps) {
  if (!wedding.dress_code) return null;

  const colors = wedding.dress_code_colors || [];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush-100/50 via-ivory-100 to-champagne-300/10" />

      <div className="relative max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="font-script text-champagne-600 text-3xl mb-3">Please Note</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-mocha-500 mb-4">
            Dress Code
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-body text-xs tracking-widest uppercase text-champagne-500 px-4">
              Attire
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-champagne-300/20 relative overflow-hidden">
            {/* Decorative rose watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-5">
              <RoseDecoration />
            </div>

            {/* Dress code title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-champagne-300/10 rounded-full px-6 py-3">
                <svg className="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-accent font-semibold text-mocha-500 text-xl">
                  {wedding.dress_code}
                </span>
              </div>
            </div>

            {/* Description */}
            {wedding.dress_code_description && (
              <p className="font-body text-mocha-400 text-center leading-relaxed max-w-lg mx-auto mb-10">
                {wedding.dress_code_description}
              </p>
            )}

            {/* Color palette */}
            {colors.length > 0 && (
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 text-center mb-6">
                  Suggested Color Palette
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {colors.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className="w-14 h-14 rounded-2xl shadow-soft border-2 border-white"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-body text-xs text-mocha-300">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            <div className="mt-10 pt-8 border-t border-champagne-300/20 text-center">
              <p className="font-display italic text-mocha-300 text-sm">
                "Your presence is the greatest gift. Please dress comfortably and elegantly."
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function RoseDecoration() {
  return (
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="20" fill="#C9A96E" />
      <ellipse cx="50" cy="25" rx="12" ry="20" fill="#C9A96E" />
      <ellipse cx="50" cy="75" rx="12" ry="20" fill="#C9A96E" />
      <ellipse cx="25" cy="50" rx="20" ry="12" fill="#C9A96E" />
      <ellipse cx="75" cy="50" rx="20" ry="12" fill="#C9A96E" />
    </svg>
  );
}
