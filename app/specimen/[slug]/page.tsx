import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpecimen, specimens } from "@/data/collection";
import SpecimenLabel from "@/components/ui/SpecimenLabel";
import ExaminedStamp from "@/components/ui/ExaminedStamp";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return specimens.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecimen(slug);
  if (!s) return {};
  return {
    title: `${s.accession} · ${s.title}`,
    description: s.description,
  };
}

export default async function SpecimenSheet({ params }: Props) {
  const { slug } = await params;
  const s = getSpecimen(slug);
  if (!s) notFound();

  return (
    <article className="container-sheet" style={{ paddingBlock: "3rem 2rem" }}>
      {/* Sheet header */}
      <header className="no-print" style={{ marginBottom: "2.5rem" }}>
        <Link href="/" className="voice-type-caps quiet-link" style={{ textDecoration: "none", color: "var(--ink-faded)" }}>
          ← Return to ledger
        </Link>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "1rem",
          flexWrap: "wrap",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: "0.75rem",
          marginBottom: "2.5rem",
        }}
      >
        <span className="voice-institutional">Specimen Sheet</span>
        <span className="voice-type" style={{ color: "var(--ink-faded)" }}>
          No. {s.accession}
        </span>
      </div>

      {/* Title block */}
      <h1 className="display-title">
        {s.title}
        {s.nepali && (
          <span style={{ fontWeight: 400, color: "var(--ink-faded)" }}>
            {" "}
            · {s.nepali.script}
          </span>
        )}
      </h1>
      <p
        className="voice-reading"
        style={{ fontStyle: "italic", color: "var(--ink-faded)", marginTop: "0.5rem" }}
      >
        {s.commonName}
        {s.nepali && <> — “{s.nepali.meaning}” in Nepali</>}
      </p>

      {s.determinations?.some((d) => d.winner) && (
        <p
          className="voice-type-caps"
          style={{ color: "var(--type-red)", marginTop: "1rem" }}
        >
          {s.determinations
            .filter((d) => d.winner)
            .map((d) => d.text)
            .join("  ·  ")}
        </p>
      )}

      {/* Label + links */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "2.5rem",
          alignItems: "start",
          marginTop: "3rem",
        }}
      >
        <div>
          <p className="voice-reading" style={{ marginBottom: "1.5rem" }}>
            {s.description}
          </p>
          <div
            className="no-print"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            {s.links.github && (
              <a className="type-link" href={s.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {s.links.devpost && (
              <a className="type-link" href={s.links.devpost} target="_blank" rel="noopener noreferrer">
                Devpost
              </a>
            )}
            {s.links.live && (
              <a className="type-link" href={s.links.live} target="_blank" rel="noopener noreferrer">
                Live specimen
              </a>
            )}
          </div>
        </div>

        <div style={{ position: "relative", maxWidth: "26rem", justifySelf: "end", width: "100%" }}>
          <SpecimenLabel specimen={s}>
            <span className="stamp-anchor">
              <ExaminedStamp slug={s.slug} />
            </span>
          </SpecimenLabel>
        </div>
      </div>

      {/* Field notes */}
      <section style={{ marginTop: "4rem" }}>
        <h2 className="section-heading">Field Notes</h2>
        <div className="prose-archive" style={{ maxWidth: "640px" }}>
          {s.fieldNotes.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Dissection */}
      {s.dissection && (
        <section style={{ marginTop: "4rem" }}>
          <h2 className="section-heading">Dissection</h2>
          <p className="voice-reading" style={{ maxWidth: "640px", marginBottom: "2rem" }}>
            {s.dissection.description}
          </p>
          <dl style={{ display: "grid", gap: "1.25rem", maxWidth: "720px" }}>
            {s.dissection.components.map((c) => (
              <div
                key={c.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(8rem, 14rem) 1fr",
                  gap: "1rem",
                  borderBottom: "1px dashed var(--rule)",
                  paddingBottom: "1rem",
                }}
              >
                <dt className="voice-type" style={{ fontWeight: 700 }}>
                  {c.name}
                </dt>
                <dd
                  className="voice-reading"
                  style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.65 }}
                >
                  {c.role}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Annotation slips */}
      {s.annotations.length > 0 && (
        <section style={{ marginTop: "4rem" }}>
          <h2 className="section-heading">Annotations</h2>
          <div style={{ display: "grid", gap: "1rem", maxWidth: "640px" }}>
            {s.annotations.map((a, i) => (
              <div key={i} className="annotation-slip">
                <span className="ann-date">ann. {a.date} — </span>
                {a.text} <span className="ann-date">— R.P.</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <p
        className="voice-type print-note"
        style={{ marginTop: "4rem", color: "var(--ink-faded)" }}
      >
        This sheet is designed to be printed — ⌘P yields a catalog card.
      </p>
    </article>
  );
}
