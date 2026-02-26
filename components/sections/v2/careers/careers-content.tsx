"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Globe, Code2, Rocket, TrendingUp, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobApplicationModal } from "@/components/ui/job-application-modal";
import { CAREERS } from "@/lib/constants";

const cultureIcons = [Globe, Code2, Rocket, TrendingUp];
const EASE = [0.16, 1, 0.3, 1] as const;

const cultureAccents = [
  { color: "#818cf8", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.4)" },
  { color: "#34d399", bg: "rgba(52,211,153,0.07)", border: "rgba(52,211,153,0.4)" },
  { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.4)" },
  { color: "#fbbf24", bg: "rgba(251,191,36,0.06)", border: "rgba(251,191,36,0.35)" },
];

export function CareersContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredCulture, setHoveredCulture] = useState<number | null>(null);
  const [hoveredOpening, setHoveredOpening] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.setProperty("--tilt-x", "0deg");
      e.currentTarget.style.setProperty("--tilt-y", "0deg");
    },
    []
  );

  return (
    <section ref={ref} className="relative px-6 sm:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        {/* Culture Section */}
        <div className="py-24 sm:py-32">
          <div className="v2-divider mb-14 sm:mb-20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 sm:mb-16"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              01 — How We Work
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
              An environment built for focus.
            </h2>
            <div className="mt-5">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-300 group"
              >
                Learn more about Aethon
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAREERS.culture.map((item, i) => {
              const Icon = cultureIcons[i];
              const accent = cultureAccents[i];
              const isHovered = hoveredCulture === i;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                  onMouseEnter={() => setHoveredCulture(i)}
                  onMouseLeave={(e) => {
                    setHoveredCulture(null);
                    handleMouseLeave(e);
                  }}
                  onMouseMove={handleMouseMove}
                  className="v2-spotlight v2-tilt relative rounded-2xl border p-6 transition-all duration-500 ease-out cursor-default"
                  style={{
                    borderColor: isHovered
                      ? accent.border
                      : "var(--border)",
                    boxShadow: isHovered
                      ? `0 0 30px ${accent.bg}, 0 4px 20px rgba(0,0,0,0.3)`
                      : "none",
                    "--spot-color": accent.bg,
                  } as React.CSSProperties}
                >
                  <motion.div
                    animate={
                      isHovered
                        ? { rotate: 8, scale: 1.1 }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.3, ease: EASE }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: accent.bg }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{
                        color: accent.color,
                        filter: isHovered
                          ? `drop-shadow(0 0 10px ${accent.color})`
                          : "none",
                        transition: "filter 0.3s ease",
                      }}
                    />
                  </motion.div>

                  <h3 className="font-heading text-lg font-bold tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-secondary/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="py-24 sm:py-32">
          <div className="v2-divider mb-14 sm:mb-20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 sm:mb-16"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              02 — Open Positions
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
              Join the team.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {CAREERS.openings.map((opening, i) => {
              const isHovered = hoveredOpening === i;
              const openingAccents = [
                { color: "#818cf8", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.35)", spot: "rgba(99,102,241,0.06)" },
                { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.35)", spot: "rgba(34,211,238,0.06)" },
                { color: "#34d399", bg: "rgba(52,211,153,0.07)", border: "rgba(52,211,153,0.35)", spot: "rgba(52,211,153,0.06)" },
              ];
              const accent = openingAccents[i % openingAccents.length];

              return (
                <motion.div
                  key={opening.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: EASE,
                  }}
                  onMouseEnter={() => setHoveredOpening(i)}
                  onMouseLeave={(e) => {
                    setHoveredOpening(null);
                    handleMouseLeave(e);
                  }}
                  onMouseMove={handleMouseMove}
                  className="v2-spotlight v2-tilt relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 ease-out cursor-default"
                  style={{
                    borderColor: isHovered
                      ? accent.border
                      : "var(--border)",
                    boxShadow: isHovered
                      ? `0 0 30px ${accent.spot}, 0 4px 20px rgba(0,0,0,0.2)`
                      : "none",
                    "--spot-color": accent.spot,
                  } as React.CSSProperties}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-5 flex-1">
                      <motion.div
                        animate={
                          isHovered
                            ? { rotate: 8, scale: 1.1 }
                            : { rotate: 0, scale: 1 }
                        }
                        transition={{ duration: 0.3, ease: EASE }}
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: accent.bg }}
                      >
                        <Briefcase
                          className="w-5 h-5 transition-all duration-300"
                          style={{
                            color: accent.color,
                            filter: isHovered
                              ? `drop-shadow(0 0 10px ${accent.color})`
                              : "none",
                          }}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold tracking-tight mb-1">
                          {opening.title}
                        </h3>
                        <p className="text-xs font-semibold mb-3" style={{ color: isHovered ? accent.color : "rgba(99,102,241,0.8)" }}>
                          {opening.type}
                        </p>
                        <p className="text-secondary/50 text-sm leading-relaxed max-w-xl">
                          {opening.description}
                        </p>
                      </div>
                    </div>

                    <JobApplicationModal jobTitle={opening.title} jobType={opening.type}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="self-start sm:self-center flex-shrink-0 group"
                      >
                        Apply
                        <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </JobApplicationModal>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
