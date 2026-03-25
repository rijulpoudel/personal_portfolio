import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Rijul Poudel",
  description: "Software Engineering Student. Building things on the web.",
};

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="container-page">
      {/* Hero */}
      <section style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <div>
          <h1 className="text-hero" style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic" }}>
            Rijul Poudel
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "1.5rem", fontSize: "1.125rem" }}>
            Software Engineering Student
          </p>
          <p style={{ color: "var(--text-tertiary)", marginTop: "0.75rem", maxWidth: "480px" }}>
            I build things for the web and occasionally think about how software fits into the rest of life.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <section style={{ paddingBottom: "var(--spacing-xl)" }}>
        <p className="label-caps" style={{ marginBottom: "2rem" }}>Featured Work</p>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {featured.map((project) => (
            <div key={project.slug} style={{ padding: "2rem", backgroundColor: "var(--bg-secondary)", borderRadius: "0.5rem" }}>
              <h3 className="text-h3">{project.title}</h3>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
