import Link from "next/link";
import {
  ArrowRight,
  Settings,
  Shield,
  CreditCard,
  Bell,
  LogOut,
  Award,
  TrendingUp,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Stat } from "@/components/ui/stat";
import { Badge } from "@/components/ui/badge";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { stocks } from "@/data/stocks";
import { formatPercent, formatPrice } from "@/lib/utils";

export default function ProfilPage() {
  const watchlist = stocks.slice(0, 5);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Mon profil" }]}
        eyebrow="Membre depuis avril 2018"
        title="Bonjour Guillaume."
        description="Votre tableau de bord personnel : abonnement, watchlist, historique, alertes et préférences."
        action={
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--orange-500)]/10 text-[var(--orange-500)] text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Membre Gold
          </span>
        }
      />

      <section className="container-app py-10 grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6 text-center">
            <span className="w-20 h-20 rounded-full gradient-violet text-white text-2xl font-extrabold mx-auto grid place-items-center">
              GG
            </span>
            <p className="mt-3 font-extrabold text-lg">Guillaume Gozlan</p>
            <p className="text-sm text-[var(--gris-1)]">guillaume@example.com</p>
            <Badge tone="violet" className="mt-3">Long terme · 12 lignes</Badge>
          </div>
          <nav className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-2 mt-3">
            {[
              { href: "/profil", icon: Settings, label: "Réglages", active: true },
              { href: "#", icon: Shield, label: "Sécurité" },
              { href: "#", icon: CreditCard, label: "Abonnement" },
              { href: "/alertes", icon: Bell, label: "Mes alertes" },
              { href: "#", icon: LogOut, label: "Déconnexion" },
            ].map((m) => (
              <Link
                key={m.label}
                href={m.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  m.active
                    ? "bg-[var(--violet-50)] text-[var(--violet-700)]"
                    : "text-[var(--color-text)] hover:bg-[var(--gris-4)]"
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9 space-y-8">
          <div className="grid gap-3 md:grid-cols-4">
            <Card>
              <Stat label="Performance YTD" value="+18,4%" trend="up" hint="vs S&P 500 +11,2%" />
            </Card>
            <Card>
              <Stat label="Valorisation suivie" value="142 800 €" trend="neutral" hint="+24 200 € sur 1 an" />
            </Card>
            <Card>
              <Stat label="Watchlist" value="14 valeurs" hint="3 alertes actives" />
            </Card>
            <Card>
              <Stat label="Questions posées" value="38" hint="100% de réponse" />
            </Card>
          </div>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-extrabold tracking-tight">Ma watchlist</h2>
              <Link href="/recherche" className="text-sm font-semibold text-[var(--violet-500)] inline-flex items-center gap-1">
                Ajouter une valeur <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] divide-y divide-[var(--gris-3)]">
              {watchlist.map((s) => (
                <Link
                  key={s.ticker}
                  href={`/valeur/${s.ticker.toLowerCase()}`}
                  className="flex items-center gap-4 p-5 hover:bg-[var(--gris-4)] transition-colors group"
                >
                  <TickerLogo ticker={s.ticker} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold">{s.name}</p>
                    <p className="text-sm text-[var(--gris-1)]">
                      {s.ticker} · alerte si {">"}{formatPrice(s.recoTarget * 0.95, s.currency)}
                    </p>
                  </div>
                  <div className="text-right tabular-nums shrink-0">
                    <p className="font-bold">{formatPrice(s.price, s.currency)}</p>
                    <p className={`text-sm font-bold ${s.change1d >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                      {formatPercent(s.change1d)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Mes derniers mouvements</h2>
            <ul className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] divide-y divide-[var(--gris-3)]">
              {[
                { date: "06 mai 2026", action: "Recommandation suivie", body: "Microsoft (MSFT) : objectif relevé à $560", icon: TrendingUp, color: "text-[var(--green-600)]" },
                { date: "04 mai 2026", action: "Alerte déclenchée", body: "Meta (META) : seuil $700 atteint · +14,3%", icon: Bell, color: "text-[var(--orange-500)]" },
                { date: "02 mai 2026", action: "Watchlist", body: "Ajout de Oracle (ORCL) · backlog $130B record", icon: Award, color: "text-[var(--violet-500)]" },
                { date: "28 avril 2026", action: "Reco clôturée", body: "Tesla (TSLA) — sortie à $248 · +8,8%", icon: TrendingUp, color: "text-[var(--green-600)]" },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-4 p-5">
                  <span className="w-9 h-9 rounded-xl bg-[var(--gris-4)] grid place-items-center shrink-0">
                    <a.icon className={`w-4 h-4 ${a.color}`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                        {a.action}
                      </p>
                      <span className="text-xs text-[var(--gris-1)]">{a.date}</span>
                    </div>
                    <p className="font-bold text-[15px] mt-0.5">{a.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5">{children}</div>
  );
}
