"use client";

import { allTickers } from "@/data/stocks";
import { formatPercent } from "@/lib/utils";
import Link from "next/link";

export function TickerTape() {
  const items = allTickers.slice(0, 12);
  // Duplicate for seamless loop
  const ribbon = [...items, ...items];

  return (
    <div className="bg-[var(--noir)] text-white border-y border-[var(--noir)]">
      <div className="overflow-hidden relative">
        <div
          className="flex items-center gap-8 py-3 whitespace-nowrap"
          style={{
            animation: "ticker-scroll 60s linear infinite",
            width: "max-content",
          }}
        >
          {ribbon.map((s, i) => {
            const positive = s.change1d >= 0;
            return (
              <Link
                key={`${s.ticker}-${i}`}
                href={`/valeur/${s.ticker.toLowerCase()}`}
                className="inline-flex items-center gap-2.5 text-sm tabular-nums hover:text-[var(--violet-200)]"
              >
                <span className="font-bold tracking-tight">{s.ticker}</span>
                <span className="text-white/70">{s.price.toFixed(2)}</span>
                <span className={positive ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                  {formatPercent(s.change1d)}
                </span>
                <span className="text-white/30">·</span>
              </Link>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
