import { Navbar } from "@/components/sections/navbar";
import { AboutHero } from "@/components/sections/v2/about/about-hero";
import { AboutFounder } from "@/components/sections/v2/about/about-founder";
import { AboutValues } from "@/components/sections/v2/about/about-values";
import { AboutCapabilities } from "@/components/sections/v2/about/about-capabilities";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Aethon",
  description:
    "We build systems that businesses depend on. Learn about our values, capabilities, and engineering-first approach.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AboutHero />
        <AboutFounder />
        <AboutValues />
        <AboutCapabilities />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
