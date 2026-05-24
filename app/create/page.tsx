'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/utils';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  bride_name: string;
  groom_name: string;
  bride_full_name: string;
  groom_full_name: string;
  wedding_date: string;
  ceremony_time: string;
  reception_time: string;
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_country: string;
  venue_map_url: string;
  dress_code: string;
  dress_code_description: string;
  story: string;
  tagline: string;
  dashboard_password: string;
  allow_plus_one: boolean;
  collect_dietary: boolean;
  collect_song_request: boolean;
}

const INITIAL: FormData = {
  bride_name: '', groom_name: '',
  bride_full_name: '', groom_full_name: '',
  wedding_date: '', ceremony_time: '4:00 PM', reception_time: '7:00 PM',
  venue_name: '', venue_address: '', venue_city: '', venue_country: '',
  venue_map_url: '',
  dress_code: '', dress_code_description: '',
  story: '', tagline: '',
  dashboard_password: '',
  allow_plus_one: true, collect_dietary: true, collect_song_request: true,
};

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleCreate = async () => {
    setLoading(true);
    setError('');

    const slug = `${slugify(form.bride_name)}-${slugify(form.groom_name)}`;

    try {
      // Check if slug already exists and add suffix if needed
      let finalSlug = slug;
      const { data: existing } = await supabase
        .from('weddings')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existing) {
        finalSlug = `${slug}-${Date.now().toString(36)}`;
      }

      const { error: insertError } = await supabase.from('weddings').insert({
        slug: finalSlug,
        bride_name: form.bride_name.trim(),
        groom_name: form.groom_name.trim(),
        bride_full_name: form.bride_full_name.trim() || null,
        groom_full_name: form.groom_full_name.trim() || null,
        wedding_date: new Date(form.wedding_date).toISOString(),
        ceremony_time: form.ceremony_time,
        reception_time: form.reception_time || null,
        venue_name: form.venue_name.trim(),
        venue_address: form.venue_address.trim(),
        venue_city: form.venue_city.trim() || null,
        venue_country: form.venue_country.trim() || null,
        venue_map_url: form.venue_map_url.trim() || null,
        dress_code: form.dress_code.trim() || null,
        dress_code_description: form.dress_code_description.trim() || null,
        story: form.story.trim() || null,
        tagline: form.tagline.trim() || null,
        dashboard_password: form.dashboard_password.trim(),
        allow_plus_one: form.allow_plus_one,
        collect_dietary: form.collect_dietary,
        collect_song_request: form.collect_song_request,
        dress_code_colors: [],
        gallery_images: [],
      });

      if (insertError) throw insertError;

      router.push(`/created?slug=${finalSlug}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg);
      setLoading(false);
    }
  };

  const steps = [
    { n: 1, label: 'The Couple' },
    { n: 2, label: 'The Event' },
    { n: 3, label: 'The Story' },
    { n: 4, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b border-champagne-300/20"
        style={{ background: 'rgba(255,249,240,0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-2xl mx-auto px-6 py-4">
          <a href="/" className="font-script text-champagne-600 text-xl">← Wedding Invite</a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="font-script text-champagne-500 text-3xl mb-2">Create Your</p>
          <h1 className="font-display text-4xl text-mocha-500 font-light">Wedding Invitation</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-body font-bold transition-all ${step >= s.n
                    ? 'bg-champagne-500 text-white shadow-gold'
                    : 'bg-white border-2 border-champagne-300/30 text-mocha-300'
                    }`}
                >
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className="font-body text-xs text-mocha-300 mt-1 hidden sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s.n ? 'bg-champagne-400' : 'bg-champagne-300/20'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-8 shadow-soft border border-champagne-300/15">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-mocha-500 mb-6">The Couple</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Bride's First Name *" value={form.bride_name} onChange={(v) => set('bride_name', v)} placeholder="Ravishka" />
                <Field label="Groom's First Name *" value={form.groom_name} onChange={(v) => set('groom_name', v)} placeholder="Dilshan" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Bride's Full Name" value={form.bride_full_name} onChange={(v) => set('bride_full_name', v)} placeholder="Ravishka Perera" />
                <Field label="Groom's Full Name" value={form.groom_full_name} onChange={(v) => set('groom_full_name', v)} placeholder="Dilshan Silva" />
              </div>
              <div className="pt-2">
                <p className="font-body text-xs text-mocha-200 bg-ivory-100 rounded-xl p-3">
                  💡 Your invitation URL will be: <span className="text-champagne-600 font-semibold">yoursite.com/{form.bride_name ? slugify(form.bride_name) : 'bride'}-{form.groom_name ? slugify(form.groom_name) : 'groom'}</span>
                </p>
              </div>
              <NavButtons
                onNext={() => {
                  if (!form.bride_name || !form.groom_name) { setError('Please enter both names'); return; }
                  setError(''); setStep(2);
                }}
                showBack={false}
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-mocha-500 mb-6">The Event</h2>
              <Field label="Wedding Date *" type="date" value={form.wedding_date} onChange={(v) => set('wedding_date', v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ceremony Time" value={form.ceremony_time} onChange={(v) => set('ceremony_time', v)} placeholder="4:00 PM" />
                <Field label="Reception Time" value={form.reception_time} onChange={(v) => set('reception_time', v)} placeholder="7:00 PM" />
              </div>
              <Field label="Venue Name *" value={form.venue_name} onChange={(v) => set('venue_name', v)} placeholder="Grand Ballroom, Cinnamon Grand" />
              <Field label="Venue Address *" value={form.venue_address} onChange={(v) => set('venue_address', v)} placeholder="77 Galle Rd, Colombo 00300" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={form.venue_city} onChange={(v) => set('venue_city', v)} placeholder="Colombo" />
                <Field label="Country" value={form.venue_country} onChange={(v) => set('venue_country', v)} placeholder="Sri Lanka" />
              </div>
              <Field label="Google Maps Link" value={form.venue_map_url} onChange={(v) => set('venue_map_url', v)} placeholder="https://maps.google.com/..." />
              <NavButtons
                onBack={() => { setError(''); setStep(1); }}
                onNext={() => {
                  if (!form.wedding_date || !form.venue_name || !form.venue_address) { setError('Please fill in all required fields'); return; }
                  setError(''); setStep(3);
                }}
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-mocha-500 mb-6">Your Story</h2>
              <Field label="Tagline" value={form.tagline} onChange={(v) => set('tagline', v)} placeholder="Two souls, one beautiful journey ✨" />
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">Your Love Story</label>
                <textarea
                  rows={5}
                  value={form.story}
                  onChange={(e) => set('story', e.target.value)}
                  className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm resize-none"
                  placeholder="Share how you met, your journey, and what makes your love special..."
                />
              </div>
              <Field label="Dress Code" value={form.dress_code} onChange={(v) => set('dress_code', v)} placeholder="Black Tie Optional" />
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">Dress Code Details</label>
                <textarea
                  rows={2}
                  value={form.dress_code_description}
                  onChange={(e) => set('dress_code_description', e.target.value)}
                  className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm resize-none"
                  placeholder="Please dress elegantly. Formal or cocktail attire is welcome..."
                />
              </div>
              <NavButtons onBack={() => { setError(''); setStep(2); }} onNext={() => { setError(''); setStep(4); }} />
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl text-mocha-500 mb-6">Settings</h2>

              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">Dashboard Password *</label>
                <input
                  type="password"
                  value={form.dashboard_password}
                  onChange={(e) => set('dashboard_password', e.target.value)}
                  className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
                  placeholder="Create a password to protect your dashboard"
                />
                <p className="font-body text-xs text-mocha-200 mt-1">You&apos;ll use this to log in to your dashboard.</p>
              </div>

              <div className="bg-ivory-100 rounded-xl p-5 space-y-4">
                <p className="font-body text-sm font-semibold text-mocha-400">RSVP Options</p>
                {[
                  { key: 'allow_plus_one', label: 'Allow guests to bring extra guests', value: form.allow_plus_one },
                  { key: 'collect_dietary', label: 'Collect dietary restrictions', value: form.collect_dietary },
                  { key: 'collect_song_request', label: 'Collect song requests', value: form.collect_song_request },
                ].map(({ key, label, value }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => set(key as keyof FormData, !value)}
                      className={`w-10 h-6 rounded-full transition-all cursor-pointer ${value ? 'bg-champagne-500' : 'bg-mocha-100'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-all shadow ${value ? 'ml-5' : 'ml-1'}`} />
                    </div>
                    <span className="font-body text-sm text-mocha-400">{label}</span>
                  </label>
                ))}
              </div>

              {error && <p className="text-red-400 text-sm font-body text-center">{error}</p>}

              <NavButtons
                onBack={() => { setError(''); setStep(3); }}
                onNext={() => {
                  if (!form.dashboard_password) { setError('Please create a dashboard password'); return; }
                  handleCreate();
                }}
                nextLabel={loading ? 'Creating...' : 'Create Invitation 🎉'}
                disabled={loading}
              />
            </div>
          )}

          {error && step !== 4 && (
            <p className="text-red-400 text-sm font-body text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block font-body text-xs tracking-widest uppercase text-mocha-300 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-elegant w-full rounded-xl px-4 py-3 font-body text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

function NavButtons({ onBack, onNext, showBack = true, nextLabel = 'Continue →', disabled = false }: {
  onBack?: () => void; onNext?: () => void; showBack?: boolean; nextLabel?: string; disabled?: boolean;
}) {
  return (
    <div className="flex gap-3 pt-4">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 rounded-xl border-2 border-champagne-300/30 font-body text-sm text-mocha-400 hover:border-champagne-400 transition-colors"
        >
          ← Back
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className="flex-1 py-3 rounded-xl btn-gold font-body font-semibold text-sm disabled:opacity-70"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
