import Link from "next/link";
import { ArrowRight, MessageCircle, Heart, Hash } from "lucide-react";
import { clubPosts } from "@/data/posts";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { formatNumber, timeAgo } from "@/lib/utils";

export function ClubFeed() {
  const posts = clubPosts.slice(0, 4);
  return (
    <section className="container-app py-16">
      <SectionTitle
        eyebrow="Le club"
        title="Ce qui anime la communauté en ce moment"
        description="Les meilleurs débats et questions du club, animés par 38 experts et plus de 2 480 membres actifs."
        action={
          <LinkButton href="/club" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Rejoindre le club
          </LinkButton>
        }
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {posts.map((p) => (
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
                  className="px-2.5 py-1.5 rounded-full bg-[var(--violet-50)] text-[var(--violet-700)] text-xs font-bold inline-flex items-center gap-1 hover:bg-[var(--violet-100)]"
                >
                  ${p.ticker}
                </Link>
              )}
            </header>
            <h3 className="mt-4 text-lg font-extrabold tracking-tight leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed line-clamp-3">{p.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold text-[var(--gris-1)] inline-flex items-center gap-1"
                >
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
              <Link
                href="/club"
                className="font-semibold text-[var(--violet-500)] inline-flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                Lire <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
