import { siteConfig } from "@/data/siteConfig";
import StorageToggle from "@/components/layout/StorageToggle";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-page colophon">
        <p>
          <span className="voice-institutional">Colophon</span>
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          No. RP-2024-0000 — this catalog itself. Kept by R. Poudel, Lawrence,
          Kansas; collected continuously since 2024. Set in Source Serif 4 and
          Courier Prime on aged paper. Built with Next.js; readable without
          JavaScript, like any good archive.
        </p>
        <p>
          This catalog is machine-readable:{" "}
          <code>curl {siteConfig.url.replace("https://", "")}/api/collection</code>
        </p>
        <p style={{ marginTop: "0.75rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <a className="type-link" href={siteConfig.author.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="type-link" href={siteConfig.author.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="type-link" href={`mailto:${siteConfig.author.email}`}>
            Correspondence
          </a>
          <StorageToggle />
        </p>
      </div>
    </footer>
  );
}
