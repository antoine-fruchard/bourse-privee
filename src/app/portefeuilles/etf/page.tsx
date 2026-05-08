import { PageHero } from "@/components/layout/page-hero";
import { LinkButton } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";
import { portfolios } from "@/data/portfolios";

export default function EtfPage() {
  const portfolio = portfolios.find((p) => p.id === "etf-us-core")!;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Portefeuilles", href: "/portefeuilles" },
          { label: "Le coin ETF" },
        ]}
        eyebrow="Le coin ETF · Gestion passive"
        title={portfolio.name}
        description="Portefeuille 100% ETF, ultra-diversifié géographiquement. Idéal pour un PEA ou un CTO avec un coût total de gestion inférieur à 0,20 %."
        action={
          <LinkButton href="/analyses/formations" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Apprendre les ETF
          </LinkButton>
        }
      />
      <PortfolioDetail portfolio={portfolio} />
    </>
  );
}
