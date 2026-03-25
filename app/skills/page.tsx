import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technologies and tools I work with.",
};

const skillGroups = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL", "Bash"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Express", "FastAPI"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "Docker", "Vercel", "PostgreSQL", "Linux", "VS Code", "Figma"],
  },
  {
    category: "Concepts",
    items: ["Operating Systems", "Networking", "Databases", "Security", "Algorithms", "System Design"],
  },
];

export default function SkillsPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Skills" />
      <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
        {skillGroups.map((group) => (
          <div key={group.category}>
            <p className="label-caps" style={{ marginBottom: "1rem" }}>{group.category}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {group.items.map((item) => (
                <Tag key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
