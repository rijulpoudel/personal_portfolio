"use client";

const CREAM = "#f5ece3";
const PINK = "#f6a4aa";
const YELLOW = "#f0c64d";
const MINT = "#9be9a8";
const TANGERINE = "#e85749";

function Smiley() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="26" fill="none" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" strokeDasharray="130 34" transform="rotate(24 32 32)" />
      <circle cx="24" cy="28" r="2.6" fill={YELLOW} />
      <circle cx="40" cy="28" r="2.6" fill={YELLOW} />
      <path d="M22 38 Q32 47 42 38" fill="none" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Flower() {
  return (
    <svg viewBox="0 0 64 76" aria-hidden="true">
      <path d="M32 40 C30 52 34 62 31 72" fill="none" stroke={MINT} strokeWidth="3" strokeLinecap="round" />
      <path d="M31 60 Q22 58 19 50 Q28 50 31 60" fill="none" stroke={MINT} strokeWidth="2.5" strokeLinecap="round" />
      {[
        "M32 12 C28 6 20 8 21 14 C22 19 29 19 32 12",
        "M32 12 C36 6 44 8 43 14 C42 19 35 19 32 12",
        "M32 26 C28 32 20 30 21 24 C22 19 29 19 32 26",
        "M32 26 C36 32 44 30 43 24 C42 19 35 19 32 26",
        "M18 19 C12 19 11 27 17 28 C22 29 24 23 18 19",
        "M46 19 C52 19 53 27 47 28 C42 29 40 23 46 19",
      ].map((d) => (
        <path key={d} d={d} fill="none" stroke={PINK} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <circle cx="32" cy="19" r="4" fill={YELLOW} />
    </svg>
  );
}

function Mushroom() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 30 C8 16 20 8 32 8 C44 8 56 16 56 30 C56 33 53 34 50 34 L14 34 C11 34 8 33 8 30" fill="none" stroke={TANGERINE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="22" r="2.5" fill={TANGERINE} />
      <circle cx="36" cy="18" r="2" fill={TANGERINE} />
      <circle cx="43" cy="26" r="2.5" fill={TANGERINE} />
      <path d="M26 34 C25 42 24 48 26 54 M38 34 C39 42 40 48 38 54" fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="42" r="1.8" fill={CREAM} />
      <circle cx="39" cy="46" r="1.8" fill={CREAM} />
    </svg>
  );
}

function Sparkles() {
  return (
    <svg viewBox="0 0 84 48" aria-hidden="true">
      <path d="M14 6 L16 16 L26 18 L16 20 L14 30 L12 20 L2 18 L12 16 Z" fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M58 2 L59.5 9 L66 10.5 L59.5 12 L58 19 L56.5 12 L50 10.5 L56.5 9 Z" fill={YELLOW} />
      <path d="M72 28 L73 33 L78 34 L73 35 L72 40 L71 35 L66 34 L71 33 Z" fill="none" stroke={PINK} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="11" fill="none" stroke={YELLOW} strokeWidth="3" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 32 + Math.cos(a) * 16;
        const y1 = 32 + Math.sin(a) * 16;
        const x2 = 32 + Math.cos(a) * 22;
        const y2 = 32 + Math.sin(a) * 22;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function Coffee() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M18 26 L20 50 C20 53 22 55 25 55 L41 55 C44 55 46 53 46 50 L48 26 Z" fill="none" stroke={CREAM} strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 30 C54 30 55 38 49 40 C47 41 46 40 46 40" fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
      <path d="M27 20 C27 16 31 16 31 12 M37 20 C37 16 41 16 41 12" fill="none" stroke={PINK} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="40" r="1.8" fill={PINK} />
      <circle cx="37" cy="44" r="1.8" fill={PINK} />
    </svg>
  );
}

export function ThatsMeArrow() {
  return (
    <svg viewBox="0 0 150 70" aria-hidden="true">
      <text x="8" y="24" fill={CREAM} fontSize="21" transform="rotate(-6 8 24)">
        that&apos;s me!
      </text>
      <path d="M104 38 C118 40 128 46 132 58 M132 58 l-9 -2 M132 58 l1 -9" fill="none" stroke={TANGERINE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroDoodles() {
  return (
    <div className="chalk-hero__doodles" aria-hidden="true">
      <span className="chalk-hero__doodle chalk-hero__doodle--smiley"><Smiley /></span>
      <span className="chalk-hero__doodle chalk-hero__doodle--flower"><Flower /></span>
      <span className="chalk-hero__doodle chalk-hero__doodle--mushroom"><Mushroom /></span>
      <span className="chalk-hero__doodle chalk-hero__doodle--sparkles"><Sparkles /></span>
      <span className="chalk-hero__doodle chalk-hero__doodle--sun"><Sun /></span>
      <span className="chalk-hero__doodle chalk-hero__doodle--coffee"><Coffee /></span>
    </div>
  );
}
