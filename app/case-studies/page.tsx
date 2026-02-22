import { Navbar } from "@/components/sections/navbar";
import { CaseStudiesHero } from "@/components/sections/v2/case-studies/case-studies-hero";
import { CaseStudiesList } from "@/components/sections/v2/case-studies/case-studies-list";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Aethon",
  description:
    "Real problems. Engineered solutions. Proven results across financial services, logistics, and SaaS.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <CaseStudiesHero />
        <CaseStudiesList />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
