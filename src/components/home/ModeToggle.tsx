"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { usePortfolioMode, useDisplayMode } from "@/lib/portfolioMode";

export function ModeToggle({ className = "" }: { className?: string }) {
  const { toggleMode } = usePortfolioMode();
  const mode = useDisplayMode();
  const isProfessional = mode === "professional";

  return (
    <button
      type="button"
      aria-label={
        isProfessional
          ? "Switch to creative mode"
          : "Switch to professional mode"
      }
      aria-pressed={isProfessional || undefined}
      onClick={toggleMode}
      className={`mode-toggle absolute left-4 top-6 z-30 h-[43px] w-[83px] shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text lg:left-4 lg:top-6 ${className}`.trim()}
    >
      <span
        className={`mode-toggle-track absolute inset-0 rounded-[8px] ${
          isProfessional ? "bg-p-grey-20" : "bg-p-pink-50"
        }`}
        aria-hidden
      />

      <span
        className={`mode-toggle-disc absolute flex items-center justify-center rounded-[6px] bg-p-white shadow-[0_4px_2px_rgba(0,0,0,0.1)] ${
          isProfessional ? "mode-toggle-disc--left" : "mode-toggle-disc--right"
        }`}
        aria-hidden
      >
        <MaterialIcon
          key={mode}
          name={isProfessional ? "work" : "star"}
          size={21}
          filled
          className={`mode-toggle-icon ${
            isProfessional ? "text-p-text" : "text-p-pink"
          }`}
        />
      </span>
    </button>
  );
}
