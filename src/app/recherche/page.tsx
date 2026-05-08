"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Sparkline } from "@/components/ui/sparkline";
import { Badge } from "@/components/ui/badge";
import { allTickers } from "@/data/stocks";
import { formatPercent, formatPrice, formatCompact } from "@/lib/utils";
import { cn } from "@/lib/utils";

const sectors = ["Tous", ...Array.from(new Set(allTickers.map((s) => s.sector)))];
const exchanges = ["Tous", "EURONEXT", "NASDAQ", "NYSE", "XETRA", "LSE"];

export default function RecherchePage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("Tous");
  const [exchange, setExchange] = useState("Tous");
  const [posOnly, setPosOnly] = useState(false);
  const [recoOnly, setRecoOnly] = useState(false);

  const filtered = useMemo(() => {
    return allTickers.filter((s) => {
      if (
        query &&
        !s.name.toLowerCase().includes(query.toLowerCase()) &&
        !s.ticker.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      if (sector !== "Tous" && s.sector !== sector) return false;
      if (exchange !== "Tous" && s.exchange !== exchange) return false;
      if (posOnly && s.change1d <= 0) return false;
      if (recoOnly && s.recoStatus !== "Active") return false;
      return true;
    });
  }, [query, sector, exchange, posOnly, recoOnly]);

  const resetFilters = () => {
    setQuery("");
    setSector("Tous");
    setExchange("Tous");
    setPosOnly(false);
    setRecoOnly(false);
  };

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Recherche" }]}
        eyebrow="Screener · 17 valeurs disponibles"
        title="Trouvez la valeur qu'il vous faut."
        description="Filtres par secteur, place de cotation, performance, recommandation active. Le moteur central pour explorer notre univers d'investissement."
      />

      <section className="container-app py-10">
        <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6 mb-6">
          <div className="grid gap-4 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                Recherche
              </label>
              <div className="mt-2 flex items-center gap-2 bg-[var(--gris-4)] rounded-full px-4 h-12">
                <Search className="w-4 h-4 text-[var(--gris-1)]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Microsoft, MSFT, Nasdaq, ETF World…"
                  className="bg-transparent flex-1 text-[15px] focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="w-6 h-6 rounded-full hover:bg-[var(--gris-3)] grid place-items-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Secteur</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-2 w-full h-12 px-4 rounded-full bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors text-[15px] font-semibold"
              >
                {sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Place</label>
              <select
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                className="mt-2 w-full h-12 px-4 rounded-full bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors text-[15px] font-semibold"
              >
                {exchanges.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-2 pt-5">
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={posOnly}
                  onChange={(e) => setPosOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--violet-500)]"
                />
                Hausse seulement
              </label>
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={recoOnly}
                  onChange={(e) => setRecoOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--violet-500)]"
                />
                Reco active
              </label>
            </div>
          </div>
          {(query || sector !== "Tous" || exchange !== "Tous" || posOnly || recoOnly) && (
            <button
              onClick={resetFilters}
              className="mt-4 text-xs font-semibold text-[var(--violet-500)] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <p className="text-sm text-[var(--gris-1)] mb-4">
          <span className="font-bold text-[var(--color-text)]">{filtered.length}</span>{" "}
          {filtered.length > 1 ? "résultats" : "résultat"}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const positive = s.change1d >= 0;
            return (
              <Link
                key={s.ticker}
                href={`/valeur/${s.ticker.toLowerCase()}`}
                className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <TickerLogo ticker={s.ticker} size="md" />
                    <div className="min-w-0">
                      <p className="font-bold truncate">{s.name}</p>
                      <p className="text-xs text-[var(--gris-1)]">
                        {s.ticker} · {s.exchange}
                      </p>
                    </div>
                  </div>
                  {s.recoStatus === "Active" && <Badge tone="green">Reco</Badge>}
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xl font-extrabold tabular-nums tracking-tight">
                      {formatPrice(s.price, s.currency)}
                    </p>
                    <p className={`text-sm font-bold tabular-nums ${positive ? "text-emerald-700" : "text-red-700"}`}>
                      {formatPercent(s.change1d)}
                    </p>
                  </div>
                  <Sparkline data={s.history.slice(-90)} positive={s.change1y >= 0} />
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--gris-3)] grid grid-cols-3 gap-2 text-xs">
                  <Mini label="PER" value={s.per ? s.per.toFixed(1) : "—"} />
                  <Mini label="Yield" value={s.yieldPct != null ? `${s.yieldPct.toFixed(1)}%` : "—"} />
                  <Mini label="Capi" value={`${formatCompact(s.marketCap)}`} />
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--violet-500)]">
                  Voir la fiche <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-[var(--gris-1)]">Aucun résultat. Essayez d&apos;assouplir les filtres.</p>
            <button onClick={resetFilters} className="mt-4 text-sm font-semibold text-[var(--violet-500)] hover:underline">
              Réinitialiser
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--gris-1)]">{label}</p>
      <p className="text-sm font-bold tabular-nums">{value}</p>
    </div>
  );
}
