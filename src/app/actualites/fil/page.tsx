"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Filter } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { news } from "@/data/news";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categories = [
  "Toutes",
  "Marchés",
  "Macro",
  "Entreprises",
  "Pédagogie",
  "Sélection",
] as const;

export default function FilPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("Toutes");
  const filtered = useMemo(
    () => (active === "Toutes" ? news : news.filter((n) => n.category === active)),
    [active]
  );

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: "Fil d'actualité" },
        ]}
        eyebrow="Le fil"
        title="L'actu des marchés en continu."
        description="Tous nos articles, analyses et flashs marchés en temps réel. Filtrez par thème pour aller à l'essentiel."
      />

      <section className="container-app py-8">
        <div className="flex items-center gap-2 overflow-x-auto -mx-2 px-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5",
                active === c
                  ? "bg-[var(--noir)] text-white"
                  : "bg-white border border-[var(--gris-3)] text-[var(--color-text)] hover:border-[var(--violet-500)]"
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              {c}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] divide-y divide-[var(--gris-3)]">
          {filtered.map((n) => (
            <Link
              key={n.id}
              href="#"
              className="block p-6 hover:bg-[var(--gris-4)] transition-colors group"
            >
              <div className="flex items-start gap-6">
                <div className="hidden sm:flex flex-col items-center justify-center shrink-0 w-16 text-center">
                  <p className="text-3xl font-extrabold tabular-nums text-[var(--violet-500)]">
                    {new Date(n.publishedAt).getDate()}
                  </p>
                  <p className="text-xs uppercase tracking-widest font-bold text-[var(--gris-1)]">
                    {new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(new Date(n.publishedAt))}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge tone="violet">{n.category}</Badge>
                    {n.ticker && <Badge tone="orange">${n.ticker}</Badge>}
                    <span className="text-xs text-[var(--gris-1)]">{timeAgo(n.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--gris-1)]">
                      <Clock className="w-3 h-3" />
                      {n.readTime} min
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight leading-snug group-hover:text-[var(--violet-500)] transition-colors">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-[var(--gris-1)] leading-relaxed">{n.excerpt}</p>
                  <p className="mt-3 text-xs font-semibold text-[var(--gris-1)]">Par {n.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
