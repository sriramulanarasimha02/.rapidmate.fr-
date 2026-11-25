-- RapidMate B2B Restaurant Rider Booking Leads Schema (Supabase / PostgreSQL)

create extension if not exists "pgcrypto";

create table if not exists public.rider_leads (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  restaurant_name text not null,
  contact_person text not null,
  business_email text not null,
  phone_number text not null,
  restaurant_type text not null check (
    restaurant_type in (
      'Pizza Restaurant',
      'Sushi Restaurant',
      'Cloud Kitchen',
      'Restaurant Franchise',
      'Independent Restaurant',
      'Other'
    )
  ),
  restaurant_address text not null,
  city text not null,
  locations_count text not null check (
    locations_count in ('1', '2-5', '6-10', '10+')
  ),
  riders_needed text not null check (
    riders_needed in ('1-2', '3-5', '6-10', '10+')
  ),
  needed_slots text[] not null check (array_length(needed_slots, 1) >= 1),
  preferred_start_date date not null,
  additional_info text,
  gdpr_consent boolean not null check (gdpr_consent = true),
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists rider_leads_submitted_at_idx
  on public.rider_leads (submitted_at desc);

create index if not exists rider_leads_business_email_idx
  on public.rider_leads (business_email);

-- Enable Row Level Security; only server-side service role inserts/reads by default
alter table public.rider_leads enable row level security;

drop policy if exists "Service role full access on rider_leads" on public.rider_leads;
create policy "Service role full access on rider_leads"
  on public.rider_leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
