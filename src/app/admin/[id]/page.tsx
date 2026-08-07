"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { SectionField } from "@/components/admin/SectionField";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";
import { slugify } from "@/lib/slugify";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  formatCaseStudySaveError,
  insertCaseStudy,
  updateCaseStudy,
} from "@/lib/caseStudySave";
import { uploadCaseStudyImage } from "@/lib/uploadCaseStudyImage";
import type { CaseStudy, CaseStudyStatus } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-p-grey-10 bg-p-grey-10/35 px-4 py-3 text-sm text-p-text outline-none placeholder:text-p-grey-50 focus:border-p-grey-50";

const textareaClass =
  "w-full min-h-40 rounded-xl border border-p-grey-10 bg-p-grey-10/35 px-4 py-4 text-sm leading-relaxed text-p-text outline-none placeholder:text-p-grey-50 focus:border-p-grey-50";

const fileInputClass =
  "text-sm text-p-grey-60 file:mr-4 file:rounded-lg file:border file:border-p-grey-10 file:bg-p-white file:px-4 file:py-2 file:text-sm file:text-p-grey-80 hover:file:bg-p-grey-10";

type UploadingField =
  | "cover"
  | "problem"
  | "process"
  | "outcome"
  | null;

export default function CaseStudyEditorPage() {
  if (!isSupabaseConfigured()) {
    return (
      <AdminShell breadcrumb="Editor">
        <SupabaseSetupNotice />
      </AdminShell>
    );
  }

  return <CaseStudyEditor />;
}

