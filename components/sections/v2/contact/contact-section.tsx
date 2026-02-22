"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextRandomized } from "@/components/ui/text-randomized";
import { CONTACT, FOOTER } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const inputClasses =
  "w-full rounded-xl border border-border-light bg-surface-subtle backdrop-blur-sm px-5 py-3.5 text-sm text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState<number | null>(null);

  // Parallax on decorative image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Tilt for info boxes
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
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
    (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--tilt-x", "0deg");
      e.currentTarget.style.setProperty("--tilt-y", "0deg");
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: FOOTER.contact.email,
      href: `mailto:${FOOTER.contact.email}`,
      color: "#818cf8",
      bg: "rgba(99,102,241,0.10)",
      border: "rgba(99,102,241,0.35)",
      spot: "rgba(99,102,241,0.06)",
    },
    {
      icon: MapPin,
      label: "Location",
      value: FOOTER.contact.location,
      href: null,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.10)",
      border: "rgba(34,211,238,0.35)",
      spot: "rgba(34,211,238,0.06)",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-8 lg:px-16 xl:px-24"
    >
      {/* V2 divider */}
      <div className="absolute top-0 left-6 sm:left-8 lg:left-16 xl:left-24 right-6 sm:right-8 lg:right-16 xl:right-24 v2-divider" />

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            top: "30%",
            left: "10%",
            background: "var(--accent)",
            opacity: 0.04,
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            bottom: "20%",
            right: "15%",
            background: "var(--accent-cyan)",
            opacity: 0.03,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
              01 — Send a Message
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Tell us about your project.
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="h-[2px] w-16 mb-8 bg-gradient-to-r from-accent/60 to-accent-cyan/40 origin-left"
            />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={CONTACT.form.namePlaceholder}
                      aria-label="Your name"
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      required
                      placeholder={CONTACT.form.emailPlaceholder}
                      aria-label="Email address"
                      className={inputClasses}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={CONTACT.form.companyPlaceholder}
                    aria-label="Company"
                    className={inputClasses}
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder={CONTACT.form.messagePlaceholder}
                    aria-label="Your message"
                    className={`${inputClasses} resize-none`}
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="group w-full sm:w-auto"
                  >
                    {CONTACT.form.submitLabel}
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6"
                >
                  <motion.div
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  </motion.div>
                  <p className="text-emerald-300/90 text-base font-medium">
                    {CONTACT.form.successMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Info + decorative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-6">
              02 — Contact Info
            </span>
            {/* Contact info boxes with tilt + spotlight */}
            <div className="space-y-4 mb-10">
              {infoItems.map((item, i) => {
                const Icon = item.icon;
                const isHovered = hoveredInfo === i;
                const Wrapper = item.href ? "a" : "div";

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                  >
                    <Wrapper
                      {...(item.href ? { href: item.href } : {})}
                      onMouseEnter={() => setHoveredInfo(i)}
                      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                        setHoveredInfo(null);
                        handleMouseLeave(e);
                      }}
                      onMouseMove={handleMouseMove}
                      className="v2-spotlight v2-tilt flex items-center gap-4 group p-5 rounded-xl border transition-all duration-500 ease-out cursor-default block"
                      style={{
                        borderColor: isHovered
                          ? item.border
                          : "var(--border)",
                        boxShadow: isHovered
                          ? `0 0 30px ${item.spot}, 0 4px 16px rgba(0,0,0,0.2)`
                          : "none",
                        "--spot-color": item.spot,
                      } as React.CSSProperties}
                    >
                      <motion.div
                        animate={
                          isHovered
                            ? { rotate: 8, scale: 1.1 }
                            : { rotate: 0, scale: 1 }
                        }
                        transition={{ duration: 0.3, ease: EASE }}
                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: item.bg }}
                      >
                        <Icon
                          className="w-5 h-5 transition-all duration-300"
                          style={{
                            color: item.color,
                            filter: isHovered
                              ? `drop-shadow(0 0 10px ${item.color})`
                              : "none",
                          }}
                        />
                      </motion.div>
                      <div>
                        <p className="text-[11px] text-secondary/40 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p
                          className="text-sm text-foreground/80 transition-colors duration-300"
                          style={{ color: isHovered ? item.color : undefined }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative image with parallax */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-border shadow-xl shadow-black/20 group"
            >
              <motion.div style={{ y: imageY }} className="absolute inset-[-15%]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-80"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
