"use client";

import { useEffect, useRef, useState } from "react";
import { GUIDE, GUIDE_COLORS, type GuideEntry } from "./cursorGuideConfig";

const OFFSET_X = 10;
const OFFSET_Y = 10;

export function CursorGuide() {
  const [entry, setEntry] = useState<GuideEntry | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      const pill = pillRef.current;
      if (pill) {
        pill.style.transform = `translate(${event.clientX + OFFSET_X}px, ${event.clientY + OFFSET_Y}px)`;
      }

      const target_el = event.target as Element | null;
      const guided = target_el?.closest?.("[data-guide]") ?? null;
      const key = guided?.getAttribute("data-guide") ?? null;
      const next = key ? (GUIDE[key] ?? null) : null;

      setEntry((prev) => {
        if (prev?.text === next?.text && prev?.color === next?.color) {
          return prev;
        }
        return next;
      });
    };

    const handleLeave = () => setEntry(null);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget) {
        handleLeave();
      }
    });

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  const style = entry ? GUIDE_COLORS[entry.color] : null;

  return (
    <div
      ref={pillRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] will-change-transform"
    >
      <div
        className={`cursor-guide-pill ${entry ? "opacity-100" : "opacity-0"}`}
        style={{
          borderTopLeftRadius: 2,
          borderTopRightRadius: 17,
          borderBottomRightRadius: 17,
          borderBottomLeftRadius: 17,
          ...(style
            ? {
                backgroundColor: style.bg,
                border: `2px solid ${style.border}`,
                color: style.text,
              }
            : {}),
        }}
      >
        {entry?.text ?? ""}
      </div>
    </div>
  );
}
