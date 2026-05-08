import Link from "next/link";

const columns = [
  {
    title: "Actions US",
    links: [
      { label: "Screener d'actions", href: "/recherche" },
      { label: "Apple (AAPL)", href: "/valeur/aapl" },
      { label: "Nvidia (NVDA)", href: "/valeur/nvda" },
      { label: "Microsoft (MSFT)", href: "/valeur/msft" },
    ],
  },
  {
    title: "Portefeuilles",
    links: [
      { label: "US Quality Growth", href: "/portefeuilles/long-terme" },
      { label: "US Momentum", href: "/portefeuilles/court-terme" },
      { label: "ETF US Core", href: "/portefeuilles/etf" },
      { label: "Performances", href: "/portefeuilles/performances" },
    ],
  },
  {
    title: "Analyses",
    links: [
      { label: "Analyse de portefeuille", href: "/analyses/portefeuille" },
      { label: "Analyse technique", href: "/analyses/technique" },
      { label: "Objectifs de cours", href: "/analyses/objectifs" },
      { label: "Formations", href: "/analyses/formations" },
    ],
  },
  {
    title: "Mon compte",
    links: [
      { label: "Mes alertes", href: "/alertes" },
      { label: "Mon profil", href: "/profil" },
      { label: "Actualités US", href: "/actualites/fil" },
      { label: "Communauté", href: "/club" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--gris-3)] bg-[var(--gris-5)]">
      <div className="container-app py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg gradient-violet grid place-items-center text-white font-extrabold text-sm">
                HB
              </span>
              <span className="font-extrabold tracking-tight text-[17px]">
                Hello<span className="text-[var(--violet-500)]">Broker</span>
              </span>
            </div>
            <p className="mt-4 text-[var(--gris-1)] text-[15px] leading-relaxed max-w-md">
              On vous aide à acheter des actions américaines. Analyses, recommandations et alertes
              sur les meilleures valeurs du Nasdaq et du NYSE — avec la rigueur HelloSafe.
            </p>
            <div className="flex gap-3 mt-6">
              {["LinkedIn", "Twitter/X", "YouTube", "WhatsApp"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="px-3 h-9 rounded-full border border-[var(--gris-3)] inline-flex items-center text-xs font-semibold hover:border-[var(--violet-500)] hover:text-[var(--violet-500)] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--gris-1)]">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[15px] text-[var(--color-text)] hover:text-[var(--violet-500)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--gris-3)] flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--gris-1)]">
            © 2026 HelloSafe — HelloBroker. Investir en bourse comporte des risques de perte en capital.
            Cette plateforme ne constitue pas un conseil en investissement.
          </p>
          <div className="flex gap-5 text-sm">
            <Link href="#" className="text-[var(--gris-1)] hover:text-[var(--violet-500)]">
              Mentions légales
            </Link>
            <Link href="#" className="text-[var(--gris-1)] hover:text-[var(--violet-500)]">
              Cookies
            </Link>
            <Link href="#" className="text-[var(--gris-1)] hover:text-[var(--violet-500)]">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
