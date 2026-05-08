"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Sparkline } from "@/components/ui/sparkline";
import { Badge } from "@/components/ui/badge";
import { allTickers } from "@/data/stocks";
import { formatPercent, formatPrice, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const types = ["Toutes", "Long terme", "Court terme", "ETF"] as const;
const statuses = ["Toutes", "Active", "Clôturée"] as const;

export default function RecommandationsPage() {
  const [type, setType] = useState<(typeof types)[number]>("Toutes");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Toutes");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return allTickers.filter((s) => {
      if (type !== "Toutes" && s.recoType !== type) return false;
      if (status !== "Toutes" && s.recoStatus !== status) return false;
      if (
        query &&
        !s.name.toLowerCase().includes(query.toLowerCase()) &&
        !s.ticker.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [type, status, query]);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Portefeuilles", href: "/portefeuilles" },
          { label: "Recommandations" },
        ]}
        eyebrow="Recommandations · 27 actives"
        title="Toutes nos recommandations en cours."
        description="Long terme, court terme, ETF, clôturées : retrouvez l'intégralité de nos thèses avec entrée, objectif, stop-loss et performance live."
      />

      <section className="container-app py-10">
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-[var(--gris-4)] rounded-full px-4 h-11 flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[var(--gris-1)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher (Microsoft, MSFT…)"
              className="bg-transparent flex-1 text-sm focus:outline-none"
            />
          </div>
          <FilterGroup label="Type" options={[...types]} value={type} onChange={(v) => setType(v as typeof type)} />
          <FilterGroup label="Statut" options={[...statuses]} value={status} onChange={(v) => setStatus(v as typeof status)} />
        </div>

        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--gris-4)]">
                <tr className="text-left text-[var(--gris-1)]">
                  <Th>Valeur</Th>
                  <Th align="right">Cours</Th>
                  <Th align="right">Entrée</Th>
                  <Th align="right">Objectif</Th>
                  <Th align="right">Potentiel</Th>
                  <Th align="right">Tendance 90j</Th>
                  <Th>Statut</Th>
                  <Th>Type</Th>
                  <Th>Ouverte le</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--gris-3)]">
                {filtered.map((s) => {
                  const upside = ((s.recoTarget - s.price) / s.price) * 100;
                  return (
                    <tr key={s.ticker} className="hover:bg-[var(--gris-4)] transition-colors">
                      <td className="px-5 py-4">
                        <Link
                          href={`/valeur/${s.ticker.toLowerCase()}`}
                          className="flex items-center gap-3 group"
                        >
                          <TickerLogo ticker={s.ticker} size="sm" />
                          <div>
                            <p className="font-bold group-hover:text-[var(--violet-500)] transition-colors">
                              {s.name}
                            </p>
                            <p className="text-xs text-[var(--gris-1)]">
                              {s.ticker} · {s.exchange}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-semibold">
                        {formatPrice(s.price, s.currency)}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums text-[var(--gris-1)]">
                        {formatPrice(s.recoEntry, s.currency)}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-bold">
                        {formatPrice(s.recoTarget, s.currency)}
                      </td>
                      <td
                        className={`px-5 py-4 text-right tabular-nums font-bold ${
                          upside > 0 ? "text-emerald-700" : "text-red-700"
                        }`}
                      >
                        {formatPercent(upside, 1)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Sparkline data={s.history.slice(-90)} positive={s.change1y >= 0} width={92} height={28} className="ml-auto" />
                      </td>
                      <td className="px-5 py-4">
                        {s.recoStatus === "Active" ? (
                          <Badge tone="green">Active</Badge>
                        ) : (
                          <Badge tone="neutral">Clôturée</Badge>
                        )}
                      </td>
                      <td className="px-5 py-4 text-[var(--gris-1)]">{s.recoType}</td>
                      <td className="px-5 py-4 text-[var(--gris-1)] whitespace-nowrap">
                        {formatDate(s.recoOpenedAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/valeur/${s.ticker.toLowerCase()}`}
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
        <p className="mt-4 text-xs text-[var(--gris-1)]">
          {filtered.length} recommandations affichées sur {allTickers.length}.
        </p>
      </section>
    </>
  );
}

function Th({
  children,
  align = "left",
}: {
  children?: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={cn(
        "px-5 py-3 font-bold uppercase text-[11px] tracking-widest",
        align === "right" && "text-right"
      )}
    >
      {children}
    </th>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)] inline-flex items-center gap-1">
        <Filter className="w-3 h-3" />
        {label}
      </span>
      <div className="flex items-center gap-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "h-9 px-3.5 rounded-full text-xs font-semibold transition-colors",
              value === o
                ? "bg-[var(--noir)] text-white"
                : "border border-[var(--gris-3)] text-[var(--color-text)] hover:border-[var(--violet-500)]"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
