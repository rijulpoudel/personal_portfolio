import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description: "A bit about who I am and what I care about.",
};

export default function AboutPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="About" />
      <div style={{ maxWidth: "640px", marginTop: "3rem" }}>
        <p style={{ lineHeight: "1.7", color: "var(--text-primary)" }}>
          Placeholder bio — I&apos;m a Software Engineering student at KU with an interest in building
          clean, thoughtful software. I care about design, systems, and the intersection of the two.
        </p>
        <p style={{ lineHeight: "1.7", color: "var(--text-primary)", marginTop: "1.5rem" }}>
          Outside of code I shoot photos and video under{" "}
          <span style={{ color: "var(--accent)" }}>Crafteako</span> and spend too much time watching
          films and reading about things that probably won&apos;t make me employable.
        </p>
      </div>
    </div>
  );
}
