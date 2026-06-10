import type { Specimen } from "@/data/collection";
import { cn } from "@/lib/utils";

/**
 * The determination label — typeset like a herbarium label.
 * Bottom-right of every specimen sheet; holotypes get the red bar.
 */
export default function SpecimenLabel({
  specimen,
  children,
}: {
  specimen: Specimen;
  children?: React.ReactNode; // e.g. the EXAMINED stamp, absolutely positioned
}) {
  const s = specimen;
  return (
    <div className={cn("specimen-label", s.holotype && "is-holotype")}>
      {children}
      <p className="label-institution">
        Catalog of Work · R. Poudel, Collector · Lawrence, Kansas
      </p>

      <div className="label-row">
        <span className="label-no">No. {s.accession}</span>
        {s.holotype && <span className="holotype-mark">★ Holotype</span>}
      </div>

      <p className="label-name">
        {s.title}
        {s.nepali && (
          <span className="nepali">
            {" "}
            — {s.nepali.script} <span style={{ fontStyle: "italic" }}>(“{s.nepali.meaning}”)</span>
          </span>
        )}
      </p>
      <p className="label-common">{s.commonName}</p>

      <dl>
        <div className="label-field">
          <dt>Collected</dt>
          <dd>
            {s.collectedAt}, {s.eventDate}
          </dd>
        </div>
        <div className="label-field">
          <dt>Locality</dt>
          <dd>{s.locality}</dd>
        </div>
        <div className="label-field">
          <dt>Collectors</dt>
          <dd>{s.collectors}</dd>
        </div>
        <div className="label-field">
          <dt>Method</dt>
          <dd>{s.method}</dd>
        </div>
        <div className="label-field">
          <dt>Substrate</dt>
          <dd>{s.substrate.join(" · ")}</dd>
        </div>
        <div className="label-field">
          <dt>Status</dt>
          <dd>{s.status}</dd>
        </div>
      </dl>

      {s.determinations && s.determinations.length > 0 && (
        <div className="label-det">
          {s.determinations.map((d) => (
            <span key={d.text} className={cn("det-line", d.winner && "winner")}>
              det. {d.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
