import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import {
  CaseStudyDetailHero,
  CaseStudyDetailContent,
} from "@/components/sections/v2/case-studies/case-study-detail";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";
import { CASE_STUDIES } from "@/lib/constants";

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

  return {
    title: `${study.title} — Aethon`,
    description: study.problem,
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
      <main>
        <CaseStudyDetailHero studyIndex={studyIndex} />
        <CaseStudyDetailContent studyIndex={studyIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
