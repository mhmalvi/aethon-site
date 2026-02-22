"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("aethon-theme") as Theme) || "dark";
    }
    return "dark";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    const next = theme === "dark" ? "light" : "dark";

    // Small delay so the overlay animation starts before the theme swap
    setTimeout(() => {
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("aethon-theme", next);
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}

      {/* Full-screen transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[99999] pointer-events-none"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={{
              clipPath: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.4 },
            }}
            style={{
              backgroundColor:
                theme === "dark"
                  ? "rgba(248, 248, 250, 0.15)"
                  : "rgba(10, 12, 20, 0.15)",
            }}
          />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}
