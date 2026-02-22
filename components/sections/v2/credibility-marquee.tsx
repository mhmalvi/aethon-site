"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Marquee } from "@/components/ui/marquee";
import { CREDIBILITY } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-surface-subtle backdrop-blur-sm select-none">
      {/* Abstract logo mark */}
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/20 to-accent-cyan/10 flex items-center justify-center flex-shrink-0">
        <span className="font-heading text-[10px] font-bold text-accent/80">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <span className="text-sm font-medium text-secondary/55 whitespace-nowrap tracking-wide">
        {name}
      </span>
    </div>
  );
}

export function CredibilityMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-12 sm:py-16 overflow-hidden">
      {/* Trust line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-center text-[11px] tracking-[0.2em] uppercase text-secondary/45 font-semibold mb-8 sm:mb-10 px-6"
      >
        {CREDIBILITY.trustLine}
      </motion.p>

      {/* Marquee with gradient edge masks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
          {CREDIBILITY.logos.map((name) => (
            <LogoItem key={name} name={name} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
