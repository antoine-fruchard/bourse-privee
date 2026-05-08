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
    title: "Morning Zapping : Nvidia, Microsoft et Total volent la vedette",
    excerpt:
      "Les chiffres trimestriels US confirment le découplage entre IA et le reste du marché. Les majors du pétrole tirent leur épingle du jeu sur fond de tensions au Moyen-Orient.",
    category: "Marchés",
    author: "Sébastien Roux",
    readTime: 4,
    publishedAt: "2026-05-07T07:00:00Z",
  },
  {
    id: "n2",
    title: "Journal de la Bourse : 5 valeurs PEA à surveiller cette semaine",
    excerpt:
      "Notre sélection hebdomadaire de valeurs européennes éligibles PEA, avec catalyseurs identifiés et points d'entrée techniques.",
    category: "Sélection",
    author: "Mathilde Bertrand",
    readTime: 8,
    publishedAt: "2026-05-07T06:30:00Z",
  },
  {
    id: "n3",
    title: "BCE : pourquoi la baisse des taux change la donne pour les small caps",
    excerpt:
      "Christine Lagarde a confirmé une nouvelle baisse de 25bp. Notre stratège explique pourquoi ce sont les petites capitalisations qui en profiteront le plus.",
    category: "Macro",
    author: "Camille Devos",
    readTime: 6,
    publishedAt: "2026-05-06T17:42:00Z",
  },
  {
    id: "n4",
    title: "Microsoft franchit 3 580 Md$ : trop cher ou compounder éternel ?",
    excerpt:
      "Les chiffres Azure dépassent encore les attentes. Notre objectif passe de 510$ à 540$. Voici les trois métriques à surveiller.",
    category: "Entreprises",
    ticker: "MSFT",
    author: "Sébastien Roux",
    readTime: 7,
    publishedAt: "2026-05-06T14:18:00Z",
  },
  {
    id: "n5",
    title: "Comprendre les ratios PER et PEG en 5 minutes",
    excerpt:
      "Notre tutoriel pratique pour utiliser ces deux ratios sans tomber dans les pièges classiques. Cas concrets sur le CAC 40 et le S&P 500.",
    category: "Pédagogie",
    author: "Laurent Pichon",
    readTime: 5,
    publishedAt: "2026-05-06T12:00:00Z",
  },
  {
    id: "n6",
    title: "L'Oréal en zone d'achat : la patience paie sur le luxe",
    excerpt:
      "À -4% sur 12 mois, le compounder par excellence du luxe revient dans une zone d'achat historique. Cible 440€, stop-loss 320€.",
    category: "Entreprises",
    ticker: "OR",
    author: "Mathilde Bertrand",
    readTime: 6,
    publishedAt: "2026-05-06T09:42:00Z",
  },
  {
    id: "n7",
    title: "ETF World vs S&P 500 : le match qu'il faut comprendre",
    excerpt:
      "Pourquoi notre core portfolio reste sur du World plutôt que du S&P 500 pur, malgré les rendements récents. Trois arguments à connaître.",
    category: "Pédagogie",
    author: "Camille Devos",
    readTime: 6,
    publishedAt: "2026-05-05T17:20:00Z",
  },
  {
    id: "n8",
    title: "Renaissance nucléaire : nos 4 valeurs préférées en Europe",
    excerpt:
      "Assystem, Vinci, Schneider et Framatome forment selon nous le quartet incontournable. Analyses détaillées et objectifs.",
    category: "Sélection",
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
    title: "Live mensuel : nos 5 idées pour le second semestre 2026",
    date: "2026-05-14",
    time: "18h30",
    format: "Visio",
    speaker: "Sébastien Roux & Mathilde Bertrand",
    spots: 200,
    spotsLeft: 47,
    description:
      "Notre rendez-vous mensuel pour partager nos meilleures convictions, en interaction directe avec les membres.",
  },
  {
    id: "e2",
    title: "Atelier : construire son portefeuille de dividendes",
    date: "2026-05-21",
    time: "19h00",
    format: "Webinaire",
    speaker: "Camille Devos",
    spots: 100,
    spotsLeft: 12,
    description:
      "Méthode complète pour bâtir un portefeuille générant 4-5% de rendement, qualité et croissance des dividendes.",
  },
  {
    id: "e3",
    title: "Rencontre membres Paris : déjeuner Bourse Privée",
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
    title: "Masterclass : analyse fondamentale d'une action en 30 min",
    date: "2026-06-04",
    time: "18h30",
    format: "Visio",
    speaker: "Mathilde Bertrand",
    spots: 200,
    spotsLeft: 158,
    description:
      "Méthodologie complète pour décortiquer les comptes d'une entreprise et estimer une fair value en 30 minutes.",
  },
];
