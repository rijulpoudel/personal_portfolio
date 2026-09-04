import type { Metadata } from "next";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Where Rijul has worked: Specify Collections Consortium, KU IT, and research in Nepal.",
};

export default function ExperiencePage() {
  return (
    <main className="container-sheet" style={{ paddingBlock: "3.5rem" }}>
      <p className="voice-kicker" style={{ marginBottom: "0.75rem" }}>
        Experience
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Where I have worked.
      </h1>
      <p
        className="voice-reading"
        style={{ color: "var(--ink-faded)", maxWidth: "560px", marginBottom: "3rem" }}
      >
        Full-time, part-time, and research — the short version lives on the
        homepage, this is the whole record.
      </p>

      {experiences.map((e) => (
        <article key={e.id} className="exp-item">
          <div className="exp-kicker">
            <span>{e.startDate} – {e.endDate ?? "present"}</span>

          </div>
          <p className="exp-org">{e.company}</p>
          <p className="exp-role">
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
            <p className="exp-stack">{e.techStack.join(" · ")}</p>
          )}
          {e.notes && e.notes.length > 0 && (
            <div style={{ marginTop: "1rem", display: "grid", gap: "0.625rem" }}>
              {e.notes.map((a, i) => (
                <div key={i} className="note-slip">
                  <span className="note-date"></span>
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
    </main>
  );
}
