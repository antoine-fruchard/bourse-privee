export type ClubPost = {
  id: string;
  author: { name: string; avatar: string; role: "Expert" | "Membre" | "Modérateur" };
  ticker?: string;
  title: string;
  excerpt: string;
  body: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
};

export const clubPosts: ClubPost[] = [
  {
    id: "p1",
    author: { name: "Mathilde Bertrand", avatar: "MB", role: "Expert" },
    ticker: "NVDA",
    title: "Nvidia franchit 4 400 Md$ : tenir ou alléger ?",
    excerpt:
      "Le titre vient de toucher un nouveau plus haut historique après les annonces Blackwell Ultra. Notre arbitrage long terme reste positif, mais le timing court terme mérite discussion.",
    body: "",
    likes: 142,
    comments: 38,
    createdAt: "2026-05-07T07:42:00Z",
    tags: ["Long terme", "IA"],
  },
  {
    id: "p2",
    author: { name: "Antoine Marchand", avatar: "AM", role: "Membre" },
    ticker: "ALAYA",
    title: "Assystem +56% sur un an, le nucléaire renaît vraiment ?",
    excerpt:
      "J'ai entré la position en avril à 52€, déjà bien servi. Quelqu'un voit un point de sortie technique au-dessus de 80€ ?",
    body: "",
    likes: 87,
    comments: 24,
    createdAt: "2026-05-07T06:18:00Z",
    tags: ["Court terme", "Énergie"],
  },
  {
    id: "p3",
    author: { name: "Sébastien Roux", avatar: "SR", role: "Expert" },
    ticker: "MC",
    title: "LVMH : la fenêtre d'achat la plus claire depuis 2020",
    excerpt:
      "Le titre revient sur le prix de l'IPO Tiffany, soit -8% sur un an. Notre thèse long terme reste intacte, voici les 3 raisons.",
    body: "",
    likes: 226,
    comments: 51,
    createdAt: "2026-05-06T18:42:00Z",
    tags: ["Long terme", "Luxe"],
  },
  {
    id: "p4",
    author: { name: "Laurent Pichon", avatar: "LP", role: "Modérateur" },
    title: "[Battle] Faut-il vendre la moitié de son Nasdaq-100 ?",
    excerpt:
      "Avec un PER moyen à 31x et la concentration sur 7 titres, beaucoup hésitent. Allégement, hedge ou rester investi : votez et défendez votre position.",
    body: "",
    likes: 412,
    comments: 187,
    createdAt: "2026-05-06T14:00:00Z",
    tags: ["Battle", "Allocation"],
  },
  {
    id: "p5",
    author: { name: "Camille Devos", avatar: "CD", role: "Expert" },
    ticker: "TTE",
    title: "TotalEnergies : pourquoi le rendement de 5,4% n'est pas un piège",
    excerpt:
      "Beaucoup de membres s'inquiètent du peak oil. Notre analyse du capex GNL + renouvelables justifie un objectif à 78€.",
    body: "",
    likes: 158,
    comments: 32,
    createdAt: "2026-05-06T09:12:00Z",
    tags: ["Long terme", "Énergie", "Dividende"],
  },
  {
    id: "p6",
    author: { name: "Joris Lefèvre", avatar: "JL", role: "Membre" },
    title: "Question d'argent : PEA ou compte-titres pour des actions US ?",
    excerpt:
      "Je suis sur Bourse Direct depuis 5 ans, j'hésite à passer mes positions Microsoft et Nvidia en CTO pour gagner en flexibilité. Avis ?",
    body: "",
    likes: 64,
    comments: 41,
    createdAt: "2026-05-05T20:08:00Z",
    tags: ["Question", "Fiscalité"],
  },
];

export type Question = {
  id: string;
  author: { name: string; avatar: string };
  question: string;
  category: "Bourse" | "Fiscalité" | "Allocation" | "Stratégie" | "Macro";
  answers: number;
  views: number;
  createdAt: string;
  resolved: boolean;
};

export const questions: Question[] = [
  {
    id: "q1",
    author: { name: "Antoine M.", avatar: "AM" },
    question: "Comment optimiser la fiscalité d'un PEA pour des plus-values >150k€ ?",
    category: "Fiscalité",
    answers: 14,
    views: 1840,
    createdAt: "2026-05-07T08:12:00Z",
    resolved: true,
  },
  {
    id: "q2",
    author: { name: "Sophie L.", avatar: "SL" },
    question: "Stop-loss pour une stratégie long terme : utile ou contre-productif ?",
    category: "Stratégie",
    answers: 22,
    views: 2410,
    createdAt: "2026-05-07T07:01:00Z",
    resolved: false,
  },
  {
    id: "q3",
    author: { name: "Hugo P.", avatar: "HP" },
    question: "Diversification : combien d'ETF maximum dans un portefeuille de 100k€ ?",
    category: "Allocation",
    answers: 18,
    views: 3120,
    createdAt: "2026-05-06T16:48:00Z",
    resolved: true,
  },
  {
    id: "q4",
    author: { name: "Marie B.", avatar: "MB" },
    question: "Faut-il rééquilibrer son portefeuille à chaque cassure d'objectif ?",
    category: "Stratégie",
    answers: 11,
    views: 1240,
    createdAt: "2026-05-06T14:22:00Z",
    resolved: false,
  },
  {
    id: "q5",
    author: { name: "Karim T.", avatar: "KT" },
    question: "Inflation USA / BCE : quelle conséquence sur l'allocation actions ?",
    category: "Macro",
    answers: 9,
    views: 980,
    createdAt: "2026-05-06T11:08:00Z",
    resolved: false,
  },
  {
    id: "q6",
    author: { name: "Léa D.", avatar: "LD" },
    question: "ETF World ou stock-picking : que choisir pour démarrer en 2026 ?",
    category: "Allocation",
    answers: 31,
    views: 5240,
    createdAt: "2026-05-05T19:42:00Z",
    resolved: true,
  },
];
