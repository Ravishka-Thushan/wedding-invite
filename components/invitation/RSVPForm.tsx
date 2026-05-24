'use client';

import { useState } from 'react';
import { RSVPFormData } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface RSVPFormProps {
  weddingId: string;
  weddingSlug: string;
  allowPlusOne: boolean;
  collectDietary: boolean;
  collectSongRequest: boolean;
  rsvpDeadline: string | null;
}

type Step = 'attending' | 'details' | 'extras' | 'submitted';

export default function RSVPForm({
  weddingId,
  allowPlusOne,
  collectDietary,
  collectSongRequest,
  rsvpDeadline,
}: RSVPFormProps) {
  const [step, setStep] = useState<Step>('attending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<RSVPFormData>({
    guest_name: '',
    email: '',
    phone: '',
    attending: null,
    guest_count: 1,
    dietary_restrictions: '',
    song_request: '',
    message: '',
  });

  const handleAttending = (attending: boolean) => {
    setForm((prev) => ({ ...prev, attending }));
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guest_name.trim()) {
      setError('Please enter your name');
      return;
    }
    setError(null);
    if (form.attending && (collectDietary || collectSongRequest)) {
      setStep('extras');
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('rsvps').insert({
        wedding_id: weddingId,
        guest_name: form.guest_name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        attending: form.attending,
        guest_count: form.attending ? form.guest_count : 1,
        dietary_restrictions: form.dietary_restrictions.trim() || null,
        song_request: form.song_request.trim() || null,
        message: form.message.trim() || null,
      });

      if (insertError) throw insertError;
      setStep('submitted');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      if (message.includes('unique')) {
        setError('This email has already submitted an RSVP. Contact the couple if you need to update it.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-100 to-mocha-600" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C9A96E 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #F2C4CE 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="font-script text-champagne-400 text-3xl mb-3">Kindly Reply</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-white mb-4">
            RSVP
          </h2>
          {rsvpDeadline && (
            <p className="font-body text-champagne-300/80 text-sm">
              Please respond by{' '}
              <span className="text-champagne-300 font-semibold">
                {new Date(rsvpDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </p>
          )}
        </AnimatedSection>

        {/* Form Card */}
        <AnimatedSection delay={200}>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-gold-lg">
            {/* Progress bar */}
            {step !== 'submitted' && (
              <div className="h-1 bg-ivory-200">
                <div
                  className="h-full bg-gold-gradient transition-all duration-500"
                  style={{
                    width:
                      step === 'attending' ? '25%' :
                        step === 'details' ? '66%' :
                          '90%',
                  }}
                />
              </div>
            )}

            <div className="p-8 md:p-10">
              {/* STEP 1: Will you attend? */}
              {step === 'attending' && (
                <div className="text-center">
                  <div className="mb-8">
                    <p className="font-script text-champagne-500 text-2xl mb-2">Will you join us?</p>
                    <h3 className="font-display text-2xl text-mocha-500">Are you attending?</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <button
                      onClick={() => handleAttending(true)}
                      className="group relative p-6 rounded-2xl border-2 border-champagne-300/30 hover:border-champagne-500 transition-all duration-300 hover:shadow-gold"
                    >
                      <div className="text-3xl mb-2">🥂</div>
                      <p className="font-display text-lg text-mocha-500">Joyfully</p>
                      <p className="font-body text-sm text-champagne-600 font-semibold">Accepts</p>
                      <div className="absolute inset-0 rounded-2xl bg-champagne-300/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                      onClick={() => handleAttending(false)}
                      className="group relative p-6 rounded-2xl border-2 border-champagne-300/30 hover:border-mocha-300 transition-all duration-300"
                    >
                      <div className="text-3xl mb-2">💌</div>
                      <p className="font-display text-lg text-mocha-500">Regretfully</p>
                      <p className="font-body text-sm text-mocha-300 font-semibold">Declines</p>
                      <div className="absolute inset-0 rounded-2xl bg-mocha-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Details */}
              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-semibold mb-4"
                      style={{
                        backgroundColor: form.attending ? '#F2C4CE30' : '#F5EDE8',
                        color: form.attending ? '#D4789A' : '#8B6358',
                      }}>
                      {form.attending ? '🥂 Joyfully Accepts' : '💌 Regretfully Declines'}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('attending')}
                      className="block text-xs text-champagne-500 hover:text-champagne-600 mx-auto underline font-body"
                    >
                      Change
                    </button>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.guest_name}
                      onChange={(e) => setForm((p) => ({ ...p, guest_name: e.target.value }))}
                      className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                      placeholder="Jane Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                      placeholder="+94 71 000 0000"
                    />
                  </div>

                  {/* Guest count */}
                  {form.attending && allowPlusOne && (
                    <div>
                      <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                        Number of Guests (including yourself)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, guest_count: Math.max(1, p.guest_count - 1) }))}
                          className="w-10 h-10 rounded-full border-2 border-champagne-300 text-champagne-600 font-bold hover:bg-champagne-300/20 transition-colors flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-display text-2xl text-mocha-500 w-8 text-center">
                          {form.guest_count}
                        </span>
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, guest_count: Math.min(10, p.guest_count + 1) }))}
                          className="w-10 h-10 rounded-full border-2 border-champagne-300 text-champagne-600 font-bold hover:bg-champagne-300/20 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message for those not attending */}
                  {!form.attending && (
                    <div>
                      <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                        Send a Message
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm resize-none"
                        placeholder="We'll miss you! Wishing you all the best on your special day..."
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-red-500 text-sm font-body text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="btn-gold w-full py-4 rounded-xl font-body font-semibold text-sm tracking-widest uppercase"
                  >
                    {form.attending ? 'Continue →' : 'Submit RSVP'}
                  </button>
                </form>
              )}

              {/* STEP 3: Extras */}
              {step === 'extras' && (
                <div className="space-y-5">
                  <div className="text-center mb-6">
                    <p className="font-script text-champagne-500 text-2xl mb-2">Almost there!</p>
                    <h3 className="font-display text-xl text-mocha-500">A few more details</h3>
                  </div>

                  {collectDietary && (
                    <div>
                      <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                        Dietary Restrictions / Allergies
                      </label>
                      <input
                        type="text"
                        value={form.dietary_restrictions}
                        onChange={(e) => setForm((p) => ({ ...p, dietary_restrictions: e.target.value }))}
                        className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                        placeholder="Vegetarian, gluten-free, nut allergy..."
                      />
                    </div>
                  )}

                  {collectSongRequest && (
                    <div>
                      <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                        🎵 Song Request
                      </label>
                      <input
                        type="text"
                        value={form.song_request}
                        onChange={(e) => setForm((p) => ({ ...p, song_request: e.target.value }))}
                        className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                        placeholder="A song that'll get you on the dance floor!"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">
                      A Message for the Couple
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm resize-none"
                      placeholder="Share your wishes and excitement with the couple..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-body text-center">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="flex-1 py-4 rounded-xl border-2 border-champagne-300/30 font-body font-semibold text-sm text-mocha-400 hover:border-champagne-400 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="flex-2 flex-grow py-4 rounded-xl btn-gold font-body font-semibold text-sm tracking-widest uppercase disabled:opacity-70"
                    >
                      {loading ? 'Sending...' : 'Send RSVP 💌'}
                    </button>
                  </div>
                </div>
              )}

              {/* SUBMITTED */}
              {step === 'submitted' && (
                <div className="text-center py-6">
                  <div className="text-6xl mb-6 animate-bounce-soft">
                    {form.attending ? '🥂' : '💌'}
                  </div>
                  <h3 className="font-display text-3xl text-mocha-500 mb-3">
                    {form.attending ? 'See you there!' : 'We will miss you!'}
                  </h3>
                  <p className="font-script text-champagne-500 text-2xl mb-6">Thank you, {form.guest_name}!</p>
                  <p className="font-body text-mocha-300 text-sm leading-relaxed max-w-sm mx-auto">
                    {form.attending
                      ? "We're so excited to celebrate with you. We'll be in touch with more details soon. 🌸"
                      : "Your warm wishes mean the world to us. We hope to celebrate together another time. 💛"}
                  </p>

                  <div className="flex items-center gap-3 mt-8 justify-center">
                    <div className="h-px w-16 bg-champagne-300" />
                    <span className="font-script text-champagne-400 text-xl">with love</span>
                    <div className="h-px w-16 bg-champagne-300" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
