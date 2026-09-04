"use client";

import {
  Minus,
  Move,
  Plus,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import type {
  CSSProperties,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WORLD_WIDTH = 2400;
const WORLD_HEIGHT = 1500;
const MIN_SCALE = 0.34;
const MAX_SCALE = 1.2;
const STORAGE_KEY = "rijul-football-questions-v1";

const clubs = [
  { id: "barcelona", label: "FC Barcelona", short: "BAR" },
  { id: "arsenal", label: "Arsenal", short: "ARS" },
  { id: "liverpool", label: "Liverpool", short: "LIV" },
  { id: "manchester-united", label: "Manchester United", short: "MUN" },
  { id: "real-madrid", label: "Real Madrid", short: "RMA" },
  { id: "chelsea", label: "Chelsea", short: "CHE" },
  { id: "bayern", label: "Bayern Munich", short: "FCB" },
  { id: "milan", label: "AC Milan", short: "ACM" },
  { id: "tottenham", label: "Tottenham Hotspur", short: "TOT" },
  { id: "other", label: "Another club / neutral", short: "FC" },
] as const;

type ClubId = (typeof clubs)[number]["id"];

type FootballQuestion = {
  id: string;
  name: string;
  club: ClubId;
  question: string;
  x: number;
  y: number;
  rotation: number;
  createdAt: string;
  kind: "prompt" | "visitor";
  answer?: string;
};

type Camera = {
  x: number;
  y: number;
  scale: number;
};

const warmupQuestions: FootballQuestion[] = [
  {
    id: "warmup-pedri",
    name: "Kick-off prompt",
    club: "barcelona",
    question: "Which Pedri performance made you stop and rewatch the midfield?",
    x: 1200,
    y: 750,
    rotation: -2,
    createdAt: "",
    kind: "prompt",
  },
  {
    id: "warmup-space",
    name: "Kick-off prompt",
    club: "liverpool",
    question: "Which midfielder taught you to watch the game away from the ball?",
    x: 440,
    y: 320,
    rotation: 3,
    createdAt: "",
    kind: "prompt",
  },
  {
    id: "warmup-opinion",
    name: "Kick-off prompt",
    club: "arsenal",
    question: "What is your most irrational football opinion? Defend it.",
    x: 1940,
    y: 330,
    rotation: -4,
    createdAt: "",
    kind: "prompt",
  },
  {
    id: "warmup-rival",
    name: "Kick-off prompt",
    club: "real-madrid",
    question: "One player from a rival you would take at Barça. No hesitation.",
    x: 500,
    y: 1170,
    rotation: -3,
    createdAt: "",
    kind: "prompt",
  },
  {
    id: "warmup-away-leg",
    name: "Kick-off prompt",
    club: "barcelona",
    question: "Xavi, Iniesta, Busquets, Pedri. Who controls the impossible away leg?",
    x: 1900,
    y: 1140,
    rotation: 2,
    createdAt: "",
    kind: "prompt",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isClubId(value: unknown): value is ClubId {
  return clubs.some((club) => club.id === value);
}

function isStoredQuestion(value: unknown): value is FootballQuestion {
  if (!value || typeof value !== "object") return false;
  const question = value as Partial<FootballQuestion>;
  return (
    typeof question.id === "string" &&
    typeof question.name === "string" &&
    isClubId(question.club) &&
    typeof question.question === "string" &&
    typeof question.x === "number" &&
    typeof question.y === "number" &&
    typeof question.rotation === "number" &&
    typeof question.createdAt === "string" &&
    question.kind === "visitor"
  );
}

function loadStoredQuestions() {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredQuestion).slice(-40);
  } catch {
    return [];
  }
}

function saveStoredQuestions(questions: FootballQuestion[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questions.slice(-40)));
  } catch {
    // The board still works for this visit when storage is unavailable.
  }
}

