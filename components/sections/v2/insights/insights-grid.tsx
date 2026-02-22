"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { INSIGHTS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function InsightsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty("--spot-x", `${x}%`);
      e.currentTarget.style.setProperty("--spot-y", `${y}%`);
      const tiltX = ((y - 50) / 50) * -3;
      const tiltY = ((x - 50) / 50) * 3;
      e.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
      e.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--tilt-x", "0deg");
      e.currentTarget.style.setProperty("--tilt-y", "0deg");
    },
    []
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INSIGHTS.posts.map((post, i) => {
            const isHovered = hoveredIndex === i;

            const slug = slugify(post.title);

            return (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: EASE,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={(e) => {
                  setHoveredIndex(null);
                  handleMouseLeave(e);
                }}
                onMouseMove={handleMouseMove}
                className="v2-spotlight v2-tilt relative rounded-2xl border overflow-hidden transition-all duration-500 ease-out group"
                style={{
                  borderColor: isHovered
                    ? "rgba(99,102,241,0.3)"
                    : "var(--border)",
                  boxShadow: isHovered
                    ? "0 0 30px rgba(99,102,241,0.06), 0 4px 20px rgba(0,0,0,0.3)"
                    : "none",
                  "--spot-color": "rgba(99,102,241,0.06)",
                } as React.CSSProperties}
              >
                <Link href={`/insights/${slug}`} className="block cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: isHovered ? "scale(1.06)" : "scale(1)",
                      filter: isHovered
                        ? "brightness(1)"
                        : "brightness(0.8) saturate(0.9)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-overlay-text/80 font-bold bg-accent/20 backdrop-blur-sm rounded-full px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-secondary/40 mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-secondary/20" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold tracking-tight mb-3 transition-colors duration-300 group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="text-secondary/50 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60 group-hover:text-accent transition-colors duration-300">
                    Read more
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
