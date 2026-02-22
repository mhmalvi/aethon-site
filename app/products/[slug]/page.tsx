import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import {
  ProductDetailHero,
  ProductDetailContent,
} from "@/components/sections/v2/products/product-detail";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";
import { PRODUCTS } from "@/lib/constants";

import type { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.features.map((feature) => ({
    slug: feature.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = PRODUCTS.features.find((f) => f.id === slug);
  if (!feature) return { title: "Product — Aethon" };

  return {
    title: `${feature.label} — Aethon`,
    description: feature.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const featureIndex = PRODUCTS.features.findIndex((f) => f.id === slug);

  if (featureIndex === -1) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ProductDetailHero featureIndex={featureIndex} />
        <ProductDetailContent featureIndex={featureIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
