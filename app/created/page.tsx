'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CreatedContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || '';

  const inviteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${slug}`
    : `https://yoursite.com/${slug}`;

  const dashboardUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dashboard/${slug}`
    : `https://yoursite.com/dashboard/${slug}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <p className="font-script text-champagne-500 text-4xl mb-3">Congratulations!</p>
        <h1 className="font-display text-3xl text-mocha-500 font-light mb-4">
          Your invitation is live!
        </h1>
        <p className="font-body text-mocha-300 mb-10">
          Share the link below with your guests, and use the dashboard link to track responses.
        </p>

        <div className="bg-white rounded-3xl p-8 shadow-soft border border-champagne-300/15 space-y-5 text-left mb-8">
          {/* Invitation link */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-mocha-300 mb-2">💌 Invitation Link (share this!)</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-ivory-100 rounded-xl px-4 py-3 text-champagne-700 font-body break-all">
                {inviteUrl}
              </code>
              <button
                onClick={() => copyToClipboard(inviteUrl)}
                className="p-3 rounded-xl bg-champagne-300/20 hover:bg-champagne-300/40 transition-colors flex-shrink-0"
                title="Copy link"
              >
                📋
              </button>
            </div>
          </div>

          {/* Dashboard link */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-mocha-300 mb-2">📊 Dashboard Link (keep private!)</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-ivory-100 rounded-xl px-4 py-3 text-mocha-400 font-body break-all">
                {dashboardUrl}
              </code>
              <button
                onClick={() => copyToClipboard(dashboardUrl)}
                className="p-3 rounded-xl bg-champagne-300/20 hover:bg-champagne-300/40 transition-colors flex-shrink-0"
                title="Copy link"
              >
                📋
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${slug}`}
            className="flex-1 btn-gold py-4 rounded-2xl font-body font-semibold text-sm text-center"
          >
            View Invitation
          </Link>
          <Link
            href={`/dashboard/${slug}`}
            className="flex-1 py-4 rounded-2xl border-2 border-champagne-300/40 font-body font-semibold text-sm text-mocha-400 hover:border-champagne-500 transition-colors text-center"
          >
            Open Dashboard
          </Link>
        </div>

        <p className="font-body text-xs text-mocha-200 mt-8">
          Save both links! You&apos;ll need the dashboard password you created to access guest data.
        </p>
      </div>
    </div>
  );
}

export default function CreatedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory-100 flex items-center justify-center"><p className="font-body text-mocha-300">Loading...</p></div>}>
      <CreatedContent />
    </Suspense>
  );
}
