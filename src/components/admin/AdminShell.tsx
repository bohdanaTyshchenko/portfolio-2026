"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type AdminShellProps = {
  children: ReactNode;
  breadcrumb: string;
  topBar?: ReactNode;
};

export function AdminShell({ children, breadcrumb, topBar }: AdminShellProps) {
  return (
    <div className="flex h-full min-h-0 bg-p-white text-p-text">
      <aside className="flex w-[260px] shrink-0 flex-col overflow-y-auto border-r border-p-grey-10 bg-[#fafafa] px-5 py-8">
        <Link
          href="/admin"
          className="mb-10 font-medium text-lg tracking-[-0.03em] text-p-text"
        >
          Portfolio CMS
        </Link>

        <nav className="flex flex-col gap-6">
          <div>
            <p className="mb-3 text-[11px] font-normal uppercase tracking-[0.12em] text-p-grey-50">
              Main
            </p>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/admin"
                  className="block rounded-lg px-3 py-2 text-sm text-p-text hover:bg-p-grey-10"
                >
                  Case studies
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="block rounded-lg px-3 py-2 text-sm text-p-grey-60 hover:bg-p-grey-10"
                >
                  View site
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-normal uppercase tracking-[0.12em] text-p-grey-50">
              Order
            </p>
            <p className="px-3 text-xs leading-relaxed text-p-grey-60">
              Use arrows on each card to reorder how studies appear on the work
              page.
            </p>
          </div>
        </nav>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-p-grey-10 px-8 py-5">
          <p className="text-sm text-p-grey-60">
            <Link
              href="/admin"
              className="text-p-grey-50 hover:text-p-text motion-fade"
            >
              Admin
            </Link>
            <span className="mx-2 text-p-grey-50">/</span>
            <span className="text-p-text">{breadcrumb}</span>
          </p>
          {topBar}
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
