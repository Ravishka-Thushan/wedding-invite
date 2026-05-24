import DashboardClient from '@/components/dashboard/DashboardClient';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export const metadata: Metadata = {
  title: 'Dashboard — Wedding Invite',
  robots: { index: false },
};

export default function DashboardPage({ params }: PageProps) {
  return <DashboardClient slug={params.slug} />;
}
