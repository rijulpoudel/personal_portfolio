import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Random",
  description: "Miscellaneous things I like.",
};

const sections = [
  {
    heading: "Tools I Use",
    items: ["VS Code", "Raycast", "Figma", "Notion", "Warp"],
  },
  {
    heading: "Links I Like",
    items: [],
  },
];

export default function RandomPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Random" />
      <div style={{ marginTop: "3rem", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "3rem" }}>
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="label-caps" style={{ marginBottom: "1rem" }}>{section.heading}</p>
            {section.items.length > 0 ? (
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none", padding: 0 }}>
                {section.items.map((item) => (
                  <li key={item} style={{ color: "var(--text-secondary)" }}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "var(--text-tertiary)" }}>Coming soon.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
