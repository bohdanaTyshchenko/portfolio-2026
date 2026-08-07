"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CaseStudyActionsMenu } from "@/components/admin/CaseStudyActionsMenu";
import { AdminShell } from "@/components/admin/AdminShell";
import { SupabaseSetupNotice } from "@/components/admin/SupabaseSetupNotice";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { CaseStudy } from "@/lib/types";

const CARD_COLORS = [
  "bg-p-pink/40",
  "bg-p-blue/35",
  "bg-p-green/50",
  "bg-p-orange/25",
] as const;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: CaseStudy["status"] }) {
  if (status === "published") {
    return (
      <span className="inline-flex rounded-full bg-p-green/60 px-2.5 py-0.5 text-[11px] font-normal uppercase tracking-[0.06em] text-p-grey-80">
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-p-grey-10 px-2.5 py-0.5 text-[11px] font-normal uppercase tracking-[0.06em] text-p-grey-60">
      Draft
    </span>
  );
}

export default function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <AdminShell breadcrumb="Case studies">
        <SupabaseSetupNotice />
      </AdminShell>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchCaseStudies = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from("case_studies")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      alert("Failed to load case studies.");
    } else {
      setCaseStudies((data as CaseStudy[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchCaseStudies();
  }, [fetchCaseStudies]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return caseStudies;

    return caseStudies.filter(
      (study) =>
        study.title.toLowerCase().includes(query) ||
        study.summary.toLowerCase().includes(query) ||
        study.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [caseStudies, search]);

  function openEditor(studyId: string) {
    router.push(`/admin/${studyId}`);
  }

  async function handleDelete(study: CaseStudy) {
    if (!window.confirm(`Delete "${study.title}"? This cannot be undone.`)) {
      return;
    }

    setBusyId(study.id);
    const { error } = await getSupabase()
      .from("case_studies")
      .delete()
      .eq("id", study.id);

    if (error) {
      alert("Failed to delete case study.");
      console.error(error);
    } else {
      setCaseStudies((prev) => prev.filter((item) => item.id !== study.id));
    }
    setBusyId(null);
  }

  async function handleReorder(study: CaseStudy, direction: "up" | "down") {
    const index = caseStudies.findIndex((item) => item.id === study.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= caseStudies.length) return;

    const other = caseStudies[swapIndex];
    setBusyId(study.id);

    const [{ error: errorA }, { error: errorB }] = await Promise.all([
      getSupabase()
        .from("case_studies")
        .update({ sort_order: other.sort_order })
        .eq("id", study.id),
      getSupabase()
        .from("case_studies")
        .update({ sort_order: study.sort_order })
        .eq("id", other.id),
    ]);

    if (errorA || errorB) {
      alert("Failed to reorder case studies.");
      console.error(errorA ?? errorB);
    } else {
      const next = [...caseStudies];
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
      setCaseStudies(next);
    }

    setBusyId(null);
  }

  const topBar = (
    <div className="flex items-center gap-3">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search case studies"
        className="w-52 rounded-lg border border-p-grey-10 bg-p-grey-10/40 px-3 py-2 text-sm text-p-text outline-none placeholder:text-p-grey-50 focus:border-p-grey-50"
      />
      <div className="flex rounded-lg border border-p-grey-10 p-0.5">
        <button
          type="button"
          onClick={() => setView("grid")}
          className={`rounded-md px-3 py-1.5 text-xs ${
            view === "grid"
              ? "bg-p-text text-p-white"
              : "text-p-grey-60 hover:bg-p-grey-10"
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          onClick={() => setView("list")}
          className={`rounded-md px-3 py-1.5 text-xs ${
            view === "list"
              ? "bg-p-text text-p-white"
              : "text-p-grey-60 hover:bg-p-grey-10"
          }`}
        >
          List
        </button>
      </div>
      <Link
        href="/admin/new"
        className="rounded-lg bg-p-text px-4 py-2 text-sm font-medium text-p-white hover:bg-p-grey-80"
      >
        New case study
      </Link>
    </div>
  );

  return (
    <AdminShell breadcrumb="Case studies" topBar={topBar}>
      {loading ? (
        <p className="text-sm text-p-grey-60">Loading case studies…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-p-grey-10 bg-[#fafafa] px-8 py-16 text-center">
          <p className="font-serif text-2xl tracking-[-0.03em] text-p-text">
            {search ? "No matches found" : "No case studies yet"}
          </p>
          <p className="mt-2 text-sm text-p-grey-60">
            {search
              ? "Try a different search term."
              : "Create your first case study to get started."}
          </p>
          {!search && (
            <Link
              href="/admin/new"
              className="mt-6 inline-flex rounded-lg bg-p-text px-4 py-2 text-sm font-medium text-p-white hover:bg-p-grey-80"
            >
              New case study
            </Link>
          )}
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filtered.map((study, filteredIndex) => {
            const index = caseStudies.findIndex((item) => item.id === study.id);
            const color = CARD_COLORS[filteredIndex % CARD_COLORS.length];
            const category = study.tags[0] ?? "Case study";

            return (
              <article
                key={study.id}
                role="link"
                tabIndex={0}
                onClick={() => openEditor(study.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openEditor(study.id);
                  }
                }}
                className={`group flex cursor-pointer flex-col rounded-2xl border border-transparent p-5 motion-admin-card hover:-translate-y-0.5 hover:border-p-grey-10/80 hover:brightness-[0.97] active:translate-y-0 active:brightness-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text ${color}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <p className="text-[11px] font-normal uppercase tracking-[0.12em] text-p-grey-60">
                    {category}
                  </p>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={study.status} />
                    <CaseStudyActionsMenu
                      open={openMenuId === study.id}
                      onOpenChange={(open) =>
                        setOpenMenuId(open ? study.id : null)
                      }
                      canMoveUp={index > 0}
                      canMoveDown={index < caseStudies.length - 1}
                      busy={busyId === study.id}
                      onMoveUp={() => void handleReorder(study, "up")}
                      onMoveDown={() => void handleReorder(study, "down")}
                      onDelete={() => void handleDelete(study)}
                    />
                  </div>
                </div>

                <h2 className="font-serif text-2xl leading-tight tracking-[-0.03em] text-p-text motion-fade group-hover:text-p-grey-80">
                  {study.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-p-grey-80 motion-fade group-hover:text-p-grey-60">
                  {study.summary || "No summary yet."}
                </p>
                <p className="mt-4 text-xs text-p-grey-50">
                  Created {formatDate(study.created_at)}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((study) => {
            const index = caseStudies.findIndex((item) => item.id === study.id);

            return (
              <li
                key={study.id}
                role="link"
                tabIndex={0}
                onClick={() => openEditor(study.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openEditor(study.id);
                  }
                }}
                className="group flex cursor-pointer flex-wrap items-center justify-between gap-4 rounded-2xl border border-p-grey-10 bg-[#fafafa] px-5 py-4 motion-admin-card hover:-translate-y-px hover:border-p-grey-50/25 hover:bg-p-white active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h2 className="font-serif text-lg tracking-[-0.03em] text-p-text motion-fade group-hover:text-p-grey-80">
                      {study.title}
                    </h2>
                    <StatusBadge status={study.status} />
                  </div>
                  <p className="text-xs text-p-grey-50">
                    Created {formatDate(study.created_at)}
                  </p>
                </div>

                <CaseStudyActionsMenu
                  open={openMenuId === study.id}
                  onOpenChange={(open) => setOpenMenuId(open ? study.id : null)}
                  canMoveUp={index > 0}
                  canMoveDown={index < caseStudies.length - 1}
                  busy={busyId === study.id}
                  onMoveUp={() => void handleReorder(study, "up")}
                  onMoveDown={() => void handleReorder(study, "down")}
                  onDelete={() => void handleDelete(study)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </AdminShell>
  );
}
