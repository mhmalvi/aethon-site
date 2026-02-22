"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
} from "@/components/ui/responsive-modal";

const EASE = [0.16, 1, 0.3, 1] as const;

const inputClasses =
  "w-full rounded-xl border border-border bg-surface-subtle backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all duration-300";

interface JobApplicationModalProps {
  children: React.ReactElement<Record<string, unknown>>;
  jobTitle: string;
  jobType: string;
}

export function JobApplicationModal({
  children,
  jobTitle,
  jobType,
}: JobApplicationModalProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      toast.success("Application received!", {
        description: "We'll review and get back to you soon.",
      });
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setSubmitted(false);
        }, 300);
      }, 2000);
    },
    []
  );

  return (
    <ResponsiveModal open={open} setOpen={setOpen}>
      <ResponsiveModalTrigger asChild>{children}</ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold tracking-tight">
                      Apply for Position
                    </h2>
                  </div>
                </div>

                {/* Job info badge */}
                <div className="mb-6">
                  <p className="text-sm text-secondary/50 mb-3">
                    Applying for:
                  </p>
                  <div className="inline-flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-2.5">
                    <span className="text-sm font-semibold text-foreground">
                      {jobTitle}
                    </span>
                    <span className="text-xs text-accent/80 font-medium">
                      {jobType}
                    </span>
                  </div>
                </div>

                {/* Accent line */}
                <div className="h-px w-12 bg-gradient-to-r from-accent/50 to-transparent mb-6" />

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      aria-label="Full name"
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      aria-label="Email address"
                      className={inputClasses}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Phone number (optional)"
                    aria-label="Phone number"
                    className={inputClasses}
                  />

                  <input
                    type="url"
                    placeholder="LinkedIn or portfolio URL"
                    aria-label="LinkedIn or portfolio URL"
                    className={inputClasses}
                  />

                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about yourself — your experience, what interests you about this role, and why you'd be a great fit..."
                    aria-label="Cover letter"
                    className={`${inputClasses} resize-none`}
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full group"
                  >
                    Submit Application
                    <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>

                  <p className="text-[11px] text-secondary/45 text-center">
                    We review every application and respond within 5 business days.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center text-center py-8"
              >
                <motion.div
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h3 className="font-heading text-xl font-bold mb-2">
                  Application Received
                </h3>
                <p className="text-sm text-secondary/50 max-w-xs">
                  Thanks for applying for {jobTitle}. We&apos;ll review your
                  application and get back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
