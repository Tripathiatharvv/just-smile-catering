-- Create menu_cuisines table
create table if not exists menu_cuisines (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  tagline text,
  icon_name text, -- Store the lucide icon name as string
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create menu_subcategories table
create table if not exists menu_subcategories (
  id uuid default gen_random_uuid() primary key,
  cuisine_id uuid references menu_cuisines(id) on delete cascade not null,
  name text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create menu_items table
create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  subcategory_id uuid references menu_subcategories(id) on delete cascade not null,
  name text not null,
  description text,
  dietary text[] default '{}', -- Array of 'veg', 'non-veg', 'vegan'
  spice_level integer, -- 1, 2, 3
  is_available boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table menu_cuisines enable row level security;
alter table menu_subcategories enable row level security;
alter table menu_items enable row level security;

-- Create policies
-- Public can read everything
create policy "Allow public read access on menu_cuisines" on menu_cuisines for select using (true);
create policy "Allow public read access on menu_subcategories" on menu_subcategories for select using (true);
create policy "Allow public read access on menu_items" on menu_items for select using (true);

-- TEMPORARY: Allow public full access for seeding (will handle restrictions later or via Admin)
create policy "Allow public full access on menu_cuisines" on menu_cuisines for all using (true);
create policy "Allow public full access on menu_subcategories" on menu_subcategories for all using (true);
create policy "Allow public full access on menu_items" on menu_items for all using (true);

-- Authenticated users (Admin) can do everything
create policy "Allow authenticated full access on menu_cuisines" on menu_cuisines for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access on menu_subcategories" on menu_subcategories for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access on menu_items" on menu_items for all using (auth.role() = 'authenticated');