function findOpenPosition(questions: FootballQuestion[]) {
  const minimumDistance = 300;
  for (let attempt = 0; attempt < 36; attempt += 1) {
    const candidate = {
      x: 300 + Math.random() * (WORLD_WIDTH - 600),
      y: 240 + Math.random() * (WORLD_HEIGHT - 480),
    };
    const isOpen = questions.every(
      (question) => Math.hypot(question.x - candidate.x, question.y - candidate.y) > minimumDistance,
    );
    if (isOpen) return candidate;
  }

  return {
    x: 300 + Math.random() * (WORLD_WIDTH - 600),
    y: 240 + Math.random() * (WORLD_HEIGHT - 480),
  };
}

function PitchDrawing() {
  return (
    <svg className="football-question-world__pitch" viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} aria-hidden="true">
      <rect x="90" y="90" width="2220" height="1320" rx="18" />
      <path d="M1200 90v1320" />
      <circle cx="1200" cy="750" r="185" />
      <circle cx="1200" cy="750" r="9" className="football-question-world__spot" />
      <path d="M90 430h300v640H90M2310 430h-300v640h300" />
      <path d="M90 560h130v380H90M2310 560h-130v380h130" />
      <circle cx="300" cy="750" r="8" className="football-question-world__spot" />
      <circle cx="2100" cy="750" r="8" className="football-question-world__spot" />
      <path d="M390 585a190 190 0 0 1 0 330M2010 585a190 190 0 0 0 0 330" />
      <path d="M90 210h150M90 1290h150M2310 210h-150M2310 1290h-150" className="football-question-world__chalk" />
    </svg>
  );
}

function QuestionCard({
  question,
  isNew,
  onSelect,
}: {
  question: FootballQuestion;
  isNew: boolean;
  onSelect: (id: string) => void;
}) {
  const club = clubs.find((item) => item.id === question.club) ?? clubs.at(-1)!;
  const style = {
    left: question.x,
    top: question.y,
    "--question-tilt": `${question.rotation}deg`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`football-question-card${isNew ? " football-question-card--new" : ""}`}
      data-club={question.club}
      data-kind={question.kind}
      style={style}
      onClick={() => onSelect(question.id)}
      aria-label={`Open question from ${question.name}, ${club.label} supporter`}
    >
      <span className="football-question-card__club">{club.short}</span>
      <strong>{question.question}</strong>
      <span className="football-question-card__name">{question.name}</span>
    </button>
  );
}

