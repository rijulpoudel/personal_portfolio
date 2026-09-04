"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: CSSProperties;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const withinX = Math.abs(e.clientX - centerX) < rect.width / 2 + padding;
      const withinY = Math.abs(e.clientY - centerY) < rect.height / 2 + padding;

      if (withinX && withinY) {
        const x = (e.clientX - centerX) / strength;
        const y = (e.clientY - centerY) / strength;
        el.style.transition = activeTransition;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else {
        el.style.transition = inactiveTransition;
        el.style.transform = "translate3d(0px, 0px, 0)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "transform" }}>
      {children}
    </div>
  );
}
