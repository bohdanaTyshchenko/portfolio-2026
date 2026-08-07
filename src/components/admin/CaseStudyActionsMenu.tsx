"use client";

import { useEffect, useId, useRef } from "react";

type CaseStudyActionsMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  busy: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
};

export function CaseStudyActionsMenu({
  open,
  onOpenChange,
  canMoveUp,
  canMoveDown,
  busy,
  onMoveUp,
  onMoveDown,
  onDelete,
}: CaseStudyActionsMenuProps) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="Case study actions"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        disabled={busy}
        onClick={(event) => {
          event.stopPropagation();
          onOpenChange(!open);
        }}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-p-grey-10 bg-p-white/70 text-p-grey-60 hover:bg-p-white disabled:opacity-40"
      >
        <span aria-hidden className="text-base leading-none tracking-widest">
          ···
        </span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          onClick={(event) => event.stopPropagation()}
          className="absolute right-0 top-full z-20 mt-1 min-w-[9rem] rounded-xl border border-p-grey-10 bg-p-white py-1"
        >
          <button
            type="button"
            role="menuitem"
            disabled={!canMoveUp || busy}
            onClick={() => {
              onMoveUp();
              onOpenChange(false);
            }}
            className="block w-full px-3 py-2 text-left text-xs text-p-grey-80 hover:bg-p-grey-10 disabled:opacity-40"
          >
            Move up
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={!canMoveDown || busy}
            onClick={() => {
              onMoveDown();
              onOpenChange(false);
            }}
            className="block w-full px-3 py-2 text-left text-xs text-p-grey-80 hover:bg-p-grey-10 disabled:opacity-40"
          >
            Move down
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={busy}
            onClick={() => {
              onDelete();
              onOpenChange(false);
            }}
            className="block w-full px-3 py-2 text-left text-xs text-p-grey-80 hover:bg-p-grey-10 disabled:opacity-40"
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
