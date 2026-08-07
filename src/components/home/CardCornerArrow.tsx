import { MaterialIcon } from "../icons/MaterialIcon";

export function CardCornerArrow() {
  return (
    <span
      className="card-corner-arrow pointer-events-none absolute right-4 top-4 z-10 inline-flex items-center justify-center opacity-0 [transform:translate(-6px,6px)] motion-arrow group-hover:opacity-100 group-hover:[transform:translate(0,0)] sm:right-7 sm:top-7 lg:right-9 lg:top-9"
      aria-hidden
    >
      <MaterialIcon name="arrow_outward" size={55} />
    </span>
  );
}
