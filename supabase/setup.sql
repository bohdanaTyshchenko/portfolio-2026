-- Portfolio CMS — run once in Supabase → SQL Editor
-- Fixes: image upload RLS errors + missing section image columns

-- ── Section image columns ──────────────────────────────────────────────────
alter table case_studies
  add column if not exists problem_image_url text,
  add column if not exists process_image_url text,
  add column if not exists outcome_image_url text;

-- ── Storage bucket + upload policies ───────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('case-study-assets', 'case-study-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read case study assets" on storage.objects;
create policy "Public read case study assets"
on storage.objects for select
to public
using (bucket_id = 'case-study-assets');

drop policy if exists "Anon insert case study assets" on storage.objects;
create policy "Anon insert case study assets"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'case-study-assets');

drop policy if exists "Anon update case study assets" on storage.objects;
create policy "Anon update case study assets"
on storage.objects for update
to anon, authenticated
using (bucket_id = 'case-study-assets');

drop policy if exists "Anon delete case study assets" on storage.objects;
create policy "Anon delete case study assets"
on storage.objects for delete
to anon, authenticated
using (bucket_id = 'case-study-assets');

-- ── Case studies table policies ────────────────────────────────────────────
alter table case_studies enable row level security;

drop policy if exists "Public read published case studies" on case_studies;
create policy "Public read published case studies"
on case_studies for select
to public
using (status = 'published');

drop policy if exists "Anon read all case studies" on case_studies;
create policy "Anon read all case studies"
on case_studies for select
to anon, authenticated
using (true);

drop policy if exists "Anon insert case studies" on case_studies;
create policy "Anon insert case studies"
on case_studies for insert
to anon, authenticated
with check (true);

drop policy if exists "Anon update case studies" on case_studies;
create policy "Anon update case studies"
on case_studies for update
to anon, authenticated
using (true);

drop policy if exists "Anon delete case studies" on case_studies;
create policy "Anon delete case studies"
on case_studies for delete
to anon, authenticated
using (true);
