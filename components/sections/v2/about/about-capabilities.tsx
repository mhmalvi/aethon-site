"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Target, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ABOUT } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const capIcons = [Zap, Target, ShieldCheck, Clock];
const capAccents = [
  { color: "#818cf8", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.4)", spot: "rgba(99,102,241,0.06)" },
  { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.4)", spot: "rgba(52,211,153,0.06)" },
  { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.4)", spot: "rgba(34,211,238,0.06)" },
  { color: "#fbbf24", bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.35)", spot: "rgba(251,191,36,0.05)" },
];

export function AboutCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty("--spot-x", `${x}%`);
      e.currentTarget.style.setProperty("--spot-y", `${y}%`);
      const tiltX = ((y - 50) / 50) * -4;
      const tiltY = ((x - 50) / 50) * 4;
      e.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
      e.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.setProperty("--tilt-x", "0deg");
      e.currentTarget.style.setProperty("--tilt-y", "0deg");
    },
    []
  );

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 md:py-32 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            02 — By the Numbers
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
            Proven operational impact.
          </h2>
          <div className="flex items-center gap-4 mt-6">
            <Button variant="gradient" size="default" className="group" asChild>
              <Link href="/case-studies">
                See our work
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="default" className="group" asChild>
              <Link href="/careers">
                Join the team
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {ABOUT.capabilities.map((cap, i) => {
            const Icon = capIcons[i];
            const accent = capAccents[i];
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.1,
                  ease: EASE,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={(e) => {
                  setHoveredIndex(null);
                  handleMouseLeave(e);
                }}
                onMouseMove={handleMouseMove}
                className="v2-spotlight v2-tilt relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 ease-out cursor-default"
                style={{
                  borderColor: isHovered
                    ? accent.border
                    : "var(--border)",
                  boxShadow: isHovered
                    ? `0 0 40px ${accent.spot}, 0 4px 20px rgba(0,0,0,0.3)`
                    : "none",
                  "--spot-color": accent.spot,
                } as React.CSSProperties}
              >
                <motion.div
                  animate={
                    isHovered
                      ? { rotate: 10, scale: 1.15 }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: EASE }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: accent.bg }}
                >
                  <Icon
                    className="w-5 h-5 transition-all duration-300"
                    style={{
                      color: accent.color,
                      filter: isHovered
                        ? `drop-shadow(0 0 12px ${accent.color})`
                        : "none",
                    }}
                  />
                </motion.div>

                <AnimatedCounter
                  value={cap.value}
                  className="block font-heading text-4xl sm:text-5xl font-bold gradient-text-accent mb-2"
                />
                <span className="text-sm text-secondary/50 tracking-wide">
                  {cap.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
