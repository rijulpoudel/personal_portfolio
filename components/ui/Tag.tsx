interface Props {
  label: string;
}

export default function Tag({ label }: Props) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.6rem",
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: "0.25rem",
        fontSize: "0.75rem",
        color: "var(--text-secondary)",
        lineHeight: "1.5",
      }}
    >
      {label}
    </span>
  );
}
