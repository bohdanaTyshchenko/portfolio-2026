"use client";

import type { Ref } from "react";
import { useDisplayMode } from "@/lib/portfolioMode";
import { typography } from "@/lib/typography";
import { GridCard } from "./GridCard";
import { HandDrawnUnderline } from "./HandDrawnUnderline";
import { LinkRow } from "./LinkRow";
import { PortraitSection } from "./PortraitSection";
import { MyWorkCard } from "./MyWorkCard";
import { PanelCornerArrow } from "./PanelCornerArrow";
import { homeCardClass, homeGridClass } from "./homeGridStyles";
import { handleCardKeyDown } from "./openPanelFromCard";

type OpenPanel = "my-work" | "about" | "leadership" | "public-speaking";

type HomeGridProps = {
  gridRef: Ref<HTMLDivElement>;
  workCardRef: Ref<HTMLElement>;
  onOpenPanel: (panel: OpenPanel) => void;
};

export function HomeGrid({ gridRef, workCardRef, onOpenPanel }: HomeGridProps) {
  const mode = useDisplayMode();
  const isProfessional = mode === "professional";

  return (
    <div
      ref={gridRef}
      className={`home-grid mx-auto grid w-full max-w-[1728px] grid-cols-1 lg:h-full lg:min-h-0 lg:grid-cols-3 ${homeGridClass(mode)}`}
    >
      <PortraitSection />

      <MyWorkCard
        cardRef={workCardRef}
        professional={isProfessional}
        onOpen={() => onOpenPanel("my-work")}
      />

      <GridCard
        data-guide="leadership"
        role="button"
        tabIndex={0}
        aria-label="Open leadership philosophy"
        className={`${homeCardClass(
          mode,
          "motion-bg flex cursor-pointer flex-col justify-end bg-p-green p-4 hover:bg-p-green-hover sm:p-7 lg:p-9",
          "relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-p-grey-5 p-4 sm:p-7 lg:p-9",
          { spotlight: true },
        )} group`}
        onClick={() => onOpenPanel("leadership")}
        onKeyDown={(event) =>
          handleCardKeyDown(event, () => onOpenPanel("leadership"))
        }
      >
        <PanelCornerArrow professional={isProfessional} />
        <div className="flex min-h-0 w-full flex-col gap-4">
          <p className={`${typography.h4} uppercase text-p-grey-50`}>
            Leadership
          </p>
          <h2 className={`${typography.h2} text-p-text max-lg:text-h3`}>
            Lead by example,
            <br />
            listen first.
          </h2>
          <p className={`max-w-sm ${typography.bodyL} text-p-grey-60`}>
            How I show up for my team at Dig Insights — and the principles behind
            the way I manage, coach, and grow designers.
          </p>
        </div>
      </GridCard>

      <GridCard
        data-guide="connect"
        className={homeCardClass(
          mode,
          "home-card-connect flex flex-col justify-end overflow-hidden bg-p-white p-4 sm:p-7 lg:p-9",
          "home-card-connect flex flex-col justify-end overflow-hidden rounded-[20px] bg-p-grey-5 p-4 sm:p-7 lg:p-9",
          { staticCard: true },
        )}
      >
        <div className="flex min-h-0 flex-col justify-end gap-1 lg:gap-2">
          <LinkRow
            href="https://www.instagram.com/the.bohdana?igsh=am0zOGx2aWVyMHZ3&utm_source=qr"
            label="Instagram"
            professional={isProfessional}
          />
          <LinkRow
            href="https://www.tiktok.com/@the.bohdana?_t=ZM-8tQ7qCQHnXi&_r=1"
            label="Tiktok"
            professional={isProfessional}
          />
          <LinkRow
            href="https://www.linkedin.com/in/bohdana-tyshchenko/"
            label="Linkedin"
            professional={isProfessional}
          />
          <LinkRow
            href="mailto:hello@bohdana.design"
            label="Email"
            professional={isProfessional}
          />
          <LinkRow
            href="https://drive.google.com/file/d/1w1Lv25BSRLxVa3X_ikBOLDJ4-EmbaEwJ/view?usp=sharing"
            label="resume"
            professional={isProfessional}
          />
        </div>
      </GridCard>

      <GridCard
        data-guide="about"
        role="button"
        tabIndex={0}
        aria-label="Open about"
        className={`${homeCardClass(
          mode,
          "motion-bg group flex cursor-pointer flex-col justify-end overflow-hidden bg-p-pink p-4 hover:brightness-95 sm:p-7 lg:p-9",
          "relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-p-grey-5 p-4 sm:p-7 lg:p-9",
          { spotlight: true },
        )} group`}
        onClick={() => onOpenPanel("about")}
        onKeyDown={(event) =>
          handleCardKeyDown(event, () => onOpenPanel("about"))
        }
      >
        <PanelCornerArrow professional={isProfessional} />
        <div className="relative z-10 flex min-h-0 flex-col gap-4">
          <p className={`${typography.h4} uppercase text-p-grey-50`}>About</p>
          <h2 className={`${typography.h2} text-p-text max-lg:text-h3`}>
            I&apos;m Bohdana,
            <br />a Product
            <br />
            Design Manager.
          </h2>
          <p className={`max-w-md ${typography.bodyL} text-p-grey-60`}>
            Based in Toronto. I spend my days shipping products and building a
            culture where designers thrive. By night I create content that helps
            designers grow.
          </p>
        </div>
      </GridCard>

      <GridCard
        data-guide="public-speaking"
        role="button"
        tabIndex={0}
        aria-label="Open public speaking"
        className={`${homeCardClass(
          mode,
          "motion-bg flex cursor-pointer flex-col justify-end bg-p-white p-4 hover:bg-p-text/[0.03] sm:p-7 lg:p-9",
          "relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-p-grey-5 p-4 sm:p-7 lg:p-9",
          { spotlight: true },
        )} group`}
        onClick={() => onOpenPanel("public-speaking")}
        onKeyDown={(event) =>
          handleCardKeyDown(event, () => onOpenPanel("public-speaking"))
        }
      >
        <PanelCornerArrow professional={isProfessional} />
        <div className="flex min-h-0 flex-col gap-4">
          <p
            className={`relative w-fit overflow-visible ${typography.h4} uppercase text-p-grey-50`}
          >
            Public speaking
            {!isProfessional ? <HandDrawnUnderline /> : null}
          </p>
          <h2 className={`${typography.h2} text-p-text max-lg:text-h3`}>
            Talks, podcasts,
            <br />
            and design events.
          </h2>
          <p className={`max-w-md ${typography.bodyL} text-p-grey-60`}>
            Practical takes on design and careers — on stages, on podcasts,
            and at the design events I organize.
          </p>
        </div>
      </GridCard>
    </div>
  );
}
