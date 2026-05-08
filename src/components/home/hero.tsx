import Link from "next/link";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { stocks } from "@/data/stocks";
import { formatPercent, formatPrice } from "@/lib/utils";

export function Hero() {
  const featured = stocks.slice(0, 4);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-soft pointer-events-none" />
      <div className="absolute inset-x-0 -top-32 h-[480px] bg-[radial-gradient(ellipse_at_top,_var(--violet-100)_0%,_transparent_60%)] pointer-events-none" />

      <div className="container-app relative pt-12 lg:pt-20 pb-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--gris-3)] shadow-[var(--shadow-xs)] text-xs font-bold uppercase tracking-widest text-[var(--violet-700)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--violet-500)]" />
              Club Bourse Privée — édition 2026
            </span>
            <h1 className="mt-5 text-[44px] lg:text-[64px] leading-[1.05] font-extrabold tracking-tight">
              Investir en bourse{" "}
              <span className="text-gradient">avec une longueur d&apos;avance</span>.
            </h1>
            <p className="mt-5 text-[18px] lg:text-[20px] text-[var(--gris-1)] max-w-2xl leading-relaxed">
              Recommandations long et court terme, portefeuilles modèles, communauté d&apos;experts
              et formations : tout ce qu&apos;il faut pour acheter et vendre vos actifs financiers
              avec sérénité.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/portefeuilles/long-terme" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                Voir les portefeuilles
              </LinkButton>
              <LinkButton href="/club/questions" size="lg" variant="outline">
                Poser une question
              </LinkButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Stat value="+184,6%" label="Long Terme depuis 2018" trend="up" />
              <Stat value="2 480" label="Membres actifs" />
              <Stat value="14j" label="Temps de réponse moyen — 4h" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--violet-100)] rounded-[var(--radius-xl)] blur-3xl opacity-60 -z-10" />
              <div className="bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--gris-3)] p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                      Recommandations en cours
                    </p>
                    <p className="text-lg font-extrabold tracking-tight">Notre live d&apos;aujourd&apos;hui</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-[11px] font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Live
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
                          <p className="text-xs text-[var(--gris-1)]">{s.sector}</p>
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
                  href="/portefeuilles/recommandations"
                  className="mt-4 block w-full text-center h-11 rounded-full bg-[var(--gris-4)] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[var(--gris-3)] transition-colors"
                >
                  Voir les 27 recommandations actives
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-[var(--shadow-md)] border border-[var(--gris-3)] px-4 py-3 flex items-center gap-3 hidden md:flex">
                <Users className="w-5 h-5 text-[var(--violet-500)]" />
                <div className="text-sm">
                  <p className="font-bold leading-tight">38 experts</p>
                  <p className="text-[var(--gris-1)] text-xs">à votre écoute</p>
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
