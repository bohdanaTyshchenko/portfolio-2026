"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PanelOverlay } from "@/components/work/PanelOverlay";
import { WorkContent } from "@/components/work/WorkContent";
import { AboutContent } from "@/components/panels/AboutContent";
import { LeadershipContent } from "@/components/panels/LeadershipContent";
import { PublicSpeakingContent } from "@/components/panels/PublicSpeakingContent";
import { usePortfolioMode } from "@/lib/portfolioMode";
import { CursorGuide } from "./CursorGuide";
import { HomeGrid } from "./HomeGrid";
import { openPanelFromCard } from "./openPanelFromCard";

type OpenPanel = "my-work" | "about" | "leadership" | "public-speaking";

export function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseSlug = searchParams.get("case");
  const { mode } = usePortfolioMode();
  const gridRef = useRef<HTMLDivElement>(null);
  const workCardRef = useRef<HTMLElement>(null);
  const [openPanel, setOpenPanel] = useState<OpenPanel | null>(null);
  const [panelOrigin, setPanelOrigin] = useState<DOMRect | null>(null);
  const [panelTarget, setPanelTarget] = useState<DOMRect | null>(null);
  const suppressCaseOpen = useRef(false);

  const openPanelByGuide = (guide: OpenPanel) => {
    if (!gridRef.current) {
      return;
    }

    const rects = openPanelFromCard(gridRef.current, guide);

    if (!rects) {
      return;
    }

    suppressCaseOpen.current = false;
    setPanelOrigin(rects.origin);
    setPanelTarget(rects.target);
    setOpenPanel(guide);
  };

  const closePanel = () => {
    if (searchParams.get("case")) {
      suppressCaseOpen.current = true;
      router.replace("/", { scroll: false });
    }

    setOpenPanel(null);
    setPanelOrigin(null);
    setPanelTarget(null);
  };

  const prevModeRef = useRef(mode);

  useEffect(() => {
    if (!caseSlug) {
      suppressCaseOpen.current = false;
      return;
    }

    if (suppressCaseOpen.current || openPanel === "my-work") {
      return;
    }

    openPanelByGuide("my-work");
  }, [caseSlug, openPanel]);

  useEffect(() => {
    if (!openPanel || !gridRef.current) {
      return;
    }

    const updatePanelTarget = () => {
      if (!gridRef.current || !openPanel) {
        return;
      }

      const rects = openPanelFromCard(gridRef.current, openPanel);

      if (rects) {
        setPanelTarget(rects.target);
      }
    };

    window.addEventListener("resize", updatePanelTarget);
    return () => window.removeEventListener("resize", updatePanelTarget);
  }, [openPanel]);

  useEffect(() => {
    if (prevModeRef.current === mode || !openPanel || !gridRef.current) {
      return;
    }

    prevModeRef.current = mode;

    const panel = openPanel;
    const timer = window.setTimeout(() => {
      if (!gridRef.current) {
        return;
      }

      const rects = openPanelFromCard(gridRef.current, panel);

      if (rects) {
        setPanelTarget(rects.target);
      }
    }, 520);

    return () => {
      window.clearTimeout(timer);
    };
  }, [mode, openPanel]);

  return (
    <>
      {!openPanel ? <CursorGuide /> : null}
      <main className="min-h-dvh bg-p-white text-p-text lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
        <HomeGrid
          gridRef={gridRef}
          workCardRef={workCardRef}
          onOpenPanel={openPanelByGuide}
        />
      </main>

      {openPanel && panelOrigin && panelTarget ? (
        <PanelOverlay
          originRect={panelOrigin}
          targetRect={panelTarget}
          onClose={closePanel}
        >
          {(close) => {
            switch (openPanel) {
              case "my-work":
                return <WorkContent onClose={close} initialSlug={caseSlug} />;
              case "about":
                return <AboutContent onClose={close} />;
              case "leadership":
                return <LeadershipContent onClose={close} />;
              case "public-speaking":
                return <PublicSpeakingContent onClose={close} />;
              default:
                return null;
            }
          }}
        </PanelOverlay>
      ) : null}
    </>
  );
}
