import { Navbar } from "@/components/sections/navbar";
import { ProductsHero } from "@/components/sections/v2/products/products-hero";
import { ProductsFeatures } from "@/components/sections/v2/products/products-features";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Aethon",
  description:
    "Platforms built from real operational experience — engineered for security, scalability, and rapid deployment.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ProductsHero />
        <ProductsFeatures />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
