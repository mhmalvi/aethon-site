"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TextRandomized } from "@/components/ui/text-randomized";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { HERO } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const headlineLines = [
  { text: "We engineer", className: "font-normal text-foreground/60" },
  { text: "the systems", className: "font-bold gradient-text-accent" },
  { text: "that power", className: "font-normal text-foreground/60" },
  { text: "your business.", className: "font-bold text-foreground" },
];

export function HeroV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Parallax for floating images
  const { scrollY } = useScroll();
  const floatY1 = useTransform(scrollY, [0, 600], [0, -50]);
  const floatY2 = useTransform(scrollY, [0, 600], [0, -30]);
  const floatY3 = useTransform(scrollY, [0, 600], [0, -70]);
  const meshRotate = useTransform(scrollY, [0, 800], [0, 15]);

  // Magnetic button effect
  const [magStyle, setMagStyle] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);

  const handleBtnMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setMagStyle({ x: dx * 0.15, y: dy * 0.15 });
    },
    []
  );

  const handleBtnMouseLeave = useCallback(() => {
    setMagStyle({ x: 0, y: 0 });
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Gradient mesh — boosted opacity + scroll rotation ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ rotate: meshRotate }}
      >
        <div
          className="absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            top: "0%",
            right: "-10%",
            background: "var(--accent)",
            opacity: 0.12,
            filter: "blur(120px)",
            animation: "v2-mesh-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full"
          style={{
            top: "40%",
            left: "0%",
            background: "var(--accent-cyan)",
            opacity: 0.08,
            filter: "blur(100px)",
            animation: "v2-mesh-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[30vw] h-[30vw] max-w-[420px] max-h-[420px] rounded-full"
          style={{
            bottom: "5%",
            right: "15%",
            background: "var(--accent)",
            opacity: 0.06,
            filter: "blur(80px)",
            animation: "v2-mesh-3 18s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" />
      <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-[2]" />

      {/* ── Split layout ── */}
      <div className="relative z-10 grow flex flex-col lg:flex-row items-center max-w-[1440px] mx-auto w-full pt-28 sm:pt-36 pb-8 px-6 sm:px-8 lg:px-16 xl:px-24 gap-8 lg:gap-12">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-10"
          >
            <span className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-secondary/80 font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <TextRandomized text={HERO.badge} triggerOnView={false} />
            </span>
          </motion.div>

          {/* Headline — staggered clip reveal with blur */}
          <h1 className="mb-8 sm:mb-10">
            {headlineLines.map((line, i) => (
              <div key={line.text} className="overflow-hidden">
                <motion.span
                  initial={{ y: "120%", opacity: 0, filter: "blur(8px)" }}
                  animate={
                    isInView
                      ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                      : {}
                  }
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: EASE,
                  }}
                  style={{ display: "block" }}
                  className={`font-heading text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] xl:text-[5.2vw] 2xl:text-[4.5vw] leading-[1.06] tracking-[-0.03em] ${line.className}`}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-base sm:text-lg text-secondary/80 max-w-lg leading-relaxed mb-10"
          >
            {HERO.subtext}
          </motion.p>

          {/* CTAs — magnetic effect on primary */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <ConsultationModal>
              <div
                ref={btnRef}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                style={{
                  transform: `translate(${magStyle.x}px, ${magStyle.y}px)`,
                  transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  className="group"
                >
                  {HERO.ctaPrimary}
                  <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </ConsultationModal>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/#case-studies">{HERO.ctaSecondary}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: Mobile single hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="lg:hidden w-full mt-4"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-border shadow-xl shadow-black/30">
            <Image
              src="/images/hero/analytics-dashboard.webp"
              alt="Data analytics dashboard"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/10" />
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-2xl border border-border-light rounded-xl px-4 py-3">
              <span className="font-heading text-2xl font-bold gradient-text-accent block leading-none">68%</span>
              <span className="text-xs text-foreground/40 mt-1 block tracking-widest uppercase">Faster ops</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Image collage with parallax — desktop */}
        <div className="hidden lg:flex flex-1 items-center justify-end pl-8 xl:pl-16">
          <div className="relative w-full max-w-[500px]">
            {/* Main image with parallax */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.92 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
              style={{ y: floatY1 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-border shadow-2xl shadow-black/40">
                <Image
                  src="/images/hero/analytics-dashboard.webp"
                  alt="Data analytics dashboard"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/5" />
              </div>
            </motion.div>

            {/* Floating card: top-right */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
              style={{ y: floatY2 }}
              className="absolute -top-8 -right-10 xl:-right-14 w-44 xl:w-52"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[3/2] border border-border shadow-xl shadow-black/30">
                <Image
                  src="/images/hero/ai-visualization.webp"
                  alt="AI visualization"
                  fill
                  className="object-cover"
                  sizes="208px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              </div>
            </motion.div>

            {/* Floating card: bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
              style={{ y: floatY3 }}
              className="absolute -bottom-6 -left-10 xl:-left-16 w-48 xl:w-56"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[3/2] border border-border shadow-xl shadow-black/30">
                <Image
                  src="/images/hero/security-infrastructure.webp"
                  alt="Security infrastructure"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              </div>
            </motion.div>

            {/* Glass stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
              className="absolute bottom-14 right-8 xl:right-12 bg-black/50 backdrop-blur-2xl border border-border-light rounded-2xl px-6 py-5 shadow-xl shadow-black/20"
            >
              <span className="font-heading text-3xl font-bold gradient-text-accent block leading-none">
                68%
              </span>
              <span className="text-xs text-foreground/40 mt-1.5 block tracking-widest uppercase">
                Faster ops
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-[0.25em] uppercase text-secondary/45 font-medium">
          Scroll
        </span>
        <ChevronDown
          className="w-4 h-4 text-secondary/45"
          style={{ animation: "v2-scroll-bounce 2s ease-in-out infinite" }}
        />
      </motion.div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 pb-12 sm:pb-16 mt-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
          className="h-px bg-gradient-to-r from-accent/30 via-border-light to-transparent mb-8 origin-left"
        />

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 lg:gap-24">
          {HERO.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.6 + i * 0.12 }}
              className="flex items-baseline gap-3"
            >
              <AnimatedCounter
                value={stat.value}
                className="font-heading text-4xl sm:text-5xl font-bold gradient-text-accent"
              />
              <span className="text-xs text-secondary/60 tracking-wide leading-tight max-w-[130px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
