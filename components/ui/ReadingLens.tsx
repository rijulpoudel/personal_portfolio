"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Reading Lens.
 *
 * Hover the cover sheet and a collector's loupe replaces the cursor,
 * magnifying whatever lies beneath it. The cover is printed with
 * microtext: hairline print, illegible at natural size, that resolves
 * into hidden messages only under the lens.
 *
 * Pure progressive enhancement. Without JavaScript (or on touch
 * devices) the cover is simply a cover. Deep-link #lens shows the
 * lens parked over the microtext for visitors without a fine pointer.
 */

const LENS = 200; // diameter, px
const SCALE = 2.4;

export default function ReadingLens({
  children,
  micro,
}: {
  children: React.ReactNode;
  micro?: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches ||
        window.location.hash === "#lens"
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const lens = lensRef.current;
    const inner = innerRef.current;
    if (!wrap || !lens || !inner) return;
    const R = LENS / 2;

    const position = (x: number, y: number, width: number) => {
      inner.style.width = `${width}px`;
      lens.style.transform = `translate(${x - R}px, ${y - R}px)`;
      inner.style.transform = `translate(${R - x * SCALE}px, ${R - y * SCALE}px) scale(${SCALE})`;
    };

    const move = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => position(x, y, rect.width));
    };
    const enter = () => lens.classList.add("lens-on");
    const leave = () => lens.classList.remove("lens-on");

    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseenter", enter);
    wrap.addEventListener("mouseleave", leave);

    // Demo mode: park the lens mid-cover for #lens deep links.
    if (window.location.hash === "#lens") {
      const rect = wrap.getBoundingClientRect();
      position(rect.width * 0.5, rect.height * 0.62, rect.width);
      lens.classList.add("lens-on");
    }

    return () => {
      wrap.removeEventListener("mousemove", move);
      wrap.removeEventListener("mouseenter", enter);
      wrap.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return (
    <div ref={wrapRef} className={`lens-field${enabled ? " lens-enabled" : ""}`}>
      {children}
      {micro && (
        <div className="microtext" aria-hidden="true">
          {micro}
        </div>
      )}
      {enabled && (
        <div ref={lensRef} className="lens" aria-hidden="true" inert>
          <div ref={innerRef} className="lens-inner">
            {children}
            {micro && <div className="microtext">{micro}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
