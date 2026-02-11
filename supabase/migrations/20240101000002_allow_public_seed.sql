-- Allow public insert/update/delete for seeding
drop policy if exists "Allow public full access on menu_cuisines" on menu_cuisines;
drop policy if exists "Allow public full access on menu_subcategories" on menu_subcategories;
drop policy if exists "Allow public full access on menu_items" on menu_items;

create policy "Allow public full access on menu_cuisines" on menu_cuisines for all using (true);
create policy "Allow public full access on menu_subcategories" on menu_subcategories for all using (true);
create policy "Allow public full access on menu_items" on menu_items for all using (true);
