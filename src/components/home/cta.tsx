import { ArrowRight, ShieldCheck, BookOpen, Headphones } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function HomeCta() {
  return (
    <section className="container-app py-20">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--noir)] text-white p-10 lg:p-16">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[var(--violet-500)] rounded-full blur-[120px] opacity-40" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-[var(--orange-500)] rounded-full blur-[120px] opacity-25" />
        <div className="relative grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-500)] animate-pulse" />
              Sans engagement
            </span>
            <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
              Les meilleures actions américaines, analysées pour vous.
            </h2>
            <p className="mt-5 text-white/80 max-w-2xl text-lg leading-relaxed">
              Recommandations chiffrées sur Nasdaq et NYSE, alertes email/WhatsApp, portefeuilles modèles.
              Tout ce qu&apos;il faut pour investir aux États-Unis avec méthode et sérénité.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/portefeuilles/long-terme" size="lg" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                Découvrir les portefeuilles
              </LinkButton>
              <LinkButton href="/club/questions" size="lg" variant="outline" className="!border-white/30 !text-white hover:!bg-white/10 hover:!text-white hover:!border-white">
                Poser une question
              </LinkButton>
            </div>
          </div>
          <div className="lg:col-span-5 grid gap-3">
            <Card icon={<ShieldCheck className="w-4 h-4" />} title="Thèses transparentes" body="Entrée, objectif, stop-loss et date : chaque reco est traçable et datée." />
            <Card icon={<BookOpen className="w-4 h-4" />} title="Pédagogie US first" body="Chaque action US est expliquée. Vous comprenez pourquoi, pas juste quoi acheter." />
            <Card icon={<Headphones className="w-4 h-4" />} title="Alertes instantanées" body="Email ou WhatsApp dès qu'un seuil est atteint ou qu'une reco sort." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
      <span className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center shrink-0">{icon}</span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-white/70 leading-relaxed mt-0.5">{body}</p>
      </div>
    </div>
  );
}
