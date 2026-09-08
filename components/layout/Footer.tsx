"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import StorageToggle from "@/components/layout/StorageToggle";

export default function Footer() {
  const pathname = usePathname();

  // Full-bleed experiences render their own footer.
  if (pathname === "/" || pathname === "/football") return null;

  return (
    <footer className="site-footer">
      <div className="container-page colophon">
        <p>
          <span className="voice-kicker">Colophon</span>
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          This site, built by hand. Set in Source Serif 4 and
          Courier Prime; readable without JavaScript. Machine-readable too:{" "}
          <code>curl {siteConfig.url.replace("https://", "")}/api/projects</code>
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
