"use client";

import type { MouseEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { ProfessionalArrowCircle } from "@/components/home/ProfessionalArrowCircle";
import { usePortfolioMode } from "@/lib/portfolioMode";
import { typography } from "@/lib/typography";

export const TORONTO_MAP_LINK = "https://maps.app.goo.gl/5LU9k97YyNjWALKw5";

/**
 * Personal saved lists can't be embedded (the /maps/embed endpoint drops the
 * list params server-side). The supported path is a Google My Maps map:
 * paste any My Maps URL (edit/viewer/embed) or its mid into the env var and
 * it is normalized to the embeddable /maps/d/embed form.
 */
function normalizeEmbedSrc(raw: string): string {
  if (!raw) {
    return "";
  }

  if (raw.includes("/maps/d/")) {
    const mid = raw.match(/[?&]mid=([^&]+)/)?.[1];
    return mid ? `https://www.google.com/maps/d/embed?mid=${mid}` : raw;
  }

  return raw;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const embedSrc = normalizeEmbedSrc(
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_SRC ?? "",
);

const TorontoGoogleMap = dynamic(
  () =>
    import("./TorontoGoogleMap").then((mod) => mod.TorontoGoogleMap),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-p-grey-10" aria-hidden />,
  },
);

const funArrowClass =
  "pointer-events-none absolute right-2 top-2 z-[1000] inline-flex items-center justify-center opacity-0 [transform:translate(-6px,6px)] motion-arrow group-hover:pointer-events-auto group-hover:opacity-100 group-hover:[transform:translate(0,0)]";

function MapWidgetArrowLink({ href }: { href: string }) {
  const { mode } = usePortfolioMode();
  const isProfessional = mode === "professional";

  const stopBubble = (event: MouseEvent) => {
    event.stopPropagation();
  };

  if (isProfessional) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Toronto places map in Google Maps"
        onClick={stopBubble}
        className={funArrowClass}
      >
        <ProfessionalArrowCircle size="md" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Toronto places map in Google Maps"
      onClick={stopBubble}
      className={funArrowClass}
    >
      <MaterialIcon name="arrow_outward" size={48} />
    </a>
  );
}

function MapFallback() {
  return (
    <>
      <Image
        src="/images/about/toronto-map.png"
        alt=""
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 578px"
        aria-hidden
      />
      <p
        className={`absolute inset-x-0 bottom-0 bg-p-white/90 px-4 py-2 text-center ${typography.bodyS} text-p-grey-60`}
      >
        Add{" "}
        <code className="text-p-text">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to
        .env.local to show the interactive map with all list pins.
      </p>
    </>
  );
}

type TorontoMapWidgetProps = {
  className?: string;
};

export function TorontoMapWidget({ className = "" }: TorontoMapWidgetProps) {
  const openMap = () => {
    window.open(TORONTO_MAP_LINK, "_blank", "noopener,noreferrer");
  };

  const hasGoogleMap = Boolean(embedSrc || apiKey);

  return (
    <div
      className={`group relative aspect-[578/237] w-full overflow-hidden rounded-[20px] bg-p-grey-5 ${hasGoogleMap ? "" : "cursor-pointer"} ${className}`.trim()}
      onClick={hasGoogleMap ? undefined : openMap}
      onKeyDown={
        hasGoogleMap
          ? undefined
          : (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMap();
              }
            }
      }
      role={hasGoogleMap ? undefined : "link"}
      tabIndex={hasGoogleMap ? undefined : 0}
      aria-label={
        hasGoogleMap
          ? undefined
          : "Open Toronto food and drink map in Google Maps"
      }
    >
      <div
        className="absolute inset-0 z-0"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        role="presentation"
      >
        {apiKey ? (
          <TorontoGoogleMap apiKey={apiKey} />
        ) : embedSrc ? (
          <iframe
            title="Interactive Google Map of Toronto food and drink spots"
            src={embedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <MapFallback />
        )}
      </div>
      <MapWidgetArrowLink href={TORONTO_MAP_LINK} />
    </div>
  );
}
