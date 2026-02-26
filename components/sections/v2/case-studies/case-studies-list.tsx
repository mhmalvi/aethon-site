"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { CASE_STUDIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudiesList() {
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
      const tiltX = ((y - 50) / 50) * -2;
      const tiltY = ((x - 50) / 50) * 2;
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
      className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            01 — Engagements
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight max-w-xl">
              Real problems. Engineered solutions.
            </h2>
            <ConsultationModal>
              <Button variant="gradient" size="default" className="group self-start">
                Start your project
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </ConsultationModal>
          </div>
        </motion.div>

        <div className="space-y-8">
        {CASE_STUDIES.studies.map((study, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: EASE,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={(e) => {
                setHoveredIndex(null);
                handleMouseLeave(e);
              }}
              onMouseMove={handleMouseMove}
              className="v2-spotlight v2-tilt relative rounded-2xl border overflow-hidden transition-all duration-500 ease-out"
              style={{
                borderColor: isHovered
                  ? "rgba(99,102,241,0.3)"
                  : "var(--border)",
                boxShadow: isHovered
                  ? "0 0 40px rgba(99,102,241,0.06), 0 8px 32px rgba(0,0,0,0.3)"
                  : "none",
                "--spot-color": "rgba(99,102,241,0.06)",
              } as React.CSSProperties}
            >
              <Link href={`/case-studies/${study.id}`} className="block">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="font-heading text-5xl sm:text-6xl font-bold gradient-text-accent leading-none">
                        {study.metric}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <span className="text-xs tracking-[0.15em] uppercase text-accent font-bold mb-4 block">
                      {study.industry}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                      {study.title}
                    </h3>
                    <p className="text-secondary/60 text-sm leading-relaxed mb-6">
                      {study.problem}
                    </p>

                    <div className="flex items-end justify-between gap-6">
                      <div className="flex gap-8">
                        <div>
                          <span className="block font-heading text-2xl font-bold gradient-text-accent">
                            {study.metric}
                          </span>
                          <span className="text-xs text-secondary/55 tracking-wide">
                            {study.metricLabel}
                          </span>
                        </div>
                        <div>
                          <span className="block font-heading text-2xl font-bold text-accent-cyan">
                            {study.secondaryMetric}
                          </span>
                          <span className="text-xs text-secondary/55 tracking-wide">
                            {study.secondaryLabel}
                          </span>
                        </div>
                      </div>
                      <span
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent/70 hover:text-accent transition-colors duration-300 flex-shrink-0 group/link"
                      >
                        View case study
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
