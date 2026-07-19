"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /** Use initial/animate (above-the-fold entrances) instead of whileInView. */
  onLoad?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  onLoad = false,
  className,
  style,
}: FadeInProps) {
  const transition = { duration, delay, ease: EASE };

  if (onLoad) {
    return (
      <motion.div
        className={className}
        style={style}
        initial={{ opacity: 0, x, y }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
