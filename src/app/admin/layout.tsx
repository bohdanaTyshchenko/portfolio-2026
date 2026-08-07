import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh overflow-hidden bg-p-white text-p-text">{children}</div>
  );
}
