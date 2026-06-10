import type { PlateKind } from "@/data/collection";

/**
 * Engraved plates: line illustrations in the manner of a 19th-century
 * field guide. Stroke-only, inherits ink color via currentColor.
 */

interface PlateProps {
  kind: PlateKind;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function Svg({
  children,
  size = 160,
  strokeWidth = 1.4,
  viewBox = "0 0 100 100",
  className,
}: {
  children: React.ReactNode;
  size?: number;
  strokeWidth?: number;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── fig. clock face, drawn at half past four ─────────────────── */
function Clock() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const x1 = 50 + 32 * Math.sin(a);
    const y1 = 50 - 32 * Math.cos(a);
    const x2 = 50 + 36 * Math.sin(a);
    const y2 = 50 - 36 * Math.cos(a);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  return (
    <>
      <circle cx="50" cy="50" r="39" />
      <circle cx="50" cy="50" r="36" />
      {ticks}
      {/* 4:30, the sundowning hour */}
      <line x1="50" y1="50" x2="63.4" y2="63.4" strokeWidth="2" />
      <line x1="50" y1="50" x2="50" y2="78" />
      <circle cx="50" cy="50" r="2" fill="currentColor" stroke="none" />
    </>
  );
}

/* ── fig. marigold (सयपत्री) ───────────────────────────────────── */
function Marigold() {
  const ring = (count: number, r: number, rx: number, ry: number, key: string) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse
        key={`${key}-${i}`}
        cx="0"
        cy={-r}
        rx={rx}
        ry={ry}
        transform={`rotate(${(360 / count) * i + (key === "b" ? 360 / count / 2 : 0)})`}
      />
    ));
  return (
    <>
      <g transform="translate(50,40)">
        <circle cx="0" cy="0" r="4.5" />
        {ring(8, 9, 4.5, 5.5, "a")}
        {ring(12, 17, 5, 6.5, "b")}
        {ring(14, 25, 5.5, 7, "c")}
      </g>
      <path d="M50,72 C48.5,80 51.5,84 50,92" />
      <path d="M50,80 C44,77 40,79 36,76 C39,82 45,83 50,82" />
      <path d="M50,86 C56,83 59,85 63,82 C60,88 54,89 50,88" />
    </>
  );
}

/* ── fig. speaking-trumpet ────────────────────────────────────── */
function Megaphone() {
  return (
    <>
      {/* cone */}
      <path d="M22,55 L64,31" />
      <path d="M22,69 L64,93" />
      <path d="M22,55 C17.5,58 17.5,66 22,69" />
      {/* bell mouth */}
      <path d="M64,31 C73,38 73,86 64,93" />
      <path d="M64,31 C68.5,38 68.5,86 64,93" />
      {/* bands */}
      <path d="M36,47 L36,77" />
      <path d="M50,39 L50,85" />
      {/* grip */}
      <path d="M34,79 L29,92" />
      <path d="M44,85 L39,98" />
      <path d="M29,92 L39,98" />
      {/* the voice, carrying */}
      <path d="M78,46 C84,53 84,71 78,78" />
      <path d="M86,39 C94,50 94,74 86,85" />
    </>
  );
}

/* ── fig. balance ─────────────────────────────────────────────── */
function Balance() {
  return (
    <>
      <circle cx="50" cy="20" r="2.5" />
      <line x1="50" y1="22.5" x2="50" y2="70" />
      <line x1="22" y1="27" x2="78" y2="27" />
      {/* left pan */}
      <line x1="22" y1="27" x2="13" y2="49" />
      <line x1="22" y1="27" x2="31" y2="49" />
      <path d="M11,49 Q22,60 33,49" />
      {/* right pan */}
      <line x1="78" y1="27" x2="69" y2="49" />
      <line x1="78" y1="27" x2="87" y2="49" />
      <path d="M67,49 Q78,60 89,49" />
      {/* base */}
      <path d="M40,70 L60,70 L65,78 L35,78 Z" />
    </>
  );
}

/* ── fig. hand lens ───────────────────────────────────────────── */
function Lens() {
  return (
    <>
      <circle cx="42" cy="42" r="24" />
      <circle cx="42" cy="42" r="20" />
      {/* glint */}
      <path d="M30,36 C31,31 36,27 41,26" />
      {/* handle */}
      <path d="M59,59 L76,76" />
      <path d="M63,55 L80,72" />
      <path d="M76,76 C78,80 82,76 80,72" />
    </>
  );
}

/* ── fig. field camera, bellows type ──────────────────────────── */
function Camera() {
  return (
    <>
      {/* rail */}
      <line x1="14" y1="82" x2="86" y2="82" />
      <circle cx="26" cy="87" r="3" />
      {/* rear standard */}
      <rect x="18" y="34" width="20" height="42" />
      <rect x="23" y="27" width="9" height="7" />
      {/* bellows */}
      <path d="M38,38 L44,42 L50,39 L56,44 L62,41" />
      <path d="M38,72 L44,68 L50,71 L56,66 L62,69" />
      <line x1="44" y1="42" x2="44" y2="68" />
      <line x1="50" y1="39" x2="50" y2="71" />
      <line x1="56" y1="44" x2="56" y2="66" />
      {/* front standard + lens */}
      <rect x="62" y="40" width="8" height="31" />
      <line x1="66" y1="71" x2="66" y2="82" />
      <circle cx="79" cy="55" r="9" />
      <circle cx="79" cy="55" r="4.5" />
    </>
  );
}

