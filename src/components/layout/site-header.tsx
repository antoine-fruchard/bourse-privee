"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, ChevronDown, Menu, X, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  badge?: string;
  description: string;
  children?: { label: string; href: string; description: string }[];
};

const navigation: NavItem[] = [
  {
    label: "Actions US",
    href: "/recherche",
    badge: "Live",
    description: "Les meilleures opportunités sur Nasdaq et NYSE",
    children: [
      { label: "Screener d'actions", href: "/recherche", description: "Filtrez les 500 meilleures valeurs US" },
      { label: "Apple (AAPL)", href: "/valeur/aapl", description: "Tech — $189.30 · +22.4% sur 1 an" },
      { label: "Nvidia (NVDA)", href: "/valeur/nvda", description: "Semi · $178.20 · +168.4% sur 1 an" },
      { label: "Microsoft (MSFT)", href: "/valeur/msft", description: "Cloud · $482.30 · +28.7% sur 1 an" },
      { label: "Alphabet (GOOGL)", href: "/valeur/googl", description: "Internet · $172.80 · +38.2% sur 1 an" },
    ],
  },
  {
    label: "Portefeuilles",
    href: "/portefeuilles",
    description: "Nos sélections US avec performances live",
    children: [
      { label: "US Quality Growth", href: "/portefeuilles/long-terme", description: "12 valeurs phares, horizon 5 ans+" },
      { label: "US Momentum", href: "/portefeuilles/court-terme", description: "Sélection tactique 1–3 mois" },
      { label: "ETF US Core", href: "/portefeuilles/etf", description: "Exposition US passive <0.15% frais" },
      { label: "Recommandations actives", href: "/portefeuilles/recommandations", description: "Toutes nos recos en cours" },
      { label: "Performances", href: "/portefeuilles/performances", description: "Le track record complet" },
    ],
  },
  {
    label: "Analyses",
    href: "/analyses",
    description: "Outils d'analyse et formations US",
    children: [
      { label: "Analyse de portefeuille", href: "/analyses/portefeuille", description: "Auditez votre allocation US" },
      { label: "Analyse technique", href: "/analyses/technique", description: "Graphiques et signaux US" },
      { label: "Objectifs de cours", href: "/analyses/objectifs", description: "Nos cibles prix sur 12 mois" },
      { label: "Sélections thématiques", href: "/analyses/selections", description: "IA, cloud, fintech, santé" },
      { label: "Formations", href: "/analyses/formations", description: "Apprendre à investir aux US" },
    ],
  },
  {
    label: "Actualités",
    href: "/actualites",
    description: "L'essentiel des marchés US au quotidien",
    children: [
      { label: "Fil US", href: "/actualites/fil", description: "Le live de nos analystes" },
      { label: "Journal hebdo", href: "/actualites/journal", description: "Notre synthèse de la semaine" },
      { label: "Morning Briefing", href: "/actualites/morning-zapping", description: "Le briefing 4 minutes — Wall St" },
      { label: "Évènements", href: "/actualites/evenements", description: "Earnings, Fed, lives" },
    ],
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled
          ? "glass shadow-[0_1px_0_var(--gris-3)]"
          : "bg-white border-b border-[var(--gris-3)]"
      )}
    >
      <div className="container-app h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg gradient-violet grid place-items-center text-white font-extrabold text-sm">
            HB
          </span>
          <span className="font-extrabold tracking-tight text-[17px]">
            Hello<span className="text-[var(--violet-500)]">Broker</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "h-10 px-4 rounded-full inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-text)] hover:bg-[var(--gris-4)] transition-colors",
                  open === item.label && "bg-[var(--gris-4)]"
                )}
              >
                {item.label}
                {item.badge && (
                  <span className="text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-full bg-[var(--orange-500)] text-white">
                    {item.badge}
                  </span>
                )}
                {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>

              {item.children && open === item.label && (
                <div className="absolute left-0 top-full pt-2 w-[460px]">
                  <div className="bg-white rounded-2xl shadow-[var(--shadow-lg)] border border-[var(--gris-3)] p-2">
                    <div className="px-4 py-3 mb-2 rounded-xl bg-gradient-to-br from-[var(--violet-50)] to-white">
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--violet-500)]">
                        {item.label}
                      </p>
                      <p className="text-[15px] font-semibold mt-1">{item.description}</p>
                    </div>
                    <div className="grid gap-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="px-4 py-3 rounded-xl hover:bg-[var(--gris-4)] flex items-start gap-3 group"
                        >
                          <span className="w-9 h-9 rounded-lg bg-[var(--violet-50)] text-[var(--violet-700)] grid place-items-center shrink-0 group-hover:bg-[var(--violet-100)] transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                          <span>
                            <span className="block font-semibold text-[15px]">{sub.label}</span>
                            <span className="block text-sm text-[var(--gris-1)]">{sub.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/recherche"
            className="h-11 px-4 rounded-full bg-[var(--gris-4)] hover:bg-[var(--gris-3)] inline-flex items-center gap-2 text-sm text-[var(--gris-1)] transition-colors min-w-[200px]"
            aria-label="Rechercher une action US"
          >
            <Search className="w-4 h-4" />
            AAPL, NVDA, MSFT…
            <span className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded bg-white border border-[var(--gris-3)]">
              ⌘K
            </span>
          </Link>
        </div>

        <Link
          href="/alertes"
          aria-label="Alertes"
          className="hidden md:grid w-10 h-10 rounded-full hover:bg-[var(--gris-4)] place-items-center transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--orange-500)]" />
        </Link>

        <Link
          href="/profil"
          className="hidden md:flex items-center gap-2 px-1.5 py-1.5 rounded-full hover:bg-[var(--gris-4)] transition-colors"
        >
          <span className="w-8 h-8 rounded-full gradient-violet grid place-items-center text-white text-xs font-bold">
            GG
          </span>
          <span className="text-sm font-semibold pr-2">Guillaume</span>
        </Link>

        <button
          aria-label="Menu"
          className="lg:hidden grid w-10 h-10 rounded-full hover:bg-[var(--gris-4)] place-items-center"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-[var(--shadow-lg)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-[var(--gris-3)]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg gradient-violet grid place-items-center text-white font-extrabold text-xs">HB</span>
                <span className="font-extrabold">HelloBroker</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[var(--gris-4)] grid place-items-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              <Link
                href="/alertes"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[var(--gris-4)] mb-1"
              >
                <Bell className="w-4 h-4 text-[var(--orange-500)]" />
                <span className="font-bold text-[15px]">Mes alertes</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-[var(--orange-500)] text-white">3</span>
              </Link>
              {navigation.map((item) => (
                <details key={item.label} className="group rounded-2xl mb-1">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer rounded-2xl hover:bg-[var(--gris-4)]">
                    <span className="font-bold text-[15px]">{item.label}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-2 pl-2">
                    {item.children?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 rounded-xl hover:bg-[var(--gris-4)] text-sm"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </nav>
            <div className="p-4 border-t border-[var(--gris-3)] flex items-center gap-3">
              <span className="w-9 h-9 rounded-full gradient-violet grid place-items-center text-white text-xs font-bold shrink-0">GG</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">Guillaume Gozlan</p>
                <p className="text-xs text-[var(--gris-1)] truncate">Compte démo HelloBroker</p>
              </div>
              <Link href="/profil" onClick={() => setMobileOpen(false)}>
                <Button size="sm">Profil</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
