export type GuideColor = "orange" | "green" | "pink" | "blue" | "yellow";

export type GuideColorStyle = {
  bg: string;
  /** Slightly darker than `bg` for the pill outline */
  border: string;
  text: string;
};

export const GUIDE_COLORS: Record<GuideColor, GuideColorStyle> = {
  orange: { bg: "#ff552a", border: "#e04420", text: "#ffffff" },
  green: { bg: "#def283", border: "#c4d96a", text: "#111111" },
  pink: { bg: "#ff9fc0", border: "#e889a8", text: "#111111" },
  blue: { bg: "#6fb4f4", border: "#4f9ae0", text: "#ffffff" },
  yellow: { bg: "#def283", border: "#c4d96a", text: "#111111" },
};

export type GuideEntry = {
  text: string;
  color: GuideColor;
};

// Edit the text and color per box here (keys match data-guide on grid tiles).
export const GUIDE: Record<string, GuideEntry> = {
  // Hero
  about: {
    text: "i'm very fun, I swear",
    color: "blue",
  },
  // Leadership Philosophy
  leadership: {
    text: "i lead a design team — somehow they still like me",
    color: "blue",
  },
  // Public Speaking
  "public-speaking": {
    text: "they gave me a mic. big mistake.",
    color: "orange",
  },
  // Photo
  portrait: {
    text: "hey, that's me — welcome to my portfolio :)",
    color: "pink",
  },
  // My Work
  "my-work": { text: "the good stuff lives here", color: "orange" },
  // Connect (links card)
  connect: { text: "let's connect and be friends :)", color: "yellow" },
};