export default function QuestionUniverse() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panFrameRef = useRef<number | null>(null);
  const pendingCameraRef = useRef<Camera | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    cameraX: number;
    cameraY: number;
    scale: number;
  } | null>(null);
  const [camera, setCamera] = useState<Camera>({ x: -540, y: -350, scale: 0.62 });
  const [isDragging, setIsDragging] = useState(false);
  const [visitorQuestions, setVisitorQuestions] = useState<FootballQuestion[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newQuestionId, setNewQuestionId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [name, setName] = useState("");
  const [club, setClub] = useState<ClubId>("barcelona");
  const [question, setQuestion] = useState("");
  const [formError, setFormError] = useState("");

  const allQuestions = useMemo(
    () => [...warmupQuestions, ...visitorQuestions],
    [visitorQuestions],
  );
  const selectedQuestion = allQuestions.find((item) => item.id === selectedId) ?? null;
  const selectedClub = selectedQuestion
    ? clubs.find((item) => item.id === selectedQuestion.club) ?? clubs.at(-1)!
    : null;

  const centerCamera = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const scale = rect.width <= 600 ? 0.52 : 0.62;
    setCamera({
      scale,
      x: rect.width / 2 - (WORLD_WIDTH * scale) / 2,
      y: rect.height / 2 - (WORLD_HEIGHT * scale) / 2,
    });
  }, []);

  useEffect(() => {
    setVisitorQuestions(loadStoredQuestions());
    centerCamera();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(centerCamera);
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      if (panFrameRef.current !== null) window.cancelAnimationFrame(panFrameRef.current);
    };
  }, [centerCamera]);

  const changeZoom = useCallback(
    (getNextScale: (currentScale: number) => number, clientX?: number, clientY?: number) => {
      setCamera((current) => {
        const viewport = viewportRef.current;
        if (!viewport) return current;
        const rect = viewport.getBoundingClientRect();
        const pointX = clientX === undefined ? rect.width / 2 : clientX - rect.left;
        const pointY = clientY === undefined ? rect.height / 2 : clientY - rect.top;
        const scale = clamp(getNextScale(current.scale), MIN_SCALE, MAX_SCALE);
        const worldX = (pointX - current.x) / current.scale;
        const worldY = (pointY - current.y) / current.scale;
        return {
          scale,
          x: pointX - worldX * scale,
          y: pointY - worldY * scale,
        };
      });
    },
    [],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.0012);
      changeZoom((currentScale) => currentScale * factor, event.clientX, event.clientY);
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [changeZoom]);

  const centerOnQuestion = useCallback((x: number, y: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    setCamera((current) => {
      const scale = Math.max(current.scale, 0.72);
      return {
        scale,
        x: rect.width / 2 - x * scale,
        y: rect.height / 2 - y * scale,
      };
    });
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button, a, input, select, textarea")) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      cameraX: camera.x,
      cameraY: camera.y,
      scale: camera.scale,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    pendingCameraRef.current = {
      scale: drag.scale,
      x: drag.cameraX + event.clientX - drag.startX,
      y: drag.cameraY + event.clientY - drag.startY,
    };
    if (panFrameRef.current !== null) return;
    panFrameRef.current = window.requestAnimationFrame(() => {
      panFrameRef.current = null;
      if (pendingCameraRef.current) setCamera(pendingCameraRef.current);
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (panFrameRef.current !== null) {
      window.cancelAnimationFrame(panFrameRef.current);
      panFrameRef.current = null;
    }
    if (pendingCameraRef.current) {
      setCamera(pendingCameraRef.current);
      pendingCameraRef.current = null;
    }
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 140 : 70;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setCamera((current) => ({ ...current, x: current.x + step }));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setCamera((current) => ({ ...current, x: current.x - step }));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCamera((current) => ({ ...current, y: current.y + step }));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setCamera((current) => ({ ...current, y: current.y - step }));
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      changeZoom((currentScale) => currentScale + 0.1);
    } else if (event.key === "-") {
      event.preventDefault();
      changeZoom((currentScale) => currentScale - 0.1);
    } else if (event.key === "0" || event.key === "Home") {
      event.preventDefault();
      centerCamera();
    }
  };

  const openQuestionForm = () => {
    setFormError("");
    dialogRef.current?.showModal();
  };

  const closeQuestionForm = () => {
    dialogRef.current?.close();
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanQuestion = question.trim();
    if (cleanName.length < 2) {
      setFormError("Give me at least two letters for your name.");
      return;
    }
    if (cleanQuestion.length < 12) {
      setFormError("That needs a little more bite. Use at least 12 characters.");
      return;
    }

    const position = findOpenPosition(allQuestions);
    const created: FootballQuestion = {
      id: window.crypto.randomUUID(),
      name: cleanName.slice(0, 32),
      club,
      question: cleanQuestion.slice(0, 180),
      x: Math.round(position.x),
      y: Math.round(position.y),
      rotation: Math.round((Math.random() * 8 - 4) * 10) / 10,
      createdAt: new Date().toISOString(),
      kind: "visitor",
    };
    const next = [...visitorQuestions, created].slice(-40);
    setVisitorQuestions(next);
    saveStoredQuestions(next);
    setName("");
    setQuestion("");
    setFormError("");
    setSelectedId(created.id);
    setNewQuestionId(created.id);
    setAnnouncement(`${created.question} has landed on the tactics board.`);
    closeQuestionForm();
    centerOnQuestion(created.x, created.y);
    window.setTimeout(() => setNewQuestionId(null), 900);
  };

  return (
    <section className="football-question-universe" aria-labelledby="question-universe-title">
      <header className="football-question-universe__header">
        <div>
          <p className="football-kicker">The supporters&apos; tactics board</p>
          <h2 id="question-universe-title">Every question finds a position.</h2>
        </div>
        <div className="football-question-universe__intro">
          <p>
            Drag the pitch. Zoom into a card. Leave your own question somewhere in the formation.
          </p>
          <span>Prototype mode · your questions stay on this device</span>
        </div>
      </header>

      <div className="football-question-shell">
        <div className="football-question-toolbar" aria-label="Tactics board controls">
          <span className="football-question-toolbar__move">
            <Move size={15} aria-hidden="true" /> Drag to move
          </span>
          <div className="football-question-toolbar__zoom">
            <button type="button" onClick={() => changeZoom((currentScale) => currentScale - 0.1)} aria-label="Zoom out">
              <Minus size={17} aria-hidden="true" />
            </button>
            <output aria-live="polite">{Math.round(camera.scale * 100)}%</output>
            <button type="button" onClick={() => changeZoom((currentScale) => currentScale + 0.1)} aria-label="Zoom in">
              <Plus size={17} aria-hidden="true" />
            </button>
            <button type="button" onClick={centerCamera} aria-label="Reset board position and zoom">
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="football-question-toolbar__ask" onClick={openQuestionForm}>
            Ask a question <Send size={15} aria-hidden="true" />
          </button>
        </div>

        <div
          ref={viewportRef}
          className="football-question-viewport"
          data-dragging={isDragging}
          role="region"
          aria-label="Zoomable football question tactics board. Use arrow keys to move, plus and minus to zoom, and zero to reset."
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={handleKeyDown}
        >
          <div
            className="football-question-world"
            style={{ transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})` }}
          >
            <PitchDrawing />
            <span className="football-question-world__label football-question-world__label--home" aria-hidden="true">
              HOME / IDEAS
            </span>
            <span className="football-question-world__label football-question-world__label--away" aria-hidden="true">
              AWAY / ARGUMENTS
            </span>
            {allQuestions.map((item) => (
              <QuestionCard
                key={item.id}
                question={item}
                isNew={item.id === newQuestionId}
                onSelect={setSelectedId}
              />
            ))}
          </div>

          <div className="football-question-viewport__hint" aria-hidden="true">
            <span>scroll to zoom</span>
            <span>drag to roam</span>
          </div>

          {selectedQuestion && selectedClub ? (
            <aside className="football-question-detail" data-club={selectedQuestion.club} aria-live="polite">
              <button
                type="button"
                className="football-question-detail__close"
                onClick={() => setSelectedId(null)}
                aria-label="Close question"
              >
                <X size={17} aria-hidden="true" />
              </button>
              <p className="football-question-detail__club">{selectedClub.label}</p>
              <blockquote>{selectedQuestion.question}</blockquote>
              <p className="football-question-detail__from">from {selectedQuestion.name}</p>
              <div className="football-question-detail__answer" data-empty={!selectedQuestion.answer}>
                <span>Rijul&apos;s reply</span>
                <p>{selectedQuestion.answer ?? "Waiting on the touchline."}</p>
              </div>
            </aside>
          ) : null}
        </div>
      </div>

      <p className="football-question-universe__mobile-note">
        On a phone: drag with one finger, then use +/− to zoom. Scroll the page from outside the pitch.
      </p>

      <button type="button" className="football-question-cta" onClick={openQuestionForm}>
        Put your question on the board <span aria-hidden="true">↗</span>
      </button>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <dialog ref={dialogRef} className="football-question-dialog" onClose={() => setFormError("")}>
        <form onSubmit={submitQuestion}>
          <header>
            <div>
              <p className="football-kicker">Join the formation</p>
              <h3>Leave a football question.</h3>
            </div>
            <button type="button" onClick={closeQuestionForm} aria-label="Close question form">
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <label>
            <span>Your name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              minLength={2}
              maxLength={32}
              autoComplete="name"
              placeholder="Rijul"
              required
            />
          </label>

          <label>
            <span>Your club</span>
            <select value={club} onChange={(event) => setClub(event.target.value as ClubId)} required>
              {clubs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Your question</span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              minLength={12}
              maxLength={180}
              rows={5}
              placeholder="What do you want to argue about?"
              required
            />
            <small>{question.length}/180</small>
          </label>

          {formError ? <p className="football-question-dialog__error">{formError}</p> : null}

          <p className="football-question-dialog__privacy">
            Prototype only. This saves in your browser, not on a public server yet.
          </p>

          <button className="football-question-dialog__submit" type="submit">
            Send it onto the pitch <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </dialog>
    </section>
  );
}
