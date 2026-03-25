"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/#about",      label: "About",      anchor: true },
  { href: "/#projects",   label: "Projects",   anchor: true },
  { href: "/#skills",     label: "Skills",     anchor: true },
  { href: "/#experience", label: "Experience", anchor: true },
  { href: "/writings",    label: "Writings",   anchor: false },
  { href: "/shelf",       label: "Shelf",      anchor: false },
  { href: "/cinema",      label: "Cinema",     anchor: false },
];

export default function Navbar() {
  const pathname = usePathname();

  function isActive(href: string, anchor: boolean) {
    if (anchor) return pathname === "/";
    return pathname === href;
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Rijul
        </Link>

        {/* Links + Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {navLinks.map(({ href, label, anchor }) => {
            const active = isActive(href, anchor);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "0.875rem",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  textDecoration: "none",
                  borderBottom: active
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.15s ease",
                }}
              >
                {label}
              </Link>
            );
          })}

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
