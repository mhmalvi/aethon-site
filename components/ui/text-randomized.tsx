"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "motion/react";

const chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,";

interface TextRandomizedProps {
  text: string;
  className?: string;
  /** Trigger only when scrolled into view (default: true) */
  triggerOnView?: boolean;
  /** Replay on every view entry (default: false — plays once) */
  once?: boolean;
}

export function TextRandomized({
  text,
  className,
  triggerOnView = true,
  once = true,
}: TextRandomizedProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-40px" });
  const [displayed, setDisplayed] = useState(text);
  const hasPlayed = useRef(false);

  const randomChar = useCallback(
    () => chars[Math.floor(Math.random() * chars.length)],
    []
  );

  const animate = useCallback(async () => {
    const scrambleDuration = 50;
    const revealDuration = 60;
    const initialPhase = 250;

    const scramble = () =>
      text
        .split("")
        .map((ch) => (ch === " " ? " " : randomChar()))
        .join("");

    setDisplayed(scramble());

    const end = Date.now() + initialPhase;
    while (Date.now() < end) {
      await new Promise((r) => setTimeout(r, scrambleDuration));
      setDisplayed(scramble());
    }

    for (let i = 0; i < text.length; i++) {
      await new Promise((r) => setTimeout(r, revealDuration));
      setDisplayed(
        text.slice(0, i + 1) +
          text
            .slice(i + 1)
            .split("")
            .map((ch) => (ch === " " ? " " : randomChar()))
            .join("")
      );
    }
  }, [text, randomChar]);

  useEffect(() => {
    const shouldPlay = triggerOnView ? isInView : true;
    if (shouldPlay && !hasPlayed.current) {
      hasPlayed.current = true;
      animate();
    }
  }, [isInView, triggerOnView, animate]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
