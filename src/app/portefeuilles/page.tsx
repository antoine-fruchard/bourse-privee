import Link from "next/link";
import { ArrowRight, TrendingUp, Award, Shield } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { portfolios } from "@/data/portfolios";
import { formatPercent } from "@/lib/utils";

const slugMap = {
  "lt-equilibre": "long-terme",
  "ct-momentum": "court-terme",
  "etf-core": "etf",
} as const;

export default function PortefeuillesIndex() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Portefeuilles" }]}
        eyebrow="Portefeuilles"
        title="3 portefeuilles, 3 horizons, du track record."
        description="Long terme, court terme et 100% ETF. Toutes les performances sont publiées net de frais, mises à jour à chaque arbitrage."
        action={
          <LinkButton href="/portefeuilles/performances" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Voir le track record
          </LinkButton>
        }
      />

      <section className="container-app py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {portfolios.map((p) => {
            const slug = slugMap[p.id as keyof typeof slugMap];
            return (
              <Link
                key={p.id}
                href={`/portefeuilles/${slug}`}
                className="group bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-7 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all flex flex-col"
              >
                <Badge tone="violet">{p.type}</Badge>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight">{p.name}</h2>
                <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed flex-1">
                  {p.description}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Cell label="YTD" value={formatPercent(p.ytd)} />
                  <Cell label="1 an" value={formatPercent(p.oneYear)} />
                  <Cell label="Lancement" value={formatPercent(p.inception)} strong />
                </div>
                <div className="mt-6 pt-5 border-t border-[var(--gris-3)] flex items-center justify-between text-sm">
                  <span className="text-[var(--gris-1)]">vs {p.benchmark}</span>
                  <span className="font-semibold text-[var(--violet-500)] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Détail <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-app pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { Icon: TrendingUp, title: "Performances net de frais", body: "Aucun frais caché. Toutes les performances sont calculées dividendes réinvestis." },
            { Icon: Award, title: "Track record auditable", body: "Chaque mouvement est daté et tracé. Vous pouvez reconstituer l'historique à tout moment." },
            { Icon: Shield, title: "Aucun engagement", body: "Vous restez maître de votre allocation. Nous fournissons les idées, vous décidez." },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
              <span className="w-11 h-11 rounded-xl bg-[var(--violet-50)] text-[var(--violet-700)] grid place-items-center">
                <b.Icon className="w-4.5 h-4.5" />
              </span>
              <p className="mt-4 font-bold text-lg">{b.title}</p>
              <p className="mt-1 text-sm text-[var(--gris-1)] leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Cell({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  const positive = value.startsWith("+");
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
