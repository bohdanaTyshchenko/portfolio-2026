import { ArrowOutward } from "./ArrowOutward";

export function LinkRow({ href, label }: { href: string; label: string }) {
  const isExternalHttp =
    href.startsWith("http://") || href.startsWith("https://");

  return (
    <div className="flex w-full min-w-0 flex-col gap-1 lg:gap-4">
      <div className="flex w-full min-w-0 items-center justify-between gap-2">
        <a
          href={href}
          {...(isExternalHttp
            ? { target: "_blank" as const, rel: "noopener noreferrer" }
            : {})}
          className="min-w-0 truncate font-medium text-sm uppercase leading-snug tracking-[-0.05em] text-p-text hover:opacity-80 sm:text-lg md:text-2xl lg:text-[36px] lg:leading-[44px] lg:tracking-[-1.8px]"
        >
          {label}
        </a>
        <div className="shrink-0 text-p-text">
          <ArrowOutward className="size-4 sm:size-5 lg:size-[30px]" />
        </div>
      </div>
      <div className="h-px w-full bg-p-text/10" />
    </div>
  );
}
