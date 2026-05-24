export interface Wedding {
  id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  bride_full_name: string | null;
  groom_full_name: string | null;
  wedding_date: string;
  ceremony_time: string;
  reception_time: string | null;
  venue_name: string;
  venue_address: string;
  venue_city: string | null;
  venue_country: string | null;
  venue_map_url: string | null;
  venue_lat: number | null;
  venue_lng: number | null;
  dress_code: string | null;
  dress_code_description: string | null;
  dress_code_colors: string[];
  story: string | null;
  tagline: string | null;
  hero_image_url: string | null;
  gallery_images: string[];
  dashboard_password: string;
  rsvp_deadline: string | null;
  max_guests: number | null;
  allow_plus_one: boolean;
  collect_dietary: boolean;
  collect_song_request: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RSVP {
  id: string;
  wedding_id: string;
  guest_name: string;
  email: string | null;
  phone: string | null;
  attending: boolean;
  guest_count: number;
  dietary_restrictions: string | null;
  song_request: string | null;
  message: string | null;
  submitted_at: string;
  ip_address: string | null;
}

export interface RSVPFormData {
  guest_name: string;
  email: string;
  phone: string;
  attending: boolean | null;
  guest_count: number;
  dietary_restrictions: string;
  song_request: string;
  message: string;
}

export interface DashboardStats {
  total_rsvps: number;
  attending_count: number;
  not_attending_count: number;
  total_guests: number;
  response_rate: number;
}
