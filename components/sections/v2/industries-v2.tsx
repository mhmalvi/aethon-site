"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function IndustriesV2() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="industries"
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      {/* Animated divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            06 — {INDUSTRIES.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            {INDUSTRIES.headline}
          </h2>
          <div className="mt-6">
            <Button variant="outline" size="default" className="group" asChild>
              <Link href="/solutions">
                View our solutions
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Accordion */}
        <div className="border-t border-border/80">
          {INDUSTRIES.items.map((industry, i) => {
            const isOpen = expanded === industry.id;

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.04 }}
                className={`border-b border-border/80 transition-all duration-300 ${
                  isOpen
                    ? "bg-accent/[0.02] border-l-2 border-l-accent/40"
                    : "border-l-2 border-l-transparent"
                }`}
                onMouseEnter={() => setExpanded(industry.id)}
                onMouseLeave={() => setExpanded(null)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onFocus={() => setExpanded(industry.id)}
                  onBlur={() => setExpanded(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpanded(isOpen ? null : industry.id);
                    }
                  }}
                  className="w-full flex items-center gap-4 sm:gap-6 lg:gap-10 py-6 sm:py-8 text-left group cursor-default"
                >
                  {/* Number */}
                  <span className="font-heading text-sm font-bold text-secondary/45 w-8 flex-shrink-0 tracking-widest transition-colors duration-300 group-hover:text-accent/50">
                    0{i + 1}
                  </span>

                  {/* Label */}
                  <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex-1 transition-colors duration-300 group-hover:text-accent">
                    {industry.label}
                  </span>

                  {/* Short description */}
                  <span className="hidden md:block text-sm text-secondary/50 flex-shrink-0 max-w-[220px] text-right leading-snug">
                    {industry.description}
                  </span>

                  {/* Toggle */}
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "border-accent/50 bg-accent/10"
                        : "border-border/80 group-hover:border-accent/40 group-hover:bg-accent/5"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <Plus
                        className={`w-4 h-4 transition-colors duration-300 ${
                          isOpen ? "text-accent" : "text-secondary/50"
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: EASE },
                        opacity: { duration: 0.3, delay: 0.1 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 sm:pb-10 pl-12 sm:pl-14 lg:pl-[72px] pr-8 sm:pr-14">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                          {/* Accent line + text */}
                          <div className="flex-1">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: EASE,
                              }}
                              className="h-[2px] w-12 mb-4 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left"
                            />
                            <p className="text-secondary/70 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                              {industry.longDescription}
                            </p>
                          </div>
                          {/* Image — animated entrance */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.92, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.15,
                              ease: EASE,
                            }}
                            className="flex-shrink-0 w-full md:w-72 lg:w-80"
                          >
                            <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-border shadow-lg shadow-black/10 group/img">
                              <img
                                src={industry.imageUrl}
                                alt={industry.label}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.05]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
