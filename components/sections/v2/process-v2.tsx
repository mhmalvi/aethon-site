"use client";

import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Search, PenTool, Wrench, Rocket, TrendingUp } from "lucide-react";
import { HOW_WE_WORK } from "@/lib/constants";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const icons = [Search, PenTool, Wrench, Rocket, TrendingUp];
const EASE = [0.16, 1, 0.3, 1] as const;
const AUTO_CYCLE_INTERVAL = 3500; // ms per phase

const nodeAccents = [
  {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.12)",
    glow: "rgba(99,102,241,0.20)",
    glowStrong: "rgba(99,102,241,0.35)",
  },
  {
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.12)",
    glow: "rgba(34,211,238,0.20)",
    glowStrong: "rgba(34,211,238,0.35)",
  },
  {
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    glow: "rgba(167,139,250,0.20)",
    glowStrong: "rgba(167,139,250,0.35)",
  },
  {
    color: "#f97316",
    bg: "rgba(249,115,22,0.10)",
    glow: "rgba(249,115,22,0.18)",
    glowStrong: "rgba(249,115,22,0.30)",
  },
  {
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    glow: "rgba(52,211,153,0.20)",
    glowStrong: "rgba(52,211,153,0.35)",
  },
];

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    isCenter?: boolean;
    isActive?: boolean;
    isPast?: boolean;
    accentColor?: string;
    onClick?: () => void;
  }
>(({ className, children, isCenter, isActive, isPast, accentColor, onClick }, ref) => {
  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border-2 bg-surface shadow-lg transition-colors duration-500",
        isCenter
          ? "h-20 w-20 sm:h-24 sm:w-24 border-accent/40"
          : "h-14 w-14 sm:h-16 sm:w-16 cursor-pointer",
        className
      )}
      animate={{
        borderColor: isActive && accentColor
          ? accentColor
          : isPast && accentColor
            ? `${accentColor}60`
            : isCenter
              ? "rgba(99,102,241,0.4)"
              : "var(--border-light)",
        boxShadow: isActive
          ? `0 0 30px ${accentColor || "rgba(99,102,241,0.2)"}, 0 0 60px ${accentColor || "rgba(99,102,241,0.1)"}`
          : isCenter
            ? "0 0 40px rgba(99,102,241,0.15)"
            : "none",
        scale: isActive ? 1.15 : 1,
      }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}

      {/* Pulse rings on active node */}
      {isActive && !isCenter && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${accentColor}` }}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${accentColor}` }}
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
        </>
      )}
    </motion.div>
  );
});
Circle.displayName = "Circle";

