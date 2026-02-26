"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { TextRandomized } from "@/components/ui/text-randomized";
import { PRODUCTS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-end overflow-hidden px-6 sm:px-8 lg:px-16 xl:px-24 pb-20 sm:pb-28 pt-32 sm:pt-40"
    >
      {/* Parallax background */}
      <div className="absolute inset-0">
        <motion.div style={{ y: bgY }} className="absolute inset-[-20%]">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            top: "10%",
            left: "60%",
            background: "var(--accent)",
            opacity: 0.06,
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            bottom: "20%",
            left: "10%",
            background: "var(--accent-cyan)",
            opacity: 0.04,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-semibold block mb-6"
        >
          <TextRandomized text={PRODUCTS.sectionLabel} />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[1.02] mb-8 max-w-4xl text-foreground"
        >
          {PRODUCTS.headline}
        </motion.h1>

        <div className="space-y-2 mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="h-[2px] w-20 sm:w-28 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-accent-cyan/40 to-transparent origin-left"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-foreground/50 text-lg sm:text-xl max-w-2xl leading-relaxed"
        >
          {PRODUCTS.body}
        </motion.p>
      </div>
    </section>
  );
}
