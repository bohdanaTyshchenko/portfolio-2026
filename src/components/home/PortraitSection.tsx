"use client";

import Image from "next/image";
import { useDisplayMode, portraitSrcForMode } from "@/lib/portfolioMode";
import { homeCardClass } from "./homeGridStyles";
import { ModeToggle } from "./ModeToggle";

export function PortraitSection() {
  const mode = useDisplayMode();
  const portraitSrc = portraitSrcForMode(mode);

  return (
    <section
      data-guide="portrait"
      className={homeCardClass(
        mode,
        "home-card-portrait relative w-full overflow-hidden",
        "home-card-portrait relative overflow-hidden rounded-[20px]",
        { staticCard: true },
      )}
    >
      <div className="hover-img absolute inset-0">
        <Image
          key={`${mode}-${portraitSrc}`}
          src={portraitSrc}
          alt={mode === "professional" ? "Professional portrait" : "Portrait"}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
          priority
        />
      </div>
      <ModeToggle />
    </section>
  );
}
