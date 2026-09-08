"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const STRAND_COUNT = 4;
const THEME_ORANGE = "#e85749";
const STRAND_LENGTH = 30;
const STRAND_CURL = 16;
const CENTER = 90;
const SVG_SIZE = 180;

interface Strand {
  d: string;
  delay: number;
}

interface StringPop {
  id: number;
  x: number;
  y: number;
  strands: Strand[];
}

type PopStyle = CSSProperties & {
  "--burst-x": string;
  "--burst-y": string;
};

type StrandStyle = CSSProperties & {
  "--pshade": string;
  "--pdelay": string;
};

function buildStrands(seed: number): Strand[] {
  const spread = 360 / STRAND_COUNT;
  const baseRotation = (seed * 36) % 360;
  return Array.from({ length: STRAND_COUNT }, (_, k) => {
    const angle = ((baseRotation + k * spread) * Math.PI) / 180;
    const ex = CENTER + Math.cos(angle) * STRAND_LENGTH;
    const ey = CENTER + Math.sin(angle) * STRAND_LENGTH - 6;
    const mx = (CENTER + ex) / 2;
    const my = (CENTER + ey) / 2;
    const qx = mx + -Math.sin(angle) * STRAND_CURL;
    const qy = my + Math.cos(angle) * STRAND_CURL;
    return {
      d: `M ${CENTER} ${CENTER} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      delay: k * 40,
    };
  });
}

export default function ChalkBursts() {
  const [pops, setPops] = useState<StringPop[]>([]);
  const nextId = useRef(0);
  const timers = useRef<Set<number>>(new Set());

  useEffect(() => {
    const scheduledTimers = timers.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const makePop = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        prefersReducedMotion.matches ||
        document.documentElement.classList.contains("blackboard-draw-mode")
      ) return;

      const id = nextId.current++;
      const pop: StringPop = {
        id,
        x: event.clientX,
        y: event.clientY,
        strands: buildStrands(id),
      };

      setPops((current) => [...current.slice(-5), pop]);
      const timerId = window.setTimeout(() => {
        setPops((current) => current.filter((item) => item.id !== id));
        scheduledTimers.delete(timerId);
      }, 900);
      scheduledTimers.add(timerId);
    };

    document.addEventListener("pointerdown", makePop);

    return () => {
      document.removeEventListener("pointerdown", makePop);
      for (const timer of scheduledTimers) window.clearTimeout(timer);
      scheduledTimers.clear();
    };
  }, []);

  return (
    <div className="chalk-bursts" aria-hidden="true">
      {pops.map((pop) => {
        const style: PopStyle = {
          "--burst-x": `${pop.x}px`,
          "--burst-y": `${pop.y}px`,
        };

        return (
          <span key={pop.id} className="chalk-burst" style={style}>
            <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
              {pop.strands.map((strand, index) => {
                const strandStyle: StrandStyle = {
                  "--pshade": THEME_ORANGE,
                  "--pdelay": `${strand.delay}ms`,
                };
                return <path key={index} d={strand.d} pathLength={1} style={strandStyle} />;
              })}
            </svg>
          </span>
        );
      })}
    </div>
  );
}
