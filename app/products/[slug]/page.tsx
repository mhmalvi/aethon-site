import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import {
  ProductDetailHero,
} from "@/components/sections/v2/products/product-detail";
import { PRODUCTS } from "@/lib/constants";

const ProductDetailContent = dynamic(() =>
  import("@/components/sections/v2/products/product-detail").then((mod) => mod.ProductDetailContent)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethonautomation.com";
  return {
    title: `${feature.label} — Aethon`,
    description: feature.description,
    openGraph: {
      title: `${feature.label} — Aethon`,
      description: feature.description,
      url: `${siteUrl}/products/${slug}`,
      siteName: "Aethon",
      images: [{ url: "/aethon-og.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${feature.label} — Aethon`,
      description: feature.description,
      images: ["/aethon-og.png"],
    },
    alternates: { canonical: `/products/${slug}` },
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
      <main id="main-content">
        <ProductDetailHero featureIndex={featureIndex} />
        <ProductDetailContent featureIndex={featureIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
