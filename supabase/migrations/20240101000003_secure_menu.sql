-- Revert to restrictive policies
-- Drop the temporary full access policies
drop policy if exists "Allow public full access on menu_cuisines" on menu_cuisines;
drop policy if exists "Allow public full access on menu_subcategories" on menu_subcategories;
drop policy if exists "Allow public full access on menu_items" on menu_items;

-- Ensure public read policies exist (drop first to be safe)
drop policy if exists "Allow public read access on menu_cuisines" on menu_cuisines;
drop policy if exists "Allow public read access on menu_subcategories" on menu_subcategories;
drop policy if exists "Allow public read access on menu_items" on menu_items;

create policy "Allow public read access on menu_cuisines" on menu_cuisines for select using (true);
create policy "Allow public read access on menu_subcategories" on menu_subcategories for select using (true);
create policy "Allow public read access on menu_items" on menu_items for select using (true);

-- Ensure authenticated write policies exist (drop first to be safe)
drop policy if exists "Allow authenticated full access on menu_cuisines" on menu_cuisines;
drop policy if exists "Allow authenticated full access on menu_subcategories" on menu_subcategories;
drop policy if exists "Allow authenticated full access on menu_items" on menu_items;

create policy "Allow authenticated full access on menu_cuisines" on menu_cuisines for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access on menu_subcategories" on menu_subcategories for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access on menu_items" on menu_items for all using (auth.role() = 'authenticated');
