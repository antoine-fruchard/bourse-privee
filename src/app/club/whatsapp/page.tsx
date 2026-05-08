import { ShieldCheck, Bell, Users, MessageCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { LinkButton } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

const messages = [
  { name: "Sébastien R.", role: "Expert", time: "07:42", text: "🚨 Microsoft +1.4% pré-market sur les chiffres Azure, on relève notre objectif à 540$." },
  { name: "Mathilde B.", role: "Expert", time: "07:48", text: "L'Oréal repasse sous 380€, on rajoute une demi-position dans le portefeuille long terme." },
  { name: "Antoine M.", role: "Membre", time: "08:02", text: "Vous voyez quoi sur Assystem ? +56% sur un an, je commence à serrer le stop." },
  { name: "Camille D.", role: "Expert", time: "08:08", text: "@Antoine M. on garde, le carnet de commandes EPR2 justifie largement la valo. Stop technique 60€." },
];

export default function WhatsAppPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Le club", href: "/club" },
          { label: "WhatsApp" },
        ]}
        eyebrow="Groupe WhatsApp"
        title="Le canal direct membres + experts."
        description="Quand un évènement de marché survient, le club réagit en direct. Pas de notifications inutiles, uniquement les alertes qui valent le détour."
        action={
          <LinkButton href="#join" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Rejoindre le groupe
          </LinkButton>
        }
      />

      <section className="container-app py-12">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <div className="space-y-5">
              {[
                {
                  icon: <ShieldCheck />,
                  title: "Modéré, sécurisé",
                  body: "L'équipe modère 24/7. Pas d'auto-promo, pas de spam, pas de pump & dump.",
                },
                {
                  icon: <Bell />,
                  title: "Alertes pertinentes uniquement",
                  body: "Maximum 4-5 messages experts par jour. Vous ne ratez rien d'important.",
                },
                {
                  icon: <Users />,
                  title: "Communauté active 24/7",
                  body: "Les membres se répondent, partagent, s'entraident. Une vraie communauté.",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-xl bg-[var(--green-500)]/10 text-[var(--green-600)] grid place-items-center shrink-0">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-bold text-lg">{f.title}</p>
                    <p className="mt-1 text-[var(--gris-1)] leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--gris-3)]">
              <div className="bg-[#075E54] text-white px-5 py-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/15 grid place-items-center text-white font-bold">
                  BP
                </span>
                <div>
                  <p className="font-bold text-[15px]">Bourse Privée — Live</p>
                  <p className="text-xs text-white/70">2 480 membres · 38 experts en ligne</p>
                </div>
              </div>
              <div className="bg-[#ECE5DD] p-5 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className="bg-white rounded-2xl rounded-tl-md p-4 max-w-[88%] shadow-[var(--shadow-xs)]">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar initials={m.name.split(" ").map((p) => p[0]).join("")} size="sm" />
                      <p className="font-bold text-[13px]">{m.name}</p>
                      {m.role === "Expert" && (
                        <span className="text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-full bg-[var(--violet-50)] text-[var(--violet-700)]">
                          Expert
                        </span>
                      )}
                      <span className="text-[11px] text-[var(--gris-1)] ml-auto">{m.time}</span>
                    </div>
                    <p className="text-[14px] leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="container-app pb-20">
        <div className="rounded-[var(--radius-xl)] gradient-violet text-white p-10 lg:p-14 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Rejoignez les 2 480 membres du WhatsApp.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto opacity-85">
            Un seul lien d&apos;invitation, modéré, accessible aux membres du club Bourse Privée
            uniquement.
          </p>
          <div className="mt-6">
            <LinkButton
              href="https://chat.whatsapp.com/example"
              external
              size="lg"
              variant="secondary"
              trailingIcon={<ArrowRight className="w-4 h-4" />}
            >
              Obtenir le lien d&apos;invitation
            </LinkButton>
          </div>
          <p className="mt-4 text-xs opacity-70">
            Le lien d&apos;invitation est nominatif et associé à votre compte.
          </p>
        </div>
      </section>
    </>
  );
}
