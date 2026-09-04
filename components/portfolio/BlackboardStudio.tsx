"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type DrawingTool = "browse" | "chalk" | "marker" | "eraser";

type Point = {
  x: number;
  y: number;
};

type SwatchStyle = CSSProperties & {
  "--swatch-color": string;
};

type CursorStyle = CSSProperties & {
  "--cursor-color": string;
};

const colors = [
  { name: "Cream", value: "#f5ece3" },
  { name: "Red", value: "#e35342" },
  { name: "Yellow", value: "#f0c64d" },
  { name: "Orange", value: "#e85749" },
  { name: "Green", value: "#63d39a" },
  { name: "Purple", value: "#a78bfa" },
];

const toolLabels: Record<DrawingTool, string> = {
  browse: "Browse",
  chalk: "Chalk",
  marker: "Marker",
  eraser: "Eraser",
};

function ToolCursorGraphic({ tool }: { tool: DrawingTool }) {
  if (tool === "chalk") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <g transform="rotate(45 24 24)">
          <path
            d="M18 8C18 5.8 20.7 4 24 4s6 1.8 6 4v30.5c0 2.5-2.7 4.5-6 4.5s-6-2-6-4.5V8Z"
            fill="currentColor"
            stroke="#292521"
            strokeWidth="1.4"
          />
          <ellipse cx="24" cy="8" rx="6" ry="3" fill="#fffaf2" opacity="0.78" />
          <path d="M18 31.5c3.4 1.7 8.6 1.7 12 0v7c0 2.5-2.7 4.5-6 4.5s-6-2-6-4.5v-7Z" fill="#ddd3c7" opacity="0.45" />
          <path d="M20 17h2M27 23h2M20 28h1.5" stroke="#fff" strokeLinecap="round" opacity="0.55" />
        </g>
        <circle cx="5" cy="43" r="1.1" fill="currentColor" opacity="0.62" />
        <circle cx="10" cy="42" r="0.7" fill="currentColor" opacity="0.42" />
      </svg>
    );
  }

  if (tool === "marker") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m5 42 3.5-11L16 38.5Z" fill="#302924" stroke="#181512" strokeWidth="1.4" />
        <path
          d="m8.5 31 22-24.5c1.8-2 4.9-2.1 6.8-.2l4.3 4.3c1.9 1.9 1.8 5-.2 6.8L16 38.5Z"
          fill="currentColor"
          stroke="#211d1a"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="m28 9 10.7 10" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="3" />
        <path d="M20 23.5 27 30" fill="none" stroke="#171411" strokeOpacity="0.2" strokeWidth="5" />
      </svg>
    );
  }

  if (tool === "eraser") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <g transform="rotate(-24 24 24)">
          <rect x="5" y="15" width="38" height="23" rx="5" fill="#ee8c86" stroke="#211d1a" strokeWidth="1.8" />
          <path d="M29 15h9a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5h-9Z" fill="#e85749" />
          <path d="M29 15v23" stroke="#211d1a" strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M9 20h16" stroke="#ffffff" strokeOpacity="0.34" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  return null;
}

function strokeLine(context: CanvasRenderingContext2D, from: Point, to: Point) {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
}

function drawSegment(
  context: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  tool: Exclude<DrawingTool, "browse">,
  color: string,
) {
  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";

  if (tool === "eraser") {
    context.globalCompositeOperation = "destination-out";
    context.globalAlpha = 1;
    context.lineWidth = 38;
    strokeLine(context, from, to);
    context.restore();
    return;
  }

  context.globalCompositeOperation = "source-over";
  context.strokeStyle = color;
  context.fillStyle = color;

  if (tool === "marker") {
    context.globalAlpha = 0.24;
    context.lineWidth = 18;
    strokeLine(context, from, to);
    context.restore();
    return;
  }

  context.globalAlpha = 0.78;
  context.lineWidth = 3.2;
  strokeLine(context, from, to);

  for (let pass = 0; pass < 2; pass += 1) {
    const xJitter = (Math.random() - 0.5) * 2.4;
    const yJitter = (Math.random() - 0.5) * 2.4;
    context.globalAlpha = 0.2;
    context.lineWidth = pass === 0 ? 5.5 : 1.2;
    strokeLine(
      context,
      { x: from.x + xJitter, y: from.y + yJitter },
      { x: to.x + xJitter, y: to.y + yJitter },
    );
  }

  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const dustCount = Math.min(18, Math.max(1, Math.floor(distance / 3)));
  context.globalAlpha = 0.28;

  for (let index = 0; index < dustCount; index += 1) {
    const progress = index / dustCount;
    const x = from.x + (to.x - from.x) * progress + (Math.random() - 0.5) * 7;
    const y = from.y + (to.y - from.y) * progress + (Math.random() - 0.5) * 7;
    const size = 0.5 + Math.random() * 1.4;
    context.fillRect(x, y, size, size);
  }

  context.restore();
}

