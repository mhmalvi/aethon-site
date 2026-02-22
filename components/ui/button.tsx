import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-btn-fill text-btn-fill-text hover:shadow-[0_0_20px_rgba(99,102,241,0.2),0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0",
        gradient:
          "text-btn-fill-text btn-gradient-fill hover:shadow-[0_0_30px_rgba(99,102,241,0.25),0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0",
        outline:
          "border border-border-light bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/25 hover:shadow-[0_0_20px_rgba(99,102,241,0.12),0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0",
        ghost:
          "text-secondary hover:text-foreground hover:bg-foreground/5 hover:-translate-y-0.5 active:translate-y-0",
        link:
          "text-accent underline-offset-4 hover:underline hover:brightness-125",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base font-semibold",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
