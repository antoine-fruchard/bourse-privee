import Link from "next/link";
import {
  Play,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Lock,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";

const tracks = [
  {
    title: "Démarrer en bourse",
    level: "Débutant",
    color: "from-[#20C997] to-[#5AD7B0]",
    progress: 100,
    modules: [
      { title: "Comprendre les marchés actions", duration: "12 min", done: true },
      { title: "Ouvrir le bon compte (PEA / CTO / AV)", duration: "9 min", done: true },
      { title: "Premier ordre : passer une transaction", duration: "8 min", done: true },
      { title: "ETF ou actions individuelles ?", duration: "11 min", done: true },
      { title: "Diversification : les règles d'or", duration: "10 min", done: true },
    ],
  },
  {
    title: "Investir en compounders",
    level: "Intermédiaire",
    color: "from-[#563BFF] to-[#8E6BFF]",
    progress: 60,
    modules: [
      { title: "Identifier un compounder", duration: "14 min", done: true },
      { title: "Lire un bilan en 5 minutes", duration: "16 min", done: true },
      { title: "Le ROCE : la métrique reine", duration: "12 min", done: true },
      { title: "PER et PEG : quand c'est cher ?", duration: "13 min", done: false },
      { title: "Construire un portefeuille de 10 lignes", duration: "18 min", done: false },
    ],
  },
  {
    title: "Maîtriser l'analyse technique",
    level: "Confirmé",
    color: "from-[#FF7049] to-[#FFA785]",
    progress: 0,
    modules: [
      { title: "Supports, résistances et trends", duration: "14 min", done: false },
      { title: "Moyennes mobiles : MA20, MA50, MA200", duration: "12 min", done: false },
      { title: "RSI et MACD : sortir des signaux fiables", duration: "16 min", done: false },
      { title: "Bollinger et ATR : volatilité maîtrisée", duration: "14 min", done: false },
      { title: "Money management et stop-loss", duration: "18 min", done: false },
    ],
  },
];

export default function FormationsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Analyses", href: "/analyses" },
          { label: "Formations" },
        ]}
        eyebrow="24 modules · 6 heures"
        title="Apprenez à investir, étape par étape."
        description="Trois parcours pédagogiques structurés, du premier ordre au stock-picking avancé. Vidéos, quiz et exercices pratiques."
      />

      <section className="container-app py-12 space-y-8">
        {tracks.map((t) => (
          <div key={t.title} className="bg-white rounded-[var(--radius-xl)] border border-[var(--gris-3)] overflow-hidden">
            <div className={`bg-gradient-to-br ${t.color} text-white p-7 lg:p-8 grid gap-6 lg:grid-cols-12 items-center`}>
              <div className="lg:col-span-8">
                <Badge tone="live" className="!bg-white/20">{t.level}</Badge>
                <h2 className="mt-3 text-2xl lg:text-3xl font-extrabold tracking-tight">{t.title}</h2>
                <p className="mt-2 opacity-85">5 modules · {t.modules.length} vidéos · ~75 min</p>
              </div>
              <div className="lg:col-span-4">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Progression</p>
                <p className="mt-1 text-4xl font-extrabold tabular-nums">{t.progress}%</p>
                <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${t.progress}%` }} />
                </div>
              </div>
            </div>
            <ul className="divide-y divide-[var(--gris-3)]">
              {t.modules.map((m, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="flex items-center gap-4 p-5 hover:bg-[var(--gris-4)] transition-colors group"
                  >
                    <span
                      className={`w-11 h-11 rounded-full grid place-items-center shrink-0 ${
                        m.done
                          ? "bg-[var(--green-500)]/10 text-[var(--green-600)]"
                          : "bg-[var(--violet-50)] text-[var(--violet-500)]"
                      }`}
                    >
                      {m.done ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                        Module {i + 1}
                      </p>
                      <p className="font-bold text-[15px] tracking-tight">{m.title}</p>
                    </div>
                    <span className="text-sm text-[var(--gris-1)] tabular-nums shrink-0">{m.duration}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--gris-1)] group-hover:text-[var(--violet-500)] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="container-app pb-16">
        <div className="rounded-[var(--radius-xl)] bg-[var(--gris-5)] border border-[var(--gris-3)] p-10 text-center">
          <GraduationCap className="w-12 h-12 text-[var(--violet-500)] mx-auto" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Toutes les formations sont incluses.</h2>
          <p className="mt-2 text-[var(--gris-1)] max-w-2xl mx-auto">
            Aucun upsell. Votre abonnement Bourse Privée donne accès aux 24 modules, à toutes les
            mises à jour à venir et aux masterclass live.
          </p>
        </div>
      </section>
    </>
  );
}
