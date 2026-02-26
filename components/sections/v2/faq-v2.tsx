"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { FAQ } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Animated divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 xl:gap-28">
          {/* Left: Header (sticky on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              08 — {FAQ.sectionLabel}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {FAQ.headline}
            </h2>
            <p className="text-secondary/50 text-sm mt-5 leading-relaxed max-w-xs">
              Everything you need to know about working with us.
            </p>

            {/* Decorative image for FAQ sidebar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="hidden lg:block mt-10"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-border shadow-lg shadow-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=375&fit=crop"
                  alt="Team discussion"
                  fill
                  className="object-cover opacity-70"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/10" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Accordion */}
          <div className="border-t border-border/80">
            {FAQ.items.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.04 }}
                  className={`border-b border-border/80 transition-all duration-300 ${
                    isOpen
                      ? "bg-accent/[0.02] border-l-2 border-l-accent/40"
                      : "border-l-2 border-l-transparent"
                  }`}
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onFocus={() => setOpenIndex(i)}
                    onBlur={() => setOpenIndex(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenIndex(isOpen ? null : i);
                      }
                    }}
                    className="w-full flex items-center gap-4 sm:gap-5 py-6 sm:py-7 text-left group cursor-default"
                  >
                    {/* Number */}
                    <span className="font-heading text-xs font-bold text-secondary/45 w-6 flex-shrink-0 tracking-widest transition-colors duration-300 group-hover:text-accent/50">
                      0{i + 1}
                    </span>

                    <span className="font-heading text-lg sm:text-xl font-bold tracking-tight flex-1 leading-snug transition-colors duration-300 group-hover:text-accent">
                      {item.question}
                    </span>

                    {/* Toggle */}
                    <div
                      className={`w-11 h-11 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
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

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                        animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                        exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                        transition={{
                          gridTemplateRows: { duration: 0.4, ease: EASE },
                          opacity: { duration: 0.3, delay: 0.1 },
                        }}
                        className="grid"
                      >
                        <div className="overflow-hidden">
                        <div className="pb-7 sm:pb-8 pl-10 sm:pl-11 pr-14">
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
                            {item.answer}
                          </p>
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
      </div>
    </section>
  );
}
