"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import Tag from "./Tag";
import ExternalLink from "./ExternalLink";

const statusLabel: Record<Project["status"], string> = {
  live:          "Live",
  "in-progress": "In Progress",
  archived:      "Archived",
};

const statusColors: Record<Project["status"], string> = {
  live:          "#22c55e",
  "in-progress": "#f59e0b",
  archived:      "#6b7280",
};

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      {/* ── Album cover ───────────────────────────────────── */}
      <div
        style={{
          height: "180px",
          background: project.coverGradient,
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle noise texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        {/* Top row: status + year */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: statusColors[project.status],
                display: "inline-block",
              }}
            />
            {statusLabel[project.status]}
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Bottom: title + tagline */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {project.tagline && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "0.375rem",
                letterSpacing: "0.04em",
              }}
            >
              {project.tagline}
            </p>
          )}
          <h3
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
              color: "white",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────────── */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9375rem",
            lineHeight: "1.6",
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.375rem",
            marginTop: "1rem",
          }}
        >
          {project.techStack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1.25rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.875rem" }} onClick={(e) => e.preventDefault()}>
            {project.githubUrl && (
              <ExternalLink href={project.githubUrl} label="GitHub" />
            )}
            {project.liveUrl && (
              <ExternalLink href={project.liveUrl} label="Live" />
            )}
            {project.devpostUrl && (
              <ExternalLink href={project.devpostUrl} label="Devpost" />
            )}
          </div>
          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--accent)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            View project →
          </span>
        </div>
      </div>
    </Link>
  );
}
