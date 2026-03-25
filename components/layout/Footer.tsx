import ExternalLink from "@/components/ui/ExternalLink";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        paddingBlock: "3rem",
      }}
    >
      <div
        className="container-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} Rijul Poudel
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <ExternalLink href="https://github.com/rijulpoudel" label="GitHub" />
          <ExternalLink href="https://linkedin.com/in/rijulpoudel" label="LinkedIn" />
          <ExternalLink href="mailto:hello@rijulpoudel.com" label="Email" />
        </div>
      </div>
    </footer>
  );
}
