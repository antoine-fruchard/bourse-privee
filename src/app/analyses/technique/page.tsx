"use client";

import { useState } from "react";
import {
  ComposedChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";
import { ArrowRight, ChevronDown, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { allTickers, findTicker } from "@/data/stocks";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Badge } from "@/components/ui/badge";
import { ChangeBadge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const indicators = ["MA20", "MA50", "MA200", "Bollinger", "RSI", "MACD"] as const;

export default function AnalyseTechnique() {
  const [active, setActive] = useState("MSFT");
  const [enabled, setEnabled] = useState<Set<string>>(new Set(["MA20", "MA50"]));
  const stock = findTicker(active)!;

  const data = stock.history.slice(-180).map((d, i, arr) => ({
    ...d,
    ma20: avg(arr, i, 20),
    ma50: avg(arr, i, 50),
    upper: avg(arr, i, 20) + std(arr, i, 20) * 2,
    lower: avg(arr, i, 20) - std(arr, i, 20) * 2,
  }));

  const last = data[data.length - 1];
  const support = Math.min(...data.slice(-30).map((d) => d.close)) * 0.99;
  const resistance = Math.max(...data.slice(-30).map((d) => d.close)) * 1.01;

  const toggle = (k: string) => {
    setEnabled((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Analyses", href: "/analyses" },
          { label: "Analyse technique" },
        ]}
        eyebrow="Chartanalyse · 250 valeurs suivies"
        title="L'analyse technique de l'équipe."
        description="Cours, supports, résistances, moyennes mobiles, Bollinger : tous les outils pour décider du bon moment d'entrée et de sortie."
      />

      <section className="container-app py-10">
        <div className="grid gap-5 lg:grid-cols-12">
          <aside className="lg:col-span-3 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] mb-2 px-2">
              Valeurs suivies
            </p>
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] divide-y divide-[var(--gris-3)] max-h-[640px] overflow-y-auto">
              {allTickers.map((s) => (
                <button
                  key={s.ticker}
                  onClick={() => setActive(s.ticker)}
                  className={`w-full text-left p-3 flex items-center gap-3 hover:bg-[var(--gris-4)] transition-colors ${
                    active === s.ticker ? "bg-[var(--violet-50)]" : ""
                  }`}
                >
                  <TickerLogo ticker={s.ticker} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{s.name}</p>
                    <p className="text-xs text-[var(--gris-1)]">{s.ticker}</p>
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      s.change1d >= 0 ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {s.change1d >= 0 ? "+" : ""}
                    {s.change1d.toFixed(1)}%
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-5">
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <div className="flex items-center gap-3">
                  <TickerLogo ticker={stock.ticker} size="lg" />
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">{stock.name}</h2>
                    <p className="text-sm text-[var(--gris-1)]">
                      {stock.ticker} · {stock.exchange} · {stock.sector}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold tabular-nums tracking-tight">
                    {formatPrice(last.close, stock.currency)}
                  </p>
                  <ChangeBadge value={stock.change1d} />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 overflow-x-auto -mx-2 px-2">
                {indicators.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={`h-9 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      enabled.has(i)
                        ? "bg-[var(--violet-500)] text-white"
                        : "border border-[var(--gris-3)] text-[var(--color-text)] hover:border-[var(--violet-500)]"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>

              <div style={{ width: "100%", height: 380 }}>
                <ResponsiveContainer>
                  <ComposedChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="bb" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#563BFF" stopOpacity={0.16} />
                        <stop offset="100%" stopColor="#563BFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#F4F6FA" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="#8B95A7"
                      fontSize={11}
                      tickFormatter={(v) =>
                        new Intl.DateTimeFormat("fr-FR", { month: "short", day: "2-digit" }).format(new Date(v))
                      }
                      minTickGap={48}
                    />
                    <YAxis stroke="#8B95A7" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid #D6DBE3",
                        borderRadius: 12,
                        fontSize: 13,
                      }}
                    />
                    {enabled.has("Bollinger") && (
                      <Area type="monotone" dataKey="upper" stroke="#563BFF" strokeWidth={1} strokeDasharray="3 3" fill="url(#bb)" name="Bollinger sup." />
                    )}
                    {enabled.has("Bollinger") && (
                      <Area type="monotone" dataKey="lower" stroke="#563BFF" strokeWidth={1} strokeDasharray="3 3" fill="url(#bb)" name="Bollinger inf." />
                    )}
                    <Line type="monotone" dataKey="close" stroke="#0C2543" strokeWidth={2.4} dot={false} name="Cours" />
                    {enabled.has("MA20") && (
                      <Line type="monotone" dataKey="ma20" stroke="#FF7049" strokeWidth={1.6} dot={false} name="MA20" />
                    )}
                    {enabled.has("MA50") && (
                      <Line type="monotone" dataKey="ma50" stroke="#20C997" strokeWidth={1.6} dot={false} name="MA50" />
                    )}
                    <ReferenceLine y={support} stroke="#20C997" strokeDasharray="4 4" label={{ value: "Support", position: "right", fill: "#20C997", fontSize: 11, fontWeight: 600 }} />
                    <ReferenceLine y={resistance} stroke="#FF4D4D" strokeDasharray="4 4" label={{ value: "Résistance", position: "right", fill: "#FF4D4D", fontSize: 11, fontWeight: 600 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <SignalCard
                title="Tendance court terme"
                value="Haussière"
                description="Le titre évolue au-dessus de sa MA50, soutenu par les volumes."
                tone="up"
              />
              <SignalCard
                title="RSI 14j"
                value="58"
                description="Zone neutre, pas de surachat. Marge de progression encore disponible."
                tone="neutral"
              />
              <SignalCard
                title="Position vs Bollinger"
                value="Mid-band"
                description="Cours proche de la moyenne mobile, idéal pour une entrée à risque maîtrisé."
                tone="neutral"
              />
            </div>

            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <Badge tone="violet">Avis de l&apos;équipe</Badge>
                  <h3 className="mt-2 text-xl font-extrabold tracking-tight">{stock.name} : maintenu en achat</h3>
                </div>
                <a href={`/valeur/${stock.ticker.toLowerCase()}`} className="text-sm font-semibold text-[var(--violet-500)] inline-flex items-center gap-1">
                  Fiche complète <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-3 text-[var(--gris-1)] leading-relaxed">{stock.thesis}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function avg(arr: { close: number }[], i: number, w: number) {
  const start = Math.max(0, i - w + 1);
  const slice = arr.slice(start, i + 1);
  return slice.reduce((s, d) => s + d.close, 0) / slice.length;
}

function std(arr: { close: number }[], i: number, w: number) {
  const m = avg(arr, i, w);
  const start = Math.max(0, i - w + 1);
  const slice = arr.slice(start, i + 1);
  const v = slice.reduce((s, d) => s + Math.pow(d.close - m, 2), 0) / slice.length;
  return Math.sqrt(v);
}

function SignalCard({
  title,
  value,
  description,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  tone: "up" | "down" | "neutral";
}) {
  const colors = {
    up: "text-emerald-700 bg-emerald-50",
    down: "text-red-700 bg-red-50",
    neutral: "text-[var(--violet-700)] bg-[var(--violet-50)]",
  };
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">{title}</p>
      <span className={`mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold ${colors[tone]}`}>
        <TrendingUp className="w-3.5 h-3.5" />
        {value}
      </span>
      <p className="mt-3 text-sm text-[var(--gris-1)] leading-relaxed">{description}</p>
    </div>
  );
}
