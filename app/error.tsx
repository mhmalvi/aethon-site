"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-[80vh] flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "var(--accent)",
            opacity: 0.06,
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <span className="text-[11px] tracking-[0.2em] uppercase text-secondary/50 font-semibold block mb-6">
          Something went wrong
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 gradient-text-accent">
          Unexpected Error
        </h1>

        <p className="text-secondary/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          We hit an unexpected issue. Please try again, or contact us if
          the problem persists.
        </p>

        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold btn-gradient-fill text-btn-fill-text hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
