import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ExternalLink from "@/components/ui/ExternalLink";

export const metadata: Metadata = {
  title: "Side Projects",
  description: "Experiments and fun builds.",
};

const sideProjects = [
  {
    name: "Placeholder Project",
    description: "A fun experiment. More details coming soon.",
    url: null,
  },
];

export default function SideProjectsPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Side Projects" />
      <div style={{ marginTop: "3rem", maxWidth: "640px" }}>
        {sideProjects.map((project) => (
          <div
            key={project.name}
            style={{ paddingBlock: "1.5rem", borderBottom: "1px solid var(--border)" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
              <h3 className="text-h3">{project.name}</h3>
              {project.url && <ExternalLink href={project.url} label="View" />}
            </div>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
