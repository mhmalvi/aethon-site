import { Navbar } from "@/components/sections/navbar";
import { HeroV2 } from "@/components/sections/v2/hero-v2";
import { CredibilityMarquee } from "@/components/sections/v2/credibility-marquee";
import { Manifesto } from "@/components/sections/v2/manifesto";
import { CapabilitiesGrid } from "@/components/sections/v2/capabilities-grid";
import { CaseStudiesV2 } from "@/components/sections/v2/case-studies-v2";
import { ProductsV2 } from "@/components/sections/v2/products-v2";
import { ProcessV2 } from "@/components/sections/v2/process-v2";
import { IndustriesV2 } from "@/components/sections/v2/industries-v2";
import { Differentiators } from "@/components/sections/v2/differentiators";
import { FaqV2 } from "@/components/sections/v2/faq-v2";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";
import { NewsletterModal } from "@/components/ui/newsletter-modal";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aethon — Digital Systems & Automation Partner",
  description:
    "Engineering reliable business systems — automation, AI, custom software, and security for companies that need to move faster.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroV2 />
        <CredibilityMarquee />
        <Manifesto />
        <CapabilitiesGrid />
        <CaseStudiesV2 />
        <ProductsV2 />
        <ProcessV2 />
        <IndustriesV2 />
        <Differentiators />
        <FaqV2 />
        <CtaV2 />
      </main>
      <FooterV2 />
      <NewsletterModal />
    </>
  );
}
