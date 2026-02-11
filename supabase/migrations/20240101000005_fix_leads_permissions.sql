-- Ensure leads table permissions
alter table leads enable row level security;

-- Drop existing policies to avoid conflicts/ensure correct state
drop policy if exists "Enable insert for all users" on leads;
drop policy if exists "Enable read access for authenticated users only" on leads;
drop policy if exists "Allow public insert on leads" on leads;
drop policy if exists "Allow admin select on leads" on leads;

-- Re-create policies
create policy "Allow public insert on leads" on leads for insert with check (true);
create policy "Allow admin select on leads" on leads for select using (auth.role() = 'authenticated');
create policy "Allow admin delete on leads" on leads for delete using (auth.role() = 'authenticated');
