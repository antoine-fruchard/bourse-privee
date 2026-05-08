export type PortfolioLine = {
  ticker: string;
  weight: number;
  change1y: number;
};

export type Portfolio = {
  id: string;
  name: string;
  type: "Long terme" | "Court terme" | "ETF";
  description: string;
  ytd: number;
  oneYear: number;
  threeYear: number;
  inception: number;
  inceptionDate: string;
  benchmark: string;
  benchmarkInception: number;
  lines: PortfolioLine[];
};

export const portfolios: Portfolio[] = [
  {
    id: "lt-equilibre",
    name: "Long terme — Équilibré",
    type: "Long terme",
    description:
      "Notre portefeuille phare diversifié sur 12 valeurs internationales de qualité. Horizon 5 ans+, biais croissance et compounders.",
    ytd: 14.8,
    oneYear: 28.4,
    threeYear: 64.2,
    inception: 184.6,
    inceptionDate: "2018-09-01",
    benchmark: "MSCI World NR EUR",
    benchmarkInception: 112.4,
    lines: [
      { ticker: "MSFT", weight: 12, change1y: 28.7 },
      { ticker: "NVDA", weight: 11, change1y: 168.4 },
      { ticker: "META", weight: 9, change1y: 32.4 },
      { ticker: "MC", weight: 9, change1y: -8.3 },
      { ticker: "OR", weight: 8, change1y: -4.2 },
      { ticker: "TTE", weight: 8, change1y: 4.8 },
      { ticker: "AIR", weight: 8, change1y: 22.4 },
      { ticker: "ALAYA", weight: 7, change1y: 56.3 },
      { ticker: "ASML", weight: 7, change1y: 12.8 },
      { ticker: "ACA", weight: 7, change1y: 18.2 },
      { ticker: "STMPA", weight: 7, change1y: -18.4 },
      { ticker: "MEMS", weight: 7, change1y: 41.4 },
    ],
  },
  {
    id: "ct-momentum",
    name: "Court terme — Momentum",
    type: "Court terme",
    description:
      "Sélection tactique de 6 valeurs en momentum positif. Rotation toutes les 4-6 semaines selon les signaux techniques et catalyseurs.",
    ytd: 22.4,
    oneYear: 38.8,
    threeYear: 0,
    inception: 38.8,
    inceptionDate: "2025-05-07",
    benchmark: "Stoxx Europe 600 NR",
    benchmarkInception: 14.2,
    lines: [
      { ticker: "ALAYA", weight: 22, change1y: 56.3 },
      { ticker: "MEMS", weight: 18, change1y: 41.4 },
      { ticker: "STMPA", weight: 15, change1y: -18.4 },
      { ticker: "AIR", weight: 18, change1y: 22.4 },
      { ticker: "ACA", weight: 14, change1y: 18.2 },
      { ticker: "TTE", weight: 13, change1y: 4.8 },
    ],
  },
  {
    id: "etf-core",
    name: "ETF — Core mondial",
    type: "ETF",
    description:
      "Portefeuille 100% ETF, diversifié géographiquement. Idéal pour un PEA ou un CTO en gestion passive avec un coût total <0.20%.",
    ytd: 11.2,
    oneYear: 19.4,
    threeYear: 41.2,
    inception: 96.4,
    inceptionDate: "2020-01-15",
    benchmark: "MSCI ACWI NR EUR",
    benchmarkInception: 78.2,
    lines: [
      { ticker: "WLD", weight: 35, change1y: 18.6 },
      { ticker: "SP5", weight: 22, change1y: 21.4 },
      { ticker: "MEUD", weight: 20, change1y: 14.2 },
      { ticker: "PANX", weight: 13, change1y: 32.8 },
      { ticker: "EMIM", weight: 10, change1y: 8.4 },
    ],
  },
];
