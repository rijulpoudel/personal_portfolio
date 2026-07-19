"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const target = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  let charCursor = 0;

  return (
    <p ref={target} className={className} style={style}>
      {words.map((word, wi) => {
        const start = charCursor;
        charCursor += word.length;
        return (
          <Fragment key={wi}>
            <span className="inline-block">
              {word.split("").map((char, ci) => (
                <Char
                  key={ci}
                  char={char}
                  index={start + ci}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </p>
  );
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Char({ char, index, total, progress }: CharProps) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span aria-hidden="true" className="absolute inset-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
