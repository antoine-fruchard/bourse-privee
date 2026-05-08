import Link from "next/link";
import { Play, Headphones, Volume2, ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";

const episodes = [
  { n: 412, date: "2026-05-07", title: "Nvidia, Microsoft et Total volent la vedette", duration: "4:12" },
  { n: 411, date: "2026-05-06", title: "Pourquoi la BCE a peut-être déjà fini son cycle de baisse", duration: "3:48" },
  { n: 410, date: "2026-05-05", title: "Stellantis surprise au 1er trimestre, on creuse", duration: "4:32" },
  { n: 409, date: "2026-05-02", title: "Spécial CAC 40 : que retenir des résultats Q1 ?", duration: "5:08" },
  { n: 408, date: "2026-04-30", title: "Apple et le pari de l'IA in-device", duration: "3:42" },
  { n: 407, date: "2026-04-29", title: "L'or à 3 200 $ : trop tard pour rentrer ?", duration: "4:24" },
];

export default function MorningPage() {
  const today = episodes[0];
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: "Morning Zapping" },
        ]}
        eyebrow="Quotidien · 6h45 chaque matin"
        title="Le briefing 4 minutes."
        description="L'essentiel des marchés à savoir pour bien démarrer la journée. Un format court, dense, sans bullshit."
      />

      <section className="container-app py-12">
        <div className="rounded-[var(--radius-xl)] overflow-hidden bg-[var(--noir)] text-white p-8 lg:p-12 relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[var(--violet-500)] rounded-full blur-[140px] opacity-50" />
          <div className="relative grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <Badge tone="live">Édition du jour</Badge>
                <span className="text-xs uppercase tracking-widest font-bold opacity-80">
                  N°{today.n}
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {today.title}
              </h2>
              <p className="mt-4 text-white/80 text-lg leading-relaxed">
                Au programme : les chiffres trimestriels US, le sursaut du pétrole sur les tensions
                géopolitiques, et 3 catalyseurs à surveiller cette semaine sur le CAC 40.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <button className="w-16 h-16 rounded-full bg-white text-[var(--noir)] grid place-items-center hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 ml-1" fill="currentColor" />
                </button>
                <div>
                  <p className="font-bold">Écouter l&apos;épisode</p>
                  <p className="text-sm opacity-70">{today.duration} min · Sébastien Roux</p>
                </div>
              </div>
              <div className="mt-6 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[34%] rounded-full" />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs opacity-70 tabular-nums">
                <span>1:24</span>
                <span>{today.duration}</span>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Aussi disponible</p>
              {[
                { name: "Apple Podcasts", icon: <Headphones className="w-4 h-4" /> },
                { name: "Spotify", icon: <Volume2 className="w-4 h-4" /> },
                { name: "Deezer", icon: <Play className="w-4 h-4" /> },
                { name: "RSS feed", icon: <ArrowRight className="w-4 h-4" /> },
              ].map((p) => (
                <a
                  key={p.name}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
                >
                  <span className="w-9 h-9 rounded-lg bg-white/15 grid place-items-center">{p.icon}</span>
                  <span className="font-semibold">{p.name}</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">Les épisodes précédents</h2>
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] divide-y divide-[var(--gris-3)]">
          {episodes.slice(1).map((ep) => (
            <Link
              key={ep.n}
              href="#"
              className="flex items-center gap-4 p-5 hover:bg-[var(--gris-4)] transition-colors group"
            >
              <button className="w-12 h-12 rounded-full bg-[var(--violet-50)] text-[var(--violet-500)] grid place-items-center group-hover:bg-[var(--violet-500)] group-hover:text-white transition-colors shrink-0">
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                  N°{ep.n} · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(ep.date))}
                </p>
                <p className="font-bold text-[15px] tracking-tight mt-0.5">{ep.title}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--gris-1)] tabular-nums shrink-0">
                <Clock className="w-3.5 h-3.5" />
                {ep.duration}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
