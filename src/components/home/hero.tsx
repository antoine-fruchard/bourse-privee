import Link from "next/link";
import { ArrowRight, Sparkles, Bell } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { stocks } from "@/data/stocks";
import { formatPercent, formatPrice } from "@/lib/utils";

export function Hero() {
  const featured = stocks.slice(0, 5);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft pointer-events-none" />
      <div className="absolute inset-x-0 -top-32 h-[480px] bg-[radial-gradient(ellipse_at_top,_var(--violet-100)_0%,_transparent_60%)] pointer-events-none" />

      <div className="container-app relative pt-12 lg:pt-20 pb-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--gris-3)] shadow-[var(--shadow-xs)] text-xs font-bold uppercase tracking-widest text-[var(--violet-700)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--violet-500)]" />
              HelloBroker — Nasdaq & NYSE 2026
            </span>
            <h1 className="mt-5 text-[44px] lg:text-[64px] leading-[1.05] font-extrabold tracking-tight">
              On vous aide à acheter des{" "}
              <span className="text-gradient">actions américaines</span>.
            </h1>
            <p className="mt-5 text-[18px] lg:text-[20px] text-[var(--gris-1)] max-w-2xl leading-relaxed">
              Recommandations sur le Nasdaq et le NYSE, portefeuilles modèles, analyses en profondeur
              et alertes en temps réel — tout ce qu&apos;il faut pour investir aux États-Unis avec
              une longueur d&apos;avance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/portefeuilles/long-terme" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                Voir les portefeuilles US
              </LinkButton>
              <LinkButton href="/alertes" size="lg" variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Configurer mes alertes
              </LinkButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Stat value="+198,4%" label="US Quality Growth depuis 2018" trend="up" />
              <Stat value="12" label="valeurs US en portefeuille" />
              <Stat value="24h" label="délai moyen des alertes email/WA" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--violet-100)] rounded-[var(--radius-xl)] blur-3xl opacity-60 -z-10" />
              <div className="bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--gris-3)] p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                      Recommandations actives
                    </p>
                    <p className="text-lg font-extrabold tracking-tight">Actions US · Live</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-[11px] font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    NYSE ouvert
                  </span>
                </div>
                <ul className="space-y-1">
                  {featured.map((s) => (
                    <li key={s.ticker}>
                      <Link
                        href={`/valeur/${s.ticker.toLowerCase()}`}
                        className="flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-[var(--gris-4)] transition-colors"
                      >
                        <TickerLogo ticker={s.ticker} size="md" />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold leading-tight truncate">{s.name}</p>
                          <p className="text-xs text-[var(--gris-1)]">{s.ticker} · {s.exchange}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold tabular-nums">{formatPrice(s.price, s.currency)}</p>
                          <p
                            className={`text-xs font-bold tabular-nums ${
                              s.change1d >= 0 ? "text-emerald-700" : "text-red-700"
                            }`}
                          >
                            {formatPercent(s.change1d)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/recherche"
                  className="mt-4 flex w-full text-center h-11 rounded-full bg-[var(--gris-4)] text-sm font-semibold items-center justify-center gap-2 hover:bg-[var(--gris-3)] transition-colors"
                >
                  Voir toutes les actions US
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-[var(--shadow-md)] border border-[var(--gris-3)] px-4 py-3 hidden md:flex items-center gap-3">
                <Bell className="w-5 h-5 text-[var(--orange-500)]" />
                <div className="text-sm">
                  <p className="font-bold leading-tight">3 alertes actives</p>
                  <p className="text-[var(--gris-1)] text-xs">Guillaume Gozlan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, trend }: { value: string; label: string; trend?: "up" | "down" }) {
  return (
    <div>
      <p
        className={`text-2xl font-extrabold tabular-nums tracking-tight ${
          trend === "up" ? "text-emerald-700" : trend === "down" ? "text-red-700" : ""
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-[var(--gris-1)] mt-0.5">{label}</p>
    </div>
  );
}
