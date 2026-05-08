import Link from "next/link";
import { Download, ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const issues = [
  {
    n: 187,
    date: "2026-05-04",
    title: "Renaissance nucléaire, IA et bénéfices : où placer ses jetons ?",
    cover: "from-[#1E1863] to-[#563BFF]",
    pages: 24,
  },
  {
    n: 186,
    date: "2026-04-27",
    title: "Le luxe à -10% : opportunité historique ou piège de cycle ?",
    cover: "from-[#FF7049] to-[#FFA785]",
    pages: 22,
  },
  {
    n: 185,
    date: "2026-04-20",
    title: "Bourse Europe vs États-Unis : on rééquilibre, vraiment ?",
    cover: "from-[#20C997] to-[#5AD7B0]",
    pages: 26,
  },
  {
    n: 184,
    date: "2026-04-13",
    title: "Special small caps : nos 10 idées pour battre le CAC 40",
    cover: "from-[#0033A0] to-[#4DA3FF]",
    pages: 20,
  },
];

export default function JournalPage() {
  const last = issues[0];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: "Journal de la Bourse" },
        ]}
        eyebrow="Hebdomadaire · Édition n°187"
        title="Le Journal de la Bourse."
        description="Notre publication hebdomadaire : 24 pages d'analyses approfondies, sélections sectorielles et idées d'investissement, tous les lundis matin."
        action={<LinkButton href="#" leadingIcon={<Download className="w-4 h-4" />}>Télécharger l&apos;édition</LinkButton>}
      />

      <section className="container-app py-12">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className={`relative overflow-hidden rounded-[var(--radius-xl)] aspect-[3/4] bg-gradient-to-br ${last.cover} text-white p-8 shadow-[var(--shadow-lg)]`}>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="relative h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-2xl tracking-tight">Bourse Privée</span>
                  <span className="text-xs uppercase tracking-widest font-bold opacity-80">N°{last.n}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-widest opacity-80">{formatDate(last.date)}</p>
                <div className="flex-1 grid place-items-center text-center">
                  <BookOpen className="w-16 h-16 opacity-30 absolute" />
                  <h3 className="relative text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">
                    {last.title}
                  </h3>
                </div>
                <p className="text-xs opacity-70">{last.pages} pages · 14 analyses · 6 graphiques</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">Au sommaire de l&apos;édition n°{last.n}</h2>
            <ul className="space-y-3">
              {[
                { num: "01", title: "Édito : pourquoi 2026 ressemble (un peu trop) à 1999", page: 3 },
                { num: "02", title: "Sélection EPR2 : 4 valeurs européennes à acheter sur faiblesse", page: 6 },
                { num: "03", title: "Battle expert : Nasdaq, on allège ou on tient ?", page: 10 },
                { num: "04", title: "Décryptage : la nouvelle politique monétaire BCE", page: 13 },
                { num: "05", title: "Analyse technique : le DAX casse une résistance majeure", page: 16 },
                { num: "06", title: "Pédagogie : maîtriser le PEG en 5 minutes", page: 19 },
                { num: "07", title: "Le portefeuille du mois : 12 valeurs pour les 3 ans qui viennent", page: 22 },
              ].map((s) => (
                <li
                  key={s.num}
                  className="flex items-center gap-4 bg-white rounded-xl border border-[var(--gris-3)] p-4 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-xs)] transition-all"
                >
                  <span className="w-10 h-10 rounded-lg bg-[var(--violet-50)] text-[var(--violet-700)] grid place-items-center font-extrabold tabular-nums">
                    {s.num}
                  </span>
                  <p className="flex-1 font-bold text-[15px] tracking-tight">{s.title}</p>
                  <span className="text-xs text-[var(--gris-1)] font-mono">p.{s.page}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-app pb-16">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">Les éditions précédentes</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {issues.slice(1).map((iss) => (
            <Link
              key={iss.n}
              href="#"
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-2 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] transition-all"
            >
              <div className={`relative overflow-hidden rounded-[var(--radius-md)] aspect-[3/2] bg-gradient-to-br ${iss.cover} text-white p-5`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold">Bourse Privée</span>
                  <Badge tone="neutral" className="!bg-white/20 !text-white">
                    N°{iss.n}
                  </Badge>
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-widest opacity-80">
                  {formatDate(iss.date)}
                </p>
                <p className="absolute bottom-4 right-4 text-xs font-bold opacity-80">
                  {iss.pages} pages
                </p>
              </div>
              <div className="p-4">
                <p className="font-bold tracking-tight leading-snug">{iss.title}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--violet-500)] group-hover:gap-1.5 transition-all">
                  Lire <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
