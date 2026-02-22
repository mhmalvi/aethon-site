"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FOOTER } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const linkGroups = [
  { title: "Company", links: FOOTER.links.company },
  { title: "Solutions", links: FOOTER.links.solutions },
  { title: "Products", links: FOOTER.links.products },
  { title: "Resources", links: FOOTER.links.resources },
];

export function FooterV2() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="relative border-t border-border/60 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="max-w-[1440px] mx-auto py-16 sm:py-20 lg:py-24">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-20 sm:mb-24">
          {/* CTA / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-md"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
              Have a project in mind?
              <br />
              <span className="gradient-text-accent">Let&apos;s build</span>{" "}
              something exceptional.
            </h2>

            {/* Email CTA */}
            <a
              href={`mailto:${FOOTER.contact.email}`}
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground/80 hover:text-accent transition-all duration-300 group py-2 px-4 -ml-4 rounded-lg hover:bg-accent/5"
            >
              <span className="relative border-b border-foreground/20 group-hover:border-accent pb-0.5 transition-colors duration-300">
                {FOOTER.contact.email}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Link columns */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-12 lg:gap-14"
          >
            {linkGroups.map((group, gi) => (
              <div key={group.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary/40 mb-5">
                  {group.title}
                </p>
                <nav className="flex flex-col gap-3">
                  {group.links.map((link, li) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 + gi * 0.05 + li * 0.03,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-secondary/60 hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block group/link relative"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover/link:w-full" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom: Giant brand + footer bar */}
        <div className="relative">
          {/* Giant watermark text — animated drift */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="select-none pointer-events-none overflow-hidden"
          >
            <span
              className="block font-heading text-[16vw] lg:text-[14vw] font-black tracking-[-0.05em] leading-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(34,211,238,0.04) 50%, rgba(99,102,241,0.02) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "v2-watermark-drift 12s ease-in-out infinite",
              }}
            >
              AETHON
            </span>
          </motion.div>

          {/* Footer bar */}
          <div className="flex flex-col sm:flex-row justify-between items-end border-t border-border/40 pt-7 pb-2 -mt-[2vw] relative z-10 gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-secondary/45">
              {FOOTER.copyright}
            </span>
            <div className="flex gap-6 sm:gap-8 items-center">
              <span className="text-[11px] text-secondary/40 hidden sm:block">
                {FOOTER.contact.location}
              </span>
              <button
                onClick={scrollToTop}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/40 hover:text-accent transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                Back to top &uarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
