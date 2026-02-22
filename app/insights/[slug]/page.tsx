import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { InsightArticle } from "@/components/sections/v2/insights/insight-article";
import { CtaV2 } from "@/components/sections/v2/cta-v2";
import { FooterV2 } from "@/components/sections/v2/footer-v2";
import { INSIGHTS } from "@/lib/constants";

import type { Metadata } from "next";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return INSIGHTS.posts.map((post) => ({
    slug: slugify(post.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = INSIGHTS.posts.find((p) => slugify(p.title) === slug);

  if (!post) {
    return { title: "Not Found — Aethon" };
  }

  return {
    title: `${post.title} — Aethon Insights`,
    description: post.excerpt,
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postIndex = INSIGHTS.posts.findIndex(
    (p) => slugify(p.title) === slug
  );

  if (postIndex === -1) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <InsightArticle postIndex={postIndex} />
        <CtaV2 />
      </main>
      <FooterV2 />
    </>
  );
}
