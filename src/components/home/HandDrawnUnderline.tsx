export function HandDrawnUnderline() {
  return (
    <svg
      className="draw-on-hover-svg pointer-events-none absolute -bottom-1 left-0 h-3 w-full overflow-visible sm:-bottom-1.5 sm:h-3.5 lg:-bottom-2 lg:h-4"
      viewBox="0 0 200 20"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        className="draw-on-hover-path"
        pathLength="100"
        d="M 0 12
           C 18 7 34 14 52 9
           C 70 5 86 13 102 8
           C 118 4 134 12 150 8
           C 166 5 182 13 200 9"
        stroke="#ff552a"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
