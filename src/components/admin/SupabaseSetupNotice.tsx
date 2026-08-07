export function SupabaseSetupNotice() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-p-grey-10 bg-[#fafafa] px-8 py-10">
      <h1 className="font-serif text-2xl tracking-[-0.03em] text-p-text">
        Supabase not configured
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-p-grey-60">
        Create a <code className="text-p-text">.env.local</code> file in the
        project root with your Supabase project credentials, then restart the dev
        server.
      </p>
      <pre className="mt-6 overflow-x-auto rounded-xl bg-p-grey-10/50 p-4 text-xs leading-relaxed text-p-grey-80">
        {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
      </pre>
      <p className="mt-4 text-xs text-p-grey-50">
        Find these in Supabase → Project Settings → API (Project URL and anon
        public key).
      </p>
      <p className="mt-4 text-xs leading-relaxed text-p-grey-50">
        If image uploads fail with a row-level security error, run{" "}
        <code className="text-p-text">supabase/storage_policies.sql</code> in
        Supabase → SQL Editor.
      </p>
    </div>
  );
}
