import { cn } from "@/lib/utils";
import { findTicker } from "@/data/stocks";

type Props = {
  ticker: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  sm: "w-9 h-9 text-base",
  md: "w-11 h-11 text-lg",
  lg: "w-14 h-14 text-xl",
  xl: "w-20 h-20 text-3xl",
};

export function TickerLogo({ ticker, size = "md", className }: Props) {
  const stock = findTicker(ticker);
  const initials = stock?.ticker.slice(0, 2) ?? ticker.slice(0, 2);
  const color = stock?.brandColor ?? "#563BFF";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-extrabold text-white shadow-[var(--shadow-xs)] shrink-0",
        sizeMap[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${shade(color, -20)} 100%)`,
      }}
      aria-label={stock?.name ?? ticker}
    >
      {initials}
    </span>
  );
}

function shade(hex: string, percent: number) {
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
