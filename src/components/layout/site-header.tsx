"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
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
    label: "Le club",
    href: "/club",
    badge: "Nouveau",
    description: "Échangez avec les experts et les autres membres",
    children: [
      { label: "Questions boursières", href: "/club/questions", description: "Posez vos questions à nos experts" },
      { label: "Battle de la semaine", href: "/club/battle", description: "Votez et défendez vos convictions" },
      { label: "Groupe WhatsApp", href: "/club/whatsapp", description: "Le canal direct des membres" },
    ],
  },
  {
    label: "Actualités",
    href: "/actualites",
    description: "L'essentiel des marchés au quotidien",
    children: [
      { label: "Fil d'actualité", href: "/actualites/fil", description: "Le live de nos analystes" },
      { label: "Journal de la Bourse", href: "/actualites/journal", description: "Notre hebdomadaire de référence" },
      { label: "Morning Zapping", href: "/actualites/morning-zapping", description: "Le briefing 4 minutes" },
      { label: "Nos évènements", href: "/actualites/evenements", description: "Lives, ateliers, masterclass" },
    ],
  },
  {
    label: "Portefeuilles",
    href: "/portefeuilles",
    description: "Recommandations et performances suivies",
    children: [
      { label: "Long terme", href: "/portefeuilles/long-terme", description: "Notre portefeuille phare 12 valeurs" },
      { label: "Court terme", href: "/portefeuilles/court-terme", description: "Sélection tactique momentum" },
      { label: "Le coin ETF", href: "/portefeuilles/etf", description: "Allocation 100% indicielle" },
      { label: "Dernières recommandations", href: "/portefeuilles/recommandations", description: "Toutes les recos suivies" },
      { label: "Nos performances", href: "/portefeuilles/performances", description: "Le track record complet" },
    ],
  },
  {
    label: "Analyses",
    href: "/analyses",
    description: "Outils, méthodes et formations",
    children: [
      { label: "Analyse de portefeuille", href: "/analyses/portefeuille", description: "Auditez votre allocation" },
      { label: "Analyse technique", href: "/analyses/technique", description: "Graphiques et signaux" },
      { label: "Objectifs boursiers", href: "/analyses/objectifs", description: "Le tableau de bord des cibles" },
      { label: "Nos sélections", href: "/analyses/selections", description: "Les paniers thématiques" },
      { label: "Nos formations", href: "/analyses/formations", description: "Apprendre à investir mieux" },
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
          <span className="w-8 h-8 rounded-lg gradient-violet grid place-items-center text-white font-extrabold">
            B
          </span>
          <span className="font-extrabold tracking-tight text-[17px]">
            Bourse <span className="text-[var(--violet-500)]">Privée</span>
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
                <div className="absolute left-0 top-full pt-2 w-[440px]">
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
            aria-label="Rechercher une valeur"
          >
            <Search className="w-4 h-4" />
            Rechercher une valeur…
            <span className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded bg-white border border-[var(--gris-3)]">
              ⌘K
            </span>
          </Link>
        </div>

        <button
          aria-label="Notifications"
          className="hidden md:grid w-10 h-10 rounded-full hover:bg-[var(--gris-4)] place-items-center transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--orange-500)]" />
        </button>

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
              <span className="font-extrabold">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[var(--gris-4)] grid place-items-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
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
            <div className="p-4 border-t border-[var(--gris-3)]">
              <Button className="w-full" size="md">
                Mon profil
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
