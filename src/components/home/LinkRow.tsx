import { typography } from "@/lib/typography";
import { MaterialIcon } from "../icons/MaterialIcon";
import { ProfessionalArrowCircle } from "./ProfessionalArrowCircle";

export function LinkRow({
  href,
  label,
  professional = false,
}: {
  href?: string;
  label: string;
  professional?: boolean;
}) {
  const isExternalHttp =
    href?.startsWith("http://") || href?.startsWith("https://");

  const className = `group/link inline-flex min-w-0 max-w-full items-center gap-3 ${typography.h2} text-p-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-p-text max-lg:text-h3`;

  const labelContent = professional ? (
    <span className="relative whitespace-nowrap">
      {label}
      {href ? (
        <ProfessionalArrowCircle
          size="sm"
          reveal
          hoverTrigger="group/link"
          className="absolute left-full top-1/2 ml-2 -translate-y-1/2 sm:ml-3"
        />
      ) : null}
    </span>
  ) : (
    <span className="relative whitespace-nowrap">
      {label}
      {href ? (
        <span className="link-row-arrow pointer-events-none absolute left-full top-1/2 ml-1 inline-flex items-center justify-center opacity-0 [transform:translate(-6px,calc(-50%+6px))] motion-arrow group-hover/link:opacity-100 group-hover/link:[transform:translate(0,-50%)] group-focus-visible/link:opacity-100 group-focus-visible/link:[transform:translate(0,-50%)] sm:ml-2 lg:ml-3">
          <MaterialIcon name="arrow_outward" size={55} />
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return <span className={className}>{labelContent}</span>;
  }

  if (professional) {
    return (
      <a
        href={href}
        {...(isExternalHttp
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {})}
        className={className}
      >
        {labelContent}
      </a>
    );
  }

  return (
    <a
      href={href}
      {...(isExternalHttp
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
      className={className}
    >
      {labelContent}
    </a>
  );
}
