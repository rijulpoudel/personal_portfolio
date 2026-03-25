import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Download, ArrowRight } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiGithub,
  SiLinux,
  SiGnubash,
} from "react-icons/si";
import GridBackground from "@/components/ui/GridBackground";
import ProjectCard from "@/components/ui/ProjectCard";
import TimelineEntry from "@/components/ui/TimelineEntry";
import Divider from "@/components/ui/Divider";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Rijul Poudel",
  description: "Software Engineering Student. Building things on the web.",
};

/* ─── Skills data ──────────────────────────────────────────────── */

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "React",        Icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",      Icon: SiNextdotjs,   color: "var(--text-primary)" },
      { name: "TypeScript",   Icon: SiTypescript,  color: "#3178C6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Python",  Icon: SiPython,    color: "#3776AB" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git",    Icon: SiGit,     color: "#F05032" },
      { name: "GitHub", Icon: SiGithub,  color: "var(--text-primary)" },
      { name: "Linux",  Icon: SiLinux,   color: "var(--text-primary)" },
      { name: "Bash",   Icon: SiGnubash, color: "var(--text-primary)" },
    ],
  },
];

/* ─── Section wrapper ──────────────────────────────────────────── */

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        zIndex: 1,
        paddingBlock: "6rem",
        scrollMarginTop: "72px",
      }}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div style={{ position: "relative" }}>
      <GridBackground />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "80px",
        }}
      >
        <div className="container-page" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "4rem",
              flexWrap: "wrap",
            }}
          >
            {/* Left — text */}
            <div style={{ flex: "1 1 360px" }}>
              <h1
                className="text-hero"
                style={{ fontStyle: "italic", marginBottom: "1.25rem" }}
              >
                Rijul Poudel
              </h1>

              <p
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.75rem",
                }}
              >
                Software Engineering Student
              </p>

              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-tertiary)",
                  maxWidth: "460px",
                  lineHeight: "1.7",
                  marginBottom: "2.5rem",
                }}
              >
                I build things for the web and occasionally think about how
                software fits into the rest of life. Based in Kathmandu.
              </p>

              {/* Social + Resume */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="https://github.com/rijulpoudel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="icon-link"
                >
                  <Github size={20} />
                </a>

                <a
                  href="https://linkedin.com/in/rijulpoudel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="icon-link"
                >
                  <Linkedin size={20} />
                </a>

                <a href="/resume.pdf" download className="resume-btn">
                  <Download size={15} />
                  Resume
                </a>
              </div>

              {/* Scroll hint */}
              <div style={{ marginTop: "4rem" }}>
                <Link
                  href="/#about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.8125rem",
                    color: "var(--text-tertiary)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  See my work <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right — photo placeholder */}
            <div
              style={{
                flex: "0 0 auto",
                width: "clamp(200px, 26vw, 320px)",
                aspectRatio: "3/4",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/*
                Replace this block with:
                <Image
                  src="/images/profile.jpg"
                  alt="Rijul Poudel"
                  fill
                  style={{ objectFit: "cover" }}
                />
                (add "position: relative" to the parent div and drop the flex centering)
              */}
              <div style={{ textAlign: "center", color: "var(--text-tertiary)", padding: "1.5rem" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "var(--border)",
                    margin: "0 auto 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "1.5rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  RP
                </div>
                <p style={{ fontSize: "0.75rem", lineHeight: "1.6" }}>
                  Add <code>public/images/profile.jpg</code>
                  <br />to replace this placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <Section id="about">
        <Divider />
        <p className="label-caps" style={{ marginBottom: "2rem" }}>About</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "3rem",
          }}
        >
          <div>
            <h2 className="text-h2" style={{ marginBottom: "1.5rem" }}>
              A bit about me.
            </h2>
            <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              I&apos;m a Software Engineering student with a focus on building
              clean, purposeful software. I care about how things work under the
              hood as much as how they feel on the surface.
            </p>
            <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
              Outside of code I shoot photos and video under{" "}
              <span style={{ color: "var(--accent)" }}>Crafteako</span> — a
              creative project about capturing moments most people scroll past.
            </p>
            <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
              Currently studying at KU, learning something new every day, and
              trying to ship more than I plan.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Projects ──────────────────────────────────────────── */}
      <Section id="projects">
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
          }}
        >
          <p className="label-caps">Projects</p>
          <Link
            href="/projects"
            style={{
              fontSize: "0.8125rem",
              color: "var(--accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            All projects <ArrowRight size={13} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <Section id="skills">
        <Divider />
        <p className="label-caps" style={{ marginBottom: "2.5rem" }}>Skills</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-tertiary)",
                  marginBottom: "1rem",
                }}
              >
                {group.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {group.skills.map(({ name, Icon, color }) => (
                  <div key={name} className="skill-card">
                    <Icon size={20} style={{ color, flexShrink: 0 }} />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Experience ────────────────────────────────────────── */}
      <Section id="experience">
        <Divider />
        <p className="label-caps" style={{ marginBottom: "2.5rem" }}>Experience</p>
        <div style={{ maxWidth: "680px" }}>
          {experiences.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} />
          ))}
        </div>
      </Section>
    </div>
  );
}
