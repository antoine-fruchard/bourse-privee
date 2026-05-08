"use client";

import { ArrowRight, Award, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  AreaChart as RAreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
  LabelList,
} from "recharts";
import type { Portfolio } from "@/data/portfolios";
import { findTicker } from "@/data/stocks";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { formatPercent, formatPrice } from "@/lib/utils";

export function PortfolioDetail({ portfolio }: { portfolio: Portfolio }) {
  // Synthesize a simulated portfolio history from constituents
  const portfolioHistory = useSimulatedHistory(portfolio);

  return (
    <>
      <section className="container-app py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                    Performance
                  </p>
                  <p className="text-3xl font-extrabold tabular-nums tracking-tight">
                    {formatPercent(portfolio.inception)}{" "}
                    <span className="text-sm font-bold text-[var(--gris-1)]">
                      depuis {new Date(portfolio.inceptionDate).getFullYear()}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--gris-1)]">
                    vs {portfolio.benchmark} {formatPercent(portfolio.benchmarkInception)}
                  </p>
                </div>
                <Badge tone="green">+{(portfolio.inception - portfolio.benchmarkInception).toFixed(1)}pts vs benchmark</Badge>
              </div>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <RAreaChart data={portfolioHistory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="port-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#563BFF" stopOpacity={0.32} />
                        <stop offset="100%" stopColor="#563BFF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="bench-grad" x1="0" y1="0" x2="0" y2="1">
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
                    <YAxis
                      stroke="#8B95A7"
                      fontSize={11}
                      tickFormatter={(v) => `${Math.round(v)}`}
                      width={48}
                    />
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
                      fill="url(#bench-grad)"
                      strokeDasharray="4 4"
                      name={portfolio.benchmark}
                    />
                    <Area
                      type="monotone"
                      dataKey="portfolio"
                      stroke="#563BFF"
                      strokeWidth={2.6}
                      fill="url(#port-grad)"
                      name={portfolio.name}
                    />
                  </RAreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--violet-500)]" />
                  {portfolio.name}
                </span>
                <span className="inline-flex items-center gap-2 text-[var(--gris-1)]">
                  <span className="w-3 h-3 rounded-full bg-[var(--gris-2)]" />
                  {portfolio.benchmark}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-extrabold tracking-tight mb-4">Composition actuelle</h2>
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--gris-4)]">
                      <tr className="text-left text-[var(--gris-1)]">
                        <th className="px-5 py-3 font-bold uppercase text-[11px] tracking-widest">Valeur</th>
                        <th className="px-5 py-3 font-bold uppercase text-[11px] tracking-widest text-right">Cours</th>
                        <th className="px-5 py-3 font-bold uppercase text-[11px] tracking-widest text-right">Poids</th>
                        <th className="px-5 py-3 font-bold uppercase text-[11px] tracking-widest text-right">Perf 1 an</th>
                        <th className="px-5 py-3 font-bold uppercase text-[11px] tracking-widest text-right" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--gris-3)]">
                      {portfolio.lines.map((line) => {
                        const stock = findTicker(line.ticker);
                        if (!stock) return null;
                        return (
                          <tr key={line.ticker} className="hover:bg-[var(--gris-4)] transition-colors">
                            <td className="px-5 py-4">
                              <Link
                                href={`/valeur/${stock.ticker.toLowerCase()}`}
                                className="flex items-center gap-3 group"
                              >
                                <TickerLogo ticker={stock.ticker} size="sm" />
                                <div>
                                  <p className="font-bold group-hover:text-[var(--violet-500)] transition-colors">
                                    {stock.name}
                                  </p>
                                  <p className="text-xs text-[var(--gris-1)]">
                                    {stock.ticker} · {stock.sector}
                                  </p>
                                </div>
                              </Link>
                            </td>
                            <td className="px-5 py-4 text-right tabular-nums font-semibold">
                              {formatPrice(stock.price, stock.currency)}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <span className="font-bold tabular-nums w-12 text-right">{line.weight}%</span>
                                <div className="w-20 h-1.5 rounded-full bg-[var(--gris-4)] overflow-hidden hidden md:block">
                                  <div
                                    className="h-full bg-[var(--violet-500)]"
                                    style={{ width: `${(line.weight / 25) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td
                              className={`px-5 py-4 text-right tabular-nums font-bold ${
                                line.change1y >= 0 ? "text-emerald-700" : "text-red-700"
                              }`}
                            >
                              {formatPercent(line.change1y, 1)}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <Link
                                href={`/valeur/${stock.ticker.toLowerCase()}`}
                                className="text-[var(--violet-500)] inline-flex items-center text-xs font-bold gap-1 hover:gap-1.5 transition-all"
                              >
                                Fiche <ArrowRight className="w-3 h-3" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-extrabold tracking-tight mb-4">Allocation visuelle</h2>
              <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <BarChart data={portfolio.lines} layout="vertical" margin={{ top: 4, right: 60, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="#F4F6FA" horizontal={false} />
                      <XAxis type="number" stroke="#8B95A7" fontSize={11} />
                      <YAxis type="category" dataKey="ticker" stroke="#8B95A7" fontSize={12} width={64} />
                      <Tooltip
                        contentStyle={{
                          background: "white",
                          border: "1px solid #D6DBE3",
                          borderRadius: 12,
                          fontSize: 13,
                        }}
                        formatter={(v) => [`${v}%`, "Poids"]}
                      />
                      <Bar dataKey="weight" fill="#563BFF" radius={[0, 8, 8, 0]} barSize={20}>
                        <LabelList dataKey="weight" position="right" formatter={(v) => `${v}%`} fill="#0C2543" fontSize={12} fontWeight={700} />
                        {portfolio.lines.map((_, idx) => (
                          <Cell key={idx} fill={idx % 2 === 0 ? "#563BFF" : "#8E6BFF"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Indicateurs clés</p>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3">
                <Stat label="YTD" value={formatPercent(portfolio.ytd)} trend={portfolio.ytd > 0 ? "up" : "down"} />
                <Stat label="1 an" value={formatPercent(portfolio.oneYear)} trend={portfolio.oneYear > 0 ? "up" : "down"} />
                <Stat label="3 ans" value={formatPercent(portfolio.threeYear)} trend={portfolio.threeYear > 0 ? "up" : "neutral"} />
                <Stat label="Depuis lancement" value={formatPercent(portfolio.inception)} trend="up" />
              </div>
              <div className="mt-5 pt-5 border-t border-[var(--gris-3)] grid gap-3 text-sm">
                <Row label="Date de lancement" value={new Intl.DateTimeFormat("fr-FR").format(new Date(portfolio.inceptionDate))} />
                <Row label="Nombre de lignes" value={`${portfolio.lines.length}`} />
                <Row label="Benchmark" value={portfolio.benchmark} />
                <Row label="Frais de gestion" value="0% — recos brutes" />
              </div>
            </div>

            <div className="rounded-[var(--radius-lg)] gradient-violet text-white p-6">
              <Award className="w-7 h-7" />
              <p className="mt-3 text-lg font-extrabold tracking-tight">Pourquoi ce portefeuille ?</p>
              <p className="mt-1 text-white/85 text-sm leading-relaxed">{portfolio.description}</p>
            </div>

            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
              <ShieldCheck className="w-6 h-6 text-[var(--violet-500)]" />
              <p className="mt-2 font-bold">Notre méthode</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--gris-1)]">
                <li className="flex gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--violet-500)] mt-0.5 shrink-0" />
                  Sélection bottom-up sur 600+ critères quantitatifs et qualitatifs.
                </li>
                <li className="flex gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--violet-500)] mt-0.5 shrink-0" />
                  Conviction : 12-15 lignes maximum, pas de noyade dans la diversification.
                </li>
                <li className="flex gap-2">
                  <TrendingUp className="w-4 h-4 text-[var(--violet-500)] mt-0.5 shrink-0" />
                  Suivi mensuel, arbitrages publiés en temps réel pour les membres.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[var(--gris-1)]">{label}</span>
      <span className="font-bold text-right">{value}</span>
    </div>
  );
}

function useSimulatedHistory(portfolio: Portfolio) {
  // Build a synthetic curve based on inception perf vs benchmark
  const months = 60;
  const out: { date: string; portfolio: number; benchmark: number }[] = [];
  const today = new Date("2026-05-07");
  const totalReturn = portfolio.inception / 100;
  const benchReturn = portfolio.benchmarkInception / 100;
  for (let i = months; i >= 0; i--) {
    const d = new Date(today);
    d.setMonth(d.getMonth() - i);
    const t = (months - i) / months;
    const p = 100 * (1 + totalReturn * t + Math.sin(i * 0.6) * 0.03);
    const b = 100 * (1 + benchReturn * t + Math.cos(i * 0.5) * 0.025);
    out.push({ date: d.toISOString().slice(0, 10), portfolio: Number(p.toFixed(2)), benchmark: Number(b.toFixed(2)) });
  }
  return out;
}
