"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Workflow, Brain, Code2, Shield, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SOLUTIONS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const iconMap = [Workflow, Brain, Code2, Shield];

const pillarAccents = [
  {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.10)",
    glow: "rgba(99,102,241,0.18)",
    border: "rgba(99,102,241,0.25)",
  },
  {
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.10)",
    glow: "rgba(34,211,238,0.18)",
    border: "rgba(34,211,238,0.25)",
  },
  {
    color: "#34d399",
    bg: "rgba(52,211,153,0.10)",
    glow: "rgba(52,211,153,0.18)",
    border: "rgba(52,211,153,0.25)",
  },
  {
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.10)",
    glow: "rgba(251,191,36,0.18)",
    border: "rgba(251,191,36,0.25)",
  },
];

function PillarCard({ index }: { index: number }) {
  const pillar = SOLUTIONS.pillars[index];
  const Icon = iconMap[index];
  const accent = pillarAccents[index];
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

  const isReversed = index % 2 === 1;

  return (
    <motion.div
      id={pillar.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="v2-spotlight relative rounded-2xl border overflow-hidden transition-all duration-500"
      style={{
        borderColor: hovered ? accent.border : "var(--border)",
        boxShadow: hovered
          ? `0 0 60px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.2)`
          : "none",
        "--spot-color": accent.glow,
      } as React.CSSProperties}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 ${
          isReversed ? "lg:direction-rtl" : ""
        }`}
      >
        {/* Image */}
        <div
          className={`relative aspect-[16/10] lg:aspect-auto overflow-hidden ${
            isReversed ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={pillar.image}
            alt={pillar.title}
            fill
            className="object-cover transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              filter: hovered
                ? "brightness(1)"
                : "brightness(0.75) saturate(0.9)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />

          {/* Metric overlay */}
          <div className="absolute bottom-6 left-6">
            <span className="font-heading text-5xl sm:text-6xl font-bold gradient-text-accent leading-none block">
              {pillar.metric}
            </span>
            <span className="text-xs text-foreground/50 mt-1.5 block tracking-wider uppercase font-medium">
              {pillar.metricLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          className={`p-8 sm:p-10 lg:p-14 flex flex-col justify-center ${
            isReversed ? "lg:order-1" : ""
          }`}
        >
          {/* Number + Icon */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: accent.bg }}
              animate={
                hovered
                  ? { rotate: 6, scale: 1.08 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Icon
                className="w-6 h-6 transition-all duration-300"
                style={{
                  color: accent.color,
                  filter: hovered
                    ? `drop-shadow(0 0 8px ${accent.color})`
                    : "none",
                }}
              />
            </motion.div>
            <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary/45">
              0{index + 1}
            </span>
          </div>

          <h2
            className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-2 transition-colors duration-300"
            style={{ color: hovered ? accent.color : undefined }}
          >
            {pillar.title}
          </h2>

          <p
            className="text-sm font-semibold mb-5 transition-colors duration-300"
            style={{ color: accent.color, opacity: 0.7 }}
          >
            {pillar.tagline}
          </p>

          <motion.div
            className="h-[2px] w-14 mb-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent.color}, transparent)`,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <p className="text-secondary/60 text-sm sm:text-[15px] leading-relaxed mb-8">
            {pillar.description}
          </p>

          {/* Capabilities list */}
          <ul className="space-y-3 mb-8">
            {pillar.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: accent.bg }}
                >
                  <Check
                    className="w-3 h-3"
                    style={{ color: accent.color }}
                  />
                </div>
                <span className="text-sm text-secondary/70">{cap}</span>
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            size="default"
            className="self-start group"
            asChild
          >
            <Link href={`/solutions/${pillar.id}`}>
              Learn more
              <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function SolutionsPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            What We Build
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Four pillars of operational capability
          </h2>
          <p className="text-secondary/70 text-base sm:text-lg mt-5 max-w-xl leading-relaxed">
            We don&apos;t sell tools. We engineer systems that become the
            operational backbone of your business.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div className="space-y-8">
          {SOLUTIONS.pillars.map((_, i) => (
            <PillarCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
