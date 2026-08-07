"use client";

import type { CSSProperties } from "react";

const CIRCLE_SIZE = "size-6 sm:size-8 lg:size-10";

type CircleConfig = {
  color: string;
  left: string;
  drift: string;
  duration: string;
  index: number;
};

const CIRCLES: CircleConfig[] = [
  { color: "bg-p-pink/80", left: "8%", drift: "12px", duration: "2.8s", index: 0 },
  { color: "bg-p-blue/90", left: "22%", drift: "-8px", duration: "3.2s", index: 1 },
  { color: "bg-p-orange/90", left: "38%", drift: "16px", duration: "2.6s", index: 2 },
  { color: "bg-p-green/90", left: "52%", drift: "-14px", duration: "3.4s", index: 3 },
  { color: "bg-p-pink/70", left: "65%", drift: "10px", duration: "3s", index: 4 },
  { color: "bg-p-blue/80", left: "78%", drift: "-10px", duration: "2.9s", index: 5 },
  { color: "bg-p-orange/80", left: "90%", drift: "6px", duration: "3.1s", index: 6 },
  { color: "bg-p-green/80", left: "15%", drift: "-12px", duration: "3.3s", index: 7 },
];

type FallingCirclesProps = {
  activated: boolean;
  running: boolean;
};

export function FallingCircles({ activated, running }: FallingCirclesProps) {
  if (!activated) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {CIRCLES.map((circle) => (
        <div
          key={circle.index}
          className={`animate-circle-fall absolute top-0 rounded-full ${CIRCLE_SIZE} ${circle.color}`}
          style={
            {
              left: circle.left,
              "--drift": circle.drift,
              "--fall-duration": circle.duration,
              animationDelay: `calc(${circle.index} * 400ms)`,
              animationFillMode: "backwards",
              animationPlayState: running ? "running" : "paused",
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
