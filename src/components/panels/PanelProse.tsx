import type { ReactNode } from "react";
import { typography } from "@/lib/typography";

type PanelProseProps = {
  lead: ReactNode;
  children: ReactNode;
};

export function PanelProse({ lead, children }: PanelProseProps) {
  return (
    <div className="mx-auto flex w-full max-w-none flex-col gap-6">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-p-blue" />
      <p className={`${typography.h4} text-p-text`}>{lead}</p>
      <div className={`flex flex-col gap-5 ${typography.bodyL} text-p-grey-80`}>
        {children}
      </div>
    </div>
  );
}
