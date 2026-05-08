"use client";

import {
  Area,
  AreaChart as RAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Range = "1M" | "3M" | "6M" | "1Y" | "ALL";

const ranges: Range[] = ["1M", "3M", "6M", "1Y", "ALL"];

const rangeDays: Record<Range, number> = {
  "1M": 22,
  "3M": 66,
  "6M": 132,
  "1Y": 252,
  ALL: Number.POSITIVE_INFINITY,
};

type Props = {
  data: { date: string; close: number }[];
  positive?: boolean;
  height?: number;
  currency?: string;
  className?: string;
};

export function AreaChart({ data, positive = true, height = 320, currency = "EUR", className }: Props) {
  const [range, setRange] = useState<Range>("1Y");
  const filtered = useMemo(() => {
    const days = rangeDays[range];
    if (!Number.isFinite(days)) return data;
    return data.slice(-days);
  }, [data, range]);

  const start = filtered[0]?.close ?? 0;
  const end = filtered[filtered.length - 1]?.close ?? 0;
  const isUp = end >= start;
  const stroke = isUp ? "#20C997" : "#FF4D4D";
  const fill = isUp ? "rgba(32, 201, 151, 0.18)" : "rgba(255, 77, 77, 0.18)";

  return (
    <div className={className}>
      <div className="flex items-center justify-end gap-1 mb-4">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={cn(
              "h-8 px-3 rounded-full text-xs font-bold transition-colors",
              range === r
                ? "bg-[var(--noir)] text-white"
                : "text-[var(--gris-1)] hover:bg-[var(--gris-4)]"
            )}
          >
            {r}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <RAreaChart data={filtered} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${isUp}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.32} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#F4F6FA" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#8B95A7"
              fontSize={11}
              tickFormatter={(v) => {
                const d = new Date(v);
                return new Intl.DateTimeFormat("fr-FR", { month: "short", year: "2-digit" }).format(d);
              }}
              minTickGap={48}
            />
            <YAxis
              stroke="#8B95A7"
              fontSize={11}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `${Math.round(v)}`}
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #D6DBE3",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(12,37,67,0.08)",
                fontSize: 13,
              }}
              labelFormatter={(v) =>
                new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(v))
              }
              formatter={(v) => [
                new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(v as number),
                "Cours",
              ]}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={stroke}
              strokeWidth={2.4}
              fill={`url(#gradient-${isUp})`}
              fillOpacity={1}
            />
          </RAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
