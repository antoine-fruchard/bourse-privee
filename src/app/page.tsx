import { Hero } from "@/components/home/hero";
import { TickerTape } from "@/components/home/ticker-tape";
import { SectionsGrid } from "@/components/home/sections-grid";
import { Recommendations } from "@/components/home/recommendations";
import { Movers } from "@/components/home/movers";
import { ClubFeed } from "@/components/home/club-feed";
import { NewsStrip } from "@/components/home/news-strip";
import { PortfolioStrip } from "@/components/home/portfolio-strip";
import { HomeCta } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerTape />
      <SectionsGrid />
      <Recommendations />
      <Movers />
      <PortfolioStrip />
      <NewsStrip />
      <ClubFeed />
      <HomeCta />
    </>
  );
}
