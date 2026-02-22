import { Navbar } from "@/components/sections/navbar";
import { InsightsHero } from "@/components/sections/v2/insights/insights-hero";
import { InsightsGrid } from "@/components/sections/v2/insights/insights-grid";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights — Aethon",
  description:
    "Practical thinking on systems engineering, AI in production, and building technology that lasts.",
};

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main>
        <InsightsHero />
        <InsightsGrid />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
