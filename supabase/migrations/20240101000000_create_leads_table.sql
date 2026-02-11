create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  service_type text,
  message text
);

alter table leads enable row level security;

create policy "Enable insert for everyone" on leads for insert with check (true);
create policy "Enable select for authorized users only" on leads for select using (auth.role() = 'authenticated');
