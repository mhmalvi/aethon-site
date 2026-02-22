"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  Workflow,
  Brain,
  Code,
  Shield,
  BarChart3,
  Users,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ConsultationModal } from "@/components/ui/consultation-modal";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const navIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Brain,
  Code,
  Shield,
  BarChart3,
  Users,
  Sparkles,
  Layers,
};

type NavChild = {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
  readonly tagline: string;
};

type NavLink = {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
};

function DesktopDropdown({
  link,
  isOpen,
  onOpen,
  onClose,
}: {
  link: NavLink;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  }, [onOpen]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!link.children) {
    return (
      <Link
        href={link.href}
        className="relative text-sm text-secondary hover:text-foreground transition-all duration-300 group/nav"
      >
        {link.label}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover/nav:w-full" />
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={link.href}
        className={cn(
          "relative text-sm transition-all duration-300 group/nav flex items-center gap-1 py-2",
          isOpen ? "text-foreground" : "text-secondary hover:text-foreground"
        )}
      >
        {link.label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
        <span
          className={cn(
            "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300",
            isOpen ? "w-full" : "w-0 group-hover/nav:w-full"
          )}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
          >
            <div className="bg-nav-bg backdrop-blur-xl border border-border rounded-xl shadow-2xl shadow-black/30 overflow-hidden min-w-[520px]">
              {/* Subtle top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              <div className="p-4 grid grid-cols-2 gap-1">
                {link.children!.map((child, i) => {
                  const Icon = navIconMap[child.icon];
                  return (
                    <motion.div
                      key={child.href}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: i * 0.03 }}
                    >
                      <Link
                        href={child.href}
                        className="flex items-start gap-3.5 p-3.5 rounded-lg hover:bg-foreground/[0.04] transition-all duration-200 group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-foreground/[0.05] flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent/10 transition-colors duration-200">
                          {Icon && (
                            <Icon className="w-4.5 h-4.5 text-secondary/60 group-hover/item:text-accent transition-colors duration-200" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-foreground/90 group-hover/item:text-foreground block leading-tight">
                            {child.label}
                          </span>
                          <span className="text-xs text-secondary/40 group-hover/item:text-secondary/60 block mt-0.5 leading-snug transition-colors duration-200">
                            {child.tagline}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom link */}
              <div className="border-t border-border/60 px-4 py-3">
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 text-xs font-medium text-secondary/50 hover:text-accent transition-colors duration-200 group/all"
                >
                  View all {link.label.toLowerCase()}
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/all:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({
  link,
  index,
  onClose,
}: {
  link: NavLink;
  index: number;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!link.children) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link
          href={link.href}
          className="block text-base text-secondary hover:text-foreground transition-colors py-3 border-b border-border"
          onClick={onClose}
        >
          {link.label}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-base text-secondary hover:text-foreground transition-colors py-3 border-b border-border"
      >
        {link.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2">
              {link.children!.map((child, ci) => {
                const Icon = navIconMap[child.icon];
                return (
                  <motion.div
                    key={child.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ci * 0.04 }}
                  >
                    <Link
                      href={child.href}
                      className="flex items-center gap-3 py-2.5 text-sm text-secondary/70 hover:text-foreground transition-colors"
                      onClick={onClose}
                    >
                      {Icon && <Icon className="w-4 h-4 text-secondary/40" />}
                      {child.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href={link.href}
                className="flex items-center gap-1.5 py-2.5 text-xs font-medium text-accent/70 hover:text-accent transition-colors"
                onClick={onClose}
              >
                View all {link.label.toLowerCase()}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on significant scroll (> 80px)
  useEffect(() => {
    let scrollAtOpen = window.scrollY;
    const closeDropdown = () => {
      if (openDropdown && Math.abs(window.scrollY - scrollAtOpen) > 80) {
        setOpenDropdown(null);
      }
      if (!openDropdown) {
        scrollAtOpen = window.scrollY;
      }
    };
    window.addEventListener("scroll", closeDropdown, { passive: true });
    return () => window.removeEventListener("scroll", closeDropdown);
  }, [openDropdown]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-nav-bg backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/aethon-wordmark.png"
            alt="Aethon"
            className="h-6 sm:h-7 w-auto dark:invert transition-opacity duration-200 hover:opacity-80"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <DesktopDropdown
              key={link.label}
              link={link}
              isOpen={openDropdown === link.label}
              onOpen={() => setOpenDropdown(link.label)}
              onClose={() => setOpenDropdown(null)}
            />
          ))}
        </div>

        {/* Desktop right: theme toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <ConsultationModal>
            <div className="rotating-border">
              <Button variant="gradient" size="sm" className="rounded-full">
                Book a Consultation
              </Button>
            </div>
          </ConsultationModal>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-nav-bg backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <MobileNavItem
                  key={link.label}
                  link={link}
                  index={i}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
              <ConsultationModal>
                <Button variant="gradient" className="mt-4 w-full">
                  Book a Consultation
                </Button>
              </ConsultationModal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
