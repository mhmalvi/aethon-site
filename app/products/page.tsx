import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { ProductsHero } from "@/components/sections/v2/products/products-hero";

const ProductsFeatures = dynamic(() =>
  import("@/components/sections/v2/products/products-features").then((mod) => mod.ProductsFeatures)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Platforms built from real operational experience — engineered for security, scalability, and rapid deployment.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Aethon",
    description:
      "Platforms built from real operational experience — engineered for security, scalability, and rapid deployment.",
  },
  twitter: {
    title: "Products — Aethon",
    description:
      "Platforms built from real operational experience — engineered for security, scalability, and rapid deployment.",
  },
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
