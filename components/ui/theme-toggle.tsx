"use client";

import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
        theme === "dark"
          ? "bg-white/10 hover:bg-white/15 text-foreground"
          : "bg-black/5 hover:bg-black/10 text-foreground"
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatedIcon theme={theme} />
    </motion.button>
  );
}

function AnimatedIcon({ theme }: { theme: string }) {
  return (
    <motion.div
      key={theme}
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, rotate: 90, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </motion.div>
  );
}
