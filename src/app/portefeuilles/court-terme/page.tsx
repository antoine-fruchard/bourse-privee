import { PageHero } from "@/components/layout/page-hero";
import { LinkButton } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PortfolioDetail } from "@/components/portfolio/portfolio-detail";
import { portfolios } from "@/data/portfolios";

export default function CourtTermePage() {
  const portfolio = portfolios.find((p) => p.id === "ct-us-momentum")!;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Portefeuilles", href: "/portefeuilles" },
          { label: "Court terme" },
        ]}
        eyebrow="Portefeuille tactique · Court terme"
        title={portfolio.name}
        description="Sélection rotative de 6 valeurs en momentum positif, rééquilibrée toutes les 4 à 6 semaines selon les signaux techniques et catalyseurs."
        action={
          <LinkButton href="/analyses/technique" variant="outline" trailingIcon={<ArrowRight className="w-4 h-4" />}>
            Analyse technique
          </LinkButton>
        }
      />
      <PortfolioDetail portfolio={portfolio} />
    </>
  );
}
