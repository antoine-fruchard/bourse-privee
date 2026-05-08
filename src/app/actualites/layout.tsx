import { SubNav } from "@/components/layout/sub-nav";

const items = [
  { label: "Vue d'ensemble", href: "/actualites" },
  { label: "Fil d'actualité", href: "/actualites/fil" },
  { label: "Journal de la Bourse", href: "/actualites/journal" },
  { label: "Morning Zapping", href: "/actualites/morning-zapping" },
  { label: "Évènements", href: "/actualites/evenements" },
];

export default function ActualitesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={items} />
      {children}
    </>
  );
}
