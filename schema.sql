-- Run this in the Supabase SQL editor

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  level integer not null check (level between 1 and 5),
  discipline text not null,
  challenge_title text not null,
  challenge_data jsonb not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  build_url text,
  build_description text
);

create index if not exists participants_email_idx on participants(email);

-- Allow anonymous insert and read by email (anon key)
alter table participants enable row level security;

create policy "Anyone can insert" on participants
  for insert with check (true);

create policy "Anyone can read by email" on participants
  for select using (true);

create policy "Anyone can update" on participants
  for update using (true);
