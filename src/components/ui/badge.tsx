import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "violet" | "green" | "red" | "orange" | "neutral" | "live";

const tones: Record<Tone, string> = {
  violet: "bg-[var(--violet-50)] text-[var(--violet-700)]",
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-700",
  orange: "bg-orange-50 text-orange-700",
  neutral: "bg-[var(--gris-4)] text-[var(--gris-1)]",
  live: "bg-red-500 text-white",
};

export function Badge({
  children,
  tone = "violet",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight",
        tones[tone],
        className
      )}
    >
      {tone === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
      {children}
    </span>
  );
}

export function ChangeBadge({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-bold tabular-nums",
        positive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
      )}
    >
      {positive ? "▲" : "▼"} {positive ? "+" : ""}
      {value.toFixed(2)}
      {suffix}
    </span>
  );
}
