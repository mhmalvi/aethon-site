"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  ResponsiveModal,
  ResponsiveModalTrigger,
  ResponsiveModalContent,
} from "@/components/ui/responsive-modal";
import { submitForm } from "@/lib/form-submit";

const EASE = [0.16, 1, 0.3, 1] as const;

const inputClasses =
  "w-full rounded-xl border border-border bg-surface-subtle backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-secondary/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all duration-300";

const services = [
  "Intelligent Operations",
  "AI in Production",
  "Digital Platforms",
  "Security & Resilience",
  "Not sure yet",
] as const;

interface ConsultationModalProps {
  children: React.ReactElement<Record<string, unknown>>;
}

export function ConsultationModal({ children }: ConsultationModalProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const fd = new FormData(e.currentTarget);
      const data: Record<string, string> = {
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        company: fd.get("company") as string,
        service: selectedService || "",
        message: fd.get("message") as string,
        _honeypot: fd.get("_honeypot") as string,
      };

      const result = await submitForm(data, "consultation");
      setLoading(false);

      if (result.success) {
        setSubmitted(true);
        toast.success("We'll be in touch within one business day.", {
          description: "Thanks for reaching out!",
        });
        setTimeout(() => {
          setOpen(false);
          setTimeout(() => {
            setSubmitted(false);
            setSelectedService(null);
          }, 300);
        }, 2000);
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    },
    [selectedService]
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
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold tracking-tight">
                      Book a Consultation
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-secondary/50 mb-6">
                  Tell us about your challenge. We&apos;ll get back within one
                  business day.
                </p>

                {/* Accent line */}
                <div className="h-px w-12 bg-gradient-to-r from-accent/50 to-transparent mb-6" />

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      aria-label="Your name"
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email address"
                      aria-label="Email address"
                      className={inputClasses}
                    />
                  </div>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    aria-label="Company"
                    className={inputClasses}
                  />

                  {/* Service selection pills */}
                  <div>
                    <label className="text-xs text-secondary/55 uppercase tracking-wider font-medium block mb-2.5">
                      What do you need?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() =>
                            setSelectedService(
                              selectedService === service ? null : service
                            )
                          }
                          className={`text-xs px-3.5 py-2 rounded-lg border transition-all duration-200 ${
                            selectedService === service
                              ? "border-accent/50 bg-accent/10 text-accent"
                              : "border-border bg-surface-subtle/50 text-secondary/50 hover:border-foreground/15 hover:text-secondary/70"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about your project or challenge..."
                    aria-label="Project description"
                    className={`${inputClasses} resize-none`}
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full group"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-secondary/45 text-center">
                    No commitment required. We typically respond same day.
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
                  Message Sent
                </h3>
                <p className="text-sm text-secondary/50 max-w-xs">
                  We&apos;ll be in touch within one business day to discuss your
                  project.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
