"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { ReactNode, useCallback } from "react";

interface AccordionContextType {
  isActive?: boolean;
  value?: string;
  onChangeIndex?: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType>({});
const useAccordion = () => React.useContext(AccordionContext);

export function AccordionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-1", className)}>{children}</div>
  );
}

export function AccordionWrapper({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

interface AccordionProps {
  children: ReactNode;
  multiple?: boolean;
  defaultValue?: string | string[];
}

export function Accordion({ children, multiple, defaultValue }: AccordionProps) {
  const [activeIndex, setActiveIndex] = React.useState<
    string | string[] | null
  >(
    multiple
      ? Array.isArray(defaultValue)
        ? defaultValue
        : []
      : defaultValue || null
  );

  const onChangeIndex = useCallback(
    (value: string) => {
      setActiveIndex((currentActiveIndex) => {
        if (!multiple) {
          return value === currentActiveIndex ? null : value;
        }
        if (Array.isArray(currentActiveIndex)) {
          if (currentActiveIndex.includes(value)) {
            return currentActiveIndex.filter((i) => i !== value);
          }
          return [...currentActiveIndex, value];
        }
        return [value];
      });
    },
    [multiple]
  );

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    const childProps = child.props as { value: string };
    const value = childProps.value;
    const isActive = multiple
      ? Array.isArray(activeIndex) && activeIndex.includes(value)
      : activeIndex === value;

    return (
      <AccordionContext.Provider value={{ isActive, value, onChangeIndex }}>
        {child}
      </AccordionContext.Provider>
    );
  });
}

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: ReactNode;
  value: string;
  className?: string;
}) {
  const { isActive } = useAccordion();
  return (
    <div
      data-active={isActive || undefined}
      className={cn("rounded-lg overflow-hidden mb-2 group", className)}
    >
      {children}
    </div>
  );
}

export function AccordionHeader({
  children,
  customIcon,
  className,
}: {
  children: ReactNode;
  customIcon?: boolean;
  className?: string;
}) {
  const { isActive, value, onChangeIndex } = useAccordion();
  const handleClick = useCallback(() => {
    if (value && onChangeIndex) onChangeIndex(value);
  }, [onChangeIndex, value]);

  return (
    <motion.button
      type="button"
      data-active={isActive || undefined}
      aria-expanded={isActive}
      className={cn(
        "p-4 cursor-pointer w-full transition-all font-semibold text-secondary data-active:bg-background hover:bg-background hover:text-foreground flex justify-between gap-2 items-center text-left",
        className
      )}
      onClick={handleClick}
    >
      {children}
      {!customIcon && (
        <ChevronDown
          className={cn(
            "transition-transform shrink-0",
            isActive ? "rotate-180" : "rotate-0"
          )}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
}

export function AccordionPanel({
  children,
  className,
  articleClassName,
}: {
  children: ReactNode;
  className?: string;
  articleClassName?: string;
}) {
  const { isActive, value } = useAccordion();
  return (
    <AnimatePresence initial={true}>
      {isActive && (
        <motion.div
          data-active={isActive || undefined}
          role="region"
          id={`accordion-panel-${value}`}
          aria-labelledby={`accordion-header-${value}`}
          initial={{ height: 0, overflow: "hidden" }}
          animate={{ height: "auto", overflow: "hidden" }}
          exit={{ height: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={cn(
            "bg-background px-2 data-active:bg-background text-foreground",
            className
          )}
        >
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className={cn(
              "px-3 bg-transparent pb-4 space-y-2",
              articleClassName
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
