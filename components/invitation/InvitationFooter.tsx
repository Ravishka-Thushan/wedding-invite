'use client';

interface InvitationFooterProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
}

export default function InvitationFooter({ brideName, groomName, weddingDate }: InvitationFooterProps) {
  const year = new Date(weddingDate).getFullYear();

  return (
    <footer className="bg-mocha-600 py-16 px-6 text-center relative overflow-hidden">
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9A96E,
            #C9A96E 1px,
            transparent 1px,
            transparent 25px
          )`,
        }}
      />

      <div className="relative">
        {/* Ornament top */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-500/60" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#C9A96E">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-500/60" />
        </div>

        <h3 className="font-script text-champagne-400 text-4xl mb-2">
          {brideName} & {groomName}
        </h3>
        <p className="font-display text-champagne-600/70 text-sm tracking-widest uppercase mb-8">
          {year} · Celebrating Love
        </p>

        <p className="font-body text-mocha-300/50 text-xs mt-8">
          Created with love using{' '}
          <a href="#" className="text-champagne-500/60 hover:text-champagne-400 transition-colors underline">
            Wedding Invite
          </a>
        </p>
      </div>
    </footer>
  );
}
