"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Badge } from "@/components/ui/badge";
import { allTickers } from "@/data/stocks";
import { formatPercent, formatPrice } from "@/lib/utils";

type Sort = "upside" | "alpha" | "perf";

export default function ObjectifsPage() {
  const [sort, setSort] = useState<Sort>("upside");
  const sorted = useMemo(() => {
    const list = [...allTickers].filter((s) => s.recoStatus === "Active");
    if (sort === "upside")
      list.sort((a, b) => (b.recoTarget - b.price) / b.price - (a.recoTarget - a.price) / a.price);
    if (sort === "alpha") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "perf") list.sort((a, b) => b.change1y - a.change1y);
    return list;
  }, [sort]);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Analyses", href: "/analyses" },
          { label: "Objectifs boursiers" },
        ]}
        eyebrow={`Objectifs · ${sorted.length} valeurs actives`}
        title="Le tableau des cibles."
        description="Tous les cours-cibles de nos valeurs suivies, mis à jour à chaque arbitrage. Triez par potentiel pour identifier les meilleures opportunités."
      />

      <section className="container-app py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">{sorted.length} objectifs en vigueur</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] inline-flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Trier par
            </span>
            {(["upside", "alpha", "perf"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`h-9 px-3.5 rounded-full text-xs font-semibold transition-colors ${
                  sort === s
                    ? "bg-[var(--noir)] text-white"
                    : "border border-[var(--gris-3)] hover:border-[var(--violet-500)]"
                }`}
              >
                {s === "upside" ? "Potentiel" : s === "alpha" ? "Alphabétique" : "Perf 1 an"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((s) => {
            const upside = ((s.recoTarget - s.price) / s.price) * 100;
            const sl = ((s.recoStopLoss - s.price) / s.price) * 100;
            return (
              <Link
                key={s.ticker}
                href={`/valeur/${s.ticker.toLowerCase()}`}
                className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <TickerLogo ticker={s.ticker} size="md" />
                  <Badge tone="violet">{s.recoType}</Badge>
                </div>
                <p className="mt-3 font-extrabold text-[15px] leading-tight">{s.name}</p>
                <p className="text-xs text-[var(--gris-1)]">{s.ticker} · {s.sector}</p>
                <div className="mt-4 grid grid-cols-3 gap-1">
                  <Mini label="Cours" value={formatPrice(s.price, s.currency)} />
                  <Mini label="Cible" value={formatPrice(s.recoTarget, s.currency)} />
                  <Mini label="Stop" value={formatPrice(s.recoStopLoss, s.currency)} muted />
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--gris-3)] flex items-center justify-between">
                  <div className="text-xs">
                    <p className={`font-bold tabular-nums ${upside > 0 ? "text-emerald-700" : "text-red-700"}`}>
                      Upside {formatPercent(upside, 1)}
                    </p>
                    <p className="font-bold tabular-nums text-[var(--gris-1)]">
                      Risk {formatPercent(sl, 1)}
                    </p>
                  </div>
                  <span className="text-[var(--violet-500)] inline-flex items-center gap-1 text-xs font-bold">
                    Fiche <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Mini({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--gris-1)]">{label}</p>
      <p className={`text-sm font-bold tabular-nums ${muted ? "text-[var(--gris-1)]" : ""}`}>{value}</p>
    </div>
  );
}
