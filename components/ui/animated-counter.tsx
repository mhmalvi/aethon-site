"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(value);

  // Extract numeric part for animation
  const numericMatch = value.match(/^(\d+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1]) : null;
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : value;

  useEffect(() => {
    if (!isInView || numericPart === null) return;

    let frame: number;
    const duration = 1500;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericPart!);
      setDisplayed(`${current}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericPart, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
