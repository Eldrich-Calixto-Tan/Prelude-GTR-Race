import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-200",
          "border-2 bg-black/50 backdrop-blur-sm clip-path-slant",
          variant === "primary" 
            ? "border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]" 
            : "border-secondary text-secondary hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
          className
        )}
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)"
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
NeonButton.displayName = "NeonButton";
