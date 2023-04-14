create table conference_users (
  id text primary key,
  email text unique,
  "ticketNumber" bigserial,
  name text,
  username text unique,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

create table conference_github_users (
  id uuid primary key default gen_random_uuid(),
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "userData" jsonb
);