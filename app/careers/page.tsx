import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { CareersHero } from "@/components/sections/v2/careers/careers-hero";

const CareersContent = dynamic(() =>
  import("@/components/sections/v2/careers/careers-content").then((mod) => mod.CareersContent)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a focused engineering team that ships real systems for real businesses. Remote-first, ownership-driven.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — Aethon",
    description:
      "Join a focused engineering team that ships real systems for real businesses. Remote-first, ownership-driven.",
  },
  twitter: {
    title: "Careers — Aethon",
    description:
      "Join a focused engineering team that ships real systems for real businesses. Remote-first, ownership-driven.",
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <CareersHero />
        <CareersContent />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
