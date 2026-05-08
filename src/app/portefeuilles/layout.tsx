import { SubNav } from "@/components/layout/sub-nav";

const items = [
  { label: "Vue d'ensemble", href: "/portefeuilles" },
  { label: "Long terme", href: "/portefeuilles/long-terme" },
  { label: "Court terme", href: "/portefeuilles/court-terme" },
  { label: "Le coin ETF", href: "/portefeuilles/etf" },
  { label: "Recommandations", href: "/portefeuilles/recommandations" },
  { label: "Performances", href: "/portefeuilles/performances" },
];

export default function PortefeuillesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={items} />
      {children}
    </>
  );
}