export function ProcessV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activePhase, setActivePhase] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Refs for beam endpoints
  const centerRef = useRef<HTMLDivElement>(null);
  const nodeRef0 = useRef<HTMLDivElement>(null);
  const nodeRef1 = useRef<HTMLDivElement>(null);
  const nodeRef2 = useRef<HTMLDivElement>(null);
  const nodeRef3 = useRef<HTMLDivElement>(null);
  const nodeRef4 = useRef<HTMLDivElement>(null);
  const nodeRefs = [nodeRef0, nodeRef1, nodeRef2, nodeRef3, nodeRef4];

  // Auto-cycle through phases
  useEffect(() => {
    if (!isInView || isPaused) return;

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 5);
    }, AUTO_CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  // Click on a node to jump to that phase (and briefly pause)
  const handleNodeClick = useCallback((index: number) => {
    setActivePhase(index);
    setIsPaused(true);
    // Resume auto-cycle after a longer pause
    setTimeout(() => setIsPaused(false), AUTO_CYCLE_INTERVAL * 2);
  }, []);

  const accent = nodeAccents[activePhase];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* Animated divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(50% 50% at 50% 55%, ${accent.glow} 0%, transparent 70%)`,
        }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            05 — {HOW_WE_WORK.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            {HOW_WE_WORK.headline}
          </h2>
          <p className="text-secondary/70 text-base sm:text-lg mt-4 max-w-md leading-relaxed">
            {HOW_WE_WORK.subtext}
          </p>
        </motion.div>

        {/* Desktop: Beam diagram */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              ref={containerRef}
              className="relative w-full mx-auto"
              style={{ minHeight: 420 }}
            >
              {/* Row 1: Discover & Architect */}
              <div className="flex justify-around items-center mb-0" style={{ paddingBottom: 0 }}>
                <div className="flex flex-col items-center" style={{ marginLeft: "15%" }}>
                  <Circle
                    ref={nodeRefs[0]}
                    isActive={activePhase === 0}
                    isPast={activePhase > 0}
                    accentColor={nodeAccents[0].color}
                    onClick={() => handleNodeClick(0)}
                  >
                    <Search
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500"
                      style={{
                        color: activePhase === 0 ? nodeAccents[0].color : activePhase > 0 ? `${nodeAccents[0].color}` : "rgba(138,148,166,0.7)",
                        opacity: activePhase === 0 ? 1 : activePhase > 0 ? 0.6 : 0.35,
                        filter: activePhase === 0 ? `drop-shadow(0 0 8px ${nodeAccents[0].color})` : "none",
                      }}
                    />
                  </Circle>
                  <motion.span
                    className="font-heading text-sm font-bold mt-3 tracking-wide"
                    animate={{
                      color: activePhase === 0 ? nodeAccents[0].color : "var(--secondary)",
                      opacity: activePhase === 0 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    Discover
                  </motion.span>
                </div>
                <div className="flex flex-col items-center" style={{ marginRight: "15%" }}>
                  <Circle
                    ref={nodeRefs[1]}
                    isActive={activePhase === 1}
                    isPast={activePhase > 1}
                    accentColor={nodeAccents[1].color}
                    onClick={() => handleNodeClick(1)}
                  >
                    <PenTool
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500"
                      style={{
                        color: activePhase === 1 ? nodeAccents[1].color : activePhase > 1 ? nodeAccents[1].color : "rgba(138,148,166,0.7)",
                        opacity: activePhase === 1 ? 1 : activePhase > 1 ? 0.6 : 0.35,
                        filter: activePhase === 1 ? `drop-shadow(0 0 8px ${nodeAccents[1].color})` : "none",
                      }}
                    />
                  </Circle>
                  <motion.span
                    className="font-heading text-sm font-bold mt-3 tracking-wide"
                    animate={{
                      color: activePhase === 1 ? nodeAccents[1].color : "var(--secondary)",
                      opacity: activePhase === 1 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    Architect
                  </motion.span>
                </div>
              </div>

              {/* Row 2: Engineer (left), AETHON (center), Deploy (right) */}
              <div className="flex justify-between items-center my-8">
                <div className="flex flex-col items-center" style={{ marginLeft: "5%" }}>
                  <Circle
                    ref={nodeRefs[2]}
                    isActive={activePhase === 2}
                    isPast={activePhase > 2}
                    accentColor={nodeAccents[2].color}
                    onClick={() => handleNodeClick(2)}
                  >
                    <Wrench
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500"
                      style={{
                        color: activePhase === 2 ? nodeAccents[2].color : activePhase > 2 ? nodeAccents[2].color : "rgba(138,148,166,0.7)",
                        opacity: activePhase === 2 ? 1 : activePhase > 2 ? 0.6 : 0.35,
                        filter: activePhase === 2 ? `drop-shadow(0 0 8px ${nodeAccents[2].color})` : "none",
                      }}
                    />
                  </Circle>
                  <motion.span
                    className="font-heading text-sm font-bold mt-3 tracking-wide"
                    animate={{
                      color: activePhase === 2 ? nodeAccents[2].color : "var(--secondary)",
                      opacity: activePhase === 2 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    Engineer
                  </motion.span>
                </div>

                {/* Center hub */}
                <Circle ref={centerRef} isCenter>
                  <div className="flex flex-col items-center">
                    <img
                      src="/aethon-icon.png"
                      alt="Aethon"
                      className="h-10 sm:h-12 w-auto dark:invert"
                    />
                  </div>
                </Circle>

                <div className="flex flex-col items-center" style={{ marginRight: "5%" }}>
                  <Circle
                    ref={nodeRefs[3]}
                    isActive={activePhase === 3}
                    isPast={activePhase > 3}
                    accentColor={nodeAccents[3].color}
                    onClick={() => handleNodeClick(3)}
                  >
                    <Rocket
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500"
                      style={{
                        color: activePhase === 3 ? nodeAccents[3].color : activePhase > 3 ? nodeAccents[3].color : "rgba(138,148,166,0.7)",
                        opacity: activePhase === 3 ? 1 : activePhase > 3 ? 0.6 : 0.35,
                        filter: activePhase === 3 ? `drop-shadow(0 0 8px ${nodeAccents[3].color})` : "none",
                      }}
                    />
                  </Circle>
                  <motion.span
                    className="font-heading text-sm font-bold mt-3 tracking-wide"
                    animate={{
                      color: activePhase === 3 ? nodeAccents[3].color : "var(--secondary)",
                      opacity: activePhase === 3 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    Deploy
                  </motion.span>
                </div>
              </div>

              {/* Row 3: Evolve (centered bottom) */}
              <div className="flex justify-center items-center mt-0">
                <div className="flex flex-col items-center">
                  <Circle
                    ref={nodeRefs[4]}
                    isActive={activePhase === 4}
                    isPast={false}
                    accentColor={nodeAccents[4].color}
                    onClick={() => handleNodeClick(4)}
                  >
                    <TrendingUp
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500"
                      style={{
                        color: activePhase === 4 ? nodeAccents[4].color : "rgba(138,148,166,0.7)",
                        opacity: activePhase === 4 ? 1 : 0.35,
                        filter: activePhase === 4 ? `drop-shadow(0 0 8px ${nodeAccents[4].color})` : "none",
                      }}
                    />
                  </Circle>
                  <motion.span
                    className="font-heading text-sm font-bold mt-3 tracking-wide"
                    animate={{
                      color: activePhase === 4 ? nodeAccents[4].color : "var(--secondary)",
                      opacity: activePhase === 4 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    Evolve
                  </motion.span>
                </div>
              </div>

              {/* Animated beams from center to each node */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={nodeRefs[0]}
                curvature={40}
                dotted
                gradientStartColor="#6366f1"
                gradientStopColor="#22d3ee"
                duration={5}
                delay={0.2}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={nodeRefs[1]}
                curvature={40}
                dotted
                reverse
                gradientStartColor="#22d3ee"
                gradientStopColor="#6366f1"
                duration={5.5}
                delay={0.5}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={nodeRefs[2]}
                curvature={-20}
                dotted
                gradientStartColor="#6366f1"
                gradientStopColor="#a78bfa"
                duration={4.5}
                delay={0.8}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={nodeRefs[3]}
                curvature={-20}
                dotted
                reverse
                gradientStartColor="#f97316"
                gradientStopColor="#6366f1"
                duration={5}
                delay={1.1}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={centerRef}
                toRef={nodeRefs[4]}
                curvature={-50}
                dotted
                gradientStartColor="#6366f1"
                gradientStopColor="#34d399"
                duration={6}
                delay={1.4}
              />
            </div>
          </motion.div>

          {/* Phase detail panel — centered, premium glass card */}
          <div className="mt-14 min-h-[200px] flex flex-col items-center">
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {HOW_WE_WORK.phases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleNodeClick(i)}
                  className="relative group"
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: i === activePhase ? 32 : 8,
                      height: 8,
                      backgroundColor:
                        i === activePhase
                          ? nodeAccents[i].color
                          : i < activePhase
                            ? `${nodeAccents[i].color}`
                            : "var(--border-light)",
                      opacity: i === activePhase ? 1 : i < activePhase ? 0.5 : 0.3,
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                  {/* Timer bar inside active dot */}
                  {i === activePhase && !isPaused && (
                    <motion.div
                      className="absolute inset-0 rounded-full origin-left"
                      style={{
                        backgroundColor: nodeAccents[i].color,
                        filter: "brightness(1.3)",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: AUTO_CYCLE_INTERVAL / 1000,
                        ease: "linear",
                      }}
                      key={`timer-${activePhase}-${Date.now()}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.97 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative w-full max-w-[640px] rounded-2xl border overflow-hidden"
                style={{
                  borderColor: `${accent.color}20`,
                  boxShadow: `0 0 60px ${accent.glow}, 0 4px 32px rgba(0,0,0,0.12)`,
                }}
              >
                {/* Glass background */}
                <div className="absolute inset-0 bg-surface-subtle backdrop-blur-2xl" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(ellipse at 30% 40%, ${accent.bg} 0%, transparent 55%)`,
                  }}
                />

                {/* Decorative phase number */}
                <div className="absolute -right-2 -top-6 pointer-events-none select-none overflow-hidden">
                  <span
                    className="font-heading text-[10rem] font-black leading-none block"
                    style={{ color: accent.color, opacity: 0.04 }}
                  >
                    0{HOW_WE_WORK.phases[activePhase].number}
                  </span>
                </div>

                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent 5%, ${accent.color} 50%, transparent 95%)`,
                    opacity: 0.5,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                />

                {/* Content — centered layout */}
                <div className="relative z-10 py-10 px-10 sm:px-12 text-center">
                  {/* Phase badge + subtitle */}
                  <motion.div
                    className="inline-flex items-center gap-2.5 mb-6"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 }}
                  >
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase font-bold px-3.5 py-1 rounded-full border"
                      style={{
                        background: accent.bg,
                        color: accent.color,
                        borderColor: `${accent.color}25`,
                      }}
                    >
                      Phase 0{HOW_WE_WORK.phases[activePhase].number}
                    </span>
                    <span
                      className="text-[11px] font-semibold tracking-wide"
                      style={{ color: accent.color }}
                    >
                      {HOW_WE_WORK.phases[activePhase].subtitle}
                    </span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="mx-auto w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: accent.bg }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                  >
                    {(() => {
                      const Icon = icons[activePhase];
                      return (
                        <Icon
                          className="w-6 h-6"
                          style={{
                            color: accent.color,
                            filter: `drop-shadow(0 0 10px ${accent.color})`,
                          }}
                        />
                      );
                    })()}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-2.5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                  >
                    {HOW_WE_WORK.phases[activePhase].title}
                  </motion.h3>

                  {/* Accent line */}
                  <motion.div
                    className="mx-auto h-[2px] w-12 mb-5 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
                  />

                  {/* Description */}
                  <motion.p
                    className="text-secondary/60 text-[15px] leading-relaxed max-w-md mx-auto"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                  >
                    {HOW_WE_WORK.phases[activePhase].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Vertical layout with connecting lines */}
        <div className="lg:hidden relative">
          <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent/30 via-accent-cyan/20 to-transparent" />

          <div className="space-y-10">
            {HOW_WE_WORK.phases.map((phase, i) => {
              const Icon = icons[i];
              const isActive = i === activePhase;
              return (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex gap-6 items-start"
                >
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 bg-surface flex items-center justify-center flex-shrink-0 relative z-10"
                    animate={{
                      borderColor: isActive ? nodeAccents[i].color : `${nodeAccents[i].color}40`,
                      boxShadow: isActive ? `0 0 20px ${nodeAccents[i].glow}` : "none",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon
                      className="w-4 h-4 transition-all duration-300"
                      style={{
                        color: nodeAccents[i].color,
                        filter: isActive ? `drop-shadow(0 0 6px ${nodeAccents[i].color})` : "none",
                      }}
                    />

                    {/* Mobile pulse ring */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: `2px solid ${nodeAccents[i].color}` }}
                        initial={{ opacity: 0.5, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.6 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>

                  <div className="pt-1 flex-1">
                    <span className="font-heading text-[10px] font-bold text-secondary/35 tracking-[0.2em] uppercase mb-1.5 block">
                      Phase 0{phase.number}
                    </span>
                    <h3 className="font-heading text-lg font-bold tracking-tight mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-[11px] font-semibold mb-2" style={{ color: nodeAccents[i].color }}>
                      {phase.subtitle}
                    </p>
                    <p className="text-sm text-secondary/60 leading-relaxed">
                      {phase.description}
                    </p>
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
