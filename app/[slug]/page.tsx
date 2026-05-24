import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { Wedding } from '@/lib/types';
import { formatWeddingDate } from '@/lib/utils';

import FloatingPetals from '@/components/ui/FloatingPetals';
import HeroSection from '@/components/invitation/HeroSection';
import CountdownTimer from '@/components/invitation/CountdownTimer';
import StorySection from '@/components/invitation/StorySection';
import EventDetails from '@/components/invitation/EventDetails';
import DressCode from '@/components/invitation/DressCode';
import RSVPForm from '@/components/invitation/RSVPForm';
import InvitationFooter from '@/components/invitation/InvitationFooter';

interface PageProps {
  params: { slug: string };
}

async function getWedding(slug: string): Promise<Wedding | null> {
  const { data, error } = await supabase
    .from('weddings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return data as Wedding;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const wedding = await getWedding(params.slug);
  if (!wedding) return { title: 'Wedding Invitation' };

  return {
    title: `${wedding.bride_name} & ${wedding.groom_name} — Wedding Invitation`,
    description: wedding.tagline || `You're invited to celebrate the wedding of ${wedding.bride_name} & ${wedding.groom_name} on ${formatWeddingDate(wedding.wedding_date)}`,
    openGraph: {
      title: `${wedding.bride_name} & ${wedding.groom_name} 💍`,
      description: wedding.tagline || `Join us on ${formatWeddingDate(wedding.wedding_date)}`,
      images: wedding.hero_image_url ? [wedding.hero_image_url] : [],
    },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const wedding = await getWedding(params.slug);

  if (!wedding) notFound();

  return (
    <main className="min-h-screen bg-ivory-100 relative">
      {/* Floating petals effect */}
      <FloatingPetals />

      {/* Hero */}
      <HeroSection wedding={wedding} />

      {/* Countdown */}
      <CountdownTimer weddingDate={wedding.wedding_date} />

      {/* Story */}
      <StorySection
        story={wedding.story}
        brideFullName={wedding.bride_full_name}
        brideName={wedding.bride_name}
        groomFullName={wedding.groom_full_name}
        groomName={wedding.groom_name}
      />

      {/* Event Details */}
      <EventDetails wedding={wedding} />

      {/* Dress Code */}
      <DressCode wedding={wedding} />

      {/* RSVP Form */}
      <RSVPForm
        weddingId={wedding.id}
        weddingSlug={wedding.slug}
        allowPlusOne={wedding.allow_plus_one}
        collectDietary={wedding.collect_dietary}
        collectSongRequest={wedding.collect_song_request}
        rsvpDeadline={wedding.rsvp_deadline}
      />

      {/* Footer */}
      <InvitationFooter
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        weddingDate={wedding.wedding_date}
      />
    </main>
  );
}

// Revalidate every 60 seconds
export const revalidate = 60;
