import { MaterialIcon } from "@/components/icons/MaterialIcon";

type HoverTrigger = "group" | "group/link" | "group/case";

type ProfessionalArrowCircleProps = {
  icon?: string;
  size?: "sm" | "md";
  /** Hidden until the hover trigger activates. */
  reveal?: boolean;
  hoverTrigger?: HoverTrigger;
  className?: string;
  iconSize?: number;
};

const circleSizeClass = {
  sm: "size-9 lg:size-[47px]",
  md: "size-[47px]",
};

function hoverFillClasses(trigger: HoverTrigger) {
  switch (trigger) {
    case "group/link":
      return "group-hover/link:border-transparent group-hover/link:bg-p-white group-hover/link:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)] group-focus-visible/link:border-transparent group-focus-visible/link:bg-p-white group-focus-visible/link:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)]";
    case "group/case":
      return "group-hover/case:border-transparent group-hover/case:bg-p-white group-hover/case:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)] group-focus-visible/case:border-transparent group-focus-visible/case:bg-p-white group-focus-visible/case:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)]";
    default:
      return "group-hover:border-transparent group-hover:bg-p-white group-hover:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)]";
  }
}

function revealClasses(trigger: HoverTrigger) {
  switch (trigger) {
    case "group/link":
      return "opacity-0 group-hover/link:opacity-100 group-focus-visible/link:opacity-100";
    case "group/case":
      return "opacity-0 group-hover/case:opacity-100 group-focus-visible/case:opacity-100";
    default:
      return "opacity-0 group-hover:opacity-100";
  }
}

export function ProfessionalArrowCircle({
  icon = "arrow_outward",
  size = "md",
  reveal = false,
  hoverTrigger = "group",
  className = "",
  iconSize = 24,
}: ProfessionalArrowCircleProps) {
  return (
    <span
      className={`pointer-events-none inline-flex shrink-0 items-center justify-center rounded-full border border-p-grey-20 bg-transparent transition-[opacity,background-color,border-color,box-shadow] duration-300 ease-out ${circleSizeClass[size]} ${reveal ? revealClasses(hoverTrigger) : ""} ${hoverFillClasses(hoverTrigger)} ${className}`.trim()}
      aria-hidden
    >
      <MaterialIcon name={icon} size={iconSize} filled />
    </span>
  );
}
