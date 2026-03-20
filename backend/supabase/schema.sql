-- Dotzza Brand Hub — Supabase Schema
-- Run this in your Supabase SQL editor to set up all required tables

-- ── imports: stores uploaded assets per section ──────────────────
create table if not exists imports (
  id          uuid primary key default gen_random_uuid(),
  section     text not null,
  file_name   text not null,
  file_type   text not null,
  file_url    text default '',
  logo_kind   text default '',
  content     text default '',
  created_at  timestamptz default now()
);

-- ── hidden_cards: tracks deleted UI cards ────────────────────────
create table if not exists hidden_cards (
  id            uuid primary key default gen_random_uuid(),
  element_class text not null unique,
  created_at    timestamptz default now()
);

-- ── sub_brands: custom sub-brand entries ─────────────────────────
create table if not exists sub_brands (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  color      text default '#8B72D8',
  logo_url   text default '',
  active     boolean default false,
  created_at timestamptz default now()
);

-- ── Storage bucket for uploaded assets ───────────────────────────
-- Run this separately in Supabase Dashboard → Storage → New bucket
-- Bucket name: assets
-- Public: true