export function PlateIllustration({ kind, size, strokeWidth, className }: PlateProps) {
  const art = {
    clock: <Clock />,
    marigold: <Marigold />,
    megaphone: <Megaphone />,
    balance: <Balance />,
    lens: <Lens />,
    camera: <Camera />,
  }[kind];
  return (
    <Svg size={size} strokeWidth={strokeWidth} className={className}>
      {art}
    </Svg>
  );
}

/* ── Frontispiece: rhododendron & sunflower, stems crossed ──────── */

export function Frontispiece({ width = 220 }: { width?: number }) {
  const sunPetals = Array.from({ length: 12 }, (_, i) => (
    <ellipse
      key={i}
      cx="0"
      cy="-13.5"
      rx="3.4"
      ry="6.5"
      transform={`rotate(${30 * i})`}
    />
  ));
  return (
    <svg
      viewBox="0 0 200 120"
      width={width}
      height={(width * 120) / 200}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* left stem → rhododendron head at upper right */}
      <path d="M72,112 C82,92 100,62 118,40" />
      <path d="M84,92 C78,85 70,84 64,79 C72,78 80,82 85,88" />
      <path d="M97,72 C104,67 112,68 119,64 C113,72 104,74 98,71" />
      {/* rhododendron: trumpet cluster */}
      <g transform="translate(120,34)">
        <g>
          <path d="M0,0 C-8,1 -12,9 -10,17 C-7,15 -5,16 -4,19 C-1,16 1,16 4,19 C5,16 7,15 10,17 C12,9 8,1 0,0 Z" />
          <path d="M-2,17 L-3,23 M2,17 L3,23 M0,18 L0,25" strokeWidth="0.9" />
        </g>
        <g transform="rotate(-50) translate(0,-12)">
          <path d="M0,0 C-7,1 -10,8 -8,14 C-6,12 -4,13 -3,16 C-1,13 1,13 3,16 C4,13 6,12 8,14 C10,8 7,1 0,0 Z" />
        </g>
        <g transform="rotate(48) translate(0,-12)">
          <path d="M0,0 C-7,1 -10,8 -8,14 C-6,12 -4,13 -3,16 C-1,13 1,13 3,16 C4,13 6,12 8,14 C10,8 7,1 0,0 Z" />
        </g>
      </g>
      {/* right stem → sunflower head at upper left */}
      <path d="M128,112 C118,92 100,62 82,40" />
      <path d="M116,92 C122,85 130,84 136,79 C128,78 120,82 115,88" />
      <path d="M103,72 C96,67 88,68 81,64 C87,72 96,74 102,71" />
      {/* sunflower */}
      <g transform="translate(80,32)">
        <circle cx="0" cy="0" r="7.5" />
        <path d="M-4,-2 L4,-2 M-5,1 L5,1 M-3.5,4 L3.5,4 M-2,-5 L2,-5" strokeWidth="0.8" />
        {sunPetals}
      </g>
    </svg>
  );
}

/* ── The collection seal: a circular rubber stamp ──────────────── */

export function CollectionSeal({ size = 128 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <path
          id="seal-arc"
          d="M70,70 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
        />
      </defs>
      <circle cx="70" cy="70" r="62" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="70" cy="70" r="58" stroke="currentColor" strokeWidth="1" />
      <circle cx="70" cy="70" r="34" stroke="currentColor" strokeWidth="1" />
      <text
        fill="currentColor"
        stroke="none"
        style={{
          font: "700 10.5px var(--font-courier-prime), monospace",
          letterSpacing: "0.22em",
        }}
      >
        <textPath href="#seal-arc" startOffset="0">
          CATALOG OF WORK · R. POUDEL · LAWRENCE, KANSAS ·
        </textPath>
      </text>
      <text
        x="70"
        y="66"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        style={{
          font: "700 11px var(--font-courier-prime), monospace",
          letterSpacing: "0.18em",
        }}
      >
        EST.
      </text>
      <text
        x="70"
        y="82"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        style={{
          font: "700 13px var(--font-courier-prime), monospace",
          letterSpacing: "0.12em",
        }}
      >
        2024
      </text>
    </svg>
  );
}

/* ── Fleuron: a small typographic leaf ─────────────────────────── */

export function Fleuron({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 14 14"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7,0.8 C9,3.5 11.5,4.5 13.2,7 C11.5,9.5 9,10.5 7,13.2 C5,10.5 2.5,9.5 0.8,7 C2.5,4.5 5,3.5 7,0.8 Z" />
      <line x1="7" y1="3" x2="7" y2="11" strokeWidth="0.7" />
    </svg>
  );
}

export function FleuronDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        color: "var(--ink-faded)",
        marginBlock: "4.5rem",
      }}
    >
      <span style={{ borderTop: "1px solid var(--rule)", width: "4rem" }} />
      <Fleuron />
      <span style={{ borderTop: "1px solid var(--rule)", width: "4rem" }} />
    </div>
  );
}
