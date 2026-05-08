import { PageHero } from "@/components/layout/page-hero";
import { LinkButton } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";
import { portfolios } from "@/data/portfolios";

export default function LongTermePage() {
  const portfolio = portfolios.find((p) => p.id === "lt-equilibre")!;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Portefeuilles", href: "/portefeuilles" },
          { label: "Long terme" },
        ]}
        eyebrow="Portefeuille phare · Long terme"
        title={portfolio.name}
        description="Notre portefeuille de référence pour les investisseurs patients : 12 valeurs internationales de qualité, biais croissance, horizon 5 ans+."
        action={
          <LinkButton href="/portefeuilles/recommandations" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Voir les recos
          </LinkButton>
        }
      />
      <PortfolioDetail portfolio={portfolio} />
    </>
  );
}
