export type CaseStudyStatus = "draft" | "published";

export type CaseStudyFeature = {
  /** Optional group heading, e.g. "The builder" — shown once when it changes */
  section?: string;
  title: string;
  body: string;
  image_url: string | null;
  /** Optional multi-image set (used instead of image_url when present) */
  images?: string[];
  /**
   * Multi-image arrangement. Default `row` = equal columns side by side.
   * `aside-stack` = first image left; remaining images stacked on the right.
   * `stack` = all images stacked full-width.
   */
  imagesLayout?: "row" | "aside-stack" | "stack";
  /** Optional per-image captions (aligned with `images` by index) */
  imageCaptions?: string[];
  caption?: string;
};

export type CaseStudyResearchSection = {
  title: string;
  body: string;
};

export type CaseStudyResearch = {
  sections: CaseStudyResearchSection[];
  key_user_stories: string[];
  key_user_stories_label?: string;
};

export type CaseStudyVision = {
  intro?: string;
  sections: CaseStudyResearchSection[];
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  /** Client / company name shown under the title */
  company: string;
  /** Short blurb used on the work list cards */
  summary: string;
  cover_image_url: string | null;
  role: string;
  team: string[];
  tools: string[];
  timeline: string;
  /** One-line description in the meta column */
  description: string;
  /** Longer context paragraph in the meta column */
  context: string;
  challenge: string;
  /** Optional approach section body (shown when present) */
  approach?: string;
  /** Optional approach subsections under the Approach heading */
  approachSections?: CaseStudyResearchSection[];
  /** Optional "Making the Case" section */
  makingTheCase?: string;
  constraints: string[];
  research: CaseStudyResearch;
  /** Optional "Defining the Vision" section */
  vision?: CaseStudyVision;
  features: CaseStudyFeature[];
  takeaway: string[];
  /** Optional image grid under the meta section (before Challenge) */
  gallery?: (string | null)[];
  /**
   * Gallery arrangement. Default: 1 = full width, 3 = equal columns.
   * `hero-split` = first image full-width on top; remaining two side by side below.
   */
  galleryLayout?: "row" | "hero-split";
  tags: string[];
  status: CaseStudyStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  /** Legacy fields kept for the admin editor */
  problem: string;
  problem_image_url?: string | null;
  process: string;
  process_image_url?: string | null;
  outcome: string;
  outcome_image_url?: string | null;
};

export type CaseStudyInsert = Omit<CaseStudy, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};
