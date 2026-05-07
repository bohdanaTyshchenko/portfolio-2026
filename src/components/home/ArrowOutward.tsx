export function ArrowOutward({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      className={className ?? "size-[30px]"}
      aria-hidden
    >
      <path
        d="M8.75 21.25L21.25 8.75M21.25 8.75H10M21.25 8.75V20"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
