import { SubNav } from "@/components/layout/sub-nav";

const items = [
  { label: "Vue d'ensemble", href: "/club" },
  { label: "Questions boursières", href: "/club/questions" },
  { label: "Battle de la semaine", href: "/club/battle" },
  { label: "Groupe WhatsApp", href: "/club/whatsapp" },
];

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNav items={items} />
      {children}
    </>
  );
}
