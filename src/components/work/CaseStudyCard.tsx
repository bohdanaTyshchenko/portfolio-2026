"use client";

import Image from "next/image";
import { usePortfolioMode } from "@/lib/portfolioMode";
import { typography } from "@/lib/typography";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { ProfessionalArrowCircle } from "@/components/home/ProfessionalArrowCircle";
import type { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  study: CaseStudy;
  onOpen: (study: CaseStudy) => void;
};

export function CaseStudyCard({ study, onOpen }: CaseStudyCardProps) {
  const { mode } = usePortfolioMode();
  const isProfessional = mode === "professional";

  return (
    <button
      type="button"
      onClick={() => onOpen(study)}
      className="group/case flex w-full flex-col gap-4 text-left sm:gap-5 lg:gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-p-text"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-p-grey-5">
        {study.cover_image_url ? (
          <Image
            src={study.cover_image_url}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            unoptimized
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <h3 className={`${typography.h3} text-p-text`}>
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
            <span className="relative whitespace-nowrap">
              {study.title}
              {isProfessional ? (
                <ProfessionalArrowCircle
                  size="sm"
                  reveal
                  hoverTrigger="group/case"
                  className="absolute left-full top-1/2 ml-2 -translate-y-1/2 sm:ml-3"
                />
              ) : (
                <span className="pointer-events-none absolute left-full top-[calc(50%+2px)] ml-2 inline-flex items-center justify-center opacity-0 [transform:translate(-6px,calc(-50%+6px))] motion-arrow group-hover/case:opacity-100 group-hover/case:[transform:translate(0,-50%)] group-focus-visible/case:opacity-100 group-focus-visible/case:[transform:translate(0,-50%)] sm:ml-3">
                  <MaterialIcon name="arrow_outward" size={40} />
                </span>
              )}
            </span>
          </span>
        </h3>
        <p className={`max-w-2xl ${typography.bodyL} text-p-grey-60`}>
          {study.summary}
        </p>
      </div>
    </button>
  );
}
