import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolios } from "@/data/portfolios";
import { LinkButton } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { formatPercent } from "@/lib/utils";

export function PortfolioStrip() {
  return (
    <section className="container-app py-16">
      <SectionTitle
        eyebrow="Portefeuilles"
        title="Trois portefeuilles, trois approches, du track record."
        description="Long terme, court terme et 100% ETF. Les performances sont calculées net de frais, dividendes réinvestis, et publiées en temps réel à chaque arbitrage."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {portfolios.map((p) => (
          <Link
            key={p.id}
            href={`/portefeuilles/${p.id === "lt-equilibre" ? "long-terme" : p.id === "ct-momentum" ? "court-terme" : "etf"}`}
            className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[var(--violet-200)] flex flex-col"
          >
            <span className="inline-block w-fit text-[11px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[var(--violet-50)] text-[var(--violet-700)]">
              {p.type}
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{p.name}</h3>
            <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed flex-1">
              {p.description}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Cell label="YTD" value={formatPercent(p.ytd)} positive={p.ytd > 0} />
              <Cell label="1 an" value={formatPercent(p.oneYear)} positive={p.oneYear > 0} />
              <Cell
                label={`Depuis ${new Date(p.inceptionDate).getFullYear()}`}
                value={formatPercent(p.inception)}
                positive={p.inception > 0}
                strong
              />
            </div>
            <div className="mt-5 pt-4 border-t border-[var(--gris-3)] flex items-center justify-between text-sm">
              <span className="text-[var(--gris-1)]">vs {p.benchmark}</span>
              <span className="font-semibold text-[var(--violet-500)] inline-flex items-center gap-1">
                Détail <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <LinkButton href="/portefeuilles/performances" variant="outline">
          Voir le track record complet
        </LinkButton>
      </div>
    </section>
  );
}

function Cell({
  label,
  value,
  positive,
  strong,
}: {
  label: string;
  value: string;
  positive?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="rounded-xl bg-[var(--gris-4)] px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--gris-1)]">{label}</p>
      <p
        className={`tabular-nums font-extrabold ${strong ? "text-base" : "text-sm"} ${
          positive ? "text-emerald-700" : "text-red-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
