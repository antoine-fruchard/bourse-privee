import Link from "next/link";
import { ArrowRight, MessageCircle, Heart, Hash, Users, Zap, Headphones } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { clubPosts } from "@/data/posts";
import { formatNumber, timeAgo } from "@/lib/utils";

export default function ClubIndex() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Le club" }]}
        eyebrow="Le club · 2 480 membres"
        title="Le cercle d'investisseurs où l'on échange vraiment."
        description="Posez vos questions à 38 experts, votez sur les sujets chauds, échangez en temps réel. Tout ce qui rend l'investissement moins solitaire."
        action={
          <div className="flex gap-3">
            <LinkButton href="/club/questions" trailingIcon={<ArrowRight className="w-4 h-4" />}>
              Poser une question
            </LinkButton>
            <LinkButton href="/club/battle" variant="outline">
              Voir la battle
            </LinkButton>
          </div>
        }
      />

      <section className="container-app py-12">
        <div className="grid gap-5 md:grid-cols-3">
          <Tile
            href="/club/questions"
            icon={<MessageCircle className="w-5 h-5" />}
            title="Questions boursières"
            description="Posez votre question, nos experts répondent en moins de 4 heures en moyenne."
            stat="1 248 questions"
            color="violet"
          />
          <Tile
            href="/club/battle"
            icon={<Zap className="w-5 h-5" />}
            title="Battle de la semaine"
            description="Un sujet chaud, deux camps. Votez et défendez vos convictions."
            stat="412 votes en cours"
            color="orange"
          />
          <Tile
            href="/club/whatsapp"
            icon={<Headphones className="w-5 h-5" />}
            title="Groupe WhatsApp"
            description="Le canal direct membres + experts pour réagir instantanément aux marchés."
            stat="2 480 membres"
            color="green"
          />
        </div>
      </section>

      <section className="container-app py-8">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--violet-50)] text-[var(--violet-700)] text-xs font-bold uppercase tracking-widest">
              Les derniers posts
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Le pouls du club</h2>
          </div>
          <Link href="/club/questions" className="text-sm font-semibold text-[var(--violet-500)] inline-flex items-center gap-1">
            Toutes les conversations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {clubPosts.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[var(--violet-200)]"
            >
              <header className="flex items-start gap-3">
                <Avatar initials={p.author.avatar} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-[15px]">{p.author.name}</p>
                    {p.author.role === "Expert" && <Badge tone="violet">Expert</Badge>}
                    {p.author.role === "Modérateur" && <Badge tone="orange">Modérateur</Badge>}
                  </div>
                  <p className="text-xs text-[var(--gris-1)]">{timeAgo(p.createdAt)}</p>
                </div>
                {p.ticker && (
                  <Link
                    href={`/valeur/${p.ticker.toLowerCase()}`}
                    className="px-2.5 py-1.5 rounded-full bg-[var(--violet-50)] text-[var(--violet-700)] text-xs font-bold"
                  >
                    ${p.ticker}
                  </Link>
                )}
              </header>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-semibold text-[var(--gris-1)] inline-flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>
              <footer className="mt-5 pt-4 border-t border-[var(--gris-3)] flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-[var(--gris-1)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> {formatNumber(p.likes)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" /> {p.comments}
                  </span>
                </div>
                <Link href="/club/questions" className="font-semibold text-[var(--violet-500)] inline-flex items-center gap-1">
                  Lire <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="container-app py-16">
        <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--violet-50)] to-white border border-[var(--gris-3)] p-10 text-center">
          <Users className="w-10 h-10 text-[var(--violet-500)] mx-auto" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
            Vous êtes 2 480 — venez en parler.
          </h2>
          <p className="mt-3 text-[var(--gris-1)] max-w-2xl mx-auto leading-relaxed">
            Le club est un espace bienveillant et exigeant. Pas d&apos;auto-promotion, pas de trolls,
            uniquement des investisseurs qui veulent progresser ensemble.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <LinkButton href="/club/questions">Poser ma première question</LinkButton>
            <LinkButton href="/club/whatsapp" variant="outline">
              Rejoindre le WhatsApp
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({
  href,
  icon,
  title,
  description,
  stat,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
  color: "violet" | "orange" | "green";
}) {
  const accents = {
    violet: "from-[#563BFF] to-[#8E6BFF]",
    orange: "from-[#FF7049] to-[#FFA785]",
    green: "from-[#20C997] to-[#5AD7B0]",
  };
  return (
    <Link
      href={href}
      className="group bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-[var(--violet-200)] flex flex-col"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accents[color]} grid place-items-center text-white shadow-[var(--shadow-sm)]`}>
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-extrabold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-[var(--gris-1)] leading-relaxed flex-1">{description}</p>
      <div className="mt-5 pt-4 border-t border-[var(--gris-3)] flex items-center justify-between text-sm">
        <span className="font-bold tabular-nums">{stat}</span>
        <span className="font-semibold text-[var(--violet-500)] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
          Découvrir <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
