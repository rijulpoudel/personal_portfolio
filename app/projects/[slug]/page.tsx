import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import Tag from "@/components/ui/Tag";
import ExternalLink from "@/components/ui/ExternalLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

const statusLabel = {
  live: "Live",
  "in-progress": "In Progress",
  archived: "Archived",
} as const;

const statusColors = {
  live: "#22c55e",
  "in-progress": "#f59e0b",
  archived: "#6b7280",
} as const;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div>
      {/* ── Gradient Hero ──────────────────────────────────────── */}
      <div
        style={{
          background: project.coverGradient,
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "4rem",
          paddingTop: "120px", /* clears fixed navbar */
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Noise overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div className="container-page" style={{ position: "relative", zIndex: 1 }}>
          {/* Back link */}
          <Link
            href="/#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              marginBottom: "2rem",
              transition: "color 0.15s ease",
            }}
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>

          {/* Year + timeline */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.875rem",
            }}
          >
            {project.year}
            {project.timeline ? ` · ${project.timeline}` : ""}
            {project.teamSize ? ` · ${project.teamSize}-person team` : ""}
          </p>

          {/* Title */}
          <h1
            className="text-hero"
            style={{ color: "white", fontStyle: "italic", marginBottom: "0.75rem" }}
          >
            {project.title}
          </h1>

          {/* Tagline */}
          {project.tagline && (
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "2rem",
                maxWidth: "560px",
              }}
            >
              {project.tagline}
            </p>
          )}

          {/* Links */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 1.25rem",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  transition: "background-color 0.15s ease",
                }}
              >
                GitHub →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 1.25rem",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(255,255,255,0.07)",
                }}
              >
                Live Site →
              </a>
            )}
            {project.devpostUrl && (
              <a
                href={project.devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 1.25rem",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(255,255,255,0.07)",
                }}
              >
                Devpost →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="container-page" style={{ paddingTop: "5rem", paddingBottom: "8rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
        >
          {/* Responsive two-col wrapper */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 280px",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* ── Main content ─────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

              {/* Overview */}
              {project.overview && (
                <section>
                  <p className="label-caps" style={{ marginBottom: "1rem" }}>Overview</p>
                  <p
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: "1.8",
                      color: "var(--text-secondary)",
                      maxWidth: "640px",
                    }}
                  >
                    {project.overview}
                  </p>
                </section>
              )}

              {/* Thought Process */}
              {project.thoughtProcess && project.thoughtProcess.length > 0 && (
                <section>
                  <h2 className="text-h2" style={{ marginBottom: "1.5rem" }}>
                    Thought Process
                  </h2>
                  <div
                    style={{
                      borderLeft: "2px solid var(--border)",
                      paddingLeft: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    {project.thoughtProcess.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          lineHeight: "1.8",
                          color: "var(--text-secondary)",
                          fontSize: "0.9375rem",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {/* System Architecture */}
              {project.architecture && (
                <section>
                  <h2 className="text-h2" style={{ marginBottom: "1rem" }}>
                    System Architecture
                  </h2>
                  <p
                    style={{
                      lineHeight: "1.8",
                      color: "var(--text-secondary)",
                      marginBottom: "2rem",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {project.architecture.description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                    {project.architecture.components.map((comp, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "200px 1fr",
                          gap: "1.5rem",
                          padding: "1.25rem 0",
                          borderBottom: "1px solid var(--border)",
                          alignItems: "start",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontWeight: 500,
                              color: "var(--text-primary)",
                              fontSize: "0.9375rem",
                              lineHeight: 1.3,
                            }}
                          >
                            {comp.name}
                          </p>
                        </div>
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.9375rem",
                            lineHeight: "1.7",
                          }}
                        >
                          {comp.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Key Learnings */}
              {project.keyLearnings && project.keyLearnings.length > 0 && (
                <section>
                  <h2 className="text-h2" style={{ marginBottom: "1.5rem" }}>
                    Key Learnings
                  </h2>
                  <ol
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {project.keyLearnings.map((learning, i) => (
                      <li
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2rem 1fr",
                          gap: "1rem",
                          alignItems: "start",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--accent)",
                            fontFamily: "var(--font-instrument-serif)",
                            fontStyle: "italic",
                            paddingTop: "0.2rem",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.9375rem",
                            lineHeight: "1.7",
                          }}
                        >
                          {learning}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────────── */}
            <aside
              style={{
                position: "sticky",
                top: "100px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {/* Status */}
              <div>
                <p className="label-caps" style={{ marginBottom: "0.625rem" }}>Status</p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: statusColors[project.status],
                      display: "inline-block",
                    }}
                  />
                  {statusLabel[project.status]}
                </span>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="label-caps" style={{ marginBottom: "0.75rem" }}>Tech Stack</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {project.techStack.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              {project.timeline && (
                <div>
                  <p className="label-caps" style={{ marginBottom: "0.5rem" }}>Timeline</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    {project.timeline}
                  </p>
                </div>
              )}

              {/* Team */}
              {project.teamSize && (
                <div>
                  <p className="label-caps" style={{ marginBottom: "0.5rem" }}>Team</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    {project.teamSize === 1
                      ? "Solo project"
                      : `${project.teamSize} people`}
                  </p>
                </div>
              )}

              {/* Links */}
              {(project.githubUrl || project.liveUrl || project.devpostUrl) && (
                <div>
                  <p className="label-caps" style={{ marginBottom: "0.75rem" }}>Links</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {project.githubUrl && (
                      <ExternalLink href={project.githubUrl} label="GitHub" />
                    )}
                    {project.liveUrl && (
                      <ExternalLink href={project.liveUrl} label="Live Site" />
                    )}
                    {project.devpostUrl && (
                      <ExternalLink href={project.devpostUrl} label="Devpost" />
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
