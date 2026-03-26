import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Download, ArrowRight, ExternalLink } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiC,
  SiGit,
  SiGithub,
  SiLinux,
  SiGnubash,
  SiDocker,
  SiFigma,
  SiNumpy,
  SiPandas,
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
    label: "Languages",
    skills: [
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "C", Icon: SiC, color: "var(--text-primary)" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "var(--text-primary)" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "NumPy", Icon: SiNumpy, color: "#4DABCF" },
      { name: "Pandas", Icon: SiPandas, color: "#150458" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "var(--text-primary)" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Linux", Icon: SiLinux, color: "var(--text-primary)" },
      { name: "Bash", Icon: SiGnubash, color: "var(--text-primary)" },
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
                CS student at the University of Kansas. I build for the web,
                dabble in data science, and shoot photos when I&apos;m not
                writing code.
              </p>

              {/* Social + Resume */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
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
                  href="https://www.linkedin.com/in/rijulpoudel/"
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
                position: "relative",
              }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Rijul Poudel"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <Section id="about">
        <Divider />
        <p className="label-caps" style={{ marginBottom: "2rem" }}>
          About
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "3rem",
          }}
        >
          <div>
            <h2 className="text-h2" style={{ marginBottom: "1.5rem" }}>
              A bit about me.
            </h2>
            <p
              style={{
                lineHeight: "1.8",
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              I&apos;m studying Computer Science (Minor: Data Science) at the
              University of Kansas — KU Honors Program, Dean&apos;s List,
              International Excellence Award. I care as much about how software
              feels as how it works.
            </p>
            <p
              style={{
                lineHeight: "1.8",
                color: "var(--text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              I&apos;ve shipped across the stack: React/Next.js frontends,
              Python backends, cross-platform mobile apps, and a blockchain
              social network at a hackathon. Currently working as an IT
              Technician at KU while building things on the side.
            </p>
            <p style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
              Outside of code I run{" "}
              <a
                href="https://crafteako.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                Crafteako
                <ExternalLink size={14} />
              </a>{" "}
              — a photography and videography project. Originally from Kathmandu,
              Nepal.
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
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
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
        <p className="label-caps" style={{ marginBottom: "2.5rem" }}>
          Skills
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
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
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
              >
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
        <p className="label-caps" style={{ marginBottom: "2.5rem" }}>
          Experience
        </p>
        <div style={{ maxWidth: "680px" }}>
          {experiences.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} />
          ))}
        </div>
      </Section>
    </div>
  );
}
