import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { news } from "@/data/news";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { timeAgo } from "@/lib/utils";

export function NewsStrip() {
  const featured = news[0];
  const others = news.slice(1, 5);

  return (
    <section className="container-app py-16">
      <SectionTitle
        eyebrow="Actualités"
        title="L'essentiel des marchés au quotidien"
        description="Morning Zapping, journal de la bourse, sélections : nos analystes décryptent l'actu pour vous tenir au cœur du game."
        action={
          <LinkButton href="/actualites/fil" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Toute l&apos;actu
          </LinkButton>
        }
      />
      <div className="grid gap-6 lg:grid-cols-12">
        <Link
          href="/actualites/morning-zapping"
          className="lg:col-span-7 relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gris-3)] bg-gradient-to-br from-[var(--violet-700)] to-[var(--violet-500)] text-white p-8 lg:p-10 min-h-[340px] flex flex-col justify-between group"
        >
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute top-8 right-8 text-7xl opacity-20 font-black">📈</div>
          <div className="relative">
            <div className="flex items-center gap-3">
              <Badge tone="live">À la une</Badge>
              <span className="text-xs uppercase tracking-widest font-bold opacity-80">
                {featured.category}
              </span>
            </div>
            <h3 className="mt-4 text-3xl lg:text-4xl font-extrabold tracking-tight max-w-2xl leading-tight">
              {featured.title}
            </h3>
            <p className="mt-4 text-white/85 max-w-2xl leading-relaxed">{featured.excerpt}</p>
          </div>
          <div className="relative flex items-center justify-between mt-8 text-sm">
            <span className="opacity-90">
              Par {featured.author} · {timeAgo(featured.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2 font-bold group-hover:gap-3 transition-all">
              Lire <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        <div className="lg:col-span-5 grid gap-3">
          {others.map((n) => (
            <Link
              key={n.id}
              href="/actualites/fil"
              className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-sm)] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[var(--violet-500)]">
                  {n.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--gris-1)]">
                  <Clock className="w-3.5 h-3.5" />
                  {n.readTime} min
                </span>
              </div>
              <h4 className="font-bold text-[16px] tracking-tight leading-snug group-hover:text-[var(--violet-500)] transition-colors">
                {n.title}
              </h4>
              <p className="mt-1.5 text-sm text-[var(--gris-1)] line-clamp-2 leading-relaxed">
                {n.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
