'use client';

import { useState, useMemo } from 'react';
import { RSVP } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';

interface GuestListProps {
  rsvps: RSVP[];
}

type Filter = 'all' | 'attending' | 'not_attending';

export default function GuestList({ rsvps }: GuestListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return rsvps
      .filter((r) => {
        if (filter === 'attending') return r.attending;
        if (filter === 'not_attending') return !r.attending;
        return true;
      })
      .filter((r) =>
        r.guest_name.toLowerCase().includes(search.toLowerCase()) ||
        (r.email || '').toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
  }, [rsvps, filter, search]);

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Attending', 'Guests', 'Dietary', 'Song Request', 'Message', 'Submitted'];
    const rows = rsvps.map((r) => [
      r.guest_name,
      r.email || '',
      r.phone || '',
      r.attending ? 'Yes' : 'No',
      r.guest_count,
      r.dietary_restrictions || '',
      r.song_request || '',
      r.message || '',
      new Date(r.submitted_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-champagne-300/15 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-champagne-300/15">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-accent font-semibold text-mocha-500 text-lg">Guest List</h3>
            <p className="font-body text-xs text-mocha-300">{filtered.length} of {rsvps.length} guests</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-champagne-300/40 font-body text-sm text-champagne-600 hover:bg-champagne-300/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-elegant w-full pl-9 pr-4 py-2 rounded-xl font-body text-sm"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'attending', 'not_attending'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl font-body text-sm transition-all ${filter === f
                  ? 'bg-champagne-500 text-white shadow-gold'
                  : 'border border-champagne-300/30 text-mocha-400 hover:bg-champagne-300/10'
                  }`}
              >
                {f === 'all' ? 'All' : f === 'attending' ? '✓ Going' : '✕ Not Going'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-3xl mb-3">📋</p>
          <p className="font-body text-mocha-300">No guests found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ivory-100/50">
                <th className="text-left px-6 py-3 font-body text-xs tracking-widest uppercase text-mocha-300">Guest</th>
                <th className="text-left px-4 py-3 font-body text-xs tracking-widest uppercase text-mocha-300">Status</th>
                <th className="text-left px-4 py-3 font-body text-xs tracking-widest uppercase text-mocha-300 hidden md:table-cell">Guests</th>
                <th className="text-left px-4 py-3 font-body text-xs tracking-widest uppercase text-mocha-300 hidden lg:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-body text-xs tracking-widest uppercase text-mocha-300 hidden lg:table-cell">Submitted</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((rsvp, i) => (
                <>
                  <tr
                    key={rsvp.id}
                    className={`border-t border-champagne-300/10 hover:bg-ivory-50 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-ivory-50/30'
                      }`}
                    onClick={() => setExpanded(expanded === rsvp.id ? null : rsvp.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display text-sm font-semibold flex-shrink-0"
                          style={{
                            background: rsvp.attending
                              ? 'linear-gradient(135deg, #C9A96E, #E8D5A3)'
                              : 'linear-gradient(135deg, #F2C4CE, #E8A0B0)',
                          }}
                        >
                          {rsvp.guest_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-sm text-mocha-500">{rsvp.guest_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold"
                        style={{
                          backgroundColor: rsvp.attending ? '#F0FFF6' : '#FFF0F3',
                          color: rsvp.attending ? '#4CAF82' : '#E8A0B0',
                        }}
                      >
                        {rsvp.attending ? '✓ Attending' : '✕ Declining'}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="font-body text-sm text-mocha-400">
                        {rsvp.attending ? rsvp.guest_count : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="font-body text-xs text-mocha-300 space-y-0.5">
                        {rsvp.email && <p>{rsvp.email}</p>}
                        {rsvp.phone && <p>{rsvp.phone}</p>}
                        {!rsvp.email && !rsvp.phone && <p>—</p>}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="font-body text-xs text-mocha-300">
                        {formatTimeAgo(rsvp.submitted_at)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <svg
                        className={`w-4 h-4 text-mocha-300 transition-transform ${expanded === rsvp.id ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expanded === rsvp.id && (
                    <tr key={`${rsvp.id}-expanded`} className="bg-ivory-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          {rsvp.dietary_restrictions && (
                            <div>
                              <p className="font-body text-xs text-mocha-300 uppercase tracking-wider mb-1">🥗 Dietary</p>
                              <p className="font-body text-mocha-500">{rsvp.dietary_restrictions}</p>
                            </div>
                          )}
                          {rsvp.song_request && (
                            <div>
                              <p className="font-body text-xs text-mocha-300 uppercase tracking-wider mb-1">🎵 Song Request</p>
                              <p className="font-body text-mocha-500">{rsvp.song_request}</p>
                            </div>
                          )}
                          {rsvp.message && (
                            <div className={!rsvp.dietary_restrictions && !rsvp.song_request ? 'sm:col-span-3' : ''}>
                              <p className="font-body text-xs text-mocha-300 uppercase tracking-wider mb-1">💌 Message</p>
                              <p className="font-body text-mocha-500 italic">"{rsvp.message}"</p>
                            </div>
                          )}
                          {!rsvp.dietary_restrictions && !rsvp.song_request && !rsvp.message && (
                            <p className="font-body text-mocha-300 text-xs italic">No additional information provided</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
