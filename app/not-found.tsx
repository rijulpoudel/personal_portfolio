import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-sheet" style={{ paddingBlock: "7rem", textAlign: "center" }}>
      <p className="voice-institutional" style={{ marginBottom: "1.5rem" }}>
        Catalog of Work · R. Poudel, Collector
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Specimen not found.
      </h1>
      <p className="voice-reading" style={{ color: "var(--ink-faded)", marginBottom: "2.5rem" }}>
        Possibly out on loan. Possibly never accessioned.
      </p>
      <Link href="/" className="type-link">
        Return to ledger
      </Link>
    </div>
  );
}
