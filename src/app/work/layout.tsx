import type { ReactNode } from "react";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh overflow-y-auto bg-p-white text-p-text">{children}</div>
  );
}
