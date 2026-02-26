import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { HeroV2 } from "@/components/sections/v2/hero-v2";
import { CredibilityMarquee } from "@/components/sections/v2/credibility-marquee";
import { LatestInsights } from "@/components/sections/v2/latest-insights";

const Manifesto = dynamic(() =>
  import("@/components/sections/v2/manifesto").then((mod) => mod.Manifesto)
);
const CapabilitiesGrid = dynamic(() =>
  import("@/components/sections/v2/capabilities-grid").then((mod) => mod.CapabilitiesGrid)
);
const CaseStudiesV2 = dynamic(() =>
  import("@/components/sections/v2/case-studies-v2").then((mod) => mod.CaseStudiesV2)
);
const ProductsV2 = dynamic(() =>
  import("@/components/sections/v2/products-v2").then((mod) => mod.ProductsV2)
);
const ProcessV2 = dynamic(() =>
  import("@/components/sections/v2/process-v2").then((mod) => mod.ProcessV2)
);
const IndustriesV2 = dynamic(() =>
  import("@/components/sections/v2/industries-v2").then((mod) => mod.IndustriesV2)
);
const Differentiators = dynamic(() =>
  import("@/components/sections/v2/differentiators").then((mod) => mod.Differentiators)
);
const FaqV2 = dynamic(() =>
  import("@/components/sections/v2/faq-v2").then((mod) => mod.FaqV2)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);
const NewsletterModal = dynamic(() =>
  import("@/components/ui/newsletter-modal").then((mod) => mod.NewsletterModal)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aethon — Digital Systems & Automation Partner",
  description:
    "Engineering reliable business systems — automation, AI, custom software, and security for companies that need to move faster.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aethon — Digital Systems & Automation Partner",
    description:
      "Engineering reliable business systems — automation, AI, custom software, and security for companies that need to move faster.",
  },
  twitter: {
    title: "Aethon — Digital Systems & Automation Partner",
    description:
      "Engineering reliable business systems — automation, AI, custom software, and security for companies that need to move faster.",
  },
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
        <LatestInsights />
        <FaqV2 />
        <CtaV2 />
      </main>
      <FooterV2 />
      <NewsletterModal />
    </>
  );
}
