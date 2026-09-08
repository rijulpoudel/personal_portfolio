import Link from "next/link";

const CREAM = "#f5ece3";
const TANGERINE = "#e85749";
const BARCA_BLUE = "#0756a0";
const BARCA_GARNET = "#7e173f";

type FootballInviteDoodleProps = {
  variant: "desktop" | "mobile";
};

export function FootballInviteDoodle({ variant }: FootballInviteDoodleProps) {
  const clipId = `hero-football-${variant}`;

  return (
    <Link
      href="/football"
      className={`chalk-hero__football chalk-hero__football--${variant}`}
      aria-label="Enter the Midfield Room to talk football with Rijul"
    >
      <svg viewBox="0 0 230 104" aria-hidden="true">
        <text x="5" y="23" fill={CREAM} fontSize="17" transform="rotate(-2 5 23)">
          click if you wanna
        </text>
        <text x="19" y="45" fill={CREAM} fontSize="19" transform="rotate(1 19 45)">
          talk football
        </text>
        <path
          className="chalk-hero__football-arrow"
          d="M123 50 C151 45 166 51 176 64 M176 64 l-11 -3 M176 64 l2 -10"
          fill="none"
          stroke={TANGERINE}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g className="chalk-hero__football-ball" transform="translate(184 53) rotate(-11)">
          <defs>
            <clipPath id={clipId}>
              <circle cx="0" cy="0" r="25" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <circle cx="0" cy="0" r="25" fill="#0a1a32" />
            <path d="M-28 -12 C-9 -21 2 -15 12 3 C2 9 -8 14 -20 27 L-31 21 Z" fill={BARCA_BLUE} />
            <path d="M-7 -29 C10 -25 24 -13 29 1 C16 -3 5 2 -3 12 C-15 4 -16 -9 -7 -29 Z" fill={BARCA_GARNET} />
            <path d="M14 1 C29 4 32 17 22 29 C5 29 -6 23 -13 14 C-1 8 8 3 14 1 Z" fill={BARCA_BLUE} />
            <path d="M-23 -24 C-12 -30 -2 -30 5 -28 C0 -14 -7 -6 -17 -3 Z" fill={BARCA_GARNET} />
          </g>
          <circle cx="0" cy="0" r="25" fill="none" stroke={CREAM} strokeWidth="2.2" />
          <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(245,236,227,0.42)" strokeWidth="0.8" strokeDasharray="3 5" />
          <image
            href="/images/fc-barcelona-crest.svg"
            x="-7.5"
            y="-7.5"
            width="15"
            height="15"
            className="chalk-hero__football-crest"
          />
        </g>
      </svg>
    </Link>
  );
}
