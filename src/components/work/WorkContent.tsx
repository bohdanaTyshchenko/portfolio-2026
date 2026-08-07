"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { CaseStudyExpand } from "./CaseStudyExpand";
import { PanelContent } from "./PanelContent";
import {
  fetchPublishedCaseStudies,
  fetchPublishedCaseStudyBySlug,
} from "@/lib/caseStudies";
import { typography } from "@/lib/typography";
import type { CaseStudy } from "@/lib/types";

type WorkContentProps = {
  onClose: () => void;
  initialSlug?: string | null;
};

const PLACEHOLDER_COLORS = ["green", "orange", "pink", "blue"] as const;
const ANIMATION_MS = 520;

function scheduleOpen(setDetailOpen: (open: boolean) => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setDetailOpen(true);
    });
  });
}

export function WorkContent({ onClose, initialSlug = null }: WorkContentProps) {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [mountedSlug, setMountedSlug] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [listScrollKey, setListScrollKey] = useState(0);
  const closeTimer = useRef<number | null>(null);
  const previousInitialSlug = useRef(initialSlug);

  const showingDetail = Boolean(mountedSlug);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openStudy = useCallback(
    (study: CaseStudy) => {
      clearCloseTimer();
      setSelectedStudy(study);
      setMountedSlug(study.slug);
      setLoadingDetail(false);
      setDetailOpen(false);
      scheduleOpen(setDetailOpen);
      router.replace(`/?case=${study.slug}`, { scroll: false });
    },
    [router],
  );

  const backToList = useCallback(() => {
    clearCloseTimer();
    setDetailOpen(false);
    router.replace("/", { scroll: false });

    closeTimer.current = window.setTimeout(() => {
      setSelectedStudy(null);
      setMountedSlug(null);
      setListScrollKey((key) => key + 1);
      closeTimer.current = null;
    }, ANIMATION_MS);
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      const studies = await fetchPublishedCaseStudies();
      if (!cancelled) {
        setCaseStudies(studies);
        setLoadingList(false);
      }
    }

    void loadList();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const previousSlug = previousInitialSlug.current;
    previousInitialSlug.current = initialSlug;

    if (!initialSlug) {
      if (previousSlug && mountedSlug) {
        setDetailOpen(false);

        closeTimer.current = window.setTimeout(() => {
          setSelectedStudy(null);
          setMountedSlug(null);
          setListScrollKey((key) => key + 1);
          closeTimer.current = null;
        }, ANIMATION_MS);
      }

      return;
    }

    clearCloseTimer();

    const fromList = caseStudies.find((study) => study.slug === initialSlug);

    if (fromList) {
      setSelectedStudy(fromList);
      setLoadingDetail(false);
    } else if (selectedStudy?.slug !== initialSlug) {
      let cancelled = false;
      setLoadingDetail(true);

      void fetchPublishedCaseStudyBySlug(initialSlug).then((study) => {
        if (!cancelled) {
          setSelectedStudy(study);
          setLoadingDetail(false);
        }
      });

      return () => {
        cancelled = true;
      };
    } else {
      setLoadingDetail(false);
    }

    if (mountedSlug !== initialSlug) {
      setMountedSlug(initialSlug);
      setDetailOpen(false);
      scheduleOpen(setDetailOpen);
    } else if (!detailOpen) {
      scheduleOpen(setDetailOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSlug, caseStudies]);

  const placeholderColor =
    PLACEHOLDER_COLORS[
      Math.max(
        0,
        caseStudies.findIndex((study) => study.id === selectedStudy?.id),
      ) % PLACEHOLDER_COLORS.length
    ];

  return (
    <PanelContent
      title={selectedStudy?.title ?? "My work"}
      onClose={onClose}
      onBack={showingDetail ? backToList : undefined}
      backLabel="Back to my work"
      scrollKey={
        showingDetail ? `detail-${mountedSlug}` : `list-${listScrollKey}`
      }
      headerClassName="px-14 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]"
      contentClassName={`px-14 pb-[max(2rem,env(safe-area-inset-bottom))] ${
        showingDetail ? "pt-10 lg:pt-14" : "pt-6 lg:pt-10"
      }`}
    >
      <div className="mx-auto w-full min-w-0 max-w-[1040px]">
        {showingDetail ? (
          <CaseStudyExpand expandKey={mountedSlug ?? "detail"} open={detailOpen}>
            {loadingDetail || !selectedStudy ? (
              <p className={`${typography.bodyS} text-p-grey-60`}>
                Loading case study…
              </p>
            ) : (
              <CaseStudyDetail
                study={selectedStudy}
                placeholderColor={placeholderColor}
              />
            )}
          </CaseStudyExpand>
        ) : loadingList ? (
          <p className={`${typography.bodyS} text-p-grey-60`}>
            Loading case studies…
          </p>
        ) : caseStudies.length === 0 ? (
          <p className={`${typography.bodyS} text-p-grey-60`}>
            No published case studies yet.
          </p>
        ) : (
          <ul className="flex w-full flex-col gap-12 sm:gap-14 lg:gap-20">
            {caseStudies.map((study, index) => (
              <li key={study.id}>
                <CaseStudyCard
                  study={study}
                  placeholderColor={
                    PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]
                  }
                  onOpen={openStudy}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </PanelContent>
  );
}
