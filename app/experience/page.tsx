import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import TimelineEntry from "@/components/ui/TimelineEntry";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where I've worked and what I've done.",
};

export default function ExperiencePage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Experience" />
      <div style={{ marginTop: "3rem", maxWidth: "720px" }}>
        {experiences.map((entry, i) => (
          <TimelineEntry key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
}
