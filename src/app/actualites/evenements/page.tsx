import { Calendar, MapPin, Video, Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/data/news";
import { formatDate } from "@/lib/utils";

export default function EvenementsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: "Évènements" },
        ]}
        eyebrow="Lives, ateliers, masterclass"
        title="Apprenez en direct avec nos experts."
        description="Lives mensuels, ateliers thématiques, déjeuners physiques : 6 à 8 rendez-vous par mois pour interagir directement avec l'équipe."
      />

      <section className="container-app py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {events.map((e) => {
            const formatIcon =
              e.format === "Visio" ? <Video className="w-4 h-4" /> :
              e.format === "Présentiel" ? <MapPin className="w-4 h-4" /> :
              <Users className="w-4 h-4" />;
            const remaining = (e.spotsLeft / e.spots) * 100;
            const tight = e.spotsLeft / e.spots < 0.2;
            return (
              <article
                key={e.id}
                className="bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] p-6 hover:border-[var(--violet-200)] hover:shadow-[var(--shadow-md)] transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--violet-50)] text-[var(--violet-700)] py-2.5 px-3 text-center w-16">
                      <p className="text-[10px] uppercase tracking-widest font-bold">
                        {new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(new Date(e.date))}
                      </p>
                      <p className="text-2xl font-extrabold tabular-nums leading-none">
                        {new Date(e.date).getDate()}
                      </p>
                    </div>
                    <div>
                      <Badge tone="violet" className="mb-2">
                        <span className="inline-flex items-center gap-1">
                          {formatIcon}
                          {e.format}
                        </span>
                      </Badge>
                      <p className="text-sm font-semibold text-[var(--gris-1)]">
                        {e.time} · animé par {e.speaker}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight leading-tight">{e.title}</h3>
                <p className="mt-2 text-sm text-[var(--gris-1)] leading-relaxed">{e.description}</p>
                <div className="mt-5 pt-4 border-t border-[var(--gris-3)]">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className={tight ? "text-[var(--orange-500)] font-bold" : "text-[var(--gris-1)]"}>
                      {e.spotsLeft} places restantes / {e.spots}
                    </span>
                    <span className="text-xs text-[var(--gris-1)]">{formatDate(e.date)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--gris-4)] overflow-hidden mb-4">
                    <div
                      className={`h-full ${tight ? "bg-[var(--orange-500)]" : "bg-[var(--violet-500)]"}`}
                      style={{ width: `${100 - remaining}%` }}
                    />
                  </div>
                  <Button className="w-full" size="md" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                    Je réserve ma place
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-app pb-16">
        <div className="rounded-[var(--radius-xl)] bg-[var(--gris-5)] border border-[var(--gris-3)] p-10 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <Calendar className="w-10 h-10 text-[var(--violet-500)]" />
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight">
              Recevez le programme par email
            </h3>
            <p className="mt-2 text-[var(--gris-1)] leading-relaxed">
              Une fois par mois, le calendrier complet directement dans votre boîte. Pas de spam, on
              promet.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="vous@example.com"
              className="flex-1 h-12 px-4 rounded-full bg-white border border-[var(--gris-3)] focus:border-[var(--violet-500)] focus:outline-none transition-colors"
            />
            <Button type="button">M&apos;inscrire</Button>
          </form>
        </div>
      </section>
    </>
  );
}
