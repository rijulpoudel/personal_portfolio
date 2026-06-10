import type { Metadata } from "next";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Deposits & Determinations",
  description:
    "Where the collector has been deposited: Specify Collections Consortium, KU IT, and field work in Kathmandu.",
};

export default function ExperiencePage() {
  return (
    <div className="container-sheet" style={{ paddingBlock: "3.5rem" }}>
      <p className="voice-institutional" style={{ marginBottom: "0.75rem" }}>
        Deposits &amp; Determinations
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Where the collector has been deposited.
      </h1>
      <p
        className="voice-reading"
        style={{ color: "var(--ink-faded)", maxWidth: "560px", marginBottom: "3rem" }}
      >
        In a museum, a deposit is a specimen placed in an institution&apos;s
        permanent care. These are mine — most recently with the people who
        build the software that natural history collections run on.
      </p>

      {experiences.map((e) => (
        <article key={e.accession} className="deposit">
          <div className="deposit-kicker">
            <span>No. {e.accession} · deposit</span>
            <span>
              {e.startDate} – {e.endDate ?? "present"}
            </span>
          </div>
          <p className="deposit-org">{e.company}</p>
          <p className="deposit-role">
            {e.role}
            {e.location && <> · {e.location}</>}
          </p>
          {e.context && (
            <p
              className="voice-reading"
              style={{ fontSize: "0.9375rem", marginBottom: "0.875rem", color: "var(--ink-faded)" }}
            >
              {e.context}
            </p>
          )}
          <ul>
            {e.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          {e.techStack && (
            <p className="deposit-substrate">Substrate: {e.techStack.join(" · ")}</p>
          )}
          {e.annotations && e.annotations.length > 0 && (
            <div style={{ marginTop: "1rem", display: "grid", gap: "0.625rem" }}>
              {e.annotations.map((a, i) => (
                <div key={i} className="annotation-slip">
                  <span className="ann-date">ann. — </span>
                  {a.url ? (
                    <a className="quiet-link" href={a.url} target="_blank" rel="noopener noreferrer">
                      {a.text}
                    </a>
                  ) : (
                    a.text
                  )}
                </div>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
