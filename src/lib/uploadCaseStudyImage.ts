import { getSupabase } from "@/lib/supabase";

export async function uploadCaseStudyImage(
  file: File,
  slug: string,
  section: string,
): Promise<string> {
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `${slug || "case-study"}-${section}-${Date.now()}.${extension}`;

  const { error: uploadError } = await getSupabase().storage
    .from("case-study-assets")
    .upload(path, file, { upsert: true });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = getSupabase().storage
    .from("case-study-assets")
    .getPublicUrl(path);

  return data.publicUrl;
}
