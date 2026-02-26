import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { AboutHero } from "@/components/sections/v2/about/about-hero";

const AboutFounder = dynamic(() =>
  import("@/components/sections/v2/about/about-founder").then((mod) => mod.AboutFounder)
);
const AboutValues = dynamic(() =>
  import("@/components/sections/v2/about/about-values").then((mod) => mod.AboutValues)
);
const AboutCapabilities = dynamic(() =>
  import("@/components/sections/v2/about/about-capabilities").then((mod) => mod.AboutCapabilities)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "We build systems that businesses depend on. Learn about our values, capabilities, and engineering-first approach.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Aethon",
    description:
      "We build systems that businesses depend on. Learn about our values, capabilities, and engineering-first approach.",
  },
  twitter: {
    title: "About — Aethon",
    description:
      "We build systems that businesses depend on. Learn about our values, capabilities, and engineering-first approach.",
  },
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
