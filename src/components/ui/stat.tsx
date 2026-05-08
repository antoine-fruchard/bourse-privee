import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Stat({
  label,
  value,
  hint,
  trend,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}) {
  const trendColor =
    trend === "up"
      ? "text-emerald-700"
      : trend === "down"
      ? "text-red-700"
      : "text-[var(--gris-1)]";
  return (
    <div className={cn("py-3", className)}>
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
      {hint && <p className={cn("text-sm font-semibold mt-0.5", trendColor)}>{hint}</p>}
    </div>
  );
}
