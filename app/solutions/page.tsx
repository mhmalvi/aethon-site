import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { SolutionsHero } from "@/components/sections/v2/solutions/solutions-hero";

const SolutionsPillars = dynamic(() =>
  import("@/components/sections/v2/solutions/solutions-pillars").then((mod) => mod.SolutionsPillars)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Systems engineered for real operational impact — intelligent operations, AI in production, digital platforms, and security by design.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions — Aethon",
    description:
      "Systems engineered for real operational impact — intelligent operations, AI in production, digital platforms, and security by design.",
  },
  twitter: {
    title: "Solutions — Aethon",
    description:
      "Systems engineered for real operational impact — intelligent operations, AI in production, digital platforms, and security by design.",
  },
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
