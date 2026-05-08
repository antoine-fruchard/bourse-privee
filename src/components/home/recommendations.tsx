import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stocks } from "@/data/stocks";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Sparkline } from "@/components/ui/sparkline";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { formatPercent, formatPrice, formatDate } from "@/lib/utils";

export function Recommendations() {
  const items = stocks.slice(0, 6);

  return (
    <section className="container-app py-16">
      <SectionTitle
        eyebrow="Recommandations US"
        title="Nos meilleures idées sur le Nasdaq & NYSE"
        description="Thèses d'investissement avec entrée, objectif et stop-loss explicites sur les meilleures actions américaines. Toutes datées et tracées."
        action={
          <LinkButton href="/portefeuilles/recommandations" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Voir toutes les recos
          </LinkButton>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const positive = s.change1d >= 0;
          const upside = ((s.recoTarget - s.price) / s.price) * 100;
          return (
            <Link
              key={s.ticker}
              href={`/valeur/${s.ticker.toLowerCase()}`}
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[var(--violet-200)]"
            >
              <div className="flex items-start justify-between gap-3">
                <TickerLogo ticker={s.ticker} size="lg" />
                {s.recoStatus === "Active" ? (
                  <Badge tone="green">Active</Badge>
                ) : (
                  <Badge tone="neutral">Clôturée</Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="font-extrabold text-lg tracking-tight">{s.name}</p>
                <p className="text-sm text-[var(--gris-1)]">
                  {s.exchange} · {s.sector}
                </p>
              </div>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-2xl font-extrabold tabular-nums tracking-tight">
                    {formatPrice(s.price, s.currency)}
                  </p>
                  <p
                    className={`text-sm font-bold tabular-nums ${
                      positive ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {formatPercent(s.change1d)} aujourd&apos;hui
                  </p>
                </div>
                <Sparkline data={s.history.slice(-90)} positive={s.change1y >= 0} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                <Mini label="Entrée" value={formatPrice(s.recoEntry, s.currency)} />
                <Mini label="Objectif" value={formatPrice(s.recoTarget, s.currency)} />
                <Mini
                  label="Potentiel"
                  value={formatPercent(upside, 1)}
                  highlight={upside > 0}
                />
              </div>
              <div className="mt-5 pt-4 border-t border-[var(--gris-3)] flex items-center justify-between text-xs text-[var(--gris-1)]">
                <span>Reco du {formatDate(s.recoOpenedAt)}</span>
                <span className="inline-flex items-center gap-1 text-[var(--violet-500)] font-semibold group-hover:gap-1.5 transition-all">
                  Voir la fiche <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Mini({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--gris-1)]">{label}</p>
      <p className={`text-sm font-bold tabular-nums ${highlight ? "text-emerald-700" : ""}`}>{value}</p>
    </div>
  );
}
