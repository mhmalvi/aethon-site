import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";

const BLOG_URL = "https://insights.aethonautomation.com";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function LatestInsights() {
  const posts = await getBlogPosts();

  if (posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-16 xl:px-24">
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              08 — Insights
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Latest insights
            </h2>
          </div>
          <a
            href={BLOG_URL}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60 hover:text-accent transition-colors duration-300"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.06),0_4px_20px_rgba(0,0,0,0.3)]"
            >
              {/* Image */}
              {post.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out brightness-[0.8] saturate-[0.9] group-hover:scale-[1.06] group-hover:brightness-100 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  {post.categories.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="text-xs tracking-[0.15em] uppercase text-overlay-text/80 font-bold bg-accent/20 backdrop-blur-sm rounded-full px-3 py-1">
                        {post.categories[0]}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="text-xs text-secondary/55 mb-3">
                  {formatDate(post.date)}
                </div>

                <h3 className="font-heading text-lg font-bold tracking-tight mb-3 transition-colors duration-300 group-hover:text-accent">
                  {post.title}
                </h3>

                <p className="text-secondary/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description || post.content}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60 group-hover:text-accent transition-colors duration-300">
                  Read more
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile "View all" link */}
        <div className="sm:hidden mt-8 text-center">
          <a
            href={BLOG_URL}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60 hover:text-accent transition-colors duration-300"
          >
            View all insights
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
