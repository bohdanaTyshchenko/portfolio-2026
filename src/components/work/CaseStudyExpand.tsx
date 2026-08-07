"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

const DURATION_MS = 520;

type CaseStudyExpandProps = {
  expandKey: string;
  open?: boolean;
  children: ReactNode;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function reveal(container: HTMLDivElement) {
  container.classList.remove("case-study-expand--animating");
  container.style.maxHeight = "none";
  container.style.overflow = "visible";
}

function measureHeight(container: HTMLDivElement) {
  const content = container.firstElementChild as HTMLElement | null;
  return content?.scrollHeight ?? container.scrollHeight;
}

export function CaseStudyExpand({
  expandKey,
  open = true,
  children,
}: CaseStudyExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    wasOpenRef.current = false;
  }, [expandKey]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (!open) {
      if (!wasOpenRef.current) {
        container.style.overflow = "hidden";
        container.style.maxHeight = "0px";
        container.classList.remove("case-study-expand--animating");
        wasOpenRef.current = false;
        return;
      }

      if (prefersReducedMotion()) {
        container.style.maxHeight = "0px";
        container.style.overflow = "hidden";
        wasOpenRef.current = false;
        return;
      }

      let frame = 0;
      const startHeight = container.scrollHeight;

      if (startHeight === 0) {
        container.style.maxHeight = "0px";
        container.style.overflow = "hidden";
        wasOpenRef.current = false;
        return;
      }

      container.style.overflow = "hidden";
      container.style.maxHeight = `${startHeight}px`;
      container.classList.add("case-study-expand--animating");
      void container.offsetHeight;

      frame = requestAnimationFrame(() => {
        container.style.maxHeight = "0px";
      });

      wasOpenRef.current = false;

      return () => cancelAnimationFrame(frame);
    }

    const shouldAnimate = !wasOpenRef.current;
    wasOpenRef.current = true;

    if (prefersReducedMotion()) {
      reveal(container);
      return;
    }

    const targetHeight = measureHeight(container);

    if (!shouldAnimate || targetHeight === 0) {
      reveal(container);
      return;
    }

    let frameA = 0;
    let frameB = 0;
    let settleTimer = 0;

    const finish = () => {
      window.clearTimeout(settleTimer);
      reveal(container);
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === container && event.propertyName === "max-height") {
        finish();
      }
    };

    container.style.overflow = "hidden";
    container.style.maxHeight = "0px";
    container.classList.remove("case-study-expand--animating");
    void container.offsetHeight;

    frameA = requestAnimationFrame(() => {
      container.classList.add("case-study-expand--animating");
      void container.offsetHeight;

      frameB = requestAnimationFrame(() => {
        container.style.maxHeight = `${targetHeight}px`;
        container.addEventListener("transitionend", onTransitionEnd);
        settleTimer = window.setTimeout(finish, DURATION_MS + 100);
      });
    });

    return () => {
      cancelAnimationFrame(frameA);
      cancelAnimationFrame(frameB);
      window.clearTimeout(settleTimer);
      container.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [expandKey, open]);

  return (
    <div ref={containerRef} className="case-study-expand">
      {children}
    </div>
  );
}
