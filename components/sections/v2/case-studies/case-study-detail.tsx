"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextRandomized } from "@/components/ui/text-randomized";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { CASE_STUDIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const studyAccents = [
  { color: "#818cf8", bg: "rgba(99,102,241,0.10)", glow: "rgba(99,102,241,0.18)" },
  { color: "#22d3ee", bg: "rgba(34,211,238,0.10)", glow: "rgba(34,211,238,0.18)" },
  { color: "#34d399", bg: "rgba(52,211,153,0.10)", glow: "rgba(52,211,153,0.18)" },
];

export function CaseStudyDetailHero({ studyIndex }: { studyIndex: number }) {
  const study = CASE_STUDIES.studies[studyIndex];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const accent = studyAccents[studyIndex % studyAccents.length];

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-end overflow-hidden px-6 sm:px-8 lg:px-16 xl:px-24 pb-20 sm:pb-28 pt-32 sm:pt-40"
    >
      {/* Parallax background */}
      <div className="absolute inset-0">
        <motion.div style={{ y: bgY }} className="absolute inset-[-20%]">
          <Image
            src={study.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
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
            background: accent.color,
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
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/50 hover:text-foreground/60 transition-colors duration-200"
          >
            <ArrowLeft className="w-3 h-3" />
            All Case Studies
          </Link>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-semibold block mb-6"
        >
          <TextRandomized text={study.industry} />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6 max-w-4xl text-foreground"
        >
          {study.title}
        </motion.h1>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-end gap-8 sm:gap-12 mb-8"
        >
          <div>
            <span
              className="font-heading text-5xl sm:text-6xl font-bold leading-none block"
              style={{ color: accent.color }}
            >
              {study.metric}
            </span>
            <span className="text-xs text-secondary/50 uppercase tracking-wider font-medium mt-1 block">
              {study.metricLabel}
            </span>
          </div>
          <div className="pb-1 pl-6 border-l border-border/60">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-foreground/80 block">
              {study.secondaryMetric}
            </span>
            <span className="text-xs text-secondary/50 tracking-wide">
              {study.secondaryLabel}
            </span>
          </div>
        </motion.div>

        <div className="space-y-2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="h-[2px] w-20 sm:w-28 origin-left"
            style={{
              background: `linear-gradient(90deg, ${accent.color}99, transparent)`,
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

export function CaseStudyDetailContent({ studyIndex }: { studyIndex: number }) {
  const study = CASE_STUDIES.studies[studyIndex];
  const accent = studyAccents[studyIndex % studyAccents.length];
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
              {/* Challenge */}
              <div className="mb-12">
                <h2 className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary/45 mb-4">
                  The Challenge
                </h2>
                <p className="text-secondary/70 text-base sm:text-lg leading-relaxed">
                  {study.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-12">
                <h2 className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary/45 mb-4">
                  Our Solution
                </h2>
                <p className="text-secondary/70 text-base sm:text-lg leading-relaxed">
                  {study.solution}
                </p>
              </div>

              {/* Approach */}
              <div className="mb-12">
                <h2 className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary/45 mb-6">
                  Approach
                </h2>
                <ul className="space-y-4">
                  {study.approach.map((step, i) => (
                    <motion.li
                      key={step}
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
                      <span className="text-secondary/70 text-[15px]">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="mb-12">
                <h2 className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary/45 mb-6">
                  Results
                </h2>
                <ul className="space-y-4">
                  {study.results.map((result, i) => (
                    <motion.li
                      key={result}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex items-start gap-3.5"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: accent.bg }}
                      >
                        <TrendingUp
                          className="w-3.5 h-3.5"
                          style={{ color: accent.color }}
                        />
                      </div>
                      <span className="text-secondary/70 text-[15px]">{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <ConsultationModal>
                  <Button variant="gradient" size="default" className="group">
                    Discuss your project
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </ConsultationModal>
                <Button variant="outline" size="default" className="group" asChild>
                  <Link href="/case-studies">
                    View all case studies
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2">
            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="rounded-2xl border border-border p-8 mb-6"
              style={{
                background: `linear-gradient(135deg, ${accent.bg}, transparent)`,
              }}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/55 mb-5">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border"
                    style={{
                      borderColor: `${accent.color}33`,
                      color: accent.color,
                      background: accent.bg,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="relative rounded-2xl overflow-hidden border border-border aspect-[4/3]"
            >
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>

            {/* Other case studies nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-6 rounded-2xl border border-border p-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/55 mb-4">
                Other Case Studies
              </h3>
              <nav className="space-y-2">
                {CASE_STUDIES.studies.map((s, i) => {
                  if (i === studyIndex) return null;
                  return (
                    <Link
                      key={s.id}
                      href={`/case-studies/${s.id}`}
                      className="flex items-center gap-3 py-2 text-sm text-secondary/60 hover:text-foreground transition-colors duration-200 group/link"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-secondary/45 group-hover/link:text-accent transition-colors duration-200" />
                      {s.title}
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
