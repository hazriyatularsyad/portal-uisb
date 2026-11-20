"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  className,
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 1.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
