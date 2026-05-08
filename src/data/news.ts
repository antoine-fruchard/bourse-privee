export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: "Marchés" | "Macro" | "Entreprises" | "Pédagogie" | "Sélection";
  ticker?: string;
  author: string;
  readTime: number;
  publishedAt: string;
  cover?: string;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Morning Briefing : Nvidia écrase le consensus, Azure bat les attentes",
    excerpt:
      "Les chiffres trimestriels confirment le découplage IA. NVDA +4% en pré-market, MSFT Azure en hausse de 31% YoY. Notre lecture point par point.",
    category: "Marchés",
    author: "Sébastien Roux",
    readTime: 4,
    publishedAt: "2026-05-07T07:00:00Z",
  },
  {
    id: "n2",
    title: "5 actions US à surveiller cette semaine — Semaine du 7 mai",
    excerpt:
      "Notre sélection hebdomadaire sur Nasdaq et NYSE avec catalyseurs identifiés et points d'entrée techniques pour les prochains jours.",
    category: "Sélection",
    author: "Mathilde Bertrand",
    readTime: 8,
    publishedAt: "2026-05-07T06:30:00Z",
  },
  {
    id: "n3",
    title: "Fed : pourquoi le plateau des taux change la donne pour les growth US",
    excerpt:
      "Powell confirme l'attentisme. Notre stratège explique comment cet environnement favorise les compounders tech au détriment des cycliques.",
    category: "Macro",
    author: "Camille Devos",
    readTime: 6,
    publishedAt: "2026-05-06T17:42:00Z",
  },
  {
    id: "n4",
    title: "Microsoft franchit $3 580 Mds : trop cher ou compounder éternel ?",
    excerpt:
      "Azure +31% YoY dépasse les attentes. Copilot en accélération. Notre objectif passe de $510 à $560. Voici les trois métriques à surveiller.",
    category: "Entreprises",
    ticker: "MSFT",
    author: "Sébastien Roux",
    readTime: 7,
    publishedAt: "2026-05-06T14:18:00Z",
  },
  {
    id: "n5",
    title: "Comprendre le PER et le PEG en 5 minutes",
    excerpt:
      "Tutoriel pratique pour utiliser ces deux ratios sans tomber dans les pièges classiques. Cas concrets sur Apple, Nvidia et Alphabet.",
    category: "Pédagogie",
    author: "Laurent Pichon",
    readTime: 5,
    publishedAt: "2026-05-06T12:00:00Z",
  },
  {
    id: "n6",
    title: "Apple en zone d'achat : l'iPhone IA ouvre un nouveau supercycle",
    excerpt:
      "À +22% sur 12 mois, AAPL reste sous-évaluée par rapport au potentiel Apple Intelligence. Cible $230, stop-loss $148.",
    category: "Entreprises",
    ticker: "AAPL",
    author: "Mathilde Bertrand",
    readTime: 6,
    publishedAt: "2026-05-06T09:42:00Z",
  },
  {
    id: "n7",
    title: "QQQ vs SPY : quel ETF US choisir pour son portefeuille ?",
    excerpt:
      "Pourquoi notre core portfolio combine QQQ et SPY plutôt que de choisir l'un ou l'autre. Trois arguments et simulations chiffrées.",
    category: "Pédagogie",
    author: "Camille Devos",
    readTime: 6,
    publishedAt: "2026-05-05T17:20:00Z",
  },
  {
    id: "n8",
    title: "Cloud Wars 2026 : AWS vs Azure vs GCP — notre verdict",
    excerpt:
      "Oracle OCI monte en puissance. Microsoft consolide. Google accélère. Notre analyse des 4 acteurs cloud avec nos préférences d'investissement.",
    category: "Sélection",
    ticker: "ORCL",
    author: "Mathilde Bertrand",
    readTime: 9,
    publishedAt: "2026-05-05T11:08:00Z",
  },
];

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  format: "Visio" | "Présentiel" | "Webinaire";
  speaker: string;
  spots: number;
  spotsLeft: number;
  description: string;
};

export const events: Event[] = [
  {
    id: "e1",
    title: "Live mensuel : nos 5 convictions US pour le second semestre 2026",
    date: "2026-05-14",
    time: "18h30",
    format: "Visio",
    speaker: "Sébastien Roux & Mathilde Bertrand",
    spots: 200,
    spotsLeft: 47,
    description:
      "Notre rendez-vous mensuel pour partager nos meilleures convictions sur le Nasdaq et NYSE, en interaction directe avec les membres.",
  },
  {
    id: "e2",
    title: "Atelier : construire son portefeuille de dividendes US",
    date: "2026-05-21",
    time: "19h00",
    format: "Webinaire",
    speaker: "Camille Devos",
    spots: 100,
    spotsLeft: 12,
    description:
      "Méthode complète pour bâtir un portefeuille US générant 3-4% de dividendes avec des aristocrats et des compounders de qualité.",
  },
  {
    id: "e3",
    title: "Rencontre membres Paris : déjeuner HelloBroker",
    date: "2026-05-28",
    time: "12h30",
    format: "Présentiel",
    speaker: "L'équipe HelloSafe",
    spots: 30,
    spotsLeft: 3,
    description:
      "Notre déjeuner trimestriel à Paris, occasion d'échanger avec l'équipe et entre membres dans un cadre convivial.",
  },
  {
    id: "e4",
    title: "Masterclass : analyser une action américaine en 30 minutes",
    date: "2026-06-04",
    time: "18h30",
    format: "Visio",
    speaker: "Mathilde Bertrand",
    spots: 200,
    spotsLeft: 158,
    description:
      "Méthodologie complète pour décortiquer les comptes d'une entreprise US et estimer une fair value en 30 minutes.",
  },
];
