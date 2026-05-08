import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-8 md:flex-row md:items-end md:justify-between md:gap-8",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="inline-block px-3 py-1 mb-3 rounded-full bg-[var(--violet-50)] text-[var(--violet-700)] text-xs font-bold uppercase tracking-widest">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-3 text-[var(--gris-1)] text-[17px] leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
