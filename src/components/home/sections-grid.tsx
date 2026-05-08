import Link from "next/link";
import { ArrowUpRight, MessageCircle, Newspaper, BarChart3, LineChart } from "lucide-react";

const sections = [
  {
    href: "/club",
    label: "Le club",
    badge: "Nouveau",
    title: "Échangez avec 2 480 membres",
    description: "Questions, débats, battles : la communauté qui vous fait progresser.",
    Icon: MessageCircle,
    accent: "from-[#FF7049] to-[#FF9D7A]",
  },
  {
    href: "/actualites/fil",
    label: "Actualités",
    title: "L'essentiel des marchés",
    description: "Morning Zapping, journal hebdo, lives : on vous tient au courant.",
    Icon: Newspaper,
    accent: "from-[#563BFF] to-[#8E6BFF]",
  },
  {
    href: "/portefeuilles/long-terme",
    label: "Portefeuilles",
    title: "Recommandations suivies",
    description: "Long terme, court terme, ETF : 12 valeurs phares avec performances live.",
    Icon: LineChart,
    accent: "from-[#20C997] to-[#5AD7B0]",
  },
  {
    href: "/analyses/portefeuille",
    label: "Analyses",
    title: "Outils & formations",
    description: "Analyse technique, objectifs, screeners : la boîte à outils complète.",
    Icon: BarChart3,
    accent: "from-[#1E1863] to-[#563BFF]",
  },
];

export function SectionsGrid() {
  return (
    <section className="container-app py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-white border border-[var(--gris-3)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[var(--violet-200)]"
          >
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${s.accent} opacity-10 group-hover:opacity-25 transition-opacity`} />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.accent} grid place-items-center text-white shadow-[var(--shadow-sm)]`}>
                  <s.Icon className="w-4.5 h-4.5" />
                </div>
                {s.badge && (
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-[var(--orange-500)] text-white">
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                {s.label}
              </p>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--gris-1)] leading-relaxed flex-1">
                {s.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--violet-500)] group-hover:gap-2.5 transition-all">
                Découvrir
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
