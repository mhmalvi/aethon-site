"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { FINAL_CTA } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CtaV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Background parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Magnetic button
  const [magStyle, setMagStyle] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);

  const handleBtnMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMagStyle({
        x: (e.clientX - cx) * 0.15,
        y: (e.clientY - cy) * 0.15,
      });
    },
    []
  );

  const handleBtnMouseLeave = useCallback(() => {
    setMagStyle({ x: 0, y: 0 });
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-36 sm:py-44 md:py-52 lg:py-56 px-6 sm:px-8 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* Background image — parallax + lighter treatment */}
      <div className="absolute inset-0">
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%]">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/65 to-background/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" />

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            background: "var(--accent)",
            opacity: 0.08,
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            top: "30%",
            right: "10%",
            background: "var(--accent-cyan)",
            opacity: 0.05,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex-1"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-semibold block mb-6"
          >
            09 — Get Started
          </motion.span>

          {/* Headline */}
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[1.02] mb-6 max-w-3xl text-foreground">
            {FINAL_CTA.headline}
          </h2>

          {/* Animated accent lines */}
          <div className="space-y-2 mb-7">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="h-[2px] w-20 sm:w-28 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-accent-cyan/40 to-transparent origin-left"
            />
          </div>

          <p className="text-foreground/50 text-base sm:text-lg max-w-lg leading-relaxed mb-10 sm:mb-12">
            {FINAL_CTA.subtext}
          </p>

          {/* CTA — magnetic */}
          <ConsultationModal>
            <div
              ref={btnRef}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="inline-block"
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
                {FINAL_CTA.cta}
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </ConsultationModal>
        </motion.div>

        {/* Accent image — with hover and correct positioning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="hidden lg:block flex-shrink-0 w-72 xl:w-80"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-border shadow-xl shadow-black/20 group">
            <Image
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=670&fit=crop"
              alt="AI systems"
              fill
              className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
