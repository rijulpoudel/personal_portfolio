"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/writings", label: "Writings" },
  { href: "/shelf", label: "Shelf" },
  { href: "/cinema", label: "Cinema" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
        backgroundColor: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav
        className="container-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "1rem",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "1.125rem",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Rijul
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "0.875rem",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.15s ease",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
