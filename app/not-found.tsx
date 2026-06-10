import Link from "next/link";
import { PlateIllustration } from "@/components/ui/engravings";

export default function NotFound() {
  return (
    <div className="container-sheet" style={{ paddingBlock: "6rem", textAlign: "center" }}>
      <p className="voice-institutional" style={{ marginBottom: "1.5rem" }}>
        Catalog of Work · R. Poudel, Collector
      </p>
      <div style={{ color: "var(--ink-faded)", marginBottom: "1.5rem" }}>
        <PlateIllustration kind="lens" size={120} />
      </div>
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
