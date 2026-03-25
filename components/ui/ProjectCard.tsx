import type { Project } from "@/data/projects";
import Tag from "./Tag";
import ExternalLink from "./ExternalLink";

const statusColors: Record<Project["status"], string> = {
  live: "#22c55e",
  "in-progress": "#f59e0b",
  archived: "#6b7280",
};

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div
      style={{
        padding: "1.75rem",
        backgroundColor: "var(--bg-secondary)",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        transition: "border-color 0.15s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <h3 className="text-h3">{project.title}</h3>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: statusColors[project.status],
              display: "inline-block",
            }}
          />
          {project.status}
        </span>
      </div>

      <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.9375rem" }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "1rem" }}>
        {project.techStack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
        {project.githubUrl && <ExternalLink href={project.githubUrl} label="GitHub" />}
        {project.liveUrl && <ExternalLink href={project.liveUrl} label="Live" />}
      </div>
    </div>
  );
}
