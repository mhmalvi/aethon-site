import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import {
  CaseStudyDetailHero,
} from "@/components/sections/v2/case-studies/case-study-detail";
import { CASE_STUDIES } from "@/lib/constants";

const CaseStudyDetailContent = dynamic(() =>
  import("@/components/sections/v2/case-studies/case-study-detail").then((mod) => mod.CaseStudyDetailContent)
);
const CtaV2 = dynamic(() =>
  import("@/components/sections/v2/cta-v2").then((mod) => mod.CtaV2)
);
const FooterV2 = dynamic(() =>
  import("@/components/sections/v2/footer-v2").then((mod) => mod.FooterV2)
);

import type { Metadata } from "next";

export function generateStaticParams() {
  return CASE_STUDIES.studies.map((study) => ({
    slug: study.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.studies.find((s) => s.id === slug);
  if (!study) return { title: "Case Study — Aethon" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethonautomation.com";
  return {
    title: `${study.title} — Aethon`,
    description: study.problem,
    openGraph: {
      title: `${study.title} — Aethon`,
      description: study.problem,
      url: `${siteUrl}/case-studies/${slug}`,
      siteName: "Aethon",
      images: [{ url: study.image, width: 1200, height: 630 }, { url: "/aethon-og.png", width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Aethon`,
      description: study.problem,
      images: [study.image],
    },
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const studyIndex = CASE_STUDIES.studies.findIndex((s) => s.id === slug);

  if (studyIndex === -1) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <CaseStudyDetailHero studyIndex={studyIndex} />
        <CaseStudyDetailContent studyIndex={studyIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