function CaseStudyEditor() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<UploadingField>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [problem, setProblem] = useState("");
  const [problemImageUrl, setProblemImageUrl] = useState<string | null>(null);
  const [process, setProcess] = useState("");
  const [processImageUrl, setProcessImageUrl] = useState<string | null>(null);
  const [outcome, setOutcome] = useState("");
  const [outcomeImageUrl, setOutcomeImageUrl] = useState<string | null>(null);
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<CaseStudyStatus>("draft");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchCaseStudy = useCallback(async () => {
    if (isNew) return;

    setLoading(true);
    const { data, error } = await getSupabase()
      .from("case_studies")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      alert("Case study not found.");
      router.push("/admin");
      return;
    }

    const study = data as CaseStudy;
    setTitle(study.title);
    setSlug(study.slug);
    setSummary(study.summary);
    setCoverImageUrl(study.cover_image_url);
    setProblem(study.problem);
    setProblemImageUrl(study.problem_image_url ?? null);
    setProcess(study.process);
    setProcessImageUrl(study.process_image_url ?? null);
    setOutcome(study.outcome);
    setOutcomeImageUrl(study.outcome_image_url ?? null);
    setTags(study.tags.join(", "));
    setStatus(study.status);
    setSortOrder(study.sort_order);
    setSlugEdited(true);
    setLoading(false);
  }, [isNew, params.id, router]);

  useEffect(() => {
    void fetchCaseStudy();
  }, [fetchCaseStudy]);

  useEffect(() => {
    if (!slugEdited) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  async function getNextSortOrder() {
    const { data } = await getSupabase()
      .from("case_studies")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    const max = data?.[0]?.sort_order ?? 0;
    return max + 1;
  }

  async function handleImageUpload(
    file: File,
    section: UploadingField,
    onComplete: (url: string) => void,
  ) {
    if (!section) return;

    setUploadingField(section);

    try {
      const url = await uploadCaseStudyImage(file, slug, section);
      onComplete(url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown upload error.";
      const rlsHint = message.includes("row-level security")
        ? "\n\nRun supabase/storage_policies.sql in your Supabase SQL Editor."
        : "";
      alert(`Failed to upload ${section} image.\n\n${message}${rlsHint}`);
      console.error(error);
    }

    setUploadingField(null);
  }

  async function handleSave() {
    if (!title.trim() || !slug.trim()) {
      alert("Title and slug are required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim(),
      cover_image_url: coverImageUrl,
      problem: problem.trim(),
      problem_image_url: problemImageUrl,
      process: process.trim(),
      process_image_url: processImageUrl,
      outcome: outcome.trim(),
      outcome_image_url: outcomeImageUrl,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
      sort_order: isNew ? await getNextSortOrder() : sortOrder,
      updated_at: new Date().toISOString(),
    };

    if (isNew) {
      const { data, error, sectionImagesSkipped } =
        await insertCaseStudy(payload);

      if (error || !data) {
        alert(
          `Failed to create case study.\n\n${formatCaseStudySaveError(error ?? {})}`,
        );
        console.error(error);
        setSaving(false);
        return;
      }

      setSaving(false);

      if (sectionImagesSkipped) {
        alert(
          "Case study created, but section images were not saved. Run supabase/add_section_image_columns.sql in Supabase, then save again.",
        );
      }

      router.push(`/admin/${data.id}`);
      return;
    }

    const { error, sectionImagesSkipped } = await updateCaseStudy(
      params.id,
      payload,
    );

    if (error) {
      alert(
        `Failed to save case study.\n\n${formatCaseStudySaveError(error)}`,
      );
      console.error(error);
      setSaving(false);
      return;
    }

    setSaving(false);

    if (sectionImagesSkipped) {
      alert(
        "Saved, but section images were not stored. Run supabase/add_section_image_columns.sql in Supabase, then save again.",
      );
      return;
    }

    alert("Saved.");
  }

  async function handleToggleStatus() {
    const nextStatus: CaseStudyStatus =
      status === "published" ? "draft" : "published";
    setStatus(nextStatus);

    if (isNew) return;

    setSaving(true);
    const { error } = await getSupabase()
      .from("case_studies")
      .update({ status: nextStatus, updated_at: new Date().toISOString() })
      .eq("id", params.id);

    if (error) {
      setStatus(status);
      alert("Failed to update status.");
      console.error(error);
    }
    setSaving(false);
  }

  const uploading = uploadingField !== null;

  const topBar = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => void handleToggleStatus()}
        disabled={saving}
        className="rounded-lg border border-p-grey-10 px-3 py-2 text-sm text-p-grey-80 hover:bg-p-grey-10 disabled:opacity-50"
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={saving || uploading}
        className="rounded-lg bg-p-text px-4 py-2 text-sm font-medium text-p-white hover:bg-p-grey-80 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );

  if (loading) {
    return (
      <AdminShell breadcrumb="Editor" topBar={topBar}>
        <p className="text-sm text-p-grey-60">Loading case study…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      breadcrumb={isNew ? "New case study" : "Edit case study"}
      topBar={topBar}
    >
      <form
        className="mx-auto flex max-w-3xl flex-col gap-8"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
      >
        <section className="flex flex-col gap-3">
          <label className="text-[11px] uppercase tracking-[0.12em] text-p-grey-50">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={inputClass}
            placeholder="Northline Banking"
          />
        </section>

        <section className="flex flex-col gap-3">
          <label className="text-[11px] uppercase tracking-[0.12em] text-p-grey-50">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(event.target.value);
            }}
            className={inputClass}
            placeholder="northline-banking"
          />
        </section>

        <section className="flex flex-col gap-3">
          <label className="text-[11px] uppercase tracking-[0.12em] text-p-grey-50">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className={textareaClass}
            placeholder="A short overview of the project."
          />
        </section>

        <section className="flex flex-col gap-3">
          <label className="text-[11px] uppercase tracking-[0.12em] text-p-grey-50">
            Cover image
          </label>
          {coverImageUrl ? (
            <div className="overflow-hidden rounded-2xl border border-p-grey-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImageUrl}
                alt="Cover preview"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          ) : null}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleImageUpload(file, "cover", setCoverImageUrl);
              }
              event.target.value = "";
            }}
            className={fileInputClass}
          />
          {coverImageUrl ? (
            <button
              type="button"
              disabled={uploading}
              onClick={() => setCoverImageUrl(null)}
              className="w-fit text-xs text-p-grey-60 hover:text-p-text disabled:opacity-40"
            >
              Remove image
            </button>
          ) : null}
          {uploadingField === "cover" ? (
            <p className="text-xs text-p-grey-50">Uploading image…</p>
          ) : null}
        </section>

        <SectionField
          label="Problem"
          value={problem}
          onChange={setProblem}
          imageUrl={problemImageUrl}
          onImageChange={setProblemImageUrl}
          uploading={uploadingField === "problem"}
          onUpload={(file) =>
            handleImageUpload(file, "problem", setProblemImageUrl)
          }
          placeholder="What challenge were you solving?"
        />

        <SectionField
          label="Process"
          value={process}
          onChange={setProcess}
          imageUrl={processImageUrl}
          onImageChange={setProcessImageUrl}
          uploading={uploadingField === "process"}
          onUpload={(file) =>
            handleImageUpload(file, "process", setProcessImageUrl)
          }
          placeholder="How did you approach the work?"
        />

        <SectionField
          label="Outcome"
          value={outcome}
          onChange={setOutcome}
          imageUrl={outcomeImageUrl}
          onImageChange={setOutcomeImageUrl}
          uploading={uploadingField === "outcome"}
          onUpload={(file) =>
            handleImageUpload(file, "outcome", setOutcomeImageUrl)
          }
          placeholder="What changed as a result?"
        />

        <section className="flex flex-col gap-3">
          <label className="text-[11px] uppercase tracking-[0.12em] text-p-grey-50">
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className={inputClass}
            placeholder="product design, fintech, mobile"
          />
          <p className="text-xs text-p-grey-50">Comma-separated</p>
        </section>
      </form>
    </AdminShell>
  );
}
