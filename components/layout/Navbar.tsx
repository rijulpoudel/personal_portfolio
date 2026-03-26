"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = Array.from(document.querySelectorAll("section[id]"));
    
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top < 300) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  function isActive(href: string, anchor: boolean) {
    if (anchor) {
      if (pathname === "/") {
        return activeSection ? href === `/#${activeSection}` : false;
      }
      return false;
    }
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
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* Avatar Icon */}
          <div style={{ position: "relative", width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden" }}>
            <Image
              src="/images/profile.jpg"
              alt="Rijul"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          rijul
        </Link>

        {/* Links + Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {navLinks.map(({ href, label, anchor }) => {
            const active = isActive(href, anchor);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link ${active ? "active" : ""}`}
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
