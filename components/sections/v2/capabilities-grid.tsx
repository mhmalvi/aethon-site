"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Workflow, Brain, Code2, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHAT_WE_DO } from "@/lib/constants";
import {
  SwapyLayout,
  SwapySlot,
  SwapyItem,
  DragHandle,
} from "@/components/ui/swapy";

const icons = [Workflow, Brain, Code2, Shield];
const EASE = [0.16, 1, 0.3, 1] as const;

const cardAccents = [
  {
    iconBg: "rgba(99,102,241,0.12)",
    iconColor: "#818cf8",
    tint: "from-indigo-500/10",
  },
  {
    iconBg: "rgba(34,211,238,0.12)",
    iconColor: "#22d3ee",
    tint: "from-cyan-500/10",
  },
  {
    iconBg: "rgba(52,211,153,0.12)",
    iconColor: "#34d399",
    tint: "from-emerald-500/10",
  },
  {
    iconBg: "rgba(251,191,36,0.10)",
    iconColor: "#fbbf24",
    tint: "from-amber-500/10",
  },
];

const slotClasses = [
  "col-span-12 md:col-span-7",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-7",
];

function CapabilityCard({ index }: { index: number }) {
  const pillar = WHAT_WE_DO.pillars[index];
  const Icon = icons[index];
  const accent = cardAccents[index];

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border border-border bg-surface-subtle backdrop-blur-sm group min-h-[340px]">
      {/* Background image — pointer-events-none so it doesn't block drag */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={pillar.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.tint} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
      </div>

      {/* Drag handle — highest z-index */}
      <DragHandle className="top-4 right-4 z-30 text-foreground/20 hover:text-foreground/50" />

      {/* Content */}
      <div className="relative z-10 p-7 sm:p-8 lg:p-10 flex flex-col justify-between h-full pointer-events-none">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-heading text-sm font-bold text-foreground/50 tracking-widest">
              0{index + 1}
            </span>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-400 group-hover:scale-110 group-hover:rotate-6"
              style={{ background: accent.iconBg }}
            >
              <Icon
                className="w-5 h-5 transition-all duration-300"
                style={{ color: accent.iconColor }}
              />
            </div>
          </div>

          <h3 className="font-heading text-2xl sm:text-[1.7rem] font-bold tracking-tight mb-3 text-foreground">
            {pillar.title}
          </h3>

          <p className="text-foreground/50 text-sm leading-relaxed">
            {pillar.tagline}
          </p>

          <p className="text-foreground/35 text-sm leading-relaxed mt-3">
            {pillar.description}
          </p>
        </div>

        <div className="mt-8 pt-5 border-t border-border">
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-3xl font-bold gradient-text-accent">
              {pillar.metric}
            </span>
            <span className="text-[11px] text-foreground/40 tracking-wide">
              {pillar.metricLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CapabilitiesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="solutions"
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            02 — {WHAT_WE_DO.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            {WHAT_WE_DO.headline}
          </h2>
          <p className="text-secondary/70 text-base sm:text-lg mt-5 max-w-xl leading-relaxed">
            {WHAT_WE_DO.subtext}
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Button variant="gradient" size="default" className="group" asChild>
              <Link href="/solutions">
                Explore all solutions
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-secondary/55 text-xs tracking-wide">
              Drag cards to rearrange
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          <SwapyLayout
            id="capabilities-swapy"
            config={{
              animation: "dynamic",
              swapMode: "hover",
              continuousMode: true,
              manualSwap: false,
              autoScrollOnDrag: false,
            }}
            className="grid grid-cols-12 gap-4 lg:gap-5"
          >
            {WHAT_WE_DO.pillars.map((_, i) => (
              <SwapySlot
                key={`slot-${i}`}
                id={`slot-${i}`}
                className={slotClasses[i]}
              >
                <SwapyItem
                  id={`item-${i}`}
                  className="h-full"
                >
                  <CapabilityCard index={i} />
                </SwapyItem>
              </SwapySlot>
            ))}
          </SwapyLayout>
        </motion.div>
      </div>
    </section>
  );
}
