"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const blurVal = useTransform(progress, range, [8, 0]);
  const filter = useTransform(blurVal, (v) =>
    v < 0.3 ? "none" : `blur(${v}px)`
  );
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className="inline-block mr-[0.28em] will-change-[opacity,filter,transform]"
    >
      {word}
    </motion.span>
  );
}

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.3"],
  });

  // Scale breathing on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.01]);

  const statement =
    "We don't build tools. We engineer operational capability.";
  const words = statement.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-44 lg:py-52 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      {/* Animated section divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      {/* Decorative giant number */}
      <div className="absolute top-12 sm:top-16 right-6 sm:right-8 lg:right-16 xl:right-24 select-none pointer-events-none">
        <span className="font-heading text-[20vw] sm:text-[16vw] lg:text-[12vw] font-black leading-none text-foreground/[0.02]">
          01
        </span>
      </div>

      {/* Subtle accent glow behind text */}
      <div
        className="absolute top-1/2 left-1/3 w-[40vw] h-[30vw] max-w-[500px] max-h-[400px] rounded-full pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          background: "var(--accent)",
          opacity: 0.04,
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto w-full relative flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Main content */}
        <div className="flex-1">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold mb-14 sm:mb-16 block"
          >
            01 — Philosophy
          </motion.span>

          {/* The statement — scale breathing */}
          <motion.p
            style={{ scale }}
            className="font-heading text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4.2vw] xl:text-[3.5vw] font-bold leading-[1.18] tracking-[-0.025em] max-w-5xl"
          >
            {words.map((word, i) => {
              const start = 0.05 + (i / words.length) * 0.65;
              const end = start + 1 / words.length + 0.06;
              return (
                <Word
                  key={`${word}-${i}`}
                  word={word}
                  range={[start, Math.min(end, 0.95)]}
                  progress={scrollYProgress}
                />
              );
            })}
          </motion.p>

          {/* Multi-line accent underlines */}
          <div className="mt-10 sm:mt-14 space-y-2">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className="h-[2px] w-32 sm:w-48 bg-gradient-to-r from-accent/60 to-accent-cyan/30 origin-left"
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="h-[1px] w-20 sm:w-32 bg-gradient-to-r from-accent-cyan/40 to-transparent origin-left"
            />
          </div>
        </div>

        {/* Decorative side image — visible on large screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="hidden lg:block flex-shrink-0 w-64 xl:w-72"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-border shadow-xl shadow-black/20">
            <Image
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=670&fit=crop"
              alt="Team collaboration"
              fill
              className="object-cover opacity-70"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
