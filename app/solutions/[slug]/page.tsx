import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import {
  SolutionDetailHero,
  SolutionDetailContent,
} from "@/components/sections/v2/solutions/solution-detail";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";
import { SOLUTIONS } from "@/lib/constants";

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

  return {
    title: `${pillar.title} — Aethon`,
    description: pillar.description,
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
      <main>
        <SolutionDetailHero pillarIndex={pillarIndex} />
        <SolutionDetailContent pillarIndex={pillarIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
