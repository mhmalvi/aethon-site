"use client";

import React, { type ReactNode, useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isDesktop: boolean;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider");
  }
  return context;
};

export function TabsProvider({
  children,
  defaultValue,
  className,
}: {
  children: ReactNode;
  defaultValue: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, isDesktop }}>
      <div className={cn("w-full h-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("rounded-xs h-fit", className)}>{children}</div>;
}

export function TabItem({
  children,
  value,
  className,
}: {
  children: ReactNode;
  value: string;
  className?: string;
}) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <motion.div
      className={cn(
        "rounded-xl overflow-hidden mb-2 md:text-base text-sm cursor-pointer",
        activeTab === value
          ? "active border border-accent/30 bg-card-bg-hover"
          : "border border-transparent hover:border-accent/20",
        className
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </motion.div>
  );
}

export function TabHeader({
  children,
  value,
  className,
}: {
  children: ReactNode;
  value: string;
  className?: string;
}) {
  const { activeTab } = useTabs();
  return (
    <h3
      className={cn(
        "p-4 md:text-base text-sm cursor-pointer transition-all font-semibold text-foreground hover:bg-surface flex justify-between items-center",
        activeTab === value ? "bg-surface" : "bg-transparent",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TabDes({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  const { activeTab } = useTabs();
  return (
    <AnimatePresence mode="sync">
      {activeTab === value && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: 0.14,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TabImageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      <AnimatePresence mode="popLayout">{children}</AnimatePresence>
    </div>
  );
}

export function TabImage({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  const { activeTab, isDesktop } = useTabs();

  if (activeTab !== value || !isDesktop) return null;

  return (
    <motion.div
      initial={{ opacity: 0, overflow: "hidden" }}
      animate={{ opacity: 1, overflow: "hidden" }}
      exit={{ opacity: 0, overflow: "hidden" }}
      transition={{
        duration: 0.4,
        delay: 0.2,
      }}
      className="p-4 h-[400px] rounded-xl overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
