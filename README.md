# MILGEC Spring Intake 2027

Full React + TypeScript + Tailwind + Framer Motion + Supabase project for the Spring 2027 campaign landing page.

## Features

- Pixel-close recreation of the campaign design
- Live animated lanterns (Framer Motion – sway, float, glow)
- Animated gradient on **2027**
- About popup
- Get Early Access form → saves to Supabase
- Fully responsive
- Ready for Vercel

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill your Supabase keys
cp .env.example .env

# 3. Run locally
npm run dev
```

Open http://localhost:5173

## Supabase Setup

1. Create a project at https://supabase.com
2. Run this SQL:

```sql
create table applications (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  age integer not null,
  phone text not null,
  email text not null,
  major text not null,
  highest_degree text not null,
  gpa text not null,
  preferred_city text not null,
  preferred_university text,
  optimal_option text,
  created_at timestamptz default now()
);

alter table applications enable row level security;

create policy "Allow public insert"
  on applications for insert
  to anon
  with check (true);
```

3. Put your URL + anon key in `.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import in the Vercel dashboard.  
Remember to add the two environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings.

## Project Structure

```
src/
  components/
    Lanterns.tsx          # Animated Chinese lanterns
    AboutModal.tsx        # About campaign popup
    ApplicationForm.tsx   # Full application form
  lib/
    supabase.ts           # Supabase client
  App.tsx                 # Main layout
  index.css               # Tailwind + custom styles
  main.tsx
```

## Form Fields

- First Name / Last Name
- Age
- Phone
- Email
- Desired Major
- Highest Degree
- Overall GPA
- Preferred China City
- Preferred University (optional)
- Optimal Option / Notes

---

Built for MILGEC 中邦 · Spring Intake 2027
