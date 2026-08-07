import type { CSSProperties } from "react";

type MaterialIconProps = {
  name: string;
  className?: string;
  /** Pixel size (width, height, and font-size). */
  size?: number;
  filled?: boolean;
};

function iconStyle(size?: number, filled = false): CSSProperties {
  const opsz = size ?? 24;
  return {
    fontVariationSettings: `"FILL" ${filled ? 1 : 0}, "wght" 300, "GRAD" 0, "opsz" ${opsz}`,
    ...(size
      ? { fontSize: size, width: size, height: size, lineHeight: `${size}px` }
      : {}),
  };
}

export function MaterialIcon({
  name,
  className = "",
  size,
  filled = false,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined inline-flex shrink-0 items-center justify-center font-normal leading-none ${size ? "" : "text-[1em]"} ${className}`.trim()}
      style={iconStyle(size, filled)}
      aria-hidden
    >
      {name}
    </span>
  );
}
