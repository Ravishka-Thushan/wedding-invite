import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory-100 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A96E, #C9A96E 1px, transparent 1px, transparent 40px)`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="font-script text-champagne-600 text-2xl">Wedding Invite</p>
        <Link
          href="/create"
          className="btn-gold px-6 py-2 rounded-full font-body text-sm font-semibold"
        >
          Create Yours
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-script text-champagne-500 text-3xl mb-4">Beautiful Digital</p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-mocha-500 mb-6 leading-tight">
          Wedding Invitations
        </h1>
        <p className="font-body text-mocha-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Create stunning, shareable wedding invitations in minutes. Collect RSVPs, manage guests, and
          track everything from a beautiful dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/create"
            className="btn-gold px-10 py-4 rounded-full font-body font-semibold text-sm tracking-widest uppercase"
          >
            Create Your Invitation
          </Link>
          <Link
            href="/ravishka-dilshan"
            className="px-10 py-4 rounded-full border-2 border-champagne-300/50 font-body font-semibold text-sm text-mocha-400 hover:border-champagne-500 transition-colors tracking-widest uppercase"
          >
            See Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '✨', title: 'Stunning Design', desc: 'Elegant, animated invitation pages that wow your guests the moment they open the link.' },
            { icon: '📨', title: 'Easy RSVP', desc: 'Guests submit their response, guest count, dietary needs, and song requests in seconds.' },
            { icon: '📊', title: 'Live Dashboard', desc: 'Track attendance in real-time with charts, guest lists, and CSV export — all behind a password.' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-3xl p-8 shadow-soft border border-champagne-300/15 text-center card-hover">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-display text-xl text-mocha-500 mb-3">{f.title}</h3>
              <p className="font-body text-mocha-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12">
        <p className="font-body text-mocha-200 text-sm">
          Built with love · Hosted free on Vercel
        </p>
      </footer>
    </main>
  );
}
