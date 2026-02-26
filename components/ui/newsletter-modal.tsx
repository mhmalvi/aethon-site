"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer } from "vaul";
import { submitForm } from "@/lib/form-submit";

const EASE = [0.16, 1, 0.3, 1] as const;

const STORAGE_KEY = "aethon-newsletter-dismissed";

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { matches: isDesktop, mounted } = useMediaQuery("(min-width: 768px)");
  const triggeredRef = useRef(false);

  // Check if already dismissed on mount
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) {
      triggeredRef.current = true;
    }
  }, []);

  // Show after 45% scroll depth using Lenis scroll callback
  useLenis(({ scroll, limit }) => {
    if (triggeredRef.current) return;
    if (limit > 0 && scroll / limit > 0.45) {
      triggeredRef.current = true;
      // Small delay so it doesn't feel jarring
      setTimeout(() => setOpen(true), 800);
    }
  });

  const handleClose = useCallback(() => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
    // Reset state after exit animation
    setTimeout(() => {
      setSubmitted(false);
      setLoading(false);
    }, 400);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const fd = new FormData(e.currentTarget);
      const data: Record<string, string> = {
        email: fd.get("email") as string,
        _honeypot: fd.get("_honeypot") as string,
      };

      const result = await submitForm(data, "newsletter");
      setLoading(false);

      if (result.success) {
        setSubmitted(true);
        toast.success("You're on the list!", {
          description: "Watch your inbox for insights from Aethon.",
        });
        sessionStorage.setItem(STORAGE_KEY, "1");
        setTimeout(() => setOpen(false), 2500);
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    },
    []
  );

  const content = (
    <div className="p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-cyan" />
              </div>
              <h3 className="font-heading text-lg font-bold tracking-tight">
                Stay ahead of the curve
              </h3>
            </div>

            <p className="text-sm text-secondary/50 mb-5">
              Practical insights on automation, AI in production, and building
              systems that last. No spam — just signal.
            </p>

            <div className="h-px w-10 bg-gradient-to-r from-accent-cyan/40 to-transparent mb-5" />

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot */}
              <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="w-full rounded-xl border border-border bg-surface-subtle backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-accent-cyan/50 focus:ring-2 focus:ring-accent-cyan/15 transition-all duration-300"
              />
              <Button
                type="submit"
                variant="gradient"
                size="default"
                className="w-full group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              <p className="text-xs text-secondary/55 text-center">
                Monthly insights. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col items-center text-center py-6"
          >
            <motion.div
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </motion.div>
            <h4 className="font-heading text-lg font-bold mb-1">
              You&apos;re in!
            </h4>
            <p className="text-sm text-secondary/50">
              Watch your inbox for insights from Aethon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Don't render until after hydration to avoid mismatch
  if (!mounted) return null;

  if (!isDesktop) {
    /* ── Mobile: Vaul Drawer ── */
    return (
      <Drawer.Root open={open} onOpenChange={(v) => !v && handleClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-[101] flex flex-col rounded-t-2xl border-t border-border bg-background">
            <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-secondary/20" />
            {content}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  /* ── Desktop: Slide-up toast-style card ── */
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-[380px] rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Top accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-1 rounded-lg text-secondary/45 hover:text-foreground hover:bg-surface-subtle transition-all duration-200"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
