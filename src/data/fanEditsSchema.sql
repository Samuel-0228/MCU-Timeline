create table if not exists fan_edits (
  id uuid primary key default gen_random_uuid(),
  video_url text not null,
  title text not null,
  creator text,
  caption text,
  platform text not null check (platform in ('youtube', 'tiktok')),
  youtube_id text,
  tiktok_id text,
  character text not null,
  mood text not null,
  team text not null,
  duration_label text,
  likes integer not null default 0,
  saves integer not null default 0,
  tags text[] not null default '{}',
  status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),
  featured boolean not null default false,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  moderation_tags text[] not null default '{}'
);

create index if not exists fan_edits_status_created_at_idx on fan_edits (status, created_at desc);
create index if not exists fan_edits_created_at_idx on fan_edits (created_at desc);
