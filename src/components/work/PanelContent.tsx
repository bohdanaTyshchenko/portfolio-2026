"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { usePortfolioMode } from "@/lib/portfolioMode";
import { typography } from "@/lib/typography";

type PanelContentProps = {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  backLabel?: string;
  scrollKey?: string;
  /** Vertical spacing / extras only — horizontal inset is owned by PanelContent. */
  headerClassName?: string;
  /** Vertical spacing / extras only — horizontal inset is owned by PanelContent. */
  contentClassName?: string;
  titleClassName?: string;
  children?: ReactNode;
};

const professionalIconButtonClass =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-p-grey-20 bg-transparent transition-[background-color,border-color,box-shadow,opacity] duration-300 ease-out hover:border-transparent hover:bg-p-white hover:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text size-[47px]";

const funIconButtonClass =
  "inline-flex shrink-0 cursor-pointer items-center justify-center text-p-text motion-feedback hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text";

/**
 * Match home card column width on mobile (grid gutter / card edge):
 * home professional grid uses `px-4`; creative cards use `p-4`/`px-4`.
 */
function panelInsetX(isProfessional: boolean) {
  return isProfessional
    ? "px-4 lg:px-14"
    : "px-4 sm:px-7 lg:px-14";
}

export function PanelContent({
  title,
  onClose,
  onBack,
  backLabel = "Back",
  scrollKey,
  headerClassName,
  contentClassName,
  titleClassName,
  children,
}: PanelContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { mode } = usePortfolioMode();
  const isProfessional = mode === "professional";
  const iconButtonClass = isProfessional
    ? professionalIconButtonClass
    : funIconButtonClass;
  const insetX = panelInsetX(isProfessional);

  useEffect(() => {
    if (scrollKey === undefined) {
      return;
    }

    scrollRef.current?.scrollTo({ top: 0 });
  }, [scrollKey]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-p-white">
      <header
        className={`flex shrink-0 items-center justify-between ${insetX} ${headerClassName ?? "pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]"}`}
      >
        <div className="flex min-w-0 items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label={backLabel}
              className={iconButtonClass}
            >
              <MaterialIcon name="arrow_back" size={24} filled={isProfessional} />
            </button>
          ) : null}
          <h4
            className={`truncate ${typography.h4} text-p-text ${titleClassName ?? ""}`.trim()}
          >
            {title}
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className={iconButtonClass}
        >
          <MaterialIcon name="close" size={24} filled={isProfessional} />
        </button>
      </header>

      {children ? (
        <div
          ref={scrollRef}
          className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain ${insetX} ${contentClassName ?? "py-9 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-11 lg:py-[52px]"}`}
        >
          {children}
        </div>
      ) : (
        <div className="min-h-0 flex-1" />
      )}
    </div>
  );
}
