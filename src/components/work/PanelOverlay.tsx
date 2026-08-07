"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type PanelOverlayProps = {
  originRect: DOMRect;
  targetRect: DOMRect;
  onClose: () => void;
  instant?: boolean;
  children: (close: () => void) => ReactNode;
};

function rectToStyle(rect: DOMRect) {
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export function PanelOverlay({
  originRect,
  targetRect,
  onClose,
  instant = false,
  children,
}: PanelOverlayProps) {
  const [expanded, setExpanded] = useState(instant);
  const [contentVisible, setContentVisible] = useState(instant);
  const [mounted, setMounted] = useState(false);
  const isClosingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;
    setContentVisible(false);
    setExpanded(false);

    if (instant) {
      onClose();
      return;
    }

    window.setTimeout(onClose, 520);
  }, [instant, onClose]);

  useEffect(() => {
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    if (instant) {
      setExpanded(true);
      setContentVisible(true);
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setExpanded(true));
    });

    const contentTimer = window.setTimeout(() => setContentVisible(true), 480);

    return () => {
      window.clearTimeout(contentTimer);
    };
  }, [instant]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  if (!mounted) {
    return null;
  }

  const panelStyle = expanded
    ? rectToStyle(targetRect)
    : rectToStyle(originRect);

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 z-[80]"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`${instant ? "" : "motion-work-panel"} pointer-events-auto fixed overflow-hidden bg-p-white max-lg:rounded-none`}
        style={panelStyle}
      >
        <div
          className={`h-full ${instant ? "opacity-100" : "motion-work-content"} ${contentVisible ? "opacity-100" : "opacity-0"}`}
        >
          {children(handleClose)}
        </div>
      </div>
    </div>,
    document.body,
  );
}
