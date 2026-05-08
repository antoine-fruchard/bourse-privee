"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Item = { label: string; href: string };

export function SubNav({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <div className="border-b border-[var(--gris-3)] sticky top-16 bg-white z-40">
      <div className="container-app">
        <div className="flex items-center gap-1 overflow-x-auto -mx-2 px-2">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "h-12 px-4 inline-flex items-center text-sm font-semibold whitespace-nowrap border-b-2 transition-colors",
                  active
                    ? "text-[var(--violet-500)] border-[var(--violet-500)]"
                    : "text-[var(--gris-1)] border-transparent hover:text-[var(--color-text)]"
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
