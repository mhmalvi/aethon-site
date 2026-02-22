"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { INSIGHTS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function InsightArticle({ postIndex }: { postIndex: number }) {
  const post = INSIGHTS.posts[postIndex];
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Related posts (exclude current)
  const relatedPosts = INSIGHTS.posts
    .filter((_, i) => i !== postIndex)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden px-6 sm:px-8 lg:px-16 xl:px-24 pb-16 sm:pb-24 pt-32 sm:pt-40"
      >
        {/* Parallax background */}
        <div className="absolute inset-0">
          <motion.div style={{ y: bgY }} className="absolute inset-[-20%]">
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-accent transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Insights
            </Link>
          </motion.div>

          {/* Category pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/80 font-bold bg-accent/20 backdrop-blur-sm rounded-full px-3 py-1">
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.06] mb-8 max-w-4xl text-foreground"
          >
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-5 text-sm text-foreground/40"
          >
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="relative py-16 sm:py-24 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Lead paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg sm:text-xl text-secondary/80 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="h-[2px] w-20 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left mb-12"
              />
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-8 sm:p-10"
            >
              <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mb-3">
                Want to discuss this topic?
              </h2>
              <p className="text-secondary/60 text-sm leading-relaxed mb-6">
                Our team has deep experience in {post.category.toLowerCase()}.
                Let&apos;s explore how these ideas apply to your business.
              </p>
              <ConsultationModal>
                <Button
                  variant="gradient"
                  size="default"
                  className="group"
                >
                  Start a conversation
                  <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </ConsultationModal>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="relative py-16 sm:py-24 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-10">
            More insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedPosts.map((related) => {
              const slug = slugify(related.title);
              return (
                <Link
                  key={related.title}
                  href={`/insights/${slug}`}
                  className="group block"
                >
                  <div className="relative rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        style={{
                          filter: "brightness(0.8) saturate(0.9)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/80 font-bold bg-accent/20 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-base font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-accent line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="text-xs text-secondary/55">
                        {related.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
