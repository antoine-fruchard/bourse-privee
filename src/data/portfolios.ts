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
    id: "lt-us-quality",
    name: "US Quality Growth",
    type: "Long terme",
    description:
      "Notre sélection phare de 12 grandes capitalisations américaines de qualité. Horizon 5 ans+, biais croissance des bénéfices et pricing power durable. La colonne vertébrale du portefeuille de Guillaume.",
    ytd: 18.4,
    oneYear: 34.2,
    threeYear: 82.6,
    inception: 198.4,
    inceptionDate: "2018-09-01",
    benchmark: "S&P 500 TR",
    benchmarkInception: 118.2,
    lines: [
      { ticker: "NVDA", weight: 14, change1y: 168.4 },
      { ticker: "MSFT", weight: 12, change1y: 28.7 },
      { ticker: "AAPL", weight: 11, change1y: 22.4 },
      { ticker: "META", weight: 9, change1y: 32.4 },
      { ticker: "GOOGL", weight: 8, change1y: 38.2 },
      { ticker: "AMZN", weight: 8, change1y: 44.6 },
      { ticker: "ORCL", weight: 8, change1y: 48.2 },
      { ticker: "V", weight: 7, change1y: 16.8 },
      { ticker: "JPM", weight: 7, change1y: 24.8 },
      { ticker: "COST", weight: 6, change1y: 32.6 },
      { ticker: "UNH", weight: 5, change1y: 12.4 },
      { ticker: "TSLA", weight: 5, change1y: 28.6 },
    ],
  },
  {
    id: "ct-us-momentum",
    name: "US Momentum",
    type: "Court terme",
    description:
      "Sélection tactique de 6 valeurs US en momentum positif. Rotation toutes les 4–6 semaines selon les signaux techniques et les catalyseurs courts. Horizon 1–3 mois.",
    ytd: 26.8,
    oneYear: 44.2,
    threeYear: 0,
    inception: 44.2,
    inceptionDate: "2025-05-07",
    benchmark: "Nasdaq 100 TR",
    benchmarkInception: 28.4,
    lines: [
      { ticker: "NVDA", weight: 24, change1y: 168.4 },
      { ticker: "ORCL", weight: 20, change1y: 48.2 },
      { ticker: "AMZN", weight: 18, change1y: 44.6 },
      { ticker: "TSLA", weight: 16, change1y: 28.6 },
      { ticker: "META", weight: 12, change1y: 32.4 },
      { ticker: "GOOGL", weight: 10, change1y: 38.2 },
    ],
  },
  {
    id: "etf-us-core",
    name: "ETF US Core",
    type: "ETF",
    description:
      "Portefeuille 100% ETF américains, diversifié entre marché large, Nasdaq et thématiques. Idéal pour s'exposer aux actions US avec un coût total <0.15%. Gestion entièrement passive.",
    ytd: 14.8,
    oneYear: 24.6,
    threeYear: 48.4,
    inception: 112.8,
    inceptionDate: "2020-01-15",
    benchmark: "MSCI USA NR USD",
    benchmarkInception: 98.4,
    lines: [
      { ticker: "SPY", weight: 35, change1y: 21.4 },
      { ticker: "VTI", weight: 25, change1y: 22.8 },
      { ticker: "QQQ", weight: 25, change1y: 32.8 },
      { ticker: "XLK", weight: 10, change1y: 28.6 },
      { ticker: "ARKK", weight: 5, change1y: 18.4 },
    ],
  },
];
