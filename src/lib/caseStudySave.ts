import { getSupabase } from "@/lib/supabase";

type CaseStudySavePayload = {
  title: string;
  slug: string;
  summary: string;
  cover_image_url: string | null;
  problem: string;
  problem_image_url?: string | null;
  process: string;
  process_image_url?: string | null;
  outcome: string;
  outcome_image_url?: string | null;
  tags: string[];
  status: "draft" | "published";
  sort_order: number;
  updated_at: string;
};

function isMissingSectionImageColumnError(message: string | undefined) {
  return Boolean(
    message?.includes("problem_image_url") ||
      message?.includes("process_image_url") ||
      message?.includes("outcome_image_url"),
  );
}

function withoutSectionImages(payload: CaseStudySavePayload) {
  const {
    problem_image_url: _problemImage,
    process_image_url: _processImage,
    outcome_image_url: _outcomeImage,
    ...rest
  } = payload;

  return rest;
}

export function formatCaseStudySaveError(error: {
  message?: string;
  code?: string;
}): string {
  if (
    error.code === "PGRST204" &&
    isMissingSectionImageColumnError(error.message)
  ) {
    return "Section image columns are missing in Supabase. Run supabase/add_section_image_columns.sql in the SQL editor, then try again.";
  }

  return error.message ?? "Unknown error";
}

export async function insertCaseStudy(payload: CaseStudySavePayload) {
  const supabase = getSupabase();

  let result = await supabase
    .from("case_studies")
    .insert(payload)
    .select("id")
    .single();

  if (
    result.error?.code === "PGRST204" &&
    isMissingSectionImageColumnError(result.error.message)
  ) {
    result = await supabase
      .from("case_studies")
      .insert(withoutSectionImages(payload))
      .select("id")
      .single();

    if (!result.error) {
      return {
        ...result,
        sectionImagesSkipped: true as const,
      };
    }
  }

  return { ...result, sectionImagesSkipped: false as const };
}

export async function updateCaseStudy(id: string, payload: CaseStudySavePayload) {
  const supabase = getSupabase();

  let result = await supabase.from("case_studies").update(payload).eq("id", id);

  if (
    result.error?.code === "PGRST204" &&
    isMissingSectionImageColumnError(result.error.message)
  ) {
    result = await supabase
      .from("case_studies")
      .update(withoutSectionImages(payload))
      .eq("id", id);

    if (!result.error) {
      return {
        ...result,
        sectionImagesSkipped: true as const,
      };
    }
  }

  return { ...result, sectionImagesSkipped: false as const };
}
