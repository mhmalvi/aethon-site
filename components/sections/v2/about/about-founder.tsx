"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useInView } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AboutFounder() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

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
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={(e) => {
              setHovered(false);
              handleMouseLeave(e);
            }}
            onMouseMove={handleMouseMove}
            className="v2-spotlight v2-tilt relative rounded-2xl overflow-hidden border border-border aspect-[4/5] max-w-md mx-auto lg:mx-0 transition-all duration-500"
            style={{
              borderColor: hovered
                ? "rgba(99,102,241,0.3)"
                : "var(--border)",
              boxShadow: hovered
                ? "0 0 40px rgba(99,102,241,0.08), 0 8px 32px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(0,0,0,0.2)",
              "--spot-color": "rgba(99,102,241,0.06)",
            } as React.CSSProperties}
          >
            <img
              src="/muhammadhmalvi.png"
              alt="Muhammad H. Malvi — Founder & CEO"
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
              style={{
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="font-heading text-lg font-bold tracking-tight text-foreground">
                Muhammad H. M. Alvi
              </p>
              <p className="text-sm text-secondary/60 mt-1">
                Founder &amp; CEO
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              Leadership
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built on conviction,{" "}
              <span className="gradient-text-accent">not convention.</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="h-[2px] w-16 mb-8 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left"
            />

            <div className="space-y-5 text-secondary/60 text-base leading-relaxed">
              <p>
                Aethon was born from a frustration with how technology gets built
                for businesses — overengineered proposals, underdelivered
                results, and systems that stop working the moment the vendor
                walks away.
              </p>
              <p>
                Muhammad founded Aethon to do it differently: build reliable
                systems, own the outcomes, and treat every client&apos;s
                infrastructure as if it were our own. With a background spanning
                full-stack engineering, automation architecture, and operational
                strategy, he leads a team that ships production-grade systems —
                not slide decks.
              </p>
              <p className="text-foreground/70 font-medium">
                &ldquo;We don&apos;t just build software. We build the systems
                businesses actually run on.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
