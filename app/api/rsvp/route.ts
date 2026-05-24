import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getServerSupabase();

    // Validate required fields
    if (!body.wedding_id || !body.guest_name || body.attending === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: wedding_id, guest_name, attending' },
        { status: 400 }
      );
    }

    // Check wedding exists and is active
    const { data: wedding, error: weddingError } = await supabase
      .from('weddings')
      .select('id, is_active, rsvp_deadline')
      .eq('id', body.wedding_id)
      .single();

    if (weddingError || !wedding) {
      return NextResponse.json({ error: 'Wedding not found' }, { status: 404 });
    }

    if (!wedding.is_active) {
      return NextResponse.json({ error: 'This wedding invitation is no longer active' }, { status: 403 });
    }

    // Check RSVP deadline
    if (wedding.rsvp_deadline && new Date(wedding.rsvp_deadline) < new Date()) {
      return NextResponse.json({ error: 'RSVP deadline has passed' }, { status: 403 });
    }

    // Get IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      null;

    // Insert RSVP
    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        wedding_id: body.wedding_id,
        guest_name: body.guest_name.trim(),
        email: body.email?.trim() || null,
        phone: body.phone?.trim() || null,
        attending: body.attending,
        guest_count: body.attending ? (body.guest_count || 1) : 1,
        dietary_restrictions: body.dietary_restrictions?.trim() || null,
        song_request: body.song_request?.trim() || null,
        message: body.message?.trim() || null,
        ip_address: ip,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already submitted an RSVP for this wedding' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
