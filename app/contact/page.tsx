import { Navbar } from "@/components/sections/navbar";
import { ContactHero } from "@/components/sections/v2/contact/contact-hero";
import { ContactSection } from "@/components/sections/v2/contact/contact-section";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your operational challenge. We'll get back to you within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Aethon",
    description:
      "Tell us about your operational challenge. We'll get back to you within one business day.",
  },
  twitter: {
    title: "Contact — Aethon",
    description:
      "Tell us about your operational challenge. We'll get back to you within one business day.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ContactHero />
        <ContactSection />
      </main>
      <FooterV2 />
    </>
  );
}
