import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { FooterV2 } from "@/components/sections/v2/footer-v2";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-[80vh] flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Ambient glow */}
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
            Page Not Found
          </span>

          <h1 className="font-heading text-[20vw] sm:text-[16vw] md:text-[12vw] lg:text-[10vw] font-black leading-none gradient-text-accent mb-6">
            404
          </h1>

          <p className="text-secondary/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold bg-[linear-gradient(110deg,var(--accent),45%,var(--accent-cyan),55%,var(--accent))] bg-[length:250%_100%] animate-background-shine text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold border border-border-light bg-transparent text-foreground hover:bg-surface-subtle hover:border-accent/50 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <FooterV2 />
    </>
  );
}
