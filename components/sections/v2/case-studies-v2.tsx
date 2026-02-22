"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Separate component so useTransform is called at the component level
 * (not inside a .map() callback which violates Rules of Hooks).
 */
function KineticText({
  scrollYProgress,
  rangeStart,
  rangeEnd,
  text,
}: {
  scrollYProgress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  text: string;
}) {
  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [100, -100]);

  return (
    <motion.div
      className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none"
      style={{ y }}
    >
      <span className="font-heading text-[8vw] lg:text-[6vw] font-bold text-foreground/[0.03] whitespace-nowrap leading-none">
        {text}
      </span>
    </motion.div>
  );
}

function CaseStudyPanel({
  study,
  index,
  scrollYProgress,
  studyCount,
}: {
  study: (typeof CASE_STUDIES.studies)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  studyCount: number;
}) {
  return (
    <div className="flex-shrink-0 w-full h-full">
      <div className="relative h-full rounded-2xl overflow-hidden border border-border group">
        {/* Background image */}
        <img
          src={study.image}
          alt={study.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Kinetic typography — industry name */}
        <KineticText
          scrollYProgress={scrollYProgress}
          rangeStart={index / studyCount}
          rangeEnd={(index + 1) / studyCount}
          text={study.industry}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-10 lg:p-14 max-w-2xl">
          <span className="inline-block text-xs tracking-[0.15em] uppercase text-accent font-bold mb-4">
            {study.industry}
          </span>

          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
            {study.title}
          </h3>

          <div className="h-[2px] w-16 sm:w-20 mb-5 bg-gradient-to-r from-accent/60 to-accent-cyan/40" />

          <p className="text-secondary/70 text-[15px] leading-relaxed mb-8 max-w-md">
            {study.problem}
          </p>

          {/* Metrics row */}
          <div className="flex items-end gap-8 sm:gap-12 mb-8">
            <div>
              <span className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text-accent leading-none block">
                {study.metric}
              </span>
              <p className="text-[11px] text-foreground/50 mt-2 tracking-wider uppercase font-medium">
                {study.metricLabel}
              </p>
            </div>
            <div className="pb-2 pl-6 border-l border-border">
              <span className="font-heading text-2xl sm:text-3xl font-bold text-foreground/80 block">
                {study.secondaryMetric}
              </span>
              <span className="text-xs text-secondary/50 tracking-wide">
                {study.secondaryLabel}
              </span>
            </div>
          </div>

          <Button variant="outline" size="sm" className="group" asChild>
            <Link href={`/case-studies/${study.id}`}>
              View case study
              <ArrowRight className="ml-1.5 size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const studyCount = CASE_STUDIES.studies.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal translate
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["0%", `-${(studyCount - 1) * 100}%`]
  );

  // Track progress for active indicator
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, studyCount - 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    setActiveIndex(Math.round(latest));
  });

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative"
      style={{ height: `${studyCount * 100}vh` }}
    >
      {/* Animated divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header */}
        <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-[1440px] mx-auto">
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-3">
              03 — {CASE_STUDIES.sectionLabel}
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-12">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
                {CASE_STUDIES.headline}
              </h2>
              <div className="flex items-center gap-6">
                <p className="text-secondary/70 text-sm max-w-sm leading-relaxed">
                  {CASE_STUDIES.subtext}
                </p>
                <Link
                  href="/case-studies"
                  className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-300 flex-shrink-0 group"
                >
                  View all
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll area */}
        <div className="flex-1 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-[1440px] mx-auto h-full relative">
            <motion.div
              className="flex h-full gap-6 lg:gap-8"
              style={{ x }}
            >
              {CASE_STUDIES.studies.map((study, i) => (
                <CaseStudyPanel
                  key={study.title}
                  study={study}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  studyCount={studyCount}
                />
              ))}
            </motion.div>

            {/* Progress indicator */}
            <div className="absolute bottom-6 right-0 flex items-center gap-3">
              {CASE_STUDIES.studies.map((_, i) => (
                <div
                  key={i}
                  className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                  style={{ width: activeIndex === i ? 40 : 16 }}
                >
                  <div className="absolute inset-0 bg-foreground/10 rounded-full" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                    initial={false}
                    animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              ))}
              <span className="text-[11px] text-foreground/50 font-mono ml-2">
                {String(activeIndex + 1).padStart(2, "0")}/{String(studyCount).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
