import type { KeyboardEvent } from "react";
import { getWorkPanelTargetRect } from "@/components/work/workPanelRect";

export function openPanelFromCard(
  grid: HTMLElement,
  guide: string,
): { origin: DOMRect; target: DOMRect } | null {
  const card = grid.querySelector<HTMLElement>(`[data-guide="${guide}"]`);

  if (!card) {
    return null;
  }

  return {
    origin: card.getBoundingClientRect(),
    target: getWorkPanelTargetRect(grid),
  };
}

export function handleCardKeyDown(
  event: KeyboardEvent<HTMLElement>,
  onOpen: () => void,
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onOpen();
  }
}
