import type { Experience } from "@/data/experience";

interface Props {
  entry: Experience;
}

export default function TimelineEntry({ entry }: Props) {
  return (
    <div
      style={{
        paddingLeft: "1.5rem",
        borderLeft: "1px solid var(--border)",
        paddingBottom: "2.5rem",
        position: "relative",
      }}
    >
      {/* Dot */}
      <span
        style={{
          position: "absolute",
          left: "-4px",
          top: "6px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
        }}
      />

      <h3 className="text-h3">{entry.role}</h3>
      <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>{entry.company}</p>
      <p
        className="label-caps"
        style={{ marginTop: "0.25rem" }}
      >
        {entry.startDate} — {entry.endDate ?? "Present"}{entry.location ? ` · ${entry.location}` : ""}
      </p>

      <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", color: "var(--text-secondary)" }}>
        {entry.description.map((line, i) => (
          <li key={i} style={{ lineHeight: "1.7", marginTop: "0.25rem" }}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
