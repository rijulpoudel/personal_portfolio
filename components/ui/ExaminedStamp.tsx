"use client";

import { useEffect, useState } from "react";

/**
 * The EXAMINED stamp. The first time a visitor opens a specimen sheet,
 * the stamp thunks on with that day's date and is remembered in
 * localStorage, so revisits find the sheet already stamped.
 * Progressive enhancement only: renders nothing without JavaScript.
 */

function formatStampDate(d: Date): string {
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}

/** Deterministic rotation per specimen: -2.5° to +1°. */
function rotationFor(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 997;
  return -2.5 + (h % 36) / 10;
}

export default function ExaminedStamp({ slug }: { slug: string }) {
  const [state, setState] = useState<{ date: string; fresh: boolean } | null>(null);

  useEffect(() => {
    const key = `examined:${slug}`;
    try {
      const prior = localStorage.getItem(key);
      if (prior) {
        setState({ date: prior, fresh: false });
      } else {
        const date = formatStampDate(new Date());
        localStorage.setItem(key, date);
        setState({ date, fresh: true });
      }
    } catch {
      setState({ date: formatStampDate(new Date()), fresh: false });
    }
  }, [slug]);

  if (!state) return null;

  return (
    <span
      className={`stamp ${state.fresh ? "stamp--inking" : ""}`}
      style={{ "--stamp-rot": `${rotationFor(slug)}deg` } as React.CSSProperties}
      aria-hidden="true"
    >
      Examined
      <br />
      {state.date}
    </span>
  );
}
