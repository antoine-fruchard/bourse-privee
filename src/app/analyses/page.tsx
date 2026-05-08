import Link from "next/link";
import {
  ArrowRight,
  PieChart,
  LineChart,
  Target,
  ListChecks,
  GraduationCap,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";

const tools = [
  {
    href: "/analyses/portefeuille",
    Icon: PieChart,
    title: "Analyse de portefeuille",
    description: "Auditez votre allocation : risques, biais, qualité des sous-jacents, recommandations.",
    accent: "from-[#563BFF] to-[#8E6BFF]",
    cta: "Auditer mon portefeuille",
  },
  {
    href: "/analyses/technique",
    Icon: LineChart,
    title: "Analyse technique",
    description: "Cours, supports, résistances, indicateurs : la chartanalyse de l'équipe pour 250 valeurs.",
    accent: "from-[#FF7049] to-[#FFA785]",
    cta: "Ouvrir le graphe",
  },
  {
    href: "/analyses/objectifs",
    Icon: Target,
    title: "Objectifs boursiers",
    description: "Tableau récapitulatif des cours-cibles pour toutes nos valeurs suivies.",
    accent: "from-[#20C997] to-[#5AD7B0]",
    cta: "Voir les objectifs",
  },
  {
    href: "/analyses/selections",
    Icon: ListChecks,
    title: "Nos sélections",
    description: "Des paniers thématiques prêts à l'emploi : IA, énergie, dividendes, small caps.",
    accent: "from-[#1E1863] to-[#563BFF]",
    cta: "Découvrir les paniers",
  },
  {
    href: "/analyses/formations",
    Icon: GraduationCap,
    title: "Formations",
    description: "Apprenez à investir, étape par étape : 24 modules, du débutant au confirmé.",
    accent: "from-[#0033A0] to-[#4DA3FF]",
    cta: "Démarrer une formation",
  },
];

export default function AnalysesIndex() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Analyses" }]}
        eyebrow="Analyses & outils"
        title="Tout ce qu'il faut pour décider en connaissance de cause."
        description="Une boîte à outils pensée pour les investisseurs : analyse de portefeuille, chartanalyse, objectifs cibles, sélections thématiques et formations."
      />

      <section className="container-app py-12">
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative overflow-hidden rounded-[var(--radius-xl)] bg-white border border-[var(--gris-3)] p-7 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className={`absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br ${t.accent} opacity-10 group-hover:opacity-25 transition-opacity`} />
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${t.accent} grid place-items-center text-white shadow-[var(--shadow-sm)]`}>
                <t.Icon className="w-5 h-5" />
              </div>
              <h3 className="relative mt-5 text-2xl font-extrabold tracking-tight">{t.title}</h3>
              <p className="relative mt-2 text-[var(--gris-1)] leading-relaxed flex-1">{t.description}</p>
              <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--violet-500)] group-hover:gap-2.5 transition-all">
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
