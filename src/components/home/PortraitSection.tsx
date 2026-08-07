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
        "home-card-portrait relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:min-h-0",
        "home-card-portrait relative min-h-[480px] overflow-hidden rounded-[20px] lg:min-h-0",
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
