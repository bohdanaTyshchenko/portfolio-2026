-- Run this in Supabase → SQL Editor
-- Fixes: "new row violates row-level security policy" on image uploads

-- 1. Create the storage bucket (public read)
insert into storage.buckets (id, name, public)
values ('case-study-assets', 'case-study-assets', true)
on conflict (id) do update set public = true;

-- 2. Allow anyone to read uploaded images
drop policy if exists "Public read case study assets" on storage.objects;
create policy "Public read case study assets"
on storage.objects for select
to public
using (bucket_id = 'case-study-assets');

-- 3. Allow CMS uploads via the anon key (no login required)
drop policy if exists "Anon insert case study assets" on storage.objects;
create policy "Anon insert case study assets"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'case-study-assets');

-- 4. Allow upsert (upload with upsert: true overwrites existing files)
drop policy if exists "Anon update case study assets" on storage.objects;
create policy "Anon update case study assets"
on storage.objects for update
to anon, authenticated
using (bucket_id = 'case-study-assets');

-- 5. Optional: allow replacing/deleting assets from the CMS
drop policy if exists "Anon delete case study assets" on storage.objects;
create policy "Anon delete case study assets"
on storage.objects for delete
to anon, authenticated
using (bucket_id = 'case-study-assets');
