'use client';

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { RSVP } from '@/lib/types';
import { format, parseISO } from 'date-fns';

interface RSVPChartsProps {
  rsvps: RSVP[];
  attendingCount: number;
  notAttendingCount: number;
}

const COLORS = ['#C9A96E', '#F2C4CE', '#A8C09C', '#7B96D4'];

export default function RSVPCharts({ rsvps, attendingCount, notAttendingCount }: RSVPChartsProps) {
  // Pie data
  const pieData = [
    { name: 'Attending', value: attendingCount },
    { name: 'Not Attending', value: notAttendingCount },
  ];

  // Daily responses timeline
  const dailyMap: Record<string, number> = {};
  rsvps.forEach((r) => {
    const day = format(parseISO(r.submitted_at), 'MMM d');
    dailyMap[day] = (dailyMap[day] || 0) + 1;
  });

  const timelineData = Object.entries(dailyMap)
    .map(([date, count]) => ({ date, count }))
    .slice(-14); // Last 14 days

  // Guest count distribution
  const guestCountMap: Record<number, number> = {};
  rsvps
    .filter((r) => r.attending)
    .forEach((r) => {
      guestCountMap[r.guest_count] = (guestCountMap[r.guest_count] || 0) + 1;
    });

  const guestDistribution = Object.entries(guestCountMap).map(([count, freq]) => ({
    guests: `${count} guest${Number(count) > 1 ? 's' : ''}`,
    families: freq,
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Attendance pie chart */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-champagne-300/15">
        <h3 className="font-accent font-semibold text-mocha-500 mb-1">Attendance Overview</h3>
        <p className="font-body text-xs text-mocha-300 mb-6">
          {attendingCount + notAttendingCount} total responses
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#C9A96E' : '#F2C4CE'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #E8D5A3',
                fontFamily: 'Lato, sans-serif',
                fontSize: '13px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-champagne-500" />
            <span className="font-body text-sm text-mocha-400">Attending ({attendingCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blush-300" />
            <span className="font-body text-sm text-mocha-400">Declining ({notAttendingCount})</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-champagne-300/15">
        <h3 className="font-accent font-semibold text-mocha-500 mb-1">Daily Responses</h3>
        <p className="font-body text-xs text-mocha-300 mb-6">RSVPs received per day</p>
        {timelineData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE8" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: 'Lato', fill: '#8B6358' }} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Lato', fill: '#8B6358' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E8D5A3',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="count" fill="#C9A96E" radius={[6, 6, 0, 0]} name="Responses" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center">
            <p className="font-body text-mocha-300 text-sm">No data yet</p>
          </div>
        )}
      </div>

      {/* Guest count distribution */}
      {guestDistribution.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-champagne-300/15 lg:col-span-2">
          <h3 className="font-accent font-semibold text-mocha-500 mb-1">Party Size Distribution</h3>
          <p className="font-body text-xs text-mocha-300 mb-6">How many guests per RSVP</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={guestDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE8" />
              <XAxis type="number" tick={{ fontSize: 11, fontFamily: 'Lato', fill: '#8B6358' }} allowDecimals={false} />
              <YAxis dataKey="guests" type="category" tick={{ fontSize: 11, fontFamily: 'Lato', fill: '#8B6358' }} width={70} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E8D5A3', fontFamily: 'Lato', fontSize: '13px' }}
              />
              <Bar dataKey="families" fill="#F2C4CE" radius={[0, 6, 6, 0]} name="RSVPs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
