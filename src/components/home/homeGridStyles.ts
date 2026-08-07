import type { PortfolioMode } from "@/lib/portfolioMode";

export function homeGridClass(mode: PortfolioMode) {
  if (mode === "professional") {
    return "gap-4 px-4 pb-16 pt-4 lg:grid-rows-2 lg:gap-4 lg:p-6 lg:pb-4";
  }

  return "gap-4 px-0 pb-0 pt-0 lg:grid-rows-2 lg:gap-0 lg:p-0";
}

export function homeCardClass(
  mode: PortfolioMode,
  creativeClass: string,
  professionalClass: string,
  options: { spotlight?: boolean; staticCard?: boolean } = {},
) {
  const { spotlight = false, staticCard = false } = options;
  const base = "home-card lg:h-full lg:min-h-0";
  const spotlightClass =
    mode === "professional" && spotlight
      ? " home-card-professional-spotlight"
      : "";
  const staticClass =
    mode === "professional" && staticCard
      ? " home-card-professional-static"
      : "";

  return mode === "professional"
    ? `${base} home-card-professional${spotlightClass}${staticClass} ${professionalClass}`
    : `${base} ${creativeClass}`;
}
