-- Create analytics_events table
create table if not exists analytics_events (
  id uuid default gen_random_uuid() primary key,
  event_name text not null,
  path text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table analytics_events enable row level security;

-- Policies
create policy "Allow public insert on analytics" on analytics_events for insert with check (true);
create policy "Allow authenticated select on analytics" on analytics_events for select using (auth.role() = 'authenticated');

-- Cleanup Function
create or replace function delete_old_analytics()
returns void as $$
begin
  -- Delete records older than 2 months
  delete from analytics_events where created_at < now() - interval '2 months';
end;
$$ language plpgsql;

-- Trigger to cleanup on insert (probabilistic to save resources)
create or replace function trigger_cleanup_analytics()
returns trigger as $$
begin
  -- Run cleanup roughly 5% of the time an event is logged
  if (random() < 0.05) then
    perform delete_old_analytics();
  end if;
  return new;
end;
$$ language plpgsql;

create or replace trigger cleanup_analytics_trigger
after insert on analytics_events
for each statement
execute procedure trigger_cleanup_analytics();
