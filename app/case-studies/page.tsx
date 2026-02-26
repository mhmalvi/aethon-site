import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { CaseStudiesHero } from "@/components/sections/v2/case-studies/case-studies-hero";

const CaseStudiesList = dynamic(() =>
  import("@/components/sections/v2/case-studies/case-studies-list").then((mod) => mod.CaseStudiesList)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real problems. Engineered solutions. Proven results across financial services, logistics, and SaaS.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Aethon",
    description:
      "Real problems. Engineered solutions. Proven results across financial services, logistics, and SaaS.",
  },
  twitter: {
    title: "Case Studies — Aethon",
    description:
      "Real problems. Engineered solutions. Proven results across financial services, logistics, and SaaS.",
  },
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
