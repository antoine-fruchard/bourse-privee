import { SubNav } from "@/components/layout/sub-nav";

const items = [
  { label: "Vue d'ensemble", href: "/analyses" },
  { label: "Analyse de portefeuille", href: "/analyses/portefeuille" },
  { label: "Analyse technique", href: "/analyses/technique" },
  { label: "Objectifs boursiers", href: "/analyses/objectifs" },
  { label: "Nos sélections", href: "/analyses/selections" },
  { label: "Nos formations", href: "/analyses/formations" },
];

export default function AnalysesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={items} />
      {children}
    </>
  );
}
