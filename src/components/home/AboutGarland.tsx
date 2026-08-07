type AboutGarlandProps = {
  className?: string;
};

export function AboutGarland({ className = "" }: AboutGarlandProps) {
  return (
    <div
      className={`about-garland pointer-events-none absolute -left-5 -top-[50px] z-[1] w-[78%] origin-top-left ${className}`.trim()}
      aria-hidden
    >
      <svg
        viewBox="0 0 908 392"
        className="h-auto w-full"
        role="img"
        aria-hidden
      >
        <image
          href="/images/about-garland/garland.png"
          x="0"
          y="0"
          width="908"
          height="392"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}
