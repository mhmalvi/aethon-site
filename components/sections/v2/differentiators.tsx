"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useInView } from "motion/react";
import { Code2, ShieldCheck, GitBranch, Infinity, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { WHY_CHOOSE_US } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const itemIcons = [Code2, ShieldCheck, GitBranch, Infinity];

const itemAccents = [
  {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.10)",
    glow: "rgba(99,102,241,0.18)",
    border: "rgba(99,102,241,0.30)",
  },
  {
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.10)",
    glow: "rgba(34,211,238,0.18)",
    border: "rgba(34,211,238,0.30)",
  },
  {
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.10)",
    glow: "rgba(167,139,250,0.18)",
    border: "rgba(167,139,250,0.30)",
  },
  {
    color: "#34d399",
    bg: "rgba(52,211,153,0.10)",
    glow: "rgba(52,211,153,0.18)",
    border: "rgba(52,211,153,0.30)",
  },
];

const differentiatorImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&h=500&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&h=500&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&h=500&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop",
];

/* ──────────────────────────────────────────────── */
/*  Right-side scrolling card                       */
/* ──────────────────────────────────────────────── */
function ScrollCard({ index }: { index: number }) {
  const item = WHY_CHOOSE_US.items[index];
  const Icon = itemIcons[index];
  const accent = itemAccents[index];
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty("--spot-x", `${x}%`);
      e.currentTarget.style.setProperty("--spot-y", `${y}%`);
    },
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="v2-spotlight relative rounded-2xl border overflow-hidden transition-all duration-500"
      style={{
        borderColor: hovered ? accent.border : "var(--border)",
        boxShadow: hovered
          ? `0 0 40px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.15)`
          : "none",
        "--spot-color": accent.glow,
      } as React.CSSProperties}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={differentiatorImages[index]}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            filter: hovered ? "brightness(1)" : "brightness(0.8) saturate(0.9)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />

        {/* Category pill on image */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs tracking-[0.15em] uppercase font-bold backdrop-blur-sm rounded-full px-3 py-1 border"
            style={{
              background: accent.bg,
              color: accent.color,
              borderColor: `${accent.color}30`,
            }}
          >
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-7">
        <div className="absolute inset-0 bg-surface-subtle" />

        <div className="relative z-10">
          {/* Icon + Title row */}
          <div className="flex items-center gap-3.5 mb-4">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: accent.bg }}
              animate={
                hovered
                  ? { rotate: 6, scale: 1.08 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Icon
                className="w-5 h-5 transition-all duration-300"
                style={{
                  color: accent.color,
                  filter: hovered
                    ? `drop-shadow(0 0 8px ${accent.color})`
                    : "none",
                }}
              />
            </motion.div>

            <h3
              className="font-heading text-xl font-bold tracking-tight transition-colors duration-300"
              style={{ color: hovered ? accent.color : undefined }}
            >
              {item.title}
            </h3>
          </div>

          {/* Accent line */}
          <motion.div
            className="h-[2px] w-12 mb-4 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent.color}, transparent)`,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <p className="text-secondary/60 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────── */
/*  Main Section                                    */
/* ──────────────────────────────────────────────── */
export function Differentiators() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="why-aethon"
      ref={sectionRef}
      className="relative"
    >
      {/* Animated divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      {/* ─── Desktop: Sticky left + scrolling right ─── */}
      <div className="hidden lg:block px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 gap-12 xl:gap-20">
            {/* Left column — sticky */}
            <div className="sticky top-0 h-screen flex flex-col justify-center">
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(50% 45% at 40% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                {/* Section label */}
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-5"
                >
                  07 — {WHY_CHOOSE_US.sectionLabel}
                </motion.span>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-heading text-4xl xl:text-5xl 2xl:text-[3.4rem] font-bold tracking-tight leading-[1.08] mb-6"
                >
                  {WHY_CHOOSE_US.headline}
                </motion.h2>

                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                  className="h-[2px] w-20 mb-6 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left"
                />

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-secondary/60 text-base xl:text-lg leading-relaxed max-w-md mb-10"
                >
                  What sets us apart isn&apos;t what we build — it&apos;s how we think. Every decision is grounded in engineering rigour and long-term outcomes.
                </motion.p>

                {/* Mini nav pills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-2.5 mb-8"
                >
                  {WHY_CHOOSE_US.items.map((item, i) => {
                    const Icon = itemIcons[i];
                    const accent = itemAccents[i];
                    return (
                      <div
                        key={item.title}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-[1.03]"
                        style={{
                          borderColor: `${accent.color}25`,
                          background: accent.bg,
                        }}
                      >
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{ color: accent.color }}
                        />
                        <span
                          className="text-xs font-semibold tracking-wide"
                          style={{ color: accent.color }}
                        >
                          {item.title}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <ConsultationModal>
                    <Button variant="gradient" size="default" className="group">
                      Work with us
                      <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </ConsultationModal>
                </motion.div>
              </div>
            </div>

            {/* Right column — scrolling cards */}
            <div className="py-24 sm:py-32 md:py-40 space-y-6">
              {WHY_CHOOSE_US.items.map((_, i) => (
                <ScrollCard key={i} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile: Stacked cards ─── */}
      <div className="lg:hidden py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              07 — {WHY_CHOOSE_US.sectionLabel}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight max-w-md mb-4">
              {WHY_CHOOSE_US.headline}
            </h2>
            <p className="text-secondary/60 text-base leading-relaxed max-w-sm">
              What sets us apart isn&apos;t what we build — it&apos;s how we think.
            </p>
          </motion.div>

          <div className="space-y-6">
            {WHY_CHOOSE_US.items.map((_, i) => (
              <ScrollCard key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
