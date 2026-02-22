import { Navbar } from "@/components/sections/navbar";
import { SolutionsHero } from "@/components/sections/v2/solutions/solutions-hero";
import { SolutionsPillars } from "@/components/sections/v2/solutions/solutions-pillars";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions — Aethon",
  description:
    "Systems engineered for real operational impact — intelligent operations, AI in production, digital platforms, and security by design.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <SolutionsHero />
        <SolutionsPillars />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
