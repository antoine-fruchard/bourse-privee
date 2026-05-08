import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HelloBroker — Actions américaines",
  description:
    "HelloBroker vous aide à acheter des actions américaines : analyses, recommandations, portefeuilles modèles et alertes sur les meilleures valeurs du Nasdaq et NYSE.",
  metadataBase: new URL("https://bourse-privee.vercel.app"),
  openGraph: {
    title: "HelloBroker — On vous aide à acheter des actions américaines",
    description:
      "Recommandations, portefeuilles modèles et alertes sur les meilleures valeurs US.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
