-- Run this in Supabase → SQL Editor if saving case studies also fails with RLS errors

alter table case_studies enable row level security;

-- Public can read published case studies (portfolio site)
drop policy if exists "Public read published case studies" on case_studies;
create policy "Public read published case studies"
on case_studies for select
to public
using (status = 'published');

-- CMS can read all case studies (drafts + published)
drop policy if exists "Anon read all case studies" on case_studies;
create policy "Anon read all case studies"
on case_studies for select
to anon, authenticated
using (true);

-- CMS can create case studies
drop policy if exists "Anon insert case studies" on case_studies;
create policy "Anon insert case studies"
on case_studies for insert
to anon, authenticated
with check (true);

-- CMS can update case studies
drop policy if exists "Anon update case studies" on case_studies;
create policy "Anon update case studies"
on case_studies for update
to anon, authenticated
using (true);

-- CMS can delete case studies
drop policy if exists "Anon delete case studies" on case_studies;
create policy "Anon delete case studies"
on case_studies for delete
to anon, authenticated
using (true);
