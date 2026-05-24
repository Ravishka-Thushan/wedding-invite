-- ============================================
-- WEDDING INVITE - SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- WEDDINGS TABLE
-- ============================================
CREATE TABLE weddings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  
  -- Couple Info
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  bride_full_name TEXT,
  groom_full_name TEXT,
  
  -- Event Details
  wedding_date TIMESTAMPTZ NOT NULL,
  ceremony_time TEXT NOT NULL DEFAULT '4:00 PM',
  reception_time TEXT,
  
  -- Venue
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  venue_city TEXT,
  venue_country TEXT,
  venue_map_url TEXT,
  venue_lat DECIMAL(10, 8),
  venue_lng DECIMAL(11, 8),
  
  -- Style & Content
  dress_code TEXT,
  dress_code_description TEXT,
  dress_code_colors TEXT[] DEFAULT '{}',
  story TEXT,
  tagline TEXT,
  
  -- Media
  hero_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  
  -- Dashboard Access
  dashboard_password TEXT NOT NULL,
  
  -- Settings
  rsvp_deadline TIMESTAMPTZ,
  max_guests INTEGER,
  allow_plus_one BOOLEAN DEFAULT true,
  collect_dietary BOOLEAN DEFAULT true,
  collect_song_request BOOLEAN DEFAULT true,
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RSVPs TABLE
-- ============================================
CREATE TABLE rsvps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  
  -- Guest Info
  guest_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  
  -- RSVP Details
  attending BOOLEAN NOT NULL,
  guest_count INTEGER DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 10),
  
  -- Additional Info
  dietary_restrictions TEXT,
  song_request TEXT,
  message TEXT,
  
  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  
  CONSTRAINT unique_guest_per_wedding UNIQUE (wedding_id, email)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Weddings: Anyone can read active weddings (for invitation page)
CREATE POLICY "Public can view active weddings"
  ON weddings FOR SELECT
  USING (is_active = true);

-- RSVPs: Anyone can insert (submit RSVP)
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps FOR INSERT
  WITH CHECK (true);

-- RSVPs: Anyone can read (for dashboard - we'll handle auth in app layer)
CREATE POLICY "Public can view RSVPs"
  ON rsvps FOR SELECT
  USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_weddings_slug ON weddings(slug);
CREATE INDEX idx_rsvps_wedding_id ON rsvps(wedding_id);
CREATE INDEX idx_rsvps_attending ON rsvps(attending);

-- ============================================
-- UPDATED AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER weddings_updated_at
  BEFORE UPDATE ON weddings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
INSERT INTO weddings (
  slug,
  bride_name,
  groom_name,
  bride_full_name,
  groom_full_name,
  wedding_date,
  ceremony_time,
  reception_time,
  venue_name,
  venue_address,
  venue_city,
  venue_country,
  venue_map_url,
  dress_code,
  dress_code_description,
  dress_code_colors,
  story,
  tagline,
  dashboard_password,
  allow_plus_one,
  collect_dietary,
  collect_song_request
) VALUES (
  'ravishka-dilshan',
  'Ravishka',
  'Dilshan',
  'Ravishka Perera',
  'Dilshan Silva',
  '2025-03-15 16:00:00+05:30',
  '4:00 PM',
  '7:00 PM',
  'Grand Ballroom, Cinnamon Grand',
  '77 Galle Rd, Colombo 00300',
  'Colombo',
  'Sri Lanka',
  'https://maps.google.com/?q=Cinnamon+Grand+Colombo',
  'Black Tie Optional',
  'We invite you to dress elegantly for our special evening. Formal attire or cocktail dress welcome.',
  ARRAY['#2C1810', '#C9A96E', '#F2C4CE', '#FFFFFF'],
  'Our love story began with a chance encounter at a mutual friend''s gathering in 2019. What started as a shy smile across the room blossomed into the most beautiful journey of our lives. Five years later, surrounded by family and friends who have supported us every step of the way, we are ready to say "I do" and begin our forever together.',
  'Two souls, one beautiful journey ✨',
  'demo123',
  true,
  true,
  true
);
