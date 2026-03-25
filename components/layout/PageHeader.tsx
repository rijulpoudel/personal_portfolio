interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
      <h1 className="text-h1">{title}</h1>
      {subtitle && (
        <p style={{ color: "var(--text-secondary)", marginTop: "0.75rem", fontSize: "1.125rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
