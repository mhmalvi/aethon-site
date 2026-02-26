import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import {
  SolutionDetailHero,
} from "@/components/sections/v2/solutions/solution-detail";
import { SOLUTIONS } from "@/lib/constants";

const SolutionDetailContent = dynamic(() =>
  import("@/components/sections/v2/solutions/solution-detail").then((mod) => mod.SolutionDetailContent)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export function generateStaticParams() {
  return SOLUTIONS.pillars.map((pillar) => ({
    slug: pillar.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = SOLUTIONS.pillars.find((p) => p.id === slug);
  if (!pillar) return { title: "Solution — Aethon" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethonautomation.com";
  return {
    title: `${pillar.title} — Aethon`,
    description: pillar.description,
    openGraph: {
      title: `${pillar.title} — Aethon`,
      description: pillar.description,
      url: `${siteUrl}/solutions/${slug}`,
      siteName: "Aethon",
      images: [{ url: "/aethon-og.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pillar.title} — Aethon`,
      description: pillar.description,
      images: ["/aethon-og.png"],
    },
    alternates: { canonical: `/solutions/${slug}` },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillarIndex = SOLUTIONS.pillars.findIndex((p) => p.id === slug);

  if (pillarIndex === -1) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <SolutionDetailHero pillarIndex={pillarIndex} />
        <SolutionDetailContent pillarIndex={pillarIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
