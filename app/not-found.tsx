import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-script text-champagne-500 text-5xl mb-4">Oops</p>
        <h1 className="font-display text-3xl text-mocha-500 mb-4">Invitation Not Found</h1>
        <p className="font-body text-mocha-300 mb-8">
          This wedding invitation doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/"
          className="btn-gold px-8 py-3 rounded-full font-body font-semibold text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
