"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[150] rounded-2xl border border-white/10 bg-[var(--color-surface)]/95 backdrop-blur-xl p-5 shadow-2xl"
        >
          <p className="text-sm text-[var(--color-foreground)]/70 leading-relaxed">
            We use cookies and analytics to understand how you use our site and improve your experience.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={accept}
              aria-label="Accept cookies"
              className="flex-1 rounded-lg bg-[var(--color-accent)] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent)]/80 min-h-[44px]"
            >
              Accept
            </button>
            <button
              onClick={decline}
              aria-label="Decline cookies"
              className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-[var(--color-foreground)]/60 transition-colors hover:bg-white/5 min-h-[44px]"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
