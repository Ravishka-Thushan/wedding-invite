'use client';

import { DashboardStats } from '@/lib/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Responses',
      value: stats.total_rsvps,
      icon: '📨',
      color: '#C9A96E',
      bg: '#FFF9F0',
    },
    {
      label: 'Attending',
      value: stats.attending_count,
      icon: '🥂',
      color: '#4CAF82',
      bg: '#F0FFF6',
    },
    {
      label: 'Not Attending',
      value: stats.not_attending_count,
      icon: '💌',
      color: '#E8A0B0',
      bg: '#FFF0F3',
    },
    {
      label: 'Total Guests',
      value: stats.total_guests,
      icon: '👥',
      color: '#7B96D4',
      bg: '#F0F4FF',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="stat-card p-6 relative overflow-hidden">
          {/* Background blob */}
          <div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
            style={{ backgroundColor: card.color }}
          />

          <div className="relative">
            <div className="text-2xl mb-3">{card.icon}</div>
            <p className="font-display text-4xl font-light" style={{ color: card.color }}>
              {card.value.toLocaleString()}
            </p>
            <p className="font-body text-xs text-mocha-300 tracking-wider uppercase mt-2">
              {card.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
