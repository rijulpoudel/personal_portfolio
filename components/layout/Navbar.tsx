"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/specimen")
      : pathname.startsWith(href);

  return (
    <header className="site-nav">
      <nav className="container-page site-nav-inner" aria-label="Main">
        <Link href="/" className="nav-brand">
          R. Poudel · Catalog of Work
        </Link>
        <div className="nav-links">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-link", isActive(item.href) && "active")}
            >
              {item.label}
            </Link>
          ))}
          <a href="/resume.pdf" className="nav-link" target="_blank" rel="noopener">
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
