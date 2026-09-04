const CREAM = "#f5ece3";
const TANGERINE = "#e85749";

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
