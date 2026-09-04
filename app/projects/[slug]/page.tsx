import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import ProjectLabel from "@/components/ui/ProjectLabel";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getProject(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const s = getProject(slug);
  if (!s) notFound();

  return (
    <main>
    <article className="container-sheet" style={{ paddingBlock: "3rem 2rem" }}>
      {/* Sheet header */}
      <header className="no-print" style={{ marginBottom: "2.5rem" }}>
        <Link href="/#project-index" className="voice-type-caps quiet-link" style={{ textDecoration: "none", color: "var(--ink-faded)" }}>
          ← All projects
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
        <span className="voice-kicker">Project</span>
        <span className="voice-type" style={{ color: "var(--ink-faded)" }}>
          {s.eventDate}
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
        {s.tagline}
      </p>

      {s.awards?.some((d) => d.winner) && (
        <p
          className="voice-type-caps"
          style={{ color: "var(--type-red)", marginTop: "1rem" }}
        >
          {s.awards
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
                Live site
              </a>
            )}
          </div>
        </div>

        <div style={{ position: "relative", maxWidth: "26rem", justifySelf: "end", width: "100%" }}>
          <ProjectLabel project={s} />
        </div>
      </div>

      {/* Story */}
      <section style={{ marginTop: "4rem" }}>
        <h2 className="section-heading">The story</h2>
        <div className="prose-block" style={{ maxWidth: "640px" }}>
          {s.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Architecture */}
      {s.architecture && (
        <section style={{ marginTop: "4rem" }}>
          <h2 className="section-heading">How it&apos;s built</h2>
          <p className="voice-reading" style={{ maxWidth: "640px", marginBottom: "2rem" }}>
            {s.architecture.description}
          </p>
          <dl style={{ display: "grid", gap: "1.25rem", maxWidth: "720px" }}>
            {s.architecture.components.map((c) => (
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

      {/* Notes */}
      {s.notes.length > 0 && (
        <section style={{ marginTop: "4rem" }}>
          <h2 className="section-heading">Notes</h2>
          <div style={{ display: "grid", gap: "1rem", maxWidth: "640px" }}>
            {s.notes.map((a, i) => (
              <div key={i} className="note-slip">
                <span className="note-date">{a.date}. </span>
                {a.text} <span className="note-date">· R.P.</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <p
        className="voice-type print-note"
        style={{ marginTop: "4rem", color: "var(--ink-faded)" }}
      >
        This page is designed to be printed. ⌘P yields a clean project sheet.
      </p>
    </article>
    </main>
  );
}
