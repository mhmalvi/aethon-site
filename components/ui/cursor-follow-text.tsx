"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface CursorFollowTextProps {
  children: React.ReactNode;
  className?: string;
}

export function CursorFollowText({ children, className }: CursorFollowTextProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={cn("cursor-follow-text", className)}
      style={
        {
          "--text-mouse-x": `${mousePosition.x}px`,
          "--text-mouse-y": `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
