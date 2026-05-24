'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Wedding, RSVP, DashboardStats } from '@/lib/types';
import { formatWeddingDate, formatShortDate } from '@/lib/utils';
import StatsCards from '@/components/dashboard/StatsCards';
import GuestList from '@/components/dashboard/GuestList';
import RSVPCharts from '@/components/dashboard/RSVPCharts';

interface DashboardClientProps {
  slug: string;
}

type Tab = 'overview' | 'guests' | 'charts';

export default function DashboardClient({ slug }: DashboardClientProps) {
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    // Check session storage for auth
    const stored = sessionStorage.getItem(`wedding-auth-${slug}`);
    if (stored === 'true') {
      setAuthenticated(true);
      loadData();
    } else {
      setLoading(false);
    }
  }, [slug]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await supabase
      .from('weddings')
      .select('dashboard_password')
      .eq('slug', slug)
      .single();

    if (data && data.dashboard_password === password) {
      sessionStorage.setItem(`wedding-auth-${slug}`, 'true');
      setAuthenticated(true);
      await loadData();
    } else {
      setPwError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);

    const { data: weddingData } = await supabase
      .from('weddings')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!weddingData) {
      setLoading(false);
      return;
    }

    setWedding(weddingData as Wedding);

    const { data: rsvpData } = await supabase
      .from('rsvps')
      .select('*')
      .eq('wedding_id', weddingData.id)
      .order('submitted_at', { ascending: false });

    const rsvpList = (rsvpData || []) as RSVP[];
    setRsvps(rsvpList);

    const attending = rsvpList.filter((r) => r.attending);
    const notAttending = rsvpList.filter((r) => !r.attending);
    const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0);

    setStats({
      total_rsvps: rsvpList.length,
      attending_count: attending.length,
      not_attending_count: notAttending.length,
      total_guests: totalGuests,
      response_rate: weddingData.max_guests
        ? Math.round((rsvpList.length / weddingData.max_guests) * 100)
        : 0,
    });

    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(`wedding-auth-${slug}`);
    setAuthenticated(false);
    setPassword('');
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-champagne-400 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="font-body text-mocha-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Password gate
  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 relative"
        style={{
          background: 'linear-gradient(135deg, #2C1810 0%, #5C3D35 50%, #2C1810 100%)',
        }}
      >
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #C9A96E, #C9A96E 1px, transparent 1px, transparent 30px)`,
          }}
        />

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <p className="font-script text-champagne-400 text-4xl mb-2">Dashboard</p>
            <h1 className="font-display text-white text-2xl font-light">
              {slug.replace(/-/g, ' & ')}
            </h1>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-gold-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-champagne-300/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="font-display text-xl text-mocha-500 mb-1">Private Dashboard</h2>
              <p className="font-body text-sm text-mocha-300">Enter your dashboard password to continue</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                  placeholder="Enter dashboard password"
                  required
                />
              </div>

              {pwError && (
                <p className="text-red-400 text-sm font-body text-center">{pwError}</p>
              )}

              <button
                type="submit"
                className="btn-gold w-full py-3 rounded-xl font-body font-semibold text-sm tracking-wider"
              >
                Enter Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!wedding || !stats) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <p className="font-body text-mocha-300">Wedding not found.</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'guests', label: 'Guest List', icon: '👥' },
    { id: 'charts', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-champagne-300/20"
        style={{ background: 'rgba(255,249,240,0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl md:text-2xl text-mocha-500 font-light">
              <span className="font-script text-champagne-600">{wedding.bride_name}</span>
              <span className="text-champagne-400 mx-2 font-script">&</span>
              <span className="font-script text-champagne-600">{wedding.groom_name}</span>
            </h1>
            <p className="font-body text-xs text-mocha-300 mt-0.5">
              {formatWeddingDate(wedding.wedding_date)} · {wedding.venue_name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/${wedding.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-champagne-300/40 font-body text-xs text-champagne-600 hover:bg-champagne-300/10 transition-colors hidden sm:flex"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Invite
            </a>

            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-champagne-300/40 font-body text-xs text-mocha-400 hover:bg-champagne-300/10 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="font-body text-xs text-mocha-300 hover:text-mocha-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 pb-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 font-body text-sm transition-all border-b-2 ${tab === t.id
                ? 'border-champagne-500 text-champagne-600 font-semibold'
                : 'border-transparent text-mocha-300 hover:text-mocha-500'
                }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Tab */}
        {tab === 'overview' && (
          <>
            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Quick info */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Wedding Info */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-champagne-300/15">
                <h3 className="font-accent font-semibold text-mocha-500 mb-4">Wedding Details</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Date', value: formatShortDate(wedding.wedding_date) },
                    { label: 'Ceremony', value: wedding.ceremony_time },
                    { label: 'Reception', value: wedding.reception_time || '—' },
                    { label: 'Venue', value: wedding.venue_name },
                    { label: 'Dress Code', value: wedding.dress_code || '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                      <span className="font-body text-xs text-mocha-300 uppercase tracking-wider">{label}</span>
                      <span className="font-body text-sm text-mocha-500 text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Share link */}
                <div className="mt-6 pt-4 border-t border-champagne-300/15">
                  <p className="font-body text-xs text-mocha-300 mb-2">Share this link with guests:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-ivory-100 rounded-lg px-3 py-2 text-champagne-600 truncate font-body">
                      {typeof window !== 'undefined' ? `${window.location.origin}/${wedding.slug}` : `yoursite.com/${wedding.slug}`}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${wedding.slug}`)}
                      className="p-2 rounded-lg bg-champagne-300/20 hover:bg-champagne-300/40 transition-colors"
                    >
                      <svg className="w-4 h-4 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent RSVPs */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-champagne-300/15">
                <h3 className="font-accent font-semibold text-mocha-500 mb-4">Recent Responses</h3>
                {rsvps.slice(0, 6).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-3xl mb-2">📭</p>
                    <p className="font-body text-mocha-300 text-sm">No RSVPs yet</p>
                    <p className="font-body text-mocha-200 text-xs mt-1">Share your invitation link to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {rsvps.slice(0, 6).map((r) => (
                      <div key={r.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold font-display"
                            style={{
                              background: r.attending
                                ? 'linear-gradient(135deg, #C9A96E, #E8D5A3)'
                                : 'linear-gradient(135deg, #F2C4CE, #E8A0B0)',
                            }}
                          >
                            {r.guest_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-body text-sm text-mocha-500 font-semibold">{r.guest_name}</p>
                            <p className="font-body text-xs text-mocha-300">
                              {r.attending ? `${r.guest_count} guest${r.guest_count > 1 ? 's' : ''}` : 'Declining'}
                            </p>
                          </div>
                        </div>
                        <span
                          className="text-xs px-2 py-1 rounded-full font-body font-semibold"
                          style={{
                            backgroundColor: r.attending ? '#F0FFF6' : '#FFF0F3',
                            color: r.attending ? '#4CAF82' : '#E8A0B0',
                          }}
                        >
                          {r.attending ? '✓' : '✕'}
                        </span>
                      </div>
                    ))}
                    {rsvps.length > 6 && (
                      <button
                        onClick={() => setTab('guests')}
                        className="font-body text-xs text-champagne-500 hover:text-champagne-600 underline w-full text-center pt-2"
                      >
                        View all {rsvps.length} responses →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Guests Tab */}
        {tab === 'guests' && <GuestList rsvps={rsvps} />}

        {/* Charts Tab */}
        {tab === 'charts' && (
          <RSVPCharts
            rsvps={rsvps}
            attendingCount={stats.attending_count}
            notAttendingCount={stats.not_attending_count}
          />
        )}
      </main>
    </div>
  );
}
