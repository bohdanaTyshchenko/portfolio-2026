alter table case_studies
  add column if not exists problem_image_url text,
  add column if not exists process_image_url text,
  add column if not exists outcome_image_url text;
