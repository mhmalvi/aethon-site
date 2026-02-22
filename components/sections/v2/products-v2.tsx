"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BarChart3, Users, Sparkles, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { PRODUCTS } from "@/lib/constants";

const iconMap = [BarChart3, Users, Sparkles, Layers];
const EASE = [0.16, 1, 0.3, 1] as const;

const cardColors = [
  {
    accent: "#818cf8",
    accentBg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.15)",
    darkBg: "linear-gradient(135deg, rgba(49,46,129,0.4) 0%, #0a0c14 100%)",
    lightBg: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, var(--background) 100%)",
  },
  {
    accent: "#22d3ee",
    accentBg: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.15)",
    darkBg: "linear-gradient(135deg, rgba(22,78,99,0.4) 0%, #0a0c14 100%)",
    lightBg: "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, var(--background) 100%)",
  },
  {
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.15)",
    darkBg: "linear-gradient(135deg, rgba(76,29,149,0.4) 0%, #0a0c14 100%)",
    lightBg: "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, var(--background) 100%)",
  },
  {
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.15)",
    darkBg: "linear-gradient(135deg, rgba(6,78,59,0.4) 0%, #0a0c14 100%)",
    lightBg: "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, var(--background) 100%)",
  },
];

function StackingCard({ index, total }: { index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const feature = PRODUCTS.features[index];
  const description = feature.description;
  const Icon = iconMap[index];
  const color = cardColors[index];
  const targetScale = 1 - (total - index) * 0.05;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  return (
    <div
      ref={cardRef}
      className="h-screen flex items-center sticky top-0"
      style={{ zIndex: index }}
    >
      <motion.div
        className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24"
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
          position: "relative",
        }}
      >
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: color.border, background: theme === "dark" ? color.darkBg : color.lightBg }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left content */}
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: color.accentBg }}
                >
                  <Icon className="w-6 h-6" style={{ color: color.accent }} />
                </div>
                <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-foreground/30">
                  Feature 0{index + 1}
                </span>
              </div>

              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-foreground">
                {feature.label}
              </h3>

              <p className="text-secondary/70 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                {description}
              </p>

              {index === total - 1 && (
                <Button variant="gradient" size="lg" className="group self-start" asChild>
                  <Link href="/products">
                    {PRODUCTS.cta}
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Right visual */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ scale: imageScale }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(ellipse at center, ${color.accentBg} 0%, transparent 70%)`,
                  }}
                />
                {/* Abstract geometric pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                    {[...Array(3)].map((_, ring) => (
                      <motion.div
                        key={ring}
                        className="absolute inset-0 rounded-full border"
                        style={{
                          borderColor: color.accent,
                          opacity: 0.1 + ring * 0.05,
                          inset: `${ring * 20}%`,
                        }}
                        animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                        transition={{
                          duration: 20 + ring * 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ))}
                    <div
                      className="absolute inset-[30%] rounded-full flex items-center justify-center"
                      style={{ background: color.accentBg }}
                    >
                      <Icon
                        className="w-12 h-12 sm:w-16 sm:h-16"
                        style={{ color: color.accent, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/80 lg:to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProductsV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = PRODUCTS.features.length;

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative"
    >
      {/* Animated divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      {/* Section header */}
      <div className="pt-24 sm:pt-32 md:pt-40 pb-8 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              04 — {PRODUCTS.sectionLabel}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-xl">
              {PRODUCTS.headline}
            </h2>
            <p className="text-secondary/70 text-base sm:text-lg mt-5 max-w-lg leading-relaxed">
              {PRODUCTS.body}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stacking cards */}
      {PRODUCTS.features.map((_, i) => (
        <StackingCard key={i} index={i} total={total} />
      ))}

      {/* Spacer so the last card can fully settle */}
      <div className="h-[10vh]" />
    </section>
  );
}
