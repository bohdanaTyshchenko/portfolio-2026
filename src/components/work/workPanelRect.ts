export function getWorkPanelTargetRect(grid: HTMLElement): DOMRect {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  if (!isDesktop) {
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
  }

  const rect = grid.getBoundingClientRect();
  const columnWidth = rect.width / 3;
  const left = rect.left + columnWidth;

  return new DOMRect(
    left,
    rect.top,
    window.innerWidth - left,
    rect.height,
  );
}
