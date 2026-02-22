"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Workflow,
  Brain,
  Code2,
  Shield,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextRandomized } from "@/components/ui/text-randomized";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { SOLUTIONS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const iconMap = [Workflow, Brain, Code2, Shield];

const pillarAccents = [
  { color: "#818cf8", bg: "rgba(99,102,241,0.10)", glow: "rgba(99,102,241,0.18)" },
  { color: "#22d3ee", bg: "rgba(34,211,238,0.10)", glow: "rgba(34,211,238,0.18)" },
  { color: "#34d399", bg: "rgba(52,211,153,0.10)", glow: "rgba(52,211,153,0.18)" },
  { color: "#fbbf24", bg: "rgba(251,191,36,0.10)", glow: "rgba(251,191,36,0.18)" },
];

export function SolutionDetailHero({ pillarIndex }: { pillarIndex: number }) {
  const pillar = SOLUTIONS.pillars[pillarIndex];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-end overflow-hidden px-6 sm:px-8 lg:px-16 xl:px-24 pb-20 sm:pb-28 pt-32 sm:pt-40"
    >
      {/* Parallax background */}
      <div className="absolute inset-0">
        <motion.div style={{ y: bgY }} className="absolute inset-[-20%]">
          <img
            src={pillar.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/82" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{
            top: "20%",
            right: "10%",
            background: pillarAccents[pillarIndex].color,
            opacity: 0.08,
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            bottom: "15%",
            left: "15%",
            background: "var(--accent-cyan)",
            opacity: 0.04,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/30 hover:text-foreground/60 transition-colors duration-200"
          >
            <ArrowLeft className="w-3 h-3" />
            All Solutions
          </Link>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.2em] uppercase text-foreground/30 font-semibold block mb-6"
        >
          <TextRandomized text={`0${pillarIndex + 1} — ${pillar.title}`} />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[1.02] mb-6 max-w-4xl text-foreground"
        >
          {pillar.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg sm:text-xl font-medium mb-8 max-w-2xl"
          style={{ color: pillarAccents[pillarIndex].color, opacity: 0.7 }}
        >
          {pillar.tagline}
        </motion.p>

        <div className="space-y-2 mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="h-[2px] w-20 sm:w-28 origin-left"
            style={{
              background: `linear-gradient(90deg, ${pillarAccents[pillarIndex].color}99, transparent)`,
            }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-accent-cyan/40 to-transparent origin-left"
          />
        </div>
      </div>
    </section>
  );
}

export function SolutionDetailContent({ pillarIndex }: { pillarIndex: number }) {
  const pillar = SOLUTIONS.pillars[pillarIndex];
  const accent = pillarAccents[pillarIndex];
  const Icon = iconMap[pillarIndex];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Main content — 3 cols */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: accent.bg }}
                >
                  <Icon className="w-7 h-7" style={{ color: accent.color }} />
                </div>
                <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary/45">
                  Solution — 0{pillarIndex + 1}
                </span>
              </div>

              <p className="text-secondary/70 text-base sm:text-lg leading-relaxed mb-12">
                {pillar.description}
              </p>

              {/* Capabilities */}
              <div className="mb-12">
                <h3 className="font-heading text-xl font-bold tracking-tight mb-6">
                  Core Capabilities
                </h3>
                <ul className="space-y-4">
                  {pillar.capabilities.map((cap, i) => (
                    <motion.li
                      key={cap}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                      className="flex items-start gap-3.5"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: accent.bg }}
                      >
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: accent.color }}
                        />
                      </div>
                      <span className="text-secondary/70 text-[15px]">{cap}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <ConsultationModal>
                  <Button variant="gradient" size="default" className="group">
                    Start your project
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </ConsultationModal>
                <Button variant="outline" size="default" className="group" asChild>
                  <Link href="/solutions">
                    View all solutions
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2">
            {/* Metric block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="rounded-2xl border border-border p-8 mb-6"
              style={{
                background: `linear-gradient(135deg, ${accent.bg}, transparent)`,
              }}
            >
              <span
                className="font-heading text-6xl sm:text-7xl font-bold leading-none block mb-3"
                style={{ color: accent.color }}
              >
                {pillar.metric}
              </span>
              <span className="text-sm text-secondary/50 uppercase tracking-wider font-medium">
                {pillar.metricLabel}
              </span>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="rounded-2xl overflow-hidden border border-border aspect-[4/3]"
            >
              <img
                src={pillar.image}
                alt={pillar.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Other solutions nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-6 rounded-2xl border border-border p-6"
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/40 mb-4">
                Other Solutions
              </h4>
              <nav className="space-y-2">
                {SOLUTIONS.pillars.map((p, i) => {
                  if (i === pillarIndex) return null;
                  const PIcon = iconMap[i];
                  return (
                    <Link
                      key={p.id}
                      href={`/solutions/${p.id}`}
                      className="flex items-center gap-3 py-2 text-sm text-secondary/60 hover:text-foreground transition-colors duration-200 group/link"
                    >
                      <PIcon className="w-4 h-4 text-secondary/45 group-hover/link:text-accent transition-colors duration-200" />
                      {p.title}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
