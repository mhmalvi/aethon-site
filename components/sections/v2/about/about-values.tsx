"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Crosshair, Shield, Eye, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ABOUT } from "@/lib/constants";

const icons = [Crosshair, Shield, Eye, TrendingUp];
const EASE = [0.16, 1, 0.3, 1] as const;

const valueAccents = [
  {
    spotColor: "rgba(99,102,241,0.08)",
    borderHover: "rgba(99,102,241,0.4)",
    iconColor: "#818cf8",
    iconBg: "rgba(99,102,241,0.12)",
    iconBgHover: "rgba(99,102,241,0.22)",
  },
  {
    spotColor: "rgba(52,211,153,0.07)",
    borderHover: "rgba(52,211,153,0.4)",
    iconColor: "#34d399",
    iconBg: "rgba(52,211,153,0.12)",
    iconBgHover: "rgba(52,211,153,0.22)",
  },
  {
    spotColor: "rgba(34,211,238,0.08)",
    borderHover: "rgba(34,211,238,0.4)",
    iconColor: "#22d3ee",
    iconBg: "rgba(34,211,238,0.12)",
    iconBgHover: "rgba(34,211,238,0.22)",
  },
  {
    spotColor: "rgba(251,191,36,0.06)",
    borderHover: "rgba(251,191,36,0.35)",
    iconColor: "#fbbf24",
    iconBg: "rgba(251,191,36,0.10)",
    iconBgHover: "rgba(251,191,36,0.20)",
  },
];

export function AboutValues() {
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
          <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            01 — Our Values
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-2xl">
            What drives every system we build.
          </h2>
          <div className="mt-6">
            <Button variant="outline" size="default" className="group" asChild>
              <Link href="/solutions">
                Explore our solutions
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {ABOUT.values.map((value, i) => {
            const Icon = icons[i];
            const accent = valueAccents[i];
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: EASE,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={(e) => {
                  setHoveredIndex(null);
                  handleMouseLeave(e);
                }}
                onMouseMove={handleMouseMove}
                className="v2-spotlight v2-tilt relative rounded-2xl overflow-hidden border transition-all duration-500 ease-out cursor-default min-h-[220px] p-7 sm:p-8 lg:p-10 flex flex-col justify-between"
                style={{
                  borderColor: isHovered
                    ? accent.borderHover
                    : "var(--border)",
                  boxShadow: isHovered
                    ? `0 0 40px ${accent.spotColor}, 0 4px 24px rgba(0,0,0,0.3)`
                    : "none",
                  "--spot-color": accent.spotColor,
                } as React.CSSProperties}
              >
                <div>
                  <motion.div
                    animate={
                      isHovered
                        ? { rotate: 10, scale: 1.15 }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.3, ease: EASE }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-400 mb-6"
                    style={{
                      background: isHovered
                        ? accent.iconBgHover
                        : accent.iconBg,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{
                        color: accent.iconColor,
                        filter: isHovered
                          ? `drop-shadow(0 0 12px ${accent.iconColor})`
                          : "none",
                      }}
                    />
                  </motion.div>

                  <h3 className="font-heading text-2xl font-bold tracking-tight mb-3">
                    {value.title}
                  </h3>
                  <p className="text-secondary/60 text-sm leading-relaxed max-w-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
