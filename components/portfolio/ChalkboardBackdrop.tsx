export default function ChalkboardBackdrop() {
  return (
    <svg
      className="chalk-hero__backdrop"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="rijul-board-grid-small" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeOpacity="0.018" />
        </pattern>
        <pattern id="rijul-board-grid-large" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="url(#rijul-board-grid-small)" />
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#ffffff" strokeOpacity="0.045" />
        </pattern>
        <filter id="rijul-board-grain" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="17" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .12 0"
          />
        </filter>
      </defs>

      <rect width="1440" height="720" fill="#171717" fillOpacity="0.28" />
      <rect width="1440" height="720" fill="url(#rijul-board-grid-large)" />
      <rect width="1440" height="720" filter="url(#rijul-board-grain)" opacity="0.2" />

      <g fill="none" stroke="#f5ece3" strokeLinecap="round" opacity="0.11">
        <path d="M 20 178 C 205 171, 350 182, 520 176" strokeDasharray="4 20" />
        <path d="M 932 134 C 1095 145, 1252 128, 1416 140" strokeDasharray="2 18" />
        <path d="M 1088 602 C 1180 548, 1300 550, 1404 606" />
        <path d="M 1096 610 C 1190 568, 1302 570, 1394 616" strokeDasharray="3 14" />
        <path d="M 42 630 C 136 588, 246 596, 334 646" strokeDasharray="5 17" />
      </g>

      <g fill="#f5ece3" fontFamily="ui-monospace, monospace" fontSize="10" opacity="0.12">
        <text x="28" y="185">0</text>
        <text x="170" y="185">15°</text>
        <text x="318" y="185">30°</text>
        <text x="466" y="185">45°</text>
        <text x="1240" y="142">60°</text>
        <text x="1372" y="142">75°</text>
      </g>

      <g stroke="#f5ece3" strokeLinecap="round" opacity="0.12">
        <path d="M 84 84 h 22 M 95 73 v 22" />
        <path d="M 1334 300 h 26 M 1347 287 v 26" />
        <path d="M 246 534 h 20 M 256 524 v 20" />
        <path d="M 770 652 h 24 M 782 640 v 24" />
        <path d="M 476 86 l 24 18 M 500 86 l -24 18" opacity="0.45" />
        <path d="M 946 486 l 18 14 M 964 486 l -18 14" opacity="0.45" />
      </g>
    </svg>
  );
}
