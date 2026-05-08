import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";

const selections = [
  {
    slug: "ia-2026",
    title: "Le panier IA 2026",
    description: "10 valeurs sur toute la chaîne de l'IA : semi, hyperscalers, applicatifs, infra.",
    perf: 38.4,
    tickers: ["NVDA", "MSFT", "META", "ASML", "STMPA"],
    accent: "from-[#563BFF] to-[#8E6BFF]",
    tag: "Top performer",
  },
  {
    slug: "renaissance-nucleaire",
    title: "Renaissance nucléaire",
    description: "Pure players européens du nouveau cycle EPR2 et SMR. Carnet de commandes record.",
    perf: 28.2,
    tickers: ["ALAYA", "AIR"],
    accent: "from-[#1E1863] to-[#563BFF]",
    tag: "Tendance",
  },
  {
    slug: "dividendes-aristos",
    title: "Aristocrates des dividendes EU",
    description: "20 entreprises européennes qui ont augmenté leur dividende chaque année depuis 25 ans.",
    perf: 12.4,
    tickers: ["TTE", "OR", "ACA"],
    accent: "from-[#20C997] to-[#5AD7B0]",
    tag: "Income",
  },
  {
    slug: "pea-100",
    title: "Le PEA 100% éligible",
    description: "Les 15 valeurs européennes qui structurent un PEA gagnant sur le long terme.",
    perf: 18.6,
    tickers: ["MC", "AIR", "OR", "ACA", "TTE"],
    accent: "from-[#FF7049] to-[#FFA785]",
    tag: "Fiscalité",
  },
  {
    slug: "small-caps",
    title: "Small caps cachées",
    description: "10 micro-capitalisations européennes sous-suivies, avec catalyseurs identifiés.",
    perf: 32.4,
    tickers: ["MEMS", "STMPA"],
    accent: "from-[#FFA500] to-[#FFE066]",
    tag: "Convictions",
  },
  {
    slug: "etf-core-lazy",
    title: "Le portefeuille ETF Lazy",
    description: "3 ETF, 1 décision par an, performance proche du World à coût quasi-nul.",
    perf: 19.4,
    tickers: ["WLD", "MEUD", "EMIM"],
    accent: "from-[#0066CC] to-[#4DA3FF]",
    tag: "Passif",
  },
];

export default function SelectionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Analyses", href: "/analyses" },
          { label: "Sélections" },
        ]}
        eyebrow="Sélections thématiques"
        title="Des paniers prêts à l'emploi."
        description="Plus de 14 sélections thématiques actualisées : IA, énergie, dividendes, small caps, PEA. À utiliser en cœur ou en satellite de votre allocation."
      />

      <section className="container-app py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selections.map((s) => (
            <Link
              key={s.slug}
              href="#"
              className="group relative overflow-hidden rounded-[var(--radius-xl)] bg-white border border-[var(--gris-3)] p-7 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${s.accent} opacity-15 group-hover:opacity-30 transition-opacity`} />
              <div className="relative flex items-center justify-between">
                <Sparkles className="w-7 h-7 text-[var(--violet-500)]" />
                <Badge tone="green">+{s.perf.toFixed(1)}% 1 an</Badge>
              </div>
              <p className="relative mt-5 text-[11px] uppercase tracking-widest font-bold text-[var(--orange-500)]">
                {s.tag}
              </p>
              <h3 className="relative mt-1 text-2xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="relative mt-2 text-[var(--gris-1)] leading-relaxed flex-1">{s.description}</p>
              <div className="relative mt-5 flex items-center gap-1.5">
                {s.tickers.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="h-7 px-2.5 rounded-full bg-[var(--gris-4)] text-xs font-bold inline-flex items-center"
                  >
                    {t}
                  </span>
                ))}
                {s.tickers.length > 4 && (
                  <span className="h-7 px-2.5 rounded-full text-xs font-bold inline-flex items-center text-[var(--gris-1)]">
                    +{s.tickers.length - 4}
                  </span>
                )}
              </div>
              <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--violet-500)] group-hover:gap-2 transition-all">
                Voir le panier <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
