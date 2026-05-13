create table public.site_content (
  id integer primary key default 1,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

insert into public.site_content (id, content) values (1, '{}'::jsonb)
  on conflict (id) do nothing;

alter table public.site_content enable row level security;

create policy "Public can read site content"
  on public.site_content for select
  using (true);
