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
  title: "Bourse Privée — HelloSafe",
  description:
    "Le Club Bourse Privée HelloSafe : analyses, recommandations long et court terme, portefeuilles, communauté et formations pour investir mieux.",
  metadataBase: new URL("https://bourse-privee.vercel.app"),
  openGraph: {
    title: "Bourse Privée — HelloSafe",
    description:
      "Analyses, portefeuilles, recommandations et communauté pour bien investir en bourse.",
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
