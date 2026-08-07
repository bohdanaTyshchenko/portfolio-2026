"use client";

import Image from "next/image";
import { useState, type Ref } from "react";
import { typography } from "@/lib/typography";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ProfessionalArrowCircle } from "./ProfessionalArrowCircle";
import { FallingCircles } from "./FallingCircles";
import { GridCard } from "./GridCard";

const IMG_WORK = "/images/figma/work-preview.png";

type MyWorkCardProps = {
  cardRef?: Ref<HTMLElement>;
  professional?: boolean;
  onOpen: () => void;
};

export function MyWorkCard({
  cardRef,
  professional = false,
  onOpen,
}: MyWorkCardProps) {
  const [activated, setActivated] = useState(false);
  const [running, setRunning] = useState(false);

  return (
    <GridCard
      ref={cardRef}
      data-guide="my-work"
      role="button"
      tabIndex={0}
      aria-label="Open my work"
      className={`home-card home-card-my-work group relative flex min-h-0 cursor-pointer flex-col justify-end overflow-hidden px-4 py-3 sm:px-7 sm:py-5 lg:h-full lg:px-9 lg:py-11 ${
        professional
          ? "home-card-professional home-card-professional-spotlight rounded-[20px] bg-p-grey-5"
          : "motion-bg bg-p-white hover:bg-p-text/[0.03]"
      }`.trim()}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      onMouseEnter={() => {
        if (professional) {
          return;
        }

        setActivated(true);
        requestAnimationFrame(() => setRunning(true));
      }}
      onMouseLeave={() => setRunning(false)}
    >
      {!professional ? <FallingCircles activated={activated} running={running} /> : null}
      <div className="relative z-10 mx-auto flex w-full max-w-[450px] flex-col gap-5">
        <div className="relative aspect-[450/260] w-full max-w-[380px] shrink-0 overflow-hidden rounded-lg border border-p-grey-10">
          <Image
            src={IMG_WORK}
            alt="Project preview"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 80vw, 380px"
          />
        </div>
        <div className="flex shrink-0 flex-col gap-4">
          <h2 className={`${typography.h2} text-p-text max-lg:text-h3`}>
            {professional ? (
              <span className="inline-flex items-center whitespace-nowrap">
                My work
                <ProfessionalArrowCircle
                  size="sm"
                  className="ml-6 shrink-0"
                />
              </span>
            ) : (
              <span className="relative inline-flex items-center gap-1 sm:gap-2 lg:gap-4">
                My work
                <span className="link-row-arrow pointer-events-none absolute left-full top-1/2 ml-1 inline-flex items-center justify-center opacity-0 [transform:translate(-6px,calc(-50%+6px))] motion-arrow group-hover:opacity-100 group-hover:[transform:translate(0,-50%)] sm:ml-2 lg:ml-4">
                  <MaterialIcon name="arrow_outward" size={55} />
                </span>
              </span>
            )}
          </h2>
          <p className={`${typography.bodyL} text-p-grey-60`}>
            A product design project focused on solving a real user problem. From
            research to release.
          </p>
        </div>
      </div>
    </GridCard>
  );
}
