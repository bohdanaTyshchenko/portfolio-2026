import { CASE_STUDIES } from "@/data/caseStudies";
import type { CaseStudy } from "@/lib/types";

/**
 * Case studies are served from local data (src/data/caseStudies.ts).
 * The async signatures are kept so callers don't need to change.
 */

export async function fetchPublishedCaseStudies(): Promise<CaseStudy[]> {
  return CASE_STUDIES.filter((study) => study.status === "published").sort(
    (a, b) => a.sort_order - b.sort_order,
  );
}

export async function fetchPublishedCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  return (
    CASE_STUDIES.find(
      (study) => study.slug === slug && study.status === "published",
    ) ?? null
  );
}