export default function BlackboardStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const toolRef = useRef<DrawingTool>("browse");
  const colorRef = useRef(colors[0].value);
  const [tool, setTool] = useState<DrawingTool>("browse");
  const [color, setColor] = useState(colors[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const selectTool = (nextTool: DrawingTool) => {
    toolRef.current = nextTool;
    if (nextTool === "browse" && cursorRef.current) cursorRef.current.dataset.visible = "false";
    setTool(nextTool);
  };

  const selectColor = (nextColor: string) => {
    colorRef.current = nextColor;
    setColor(nextColor);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeFrame = 0;

    const resizeCanvas = () => {
      const width = Math.ceil(Math.max(document.documentElement.scrollWidth, window.innerWidth));
      const height = Math.ceil(Math.max(document.documentElement.scrollHeight, window.innerHeight));
      if (canvas.width === width && canvas.height === height) return;

      const snapshot = document.createElement("canvas");
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      snapshot.getContext("2d")?.drawImage(canvas, 0, 0);

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext("2d")?.drawImage(snapshot, 0, 0);
    };

    const scheduleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(resizeCanvas);
    };

    resizeCanvas();
    const observer = new ResizeObserver(scheduleResize);
    observer.observe(document.body);
    window.addEventListener("resize", scheduleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleResize);
      window.cancelAnimationFrame(resizeFrame);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let lastFrameTime = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isVisible = false;

    const placeCursor = () => {
      cursor.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    };

    const animateCursor = (timestamp: number) => {
      const elapsed = Math.min(32, lastFrameTime ? timestamp - lastFrameTime : 16.67);
      const smoothing = 1 - Math.exp(-elapsed / 22);
      lastFrameTime = timestamp;
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      const remainingDistance = Math.hypot(targetX - currentX, targetY - currentY);
      if (remainingDistance < 0.08) {
        currentX = targetX;
        currentY = targetY;
      }

      placeCursor();

      if (isVisible && remainingDistance >= 0.08) {
        animationFrame = window.requestAnimationFrame(animateCursor);
      } else {
        animationFrame = 0;
        lastFrameTime = 0;
      }
    };

    const moveCursor = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive =
        target instanceof Element &&
        Boolean(target.closest("[data-blackboard-toolbar], a, button, input, textarea, select, summary"));
      const shouldShow =
        toolRef.current !== "browse" && event.pointerType !== "touch" && !isInteractive;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!shouldShow) {
        isVisible = false;
        cursor.dataset.visible = "false";
        return;
      }

      if (!isVisible || event.buttons !== 0 || prefersReducedMotion.matches) {
        currentX = targetX;
        currentY = targetY;
        placeCursor();
      }

      isVisible = true;
      cursor.dataset.visible = "true";

      if (!animationFrame && event.buttons === 0 && !prefersReducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(animateCursor);
      }
    };

    const hideCursor = () => {
      isVisible = false;
      cursor.dataset.visible = "false";
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    };

    window.addEventListener("pointermove", moveCursor, { capture: true });
    window.addEventListener("blur", hideCursor);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", moveCursor, { capture: true });
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("mouseleave", hideCursor);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const isDrawingMode = tool !== "browse";
    document.documentElement.classList.toggle("blackboard-draw-mode", isDrawingMode);
    document.documentElement.dataset.blackboardTool = tool;

    return () => {
      document.documentElement.classList.remove("blackboard-draw-mode");
      delete document.documentElement.dataset.blackboardTool;
    };
  }, [tool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(target.closest("[data-blackboard-toolbar], a, button, input, textarea, select, summary"));

    const startDrawing = (event: PointerEvent) => {
      const activeTool = toolRef.current;
      if (activeTool === "browse" || event.button !== 0 || isInteractiveTarget(event.target)) return;

      event.stopPropagation();
      drawingRef.current = true;
      pointerIdRef.current = event.pointerId;
      lastPointRef.current = {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
      };

      if (event.pointerType === "touch") event.preventDefault();
    };

    const continueDrawing = (event: PointerEvent) => {
      const activeTool = toolRef.current;
      if (!drawingRef.current || pointerIdRef.current !== event.pointerId || activeTool === "browse") return;

      const lastPoint = lastPointRef.current;
      const context = canvas.getContext("2d");
      if (!lastPoint || !context) return;

      const nextPoint = {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
      };

      event.preventDefault();
      drawSegment(context, lastPoint, nextPoint, activeTool, colorRef.current);
      lastPointRef.current = nextPoint;
      if (activeTool !== "eraser") setHasDrawing(true);
    };

    const stopDrawing = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return;
      drawingRef.current = false;
      pointerIdRef.current = null;
      lastPointRef.current = null;
    };

    window.addEventListener("pointerdown", startDrawing, { capture: true });
    window.addEventListener("pointermove", continueDrawing, { capture: true, passive: false });
    window.addEventListener("pointerup", stopDrawing, { capture: true });
    window.addEventListener("pointercancel", stopDrawing, { capture: true });

    return () => {
      window.removeEventListener("pointerdown", startDrawing, { capture: true });
      window.removeEventListener("pointermove", continueDrawing, { capture: true });
      window.removeEventListener("pointerup", stopDrawing, { capture: true });
      window.removeEventListener("pointercancel", stopDrawing, { capture: true });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (event.key === "Escape") {
        toolRef.current = "browse";
        if (cursorRef.current) cursorRef.current.dataset.visible = "false";
        setTool("browse");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const togglePalette = () => {
    setIsOpen((open) => {
      if (open) {
        toolRef.current = "browse";
        if (cursorRef.current) cursorRef.current.dataset.visible = "false";
        setTool("browse");
      }
      return !open;
    });
  };

  const cursorStyle: CursorStyle = { "--cursor-color": color };

  return (
    <div className="blackboard-studio">
      <canvas ref={canvasRef} className="blackboard-canvas" aria-hidden="true" />
      <div
        ref={cursorRef}
        className="blackboard-tool-cursor"
        data-tool={tool}
        data-visible="false"
        style={cursorStyle}
        aria-hidden="true"
      >
        <ToolCursorGraphic tool={tool} />
      </div>

      <aside
        className={`blackboard-tools${isOpen ? " blackboard-tools--open" : ""}`}
        data-blackboard-toolbar
        aria-label="Blackboard drawing tools"
      >
        {isOpen && (
          <div className="blackboard-tools__panel">
            <div className="blackboard-tools__heading">
              <span>make a mess</span>
              <small>{toolLabels[tool]}</small>
            </div>

            <div className="blackboard-tools__tool-row" role="group" aria-label="Drawing tool">
              {(["browse", "chalk", "marker", "eraser"] as DrawingTool[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className="blackboard-tools__tool"
                  data-tool={item}
                  aria-pressed={tool === item}
                  onClick={() => selectTool(item)}
                >
                  <span aria-hidden="true">
                    {item === "browse" ? "↖" : item === "chalk" ? "✎" : item === "marker" ? "▰" : "◇"}
                  </span>
                  {toolLabels[item]}
                </button>
              ))}
            </div>

            <div className="blackboard-tools__colors" role="group" aria-label="Chalk and marker color">
              {colors.map((item) => {
                const style: SwatchStyle = { "--swatch-color": item.value };
                return (
                  <button
                    key={item.name}
                    type="button"
                    className="blackboard-tools__swatch"
                    style={style}
                    aria-label={`${item.name} color`}
                    aria-pressed={color === item.value}
                    onClick={() => selectColor(item.value)}
                  />
                );
              })}
            </div>

            <button
              type="button"
              className="blackboard-tools__clear"
              onClick={clearCanvas}
              disabled={!hasDrawing}
            >
              Clear board
            </button>
          </div>
        )}

        <button
          type="button"
          className="blackboard-tools__toggle"
          aria-expanded={isOpen}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={togglePalette}
        >
          <span aria-hidden="true">{isOpen ? "×" : "✎"}</span>
          {isOpen ? "Close" : "Draw on this page"}
        </button>
      </aside>

      <span className="blackboard-tools__status" aria-live="polite">
        {toolLabels[tool]} selected
      </span>
    </div>
  );
}
