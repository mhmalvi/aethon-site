import { Navbar } from "@/components/sections/navbar";
import { CareersHero } from "@/components/sections/v2/careers/careers-hero";
import { CareersContent } from "@/components/sections/v2/careers/careers-content";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Aethon",
  description:
    "Join a focused engineering team that ships real systems for real businesses. Remote-first, ownership-driven.",
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
