"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/** Lighting control for the collection range. */
export default function StorageToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const inStorage = mounted && resolvedTheme === "dark";

  return (
    <button
      className="storage-toggle"
      onClick={() => setTheme(inStorage ? "light" : "dark")}
      aria-label="Toggle storage lighting"
    >
      Lighting:{" "}
      <span className={inStorage ? undefined : "lit"}>reading room</span>
      {" / "}
      <span className={inStorage ? "lit" : undefined}>storage</span>
    </button>
  );
}
