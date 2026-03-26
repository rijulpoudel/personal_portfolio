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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 640px)",
          marginTop: "3rem",
          gap: "1.5rem",
        }}
      >
        <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1rem" }}>
          I&apos;m Rijul — a Computer Science student at the{" "}
          <span style={{ color: "var(--text-primary)" }}>University of Kansas</span> (BS CS,
          Minor in Data Science, expected May 2027). I&apos;m in the KU Honors Program and on the
          Dean&apos;s List, which mostly means I spend a lot of time in the library.
        </p>

        <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1rem" }}>
          I care about building software that actually works for people — not just technically
          correct, but thoughtfully designed. I&apos;ve built across the stack: React frontends,
          Python backends, mobile apps, blockchain experiments, and everything in between. I&apos;m
          particularly drawn to the intersection of clean engineering and good UX.
        </p>

        <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1rem" }}>
          Outside of code I run{" "}
          <span style={{ color: "var(--accent)" }}>Crafteako</span> — a photography and
          videography project where I shoot things that most people walk past. I use Adobe
          Lightroom and DaVinci Resolve for editing, and I&apos;m always looking for an interesting
          frame.
        </p>

        <p style={{ lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1rem" }}>
          I grew up in Kathmandu, Nepal, and came to Kansas for university. That context shapes how
          I think about technology — both what it can do and what it tends to assume.
        </p>

        {/* Quick facts */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { label: "University", value: "University of Kansas" },
            { label: "Degree", value: "BS Computer Science" },
            { label: "Minor", value: "Data Science" },
            { label: "Expected", value: "May 2027" },
            { label: "Based in", value: "Lawrence, KS" },
            { label: "From", value: "Kathmandu, Nepal" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="label-caps" style={{ marginBottom: "0.25rem" }}>{label}</p>
              <p style={{ color: "var(--text-primary)", fontSize: "0.9375rem" }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
