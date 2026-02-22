"use client";

import React, { createContext, useContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Context ── */
interface ModalContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const ModalContext = createContext<ModalContextValue>({
  open: false,
  setOpen: () => {},
});

/* ── Root ── */
interface ResponsiveModalProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
  onClose?: () => void;
}

export function ResponsiveModal({
  children,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  onClose,
}: ResponsiveModalProps) {
  const [uncontrolledOpen, uncontrolledSetOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const rawSetOpen = controlledSetOpen ?? uncontrolledSetOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      rawSetOpen(v);
      if (!v && onClose) onClose();
    },
    [rawSetOpen, onClose]
  );

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

/* ── Trigger ── */
interface ResponsiveModalTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export function ResponsiveModalTrigger({
  children,
}: ResponsiveModalTriggerProps) {
  const { setOpen } = useContext(ModalContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.cloneElement(children as React.ReactElement<any>, {
    onClick: (e: React.MouseEvent) => {
      (children.props as { onClick?: React.MouseEventHandler })?.onClick?.(e);
      setOpen(true);
    },
  });
}

/* ── Content ── */
interface ResponsiveModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveModalContent({
  children,
  className,
}: ResponsiveModalContentProps) {
  const { open, setOpen } = useContext(ModalContext);
  const { matches: isDesktop, mounted } = useMediaQuery("(min-width: 768px)");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  // Stop Lenis smooth scroll + lock native scroll when open
  // useLayoutEffect fires before paint to prevent any scroll frame gap
  const lenis = useLenis();
  useLayoutEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  // Don't render until after hydration to avoid mismatch
  if (!mounted) return null;

  if (!isDesktop) {
    /* ── Mobile: Vaul Drawer ── */
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-[101] mt-24 flex flex-col rounded-t-2xl border-t border-border bg-background">
            {/* Drag handle */}
            <div className="mx-auto mt-3 mb-2 h-1 w-10 rounded-full bg-secondary/20" />
            <div className={cn("overflow-y-auto max-h-[85vh] px-1 pb-8", className)}>
              {children}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  /* ── Desktop: Animated dialog (portaled to body to escape containing blocks) ── */
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={scrollRef}
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Centering wrapper — click outside panel closes modal */}
          <div
            className="relative z-10 flex min-h-full items-center justify-center p-4 sm:p-8"
            onClick={handleClose}
          >
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={cn(
                "relative w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl shadow-black/50 overflow-hidden",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-1.5 rounded-lg text-secondary/55 hover:text-foreground hover:bg-surface-subtle transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
