import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default function ProjectsPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Projects" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
          gap: "1.5rem",
          marginTop: "3rem",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
