'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { formatWeddingDate } from '@/lib/utils';
import { Wedding } from '@/lib/types';

interface EventDetailsProps {
  wedding: Wedding;
}

export default function EventDetails({ wedding }: EventDetailsProps) {
  const formattedDate = formatWeddingDate(wedding.wedding_date);

  const events = [
    {
      icon: <RingsIcon />,
      title: 'Ceremony',
      time: wedding.ceremony_time,
      description: 'Join us as we exchange our vows and begin our forever',
      accent: '#F2C4CE',
    },
    ...(wedding.reception_time
      ? [
          {
            icon: <DinnerIcon />,
            title: 'Reception',
            time: wedding.reception_time,
            description: 'Celebrate with us over dinner, dancing, and joy',
            accent: '#C9A96E',
          },
        ]
      : []),
  ];

  return (
    <section className="py-24 bg-ivory-100 relative">
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-champagne-300/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-champagne-300/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-champagne-300/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-champagne-300/30 rounded-br-lg" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="font-script text-champagne-600 text-3xl mb-3">Save The Date</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-mocha-500 mb-4">
            Event Details
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-display text-champagne-500 text-sm tracking-widest uppercase px-4">
              {formattedDate}
            </span>
          </div>
        </AnimatedSection>

        {/* Event Cards */}
        <div className={`grid ${events.length === 2 ? 'md:grid-cols-2' : 'max-w-md mx-auto'} gap-8 mb-16`}>
          {events.map((event, i) => (
            <AnimatedSection key={event.title} delay={i * 200}>
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-champagne-300/20 text-center card-hover relative overflow-hidden">
                {/* Background accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${event.accent}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${event.accent}30` }}
                >
                  {event.icon}
                </div>

                <h3 className="font-display text-2xl text-mocha-500 mb-2">{event.title}</h3>
                <p className="font-body text-champagne-600 font-bold text-lg mb-3">{event.time}</p>
                <p className="font-body text-mocha-300 text-sm leading-relaxed">{event.description}</p>

                {/* Corner ornaments */}
                <div className="absolute bottom-3 right-3 opacity-20">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" stroke="#C9A96E" strokeWidth="1" fill="none" />
                    <circle cx="10" cy="10" r="2" fill="#C9A96E" />
                  </svg>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Venue Info */}
        <AnimatedSection delay={400}>
          <div className="bg-gradient-to-br from-mocha-500 to-mocha-600 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  #C9A96E,
                  #C9A96E 1px,
                  transparent 1px,
                  transparent 15px
                )`,
              }}
            />

            {/* Gold border */}
            <div className="absolute inset-0 rounded-3xl" style={{
              background: 'transparent',
              boxShadow: 'inset 0 0 0 1px rgba(201, 169, 110, 0.3)'
            }} />

            <div className="relative z-10">
              <LocationPinIcon />
              <h3 className="font-display text-3xl md:text-4xl text-white mt-4 mb-2">
                {wedding.venue_name}
              </h3>
              <p className="font-body text-champagne-300 text-base mt-2">
                {wedding.venue_address}
              </p>
              {wedding.venue_city && (
                <p className="font-body text-champagne-300/70 text-sm mt-1">
                  {wedding.venue_city}{wedding.venue_country ? `, ${wedding.venue_country}` : ''}
                </p>
              )}

              {wedding.venue_map_url && (
                <a
                  href={wedding.venue_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 btn-gold rounded-full font-body text-sm font-semibold tracking-wider"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Maps
                </a>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function RingsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="16" r="7" stroke="#F2C4CE" strokeWidth="2" fill="none" />
      <circle cx="20" cy="16" r="7" stroke="#F2C4CE" strokeWidth="2" fill="none" />
    </svg>
  );
}

function DinnerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round">
      <path d="M8 3v5a4 4 0 004 4v13M20 3v26M17 3v7h6V3" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <div className="flex justify-center">
      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(201, 169, 110, 0.2)' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </div>
    </div>
  );
}
