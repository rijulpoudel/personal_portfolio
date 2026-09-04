import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-sheet" style={{ paddingBlock: "6rem", textAlign: "center" }}>
      <p className="voice-kicker" style={{ marginBottom: "1.5rem" }}>
        404
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Nothing here but chalk dust.
      </h1>
      <p className="voice-reading" style={{ color: "var(--ink-faded)", marginBottom: "2.5rem" }}>
        The page you are looking for moved, or never existed.
      </p>
      <Link href="/" className="type-link">
        Back home
      </Link>
    </main>
  );
}
