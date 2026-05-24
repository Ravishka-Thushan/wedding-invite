'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

interface StorySectionProps {
  story: string | null;
  brideFullName: string | null;
  brideName: string;
  groomFullName: string | null;
  groomName: string;
}

export default function StorySection({
  story,
  brideFullName,
  brideName,
  groomFullName,
  groomName,
}: StorySectionProps) {
  if (!story) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-100 via-blush-100/30 to-ivory-100" />

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p
          className="font-script text-blush-200/30 select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(80px, 15vw, 200px)' }}
        >
          Our Story
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <p className="font-script text-champagne-600 text-3xl mb-4">The Story Of</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-mocha-500 mb-2">
            {brideFullName || brideName}
          </h2>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-px w-12 bg-champagne-400" />
            <span className="font-script text-champagne-500 text-2xl">&amp;</span>
            <div className="h-px w-12 bg-champagne-400" />
          </div>
          <h2 className="font-display font-light text-4xl md:text-5xl text-mocha-500">
            {groomFullName || groomName}
          </h2>
        </AnimatedSection>

        {/* Story content */}
        <AnimatedSection delay={300}>
          <div className="relative">
            {/* Quote mark */}
            <div className="absolute -top-6 -left-4 font-display text-8xl text-champagne-300/40 leading-none select-none">
              &ldquo;
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft border border-champagne-300/20 relative">
              {/* Heart ornament top */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-gold">
                <HeartIcon />
              </div>

              <p className="font-display text-lg md:text-xl text-mocha-400 leading-relaxed text-center italic mt-4">
                {story}
              </p>

              {/* Bottom ornament */}
              <div className="flex items-center gap-3 mt-8 justify-center">
                <div className="h-px w-16 bg-champagne-300" />
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                  ))}
                </div>
                <div className="h-px w-16 bg-champagne-300" />
              </div>
            </div>

            {/* Closing quote mark */}
            <div className="absolute -bottom-6 -right-4 font-display text-8xl text-champagne-300/40 leading-none select-none rotate-180">
              &ldquo;
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#F2C4CE" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );
}
