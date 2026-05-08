import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { allTickers } from "@/data/stocks";
import { TickerLogo } from "@/components/ui/ticker-logo";
import { formatPercent, formatPrice } from "@/lib/utils";

export function Movers() {
  const sorted = [...allTickers].sort((a, b) => b.change1d - a.change1d);
  const gainers = sorted.slice(0, 5);
  const losers = sorted.slice(-5).reverse();

  return (
    <section className="container-app py-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <Pane
          title="Top hausses du jour"
          icon={<TrendingUp className="w-4 h-4" />}
          items={gainers}
          accent="text-emerald-700"
          bg="bg-emerald-50"
        />
        <Pane
          title="Top baisses du jour"
          icon={<TrendingDown className="w-4 h-4" />}
          items={losers}
          accent="text-red-700"
          bg="bg-red-50"
        />
      </div>
    </section>
  );
}

function Pane({
  title,
  icon,
  items,
  accent,
  bg,
}: {
  title: string;
  icon: React.ReactNode;
  items: typeof allTickers;
  accent: string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-2">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className={`w-9 h-9 rounded-xl ${bg} ${accent} grid place-items-center`}>{icon}</span>
          <h3 className="font-extrabold text-lg tracking-tight">{title}</h3>
        </div>
        <Link href="/recherche" className="text-sm font-semibold text-[var(--violet-500)] hover:underline">
          Plus
        </Link>
      </div>
      <ul>
        {items.map((s) => {
          const positive = s.change1d >= 0;
          return (
            <li key={s.ticker}>
              <Link
                href={`/valeur/${s.ticker.toLowerCase()}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--gris-4)] transition-colors"
              >
                <TickerLogo ticker={s.ticker} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-tight">{s.name}</p>
                  <p className="text-xs text-[var(--gris-1)]">
                    {s.ticker} · {s.exchange}
                  </p>
                </div>
                <div className="text-right tabular-nums">
                  <p className="font-bold">{formatPrice(s.price, s.currency)}</p>
                  <p className={`text-sm font-bold ${positive ? "text-emerald-700" : "text-red-700"}`}>
                    {formatPercent(s.change1d)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
