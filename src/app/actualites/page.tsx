import Link from "next/link";
import { ArrowRight, Clock, Calendar, Headphones, Newspaper } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { news, events } from "@/data/news";
import { timeAgo, formatDate } from "@/lib/utils";

export default function ActualitesIndex() {
  const featured = news[0];
  const main = news.slice(1, 7);
  const next = events[0];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
        eyebrow="Actualités"
        title="L'essentiel des marchés au quotidien."
        description="Le journal de la Bourse, le Morning Zapping de 4 minutes, les lives mensuels et toutes nos analyses au fil de l'eau."
      />

      <section className="container-app py-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <Link
            href="/actualites/morning-zapping"
            className="lg:col-span-7 group relative overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--violet-700)] to-[var(--violet-500)] text-white p-10 min-h-[380px] flex flex-col justify-between"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <Badge tone="live">À la une</Badge>
                <span className="text-xs uppercase tracking-widest font-bold opacity-80">
                  {featured.category}
                </span>
              </div>
              <h2 className="mt-4 text-3xl lg:text-4xl font-extrabold tracking-tight max-w-2xl leading-tight">
                {featured.title}
              </h2>
              <p className="mt-4 text-white/85 max-w-2xl leading-relaxed text-lg">{featured.excerpt}</p>
            </div>
            <div className="relative flex items-center justify-between text-sm">
              <span>
                Par {featured.author} · {timeAgo(featured.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2 font-bold group-hover:gap-3 transition-all">
                Lire <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <div className="lg:col-span-5 space-y-3">
            <Link
              href="/actualites/morning-zapping"
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-sm)] flex items-center gap-4 transition-all"
            >
              <span className="w-12 h-12 rounded-xl bg-[var(--violet-50)] text-[var(--violet-500)] grid place-items-center shrink-0">
                <Headphones className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--violet-500)]">Quotidien</p>
                <p className="font-extrabold tracking-tight">Morning Zapping</p>
                <p className="text-sm text-[var(--gris-1)] line-clamp-1">Le briefing 4 minutes des marchés</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--gris-1)]" />
            </Link>
            <Link
              href="/actualites/journal"
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-sm)] flex items-center gap-4 transition-all"
            >
              <span className="w-12 h-12 rounded-xl bg-[var(--orange-500)]/10 text-[var(--orange-500)] grid place-items-center shrink-0">
                <Newspaper className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--orange-500)]">Hebdomadaire</p>
                <p className="font-extrabold tracking-tight">Journal de la Bourse</p>
                <p className="text-sm text-[var(--gris-1)] line-clamp-1">Le décryptage de la semaine</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--gris-1)]" />
            </Link>
            <Link
              href="/actualites/evenements"
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-sm)] flex items-start gap-4 transition-all"
            >
              <span className="w-12 h-12 rounded-xl bg-[var(--green-500)]/10 text-[var(--green-600)] grid place-items-center shrink-0">
                <Calendar className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--green-600)]">Prochain live</p>
                <p className="font-extrabold tracking-tight line-clamp-1">{next.title}</p>
                <p className="text-sm text-[var(--gris-1)]">
                  {formatDate(next.date)} · {next.time} · {next.format}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--gris-1)]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-app py-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">Le fil d&apos;actualité</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {main.map((n) => (
            <Link
              key={n.id}
              href="/actualites/fil"
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[var(--violet-500)]">
                  {n.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--gris-1)]">
                  <Clock className="w-3.5 h-3.5" />
                  {n.readTime} min
                </span>
              </div>
              <h3 className="font-extrabold tracking-tight leading-snug">{n.title}</h3>
              <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed line-clamp-3">{n.excerpt}</p>
              <p className="mt-4 pt-4 border-t border-[var(--gris-3)] text-xs text-[var(--gris-1)]">
                Par {n.author} · {timeAgo(n.publishedAt)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
