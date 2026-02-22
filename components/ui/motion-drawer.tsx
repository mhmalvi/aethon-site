"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SideMenuDirection = "left" | "right";
export type ButtonOpeningVariants = "push" | "merge" | "stay";

interface SideMenuProps {
  overlayColor?: string;
  width?: number;
  direction?: SideMenuDirection;
  backgroundColor?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  showToggleButton?: boolean;
  btnClassName?: string;
  className?: string;
  contentClassName?: string;
  clsBtnClassName?: string;
  overlayClassName?: string;
  animationConfig?: {
    type?: "spring" | "tween";
    damping?: number;
    stiffness?: number;
    duration?: number;
  };
  enableDrag?: boolean;
  dragThreshold?: number;
  buttonOpeningVariants?: ButtonOpeningVariants;
}

const getOpenButtonVariants = (
  direction: SideMenuDirection,
  width: number,
  type: ButtonOpeningVariants
) => {
  switch (type) {
    case "merge":
      return direction === "left"
        ? {
            closed: { x: 0, opacity: 1, scale: 1, borderRadius: "0.5rem" },
            open: { x: width - 68, opacity: 0, scale: 1, borderRadius: "0rem" },
          }
        : {
            closed: { x: 0, opacity: 1, scale: 1, borderRadius: "0.5rem" },
            open: { x: 68 - width, opacity: 0, scale: 1, borderRadius: "0rem" },
          };
    case "push":
      return direction === "left"
        ? { closed: { x: 0, opacity: 1 }, open: { x: width + 20, opacity: 0 } }
        : { closed: { x: 0, opacity: 1 }, open: { x: -(width + 20), opacity: 0 } };
    case "stay":
    default:
      return { closed: { x: 0, opacity: 1 }, open: { x: 0, opacity: 0 } };
  }
};

const MotionDrawer: React.FC<SideMenuProps> = ({
  overlayColor = "rgba(0, 0, 0, 0.3)",
  width = 250,
  direction = "left",
  backgroundColor = "#ffffff",
  children,
  isOpen: controlledIsOpen,
  onToggle,
  showToggleButton = true,
  btnClassName = "",
  clsBtnClassName = "",
  className = "",
  contentClassName = "",
  overlayClassName = "",
  animationConfig = { type: "spring", damping: 25, stiffness: 120 },
  enableDrag = true,
  dragThreshold = 0.3,
  buttonOpeningVariants = "merge",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (controlledIsOpen === undefined) setInternalIsOpen(value);
    onToggle?.(value);
  };

  const getDrawerVariants = () =>
    direction === "left"
      ? { closed: { x: -width }, open: { x: 0 } }
      : { closed: { x: width }, open: { x: 0 } };

  const buttonVariants = getOpenButtonVariants(direction, width, buttonOpeningVariants);

  const getDragConstraints = () =>
    direction === "left"
      ? { left: -width, right: 0 }
      : { left: 0, right: width };

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (!enableDrag) return;
    const threshold = width * dragThreshold;
    const dragDistance = Math.abs(info.offset.x);
    if (direction === "left") {
      if (info.offset.x < 0 && dragDistance > threshold && isOpen) setIsOpen(false);
      else if (info.offset.x >= 0 && dragDistance > threshold && !isOpen) setIsOpen(true);
    } else {
      if (info.offset.x > 0 && dragDistance > threshold && isOpen) setIsOpen(false);
      else if (info.offset.x <= 0 && dragDistance > threshold && !isOpen) setIsOpen(true);
    }
  };

  const drawerPositionClasses = direction === "left" ? "left-0" : "right-0";
  const openButtonPositionClasses = direction === "left" ? "top-4 left-4" : "top-4 right-4";

  return (
    <>
      {showToggleButton && (
        <motion.button
          className={cn(
            `fixed z-[99] cursor-pointer ${openButtonPositionClasses}`,
            btnClassName
          )}
          onClick={() => setIsOpen(true)}
          variants={buttonVariants}
          animate={isOpen ? "open" : "closed"}
          transition={animationConfig}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className={`fixed w-full h-full top-0 left-0 z-[9999] ${className}`}>
            <motion.div
              className={`absolute w-full h-full top-0 left-0 ${overlayClassName}`}
              style={{ backgroundColor: overlayColor }}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className={`absolute h-full shadow-lg ${drawerPositionClasses} ${contentClassName}`}
              style={{
                backgroundColor,
                width: `${width}px`,
                padding: "60px 30px 30px 30px",
                boxSizing: "border-box",
              }}
              drag={enableDrag ? "x" : false}
              dragElastic={0.1}
              dragConstraints={getDragConstraints()}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              variants={getDrawerVariants()}
              initial="closed"
              animate="open"
              exit="closed"
              transition={animationConfig}
            >
              {showToggleButton && (
                <motion.button
                  className={cn(
                    "absolute top-2 right-8 p-2 cursor-pointer",
                    clsBtnClassName
                  )}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.button>
              )}
              <div className="h-full overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MotionDrawer;
