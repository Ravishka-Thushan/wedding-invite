import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';

interface RouteParams {
  params: { slug: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Wedding not found' }, { status: 404 });
    }

    // Remove sensitive fields
    const { dashboard_password, ...publicData } = data;
    void dashboard_password;

    return NextResponse.json(publicData);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
