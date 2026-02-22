import type { MetadataRoute } from "next";
import { SOLUTIONS, PRODUCTS, CASE_STUDIES, INSIGHTS } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aethonautomation.com";

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/solutions",
    "/products",
    "/case-studies",
    "/insights",
    "/contact",
    "/careers",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const solutionPages = SOLUTIONS.pillars.map((pillar) => ({
    url: `${siteUrl}/solutions/${pillar.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = PRODUCTS.features.map((feature) => ({
    url: `${siteUrl}/products/${feature.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages = CASE_STUDIES.studies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightPages = INSIGHTS.posts.map((post) => ({
    url: `${siteUrl}/insights/${slugify(post.title)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...solutionPages, ...productPages, ...caseStudyPages, ...insightPages];
}
