import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Bookmark,
  Bell,
  Share2,
  ExternalLink,
  Target,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { Badge, ChangeBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";
import { AreaChart } from "@/components/ui/area-chart";
import { findTicker, allTickers } from "@/data/stocks";
import { news } from "@/data/news";
import { formatPercent, formatPrice, formatCompact, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return allTickers.map((s) => ({ ticker: s.ticker.toLowerCase() }));
}

type RouteParams = Promise<{ ticker: string }>;

export default async function StockDetailPage({ params }: { params: RouteParams }) {
  const { ticker } = await params;
  const stock = findTicker(ticker);
  if (!stock) notFound();
  const upside = ((stock.recoTarget - stock.price) / stock.price) * 100;
  const tickerNews = news.filter((n) => n.ticker === stock.ticker.toUpperCase()).slice(0, 3);
  const fallbackNews = news.slice(0, 3);
  const stockNews = tickerNews.length ? tickerNews : fallbackNews;

  return (
    <>
      <section className="border-b border-[var(--gris-3)] bg-white">
        <div className="container-app py-10">
          <nav className="flex items-center gap-1.5 text-sm mb-6 text-[var(--gris-1)]">
            <Link href="/" className="hover:text-[var(--violet-500)]">Accueil</Link>
            <span>/</span>
            <Link href="/portefeuilles/recommandations" className="hover:text-[var(--violet-500)]">
              Recommandations
            </Link>
            <span>/</span>
            <span className="font-bold text-[var(--color-text)]">{stock.ticker}</span>
          </nav>
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-start gap-5">
              <TickerLogo ticker={stock.ticker} size="xl" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-4xl font-extrabold tracking-tight">{stock.name}</h1>
                  <Badge tone="violet">{stock.consensus}</Badge>
                  {stock.recoStatus === "Active" ? (
                    <Badge tone="green">Reco active</Badge>
                  ) : (
                    <Badge tone="neutral">Clôturée</Badge>
                  )}
                </div>
                <p className="mt-1.5 text-[var(--gris-1)]">
                  <span className="font-mono font-bold">{stock.ticker}</span> · {stock.exchange} · {stock.sector}
                </p>
                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  <span className="text-5xl font-extrabold tracking-tight tabular-nums">
                    {formatPrice(stock.price, stock.currency)}
                  </span>
                  <ChangeBadge value={stock.change1d} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" leadingIcon={<Bell className="w-4 h-4" />}>
                Suivre
              </Button>
              <Button variant="outline" leadingIcon={<Bookmark className="w-4 h-4" />}>
                Watchlist
              </Button>
              <Button variant="ghost" leadingIcon={<Share2 className="w-4 h-4" />}>
                Partager
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
              <AreaChart data={stock.history} positive={stock.change1y >= 0} currency={stock.currency} />
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <KeyStat label="1 jour" value={formatPercent(stock.change1d)} tone={stock.change1d >= 0 ? "up" : "down"} />
              <KeyStat label="1 an" value={formatPercent(stock.change1y)} tone={stock.change1y >= 0 ? "up" : "down"} />
              <KeyStat label="Capi" value={`${formatCompact(stock.marketCap)} ${stock.currency === "USD" ? "$" : "€"}`} />
              <KeyStat label="PER" value={stock.per ? stock.per.toFixed(1) : "—"} />
              <KeyStat label="Yield" value={stock.yieldPct != null ? `${stock.yieldPct.toFixed(1)}%` : "—"} />
              <KeyStat label="Beta" value={stock.beta.toFixed(2)} />
            </div>

            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-7">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div>
                  <Badge tone="violet">Notre thèse</Badge>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
                    Pourquoi nous sommes à l&apos;achat
                  </h2>
                </div>
                <span className="text-sm text-[var(--gris-1)]">Mise à jour {formatDate(stock.recoOpenedAt)}</span>
              </div>
              <p className="text-[17px] text-[var(--gris-1)] leading-relaxed">{stock.thesis}</p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--green-600)] inline-flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Catalyseurs
                  </p>
                  <ul className="mt-3 space-y-2">
                    {stock.catalysts.map((c) => (
                      <li key={c} className="flex gap-2.5 text-[15px] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-500)] mt-2.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--orange-500)] inline-flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Risques à surveiller
                  </p>
                  <ul className="mt-3 space-y-2">
                    {stock.risks.map((r) => (
                      <li key={r} className="flex gap-2.5 text-[15px] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--orange-500)] mt-2.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-4">Actualité de la valeur</h2>
              <div className="grid gap-4">
                {stockNews.map((n) => (
                  <Link
                    key={n.id}
                    href="/actualites/fil"
                    className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-sm)] transition-all flex items-start gap-4"
                  >
                    <span className="w-12 h-12 rounded-xl bg-[var(--violet-50)] text-[var(--violet-700)] grid place-items-center shrink-0">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge tone="violet">{n.category}</Badge>
                        <span className="text-xs text-[var(--gris-1)]">{formatDate(n.publishedAt)}</span>
                        <span className="text-xs text-[var(--gris-1)]">· {n.readTime} min</span>
                      </div>
                      <p className="font-bold tracking-tight">{n.title}</p>
                      <p className="mt-1 text-sm text-[var(--gris-1)] line-clamp-2">{n.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6 sticky top-32">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Notre recommandation</p>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{stock.consensus}</h3>
              <p className="mt-1 text-sm text-[var(--gris-1)]">Type : {stock.recoType}</p>
              <div className="mt-5 grid gap-4">
                <Row label="Cours actuel" value={formatPrice(stock.price, stock.currency)} />
                <Row label="Entrée recommandée" value={formatPrice(stock.recoEntry, stock.currency)} />
                <Row label="Objectif" value={formatPrice(stock.recoTarget, stock.currency)} highlight />
                <Row label="Stop-loss" value={formatPrice(stock.recoStopLoss, stock.currency)} muted />
              </div>
              <div className="mt-6 pt-5 border-t border-[var(--gris-3)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Potentiel</span>
                  <span className={`font-extrabold tabular-nums text-lg ${upside > 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {formatPercent(upside, 1)}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[var(--gris-4)] overflow-hidden">
                  <div className="h-full bg-[var(--violet-500)]" style={{ width: `${Math.min(Math.max(upside, 0), 100)}%` }} />
                </div>
              </div>
              <Button className="w-full mt-6" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                Passer un ordre
              </Button>
              <p className="mt-3 text-xs text-[var(--gris-1)] inline-flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--violet-500)]" />
                Bourse Privée n&apos;exécute jamais d&apos;ordre à votre place. Vous restez maître de votre exécution.
              </p>
            </div>

            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">Score expert</p>
              <div className="mt-3 grid gap-3 text-sm">
                {[
                  { label: "Qualité business", v: 8 },
                  { label: "Valorisation", v: 6 },
                  { label: "Momentum", v: 7 },
                  { label: "Bilan", v: 9 },
                  { label: "Croissance attendue", v: 8 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{s.label}</span>
                      <span className="font-bold tabular-nums">{s.v}/10</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--gris-4)] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.v >= 8 ? "bg-[var(--green-500)]" : s.v >= 6 ? "bg-[var(--violet-500)]" : "bg-[var(--orange-500)]"}`}
                        style={{ width: `${s.v * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] p-6">
              <Target className="w-6 h-6 text-[var(--violet-500)]" />
              <p className="mt-2 font-bold">Valeurs comparables</p>
              <ul className="mt-3 grid gap-2">
                {allTickers
                  .filter((s) => s.sector === stock.sector && s.ticker !== stock.ticker)
                  .slice(0, 4)
                  .map((s) => (
                    <li key={s.ticker}>
                      <Link
                        href={`/valeur/${s.ticker.toLowerCase()}`}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--gris-4)] transition-colors"
                      >
                        <TickerLogo ticker={s.ticker} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{s.name}</p>
                          <p className="text-xs text-[var(--gris-1)]">{s.ticker}</p>
                        </div>
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            s.change1d >= 0 ? "text-emerald-700" : "text-red-700"
                          }`}
                        >
                          {formatPercent(s.change1d, 1)}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function KeyStat({ label, value, tone }: { label: string; value: string; tone?: "up" | "down" }) {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--gris-1)]">{label}</p>
      <p
        className={`mt-1 text-xl font-extrabold tabular-nums tracking-tight ${
          tone === "up" ? "text-emerald-700" : tone === "down" ? "text-red-700" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Row({ label, value, highlight, muted }: { label: string; value: string; highlight?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[var(--gris-1)]">{label}</span>
      <span
        className={`tabular-nums font-bold ${
          highlight ? "text-[var(--violet-500)] text-lg" : muted ? "text-[var(--gris-1)]" : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
