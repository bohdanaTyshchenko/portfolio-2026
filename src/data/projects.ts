export type Project = {
  slug: string;
  title: string;
  description: string;
  placeholderColor: "green" | "orange" | "pink" | "blue";
};

export const projects: Project[] = [
  {
    slug: "northline-banking",
    title: "Northline Banking",
    description:
      "Mobile onboarding for a digital bank serving first-time account holders across Canada.",
    placeholderColor: "green",
  },
  {
    slug: "studio-meridian",
    title: "Studio Meridian",
    description:
      "Brand system and marketing site for an architecture practice opening its first public studio.",
    placeholderColor: "orange",
  },
  {
    slug: "relay-health",
    title: "Relay Health",
    description:
      "Patient scheduling tools that reduced no-shows and gave care teams clearer daily visibility.",
    placeholderColor: "pink",
  },
  {
    slug: "atlas-learning",
    title: "Atlas Learning",
    description:
      "Course discovery and progress tracking for an education platform used by working designers.",
    placeholderColor: "blue",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    description:
      "Editorial product for capturing research in the field, from interview clips to synthesis boards.",
    placeholderColor: "green",
  },
  {
    slug: "harbor-weekly",
    title: "Harbor Weekly",
    description:
      "Subscription newsletter experience with flexible reading modes and a calmer paywall flow.",
    placeholderColor: "orange",
  },
];
