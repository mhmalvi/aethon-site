"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import {
  BarChart3,
  Users,
  Sparkles,
  Layers,
  Shield,
  Zap,
  Database,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ui/consultation-modal";

const EASE = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: BarChart3,
    title: "Real-time Dashboards",
    slug: "real-time-dashboards",
    description:
      "Live operational visibility across every metric that matters. Custom views for every role from C-suite to operations floor.",
    accent: { color: "#818cf8", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.4)" },
  },
  {
    icon: Users,
    title: "Role-based Workflows",
    slug: "role-based-workflows",
    description:
      "Configurable approval chains, task routing, and access controls that match your organizational structure.",
    accent: { color: "#34d399", bg: "rgba(52,211,153,0.07)", border: "rgba(52,211,153,0.4)" },
  },
  {
    icon: Sparkles,
    title: "AI Decision Engine",
    slug: "ai-decision-engine",
    description:
      "Governed AI models that assist decision-making within your existing workflows — with full audit trails.",
    accent: { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.4)" },
  },
  {
    icon: Layers,
    title: "API-first Architecture",
    slug: "api-first-architecture",
    description:
      "Every capability exposed through documented, versioned APIs. Integrate with anything, extend without limits.",
    accent: { color: "#fbbf24", bg: "rgba(251,191,36,0.06)", border: "rgba(251,191,36,0.35)" },
  },
  {
    icon: Shield,
    title: "Zero-trust Security",
    description:
      "End-to-end encryption, SSO integration, and granular permissions. Built for compliance from day one.",
    accent: { color: "#f472b6", bg: "rgba(244,114,182,0.07)", border: "rgba(244,114,182,0.4)" },
  },
  {
    icon: Zap,
    title: "Event-driven Processing",
    description:
      "Real-time data pipelines that react to business events as they happen. No polling, no delays.",
    accent: { color: "#818cf8", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.4)" },
  },
  {
    icon: Database,
    title: "Multi-tenant Data Isolation",
    description:
      "Complete data separation with shared infrastructure efficiency. Scale to thousands of tenants.",
    accent: { color: "#34d399", bg: "rgba(52,211,153,0.07)", border: "rgba(52,211,153,0.4)" },
  },
  {
    icon: Globe,
    title: "Global Deployment",
    description:
      "Edge-optimized delivery with region-specific compliance controls. Low latency everywhere.",
    accent: { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.4)" },
  },
];

export function ProductsFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-4">
            01 — Platform Capabilities
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Everything you need to run modern operations.
          </h2>
          <div className="flex items-center gap-4 mt-6">
            <ConsultationModal>
              <Button variant="gradient" size="default" className="group">
                Discuss your needs
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </ConsultationModal>
            <Button variant="outline" size="default" className="group" asChild>
              <Link href="/solutions">
                View solutions
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.06,
                  ease: EASE,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={(e) => {
                  setHoveredIndex(null);
                  handleMouseLeave(e);
                }}
                onMouseMove={handleMouseMove}
                className="v2-spotlight v2-tilt relative rounded-2xl border p-6 transition-all duration-500 ease-out cursor-default"
                style={{
                  borderColor: isHovered
                    ? feature.accent.border
                    : "var(--border)",
                  boxShadow: isHovered
                    ? `0 0 30px ${feature.accent.bg}, 0 4px 20px rgba(0,0,0,0.3)`
                    : "none",
                  "--spot-color": feature.accent.bg,
                } as React.CSSProperties}
              >
                <motion.div
                  animate={
                    isHovered
                      ? { rotate: 8, scale: 1.1 }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.3, ease: EASE }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{
                    background: feature.accent.bg,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{
                      color: feature.accent.color,
                      filter: isHovered
                        ? `drop-shadow(0 0 10px ${feature.accent.color})`
                        : "none",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </motion.div>

                <h3 className="font-heading text-lg font-bold tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
                {"slug" in feature && feature.slug && (
                  <Link
                    href={`/products/${feature.slug}`}
                    className="inline-flex items-center gap-1 mt-4 text-xs font-medium transition-colors duration-200 group/learn"
                    style={{ color: feature.accent.color }}
                  >
                    Learn more
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/learn:translate-x-0.5" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
