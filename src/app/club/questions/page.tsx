"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Send, MessageCircle, CheckCircle2, Eye } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/posts";
import { formatNumber, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categories = ["Toutes", "Bourse", "Fiscalité", "Allocation", "Stratégie", "Macro"] as const;

export default function QuestionsPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("Toutes");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (active !== "Toutes" && q.category !== active) return false;
      if (query && !q.question.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [active, query]);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Le club", href: "/club" },
          { label: "Questions boursières" },
        ]}
        eyebrow="Questions boursières"
        title="Posez vos questions, nos experts répondent."
        description="38 experts, 4 heures de temps de réponse moyen. Toutes les questions sont privées par défaut, vous choisissez ce que vous publiez au club."
      />

      <section className="container-app py-10 grid lg:grid-cols-3 gap-8">
        <form className="lg:col-span-2 bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
            Nouvelle question
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
            Que voulez-vous demander à l&apos;équipe ?
          </h2>
          <div className="mt-5">
            <label className="text-sm font-semibold">Sujet (court)</label>
            <input
              type="text"
              placeholder="Ex : faut-il vendre ma position Tesla ?"
              className="mt-2 w-full h-12 px-4 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold">Détails</label>
            <textarea
              rows={5}
              placeholder="Expliquez le contexte : votre profil, votre horizon, ce que vous avez déjà essayé…"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors resize-none"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <select className="h-11 px-4 rounded-xl bg-[var(--gris-4)] border border-transparent focus:bg-white focus:border-[var(--violet-500)] focus:outline-none transition-colors text-sm font-semibold">
              <option>Catégorie</option>
              <option>Bourse</option>
              <option>Fiscalité</option>
              <option>Allocation</option>
              <option>Stratégie</option>
              <option>Macro</option>
            </select>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4 rounded accent-[var(--violet-500)]" />
              Publier au club (sinon, réponse privée)
            </label>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[var(--gris-3)] pt-5">
            <p className="text-xs text-[var(--gris-1)]">Temps de réponse moyen 4h. Aucune question n&apos;est laissée sans réponse.</p>
            <Button leadingIcon={<Send className="w-4 h-4" />} type="button">
              J&apos;envoie ma question
            </Button>
          </div>
        </form>

        <aside className="space-y-5">
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[var(--violet-50)] text-[var(--violet-700)] grid place-items-center">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <p className="font-bold">Comment ça marche</p>
            </div>
            <ol className="space-y-3 text-sm">
              {[
                "Vous postez votre question (publique ou privée).",
                "Un expert qualifié reçoit la notification.",
                "Réponse argumentée en moins de 4 heures.",
                "Échangez ensuite en commentaires.",
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--violet-500)] text-white text-[11px] font-bold grid place-items-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--gris-1)] leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[var(--radius-lg)] gradient-violet text-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Stats du club</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">3h47</p>
            <p className="text-sm opacity-80">Temps moyen de réponse cette semaine</p>
            <p className="mt-4 text-4xl font-extrabold tracking-tight">98,4%</p>
            <p className="text-sm opacity-80">Taux de questions résolues</p>
          </div>
        </aside>
      </section>

      <section className="container-app pb-16">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight">Toutes les questions</h2>
          <div className="flex items-center gap-2 bg-white rounded-full border border-[var(--gris-3)] px-4 h-11 w-full max-w-sm">
            <Search className="w-4 h-4 text-[var(--gris-1)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans les questions…"
              className="bg-transparent flex-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto -mx-2 px-2 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
                active === c
                  ? "bg-[var(--noir)] text-white"
                  : "bg-white border border-[var(--gris-3)] text-[var(--color-text)] hover:border-[var(--violet-500)]"
              )}
            >
              <Filter className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
              {c}
            </button>
          ))}
        </div>

        <ul className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] divide-y divide-[var(--gris-3)]">
          {filtered.map((q) => (
            <li key={q.id}>
              <Link
                href="#"
                className="flex items-start gap-4 p-5 hover:bg-[var(--gris-4)] transition-colors"
              >
                <Avatar initials={q.author.avatar} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge tone="violet">{q.category}</Badge>
                    {q.resolved && <Badge tone="green">Résolue</Badge>}
                    <span className="text-xs text-[var(--gris-1)]">{timeAgo(q.createdAt)}</span>
                  </div>
                  <p className="font-bold text-[15px] tracking-tight leading-snug">{q.question}</p>
                  <p className="mt-1 text-xs text-[var(--gris-1)]">posée par {q.author.name}</p>
                </div>
                <div className="hidden sm:flex items-center gap-5 text-sm tabular-nums shrink-0 pl-4">
                  <span className="inline-flex items-center gap-1.5 text-[var(--gris-1)]">
                    <MessageCircle className="w-4 h-4" />
                    {q.answers}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--gris-1)]">
                    <Eye className="w-4 h-4" />
                    {formatNumber(q.views)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="p-12 text-center text-[var(--gris-1)]">Aucune question pour ce filtre.</li>
          )}
        </ul>
      </section>
    </>
  );
}
