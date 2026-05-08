"use client";

import { useState } from "react";
import {
  AreaChart as RAreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { PageHero } from "@/components/layout/page-hero";
import { Stat } from "@/components/ui/stat";
import { portfolios } from "@/data/portfolios";
import { formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function PerformancesPage() {
  const [active, setActive] = useState(portfolios[0].id);
  const portfolio = portfolios.find((p) => p.id === active)!;
  const data = simulate(portfolio.inception, portfolio.benchmarkInception, 96);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Portefeuilles", href: "/portefeuilles" },
          { label: "Performances" },
        ]}
        eyebrow="Track record"
        title="Notre performance, en transparence totale."
        description="Des chiffres bruts, sans manipulation marketing. Basis points par basis points, comparés à leurs benchmarks officiels et calculés net de frais."
      />

      <section className="container-app py-10">
        <div className="flex items-center gap-2 mb-6 overflow-x-auto -mx-2 px-2">
          {portfolios.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={cn(
                "h-10 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
                active === p.id
                  ? "bg-[var(--noir)] text-white"
                  : "bg-white border border-[var(--gris-3)] text-[var(--color-text)] hover:border-[var(--violet-500)]"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-4 mb-8">
            <Stat label="YTD" value={formatPercent(portfolio.ytd)} trend={portfolio.ytd > 0 ? "up" : "down"} hint={portfolio.ytd > 0 ? "Belle dynamique" : "Sous pression"} />
            <Stat label="1 an" value={formatPercent(portfolio.oneYear)} trend={portfolio.oneYear > 0 ? "up" : "down"} hint="net de frais" />
            <Stat label="3 ans annualisé" value={formatPercent(portfolio.threeYear / 3)} trend="up" hint={`${formatPercent(portfolio.threeYear)} cumulé`} />
            <Stat label="Depuis lancement" value={formatPercent(portfolio.inception)} trend="up" hint={`vs ${portfolio.benchmark} ${formatPercent(portfolio.benchmarkInception)}`} />
          </div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <RAreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="perf-port" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#563BFF" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#563BFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="perf-bench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B95A7" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#8B95A7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F4F6FA" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#8B95A7"
                  fontSize={11}
                  tickFormatter={(v) =>
                    new Intl.DateTimeFormat("fr-FR", { month: "short", year: "2-digit" }).format(new Date(v))
                  }
                  minTickGap={48}
                />
                <YAxis stroke="#8B95A7" fontSize={11} tickFormatter={(v) => `${Math.round(v)}`} />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #D6DBE3",
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#8B95A7"
                  strokeWidth={1.6}
                  fill="url(#perf-bench)"
                  strokeDasharray="4 4"
                  name={portfolio.benchmark}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#563BFF"
                  strokeWidth={2.6}
                  fill="url(#perf-port)"
                  name={portfolio.name}
                />
              </RAreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { y: "2024", port: 24.8, bench: 18.4 },
            { y: "2023", port: 14.2, bench: 12.8 },
            { y: "2022", port: -8.4, bench: -12.2 },
            { y: "2021", port: 22.4, bench: 19.6 },
            { y: "2020", port: 18.6, bench: 5.8 },
            { y: "2019", port: 26.4, bench: 24.8 },
          ].map((y) => (
            <div key={y.y} className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Année {y.y}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className={`text-2xl font-extrabold tabular-nums tracking-tight ${y.port > 0 ? "text-emerald-700" : "text-red-700"}`}>
                  {formatPercent(y.port)}
                </p>
                <p className="text-sm text-[var(--gris-1)] tabular-nums">
                  vs {formatPercent(y.bench)}
                </p>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-[var(--gris-4)] overflow-hidden">
                <div
                  className={`h-full ${y.port > 0 ? "bg-[var(--green-500)]" : "bg-[var(--red-500)]"}`}
                  style={{ width: `${Math.min(Math.abs(y.port) * 3, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function simulate(target: number, bench: number, months: number) {
  const out = [];
  const today = new Date("2026-05-07");
  for (let i = months; i >= 0; i--) {
    const d = new Date(today);
    d.setMonth(d.getMonth() - i);
    const t = (months - i) / months;
    const p = 100 * (1 + (target / 100) * t + Math.sin(i * 0.4) * 0.025);
    const b = 100 * (1 + (bench / 100) * t + Math.cos(i * 0.5) * 0.018);
    out.push({ date: d.toISOString().slice(0, 10), portfolio: Number(p.toFixed(2)), benchmark: Number(b.toFixed(2)) });
  }
  return out;
}
