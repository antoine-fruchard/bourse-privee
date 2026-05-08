"use client";

import { useState } from "react";
import { Zap, Heart, MessageCircle, Trophy, Vote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const camps = [
  {
    id: "alleger",
    title: "Alléger maintenant",
    subtitle: "On a déjà gagné gros, on prend les profits",
    leader: { name: "Antoine M.", avatar: "AM", role: "Membre" },
    votes: 168,
    arguments: [
      "PER moyen Nasdaq-100 à 31x, +2 écarts-types vs moyenne historique",
      "Concentration 7 méga-caps = 56% de l'indice",
      "Drawdown -22% historique en 3 mois quand le PER dépasse 30x",
    ],
    color: "from-[#FF7049] to-[#FFA785]",
  },
  {
    id: "rester",
    title: "Rester investi",
    subtitle: "Time in the market beats timing the market",
    leader: { name: "Sébastien R.", avatar: "SR", role: "Expert" },
    votes: 244,
    arguments: [
      "EPS Nasdaq-100 attendus +18% en 2026, justifie le PER",
      "Cash flow record des hyperscalers = pricing power réel",
      "Coût d'opportunité élevé : timing parfait du sell + buy nécessaire",
    ],
    color: "from-[#563BFF] to-[#8E6BFF]",
  },
];

export default function BattlePage() {
  const [voted, setVoted] = useState<string | null>(null);
  const total = camps.reduce((s, c) => s + c.votes, 0);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Le club", href: "/club" },
          { label: "Battle" },
        ]}
        eyebrow="Battle de la semaine"
        title="Faut-il vendre la moitié de son Nasdaq-100 ?"
        description="Avec un PER moyen à 31x et la concentration sur 7 titres, deux écoles s'opposent. Votez et défendez votre position en commentaires."
        action={
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--orange-500)] text-white text-xs font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            Battle ouverte · 412 votes
          </span>
        }
      />

      <section className="container-app py-10">
        <div className="grid gap-5 md:grid-cols-2">
          {camps.map((c) => {
            const pct = (c.votes / total) * 100;
            const isVoted = voted === c.id;
            return (
              <article
                key={c.id}
                className={cn(
                  "relative overflow-hidden rounded-[var(--radius-xl)] bg-white border-2 transition-all",
                  isVoted ? "border-[var(--violet-500)]" : "border-[var(--gris-3)]"
                )}
              >
                <div className={`h-2 bg-gradient-to-r ${c.color}`} />
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar initials={c.leader.avatar} size="md" />
                    <div>
                      <p className="font-bold">{c.leader.name}</p>
                      <p className="text-xs text-[var(--gris-1)]">{c.leader.role}</p>
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">{c.title}</h2>
                  <p className="text-[var(--gris-1)] text-[15px] mt-1">{c.subtitle}</p>
                  <ul className="mt-6 space-y-3">
                    {c.arguments.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span className={`w-5 h-5 shrink-0 rounded-full bg-gradient-to-br ${c.color} grid place-items-center text-white text-[11px] font-bold mt-0.5`}>
                          {i + 1}
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 pt-6 border-t border-[var(--gris-3)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold tabular-nums">{c.votes} votes</span>
                      <span className="text-sm font-extrabold tabular-nums">{pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--gris-4)] overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${c.color}`} style={{ width: `${pct}%` }} />
                    </div>
                    <Button
                      type="button"
                      onClick={() => setVoted(c.id)}
                      variant={isVoted ? "primary" : "outline"}
                      className="w-full mt-5"
                      leadingIcon={<Vote className="w-4 h-4" />}
                    >
                      {isVoted ? "Vote pris en compte" : `Je vote pour : ${c.title.toLowerCase()}`}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Stat icon={<Trophy />} label="Battles passées" value="42" />
          <Stat icon={<Vote />} label="Votes total semaine" value="3 184" />
          <Stat icon={<MessageCircle />} label="Commentaires actifs" value="187" />
        </div>
      </section>

      <section className="container-app pb-16">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">Les commentaires les plus chauds</h2>
        <div className="space-y-3">
          {[
            { name: "Hugo P.", role: "Membre", body: "On reste investi mais on hedge avec des puts hors de la monnaie. Le risque asymétrique est trop intéressant.", likes: 84, time: "il y a 2h" },
            { name: "Mathilde B.", role: "Expert", body: "L'argument du timing est puissant : sortir et rentrer parfaitement coûte historiquement 3-5% par an de manqué.", likes: 142, time: "il y a 4h" },
            { name: "Karim T.", role: "Membre", body: "J'allège 30% pour libérer des liquidités, je laisse 70% qui continuent de capitaliser. Compromis.", likes: 67, time: "il y a 6h" },
          ].map((c, i) => (
            <article key={i} className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-5 flex gap-4">
              <Avatar initials={c.name.split(" ").map((p) => p[0]).join("")} size="md" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold">{c.name}</p>
                  {c.role === "Expert" && <Badge tone="violet">Expert</Badge>}
                  <span className="text-xs text-[var(--gris-1)]">{c.time}</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed">{c.body}</p>
                <div className="mt-3 flex items-center gap-5 text-sm text-[var(--gris-1)]">
                  <button className="inline-flex items-center gap-1.5 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    {c.likes}
                  </button>
                  <button className="inline-flex items-center gap-1.5 hover:text-[var(--violet-500)] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Répondre
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="#" className="text-sm font-semibold text-[var(--violet-500)] inline-flex items-center gap-1">
            Voir les 187 commentaires <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 flex items-center gap-4">
      <span className="w-12 h-12 rounded-xl bg-[var(--violet-50)] text-[var(--violet-700)] grid place-items-center">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">{label}</p>
        <p className="text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
      </div>
    </div>
  );
}
