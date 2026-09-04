"use client";

import { useEffect, useState } from "react";

const navigation = [
  { id: "top", label: "About", condensed: true },
  { id: "work", label: "Lately", condensed: true },
  { id: "experience", label: "Experience", condensed: false },
  { id: "project-index", label: "Projects", condensed: false },
] as const;

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState<(typeof navigation)[number]["id"]>("top");

  useEffect(() => {
    type SectionId = (typeof navigation)[number]["id"];

    let animationFrame = 0;
    let settleTimer = 0;
    let disposed = false;
    const sectionTops = new Map<SectionId, number>();

    const updateActiveSection = () => {
      if (animationFrame !== 0) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const readingLine = window.scrollY + Math.min(window.innerHeight * 0.33, 220);
        let nextSection: SectionId = "top";
        let nearestSectionTop = Number.NEGATIVE_INFINITY;

        for (const item of navigation) {
          const sectionTop = sectionTops.get(item.id);
          if (sectionTop !== undefined && sectionTop <= readingLine && sectionTop > nearestSectionTop) {
            nextSection = item.id;
            nearestSectionTop = sectionTop;
          }
        }

        setActiveSection((current) => (current === nextSection ? current : nextSection));
      });
    };

    const measureSections = () => {
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section) sectionTops.set(item.id, section.getBoundingClientRect().top + window.scrollY);
      }
      updateActiveSection();
    };

    const resizeObserver = new ResizeObserver(measureSections);
    for (const item of navigation) {
      const section = document.getElementById(item.id);
      if (section) resizeObserver.observe(section);
    }

    measureSections();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", measureSections, { passive: true });
    document.fonts?.ready.then(() => {
      if (!disposed) measureSections();
    }).catch(() => {});
    settleTimer = window.setTimeout(measureSections, 700);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", measureSections);
    };
  }, []);

  function scrollToSection(id: (typeof navigation)[number]["id"] | "contact") {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      if (id !== "contact") setActiveSection(id);

      const target = id === "top" ? 0 : section.getBoundingClientRect().top + window.scrollY - 50;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      window.scrollTo({ top: Math.max(0, target), behavior });
      window.history.pushState(null, "", `#${id}`);
    };
  }

  return (
    <header className="portfolio-header chalk-header">
      <div className="chalk-header__frame">
        <svg
          className="chalk-header__backdrop"
          viewBox="0 -100 100 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="rijul-nav-chalk" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05 0.12"
                numOctaves="2"
                seed="37"
                result="wobble"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="wobble"
                scale="0.9"
                xChannelSelector="R"
                yChannelSelector="G"
                result="rough"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.2 0.7"
                numOctaves="3"
                seed="11"
                result="grain"
              />
              <feColorMatrix in="grain" type="luminanceToAlpha" result="grainAlpha" />
              <feComponentTransfer in="grainAlpha" result="grainMask">
                <feFuncA type="linear" slope="1.8" intercept="-0.08" />
              </feComponentTransfer>
              <feComposite in="rough" in2="grainMask" operator="in" />
            </filter>
            <filter id="rijul-nav-chalk-echo" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.11"
                numOctaves="2"
                seed="53"
                result="wobble"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="wobble"
                scale="1.15"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="rijul-nav-grain" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="2"
                seed="41"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.95 0 0 0 0 0.95 0 0 0 0 0.95 0 0 0 0.012 0"
                result="grainOverlay"
              />
              <feComposite in="grainOverlay" in2="SourceGraphic" operator="in" result="grain" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="grain" />
              </feMerge>
            </filter>
            <filter id="rijul-nav-scribble" x="-20%" y="-40%" width="140%" height="180%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.1"
                numOctaves="2"
                seed="23"
                result="wobble"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="wobble"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="rijul-connect-chalk" x="-20%" y="-25%" width="140%" height="150%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.08"
                numOctaves="2"
                seed="29"
                result="wobble"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="wobble"
                scale="1.25"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          <path
            d="M -18 -100 L 118 -100 L 109 0 L 100 83 Q 99 98 93 100 L 7 100 Q 1 99 0 83 L -9 0 Z"
            fill="#212121"
            fillOpacity="0.97"
            filter="url(#rijul-nav-grain)"
          />
          <g
            fill="none"
            stroke="#f5ece3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M -18 -100 L -9 0 L 0 83 Q 1 99 7 100 L 93 100 Q 99 98 100 83 L 109 0 L 118 -100"
              className="chalk-header__outline chalk-header__outline--echo"
              filter="url(#rijul-nav-chalk-echo)"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M -18 -100 L -9 0 L 0 83 Q 1 99 7 100 L 93 100 Q 99 98 100 83 L 109 0 L 118 -100"
              className="chalk-header__outline"
              filter="url(#rijul-nav-chalk)"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        <nav className="chalk-header__nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`chalk-header__link${item.condensed ? " chalk-header__link--condensed" : ""}${
                  isActive ? " chalk-header__link--active" : ""
                }`}
                aria-current={isActive ? "location" : undefined}
                onClick={scrollToSection(item.id)}
              >
                <span>{item.label}</span>
                <svg
                  className="chalk-header__underline"
                  viewBox="0 0 100 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 3 8 C 16 5.5, 32 10.5, 48 7.5 C 64 4.5, 80 9.5, 97 6.5"
                    pathLength="100"
                    filter="url(#rijul-nav-scribble)"
                  />
                </svg>
              </a>
            );
          })}

          <a
            href="#contact"
            className="chalk-header__connect"
            onClick={scrollToSection("contact")}
          >
            <svg
              className="chalk-header__connect-mark"
              viewBox="0 0 100 44"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <ellipse
                cx="50"
                cy="22"
                rx="44"
                ry="17.5"
                fill="currentColor"
                fillOpacity="0.9"
                filter="url(#rijul-connect-chalk)"
              />
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#rijul-connect-chalk)"
              >
                <path
                  d="M 8 22 C 6 9, 23 3, 50 3 C 78 2, 97 10, 95 23 C 92 36, 76 41, 49 41 C 22 42, 3 34, 7 20"
                  strokeWidth="2.6"
                />
                <path
                  d="M 11 21 C 9 11, 25 5, 52 5 C 77 4, 94 11, 92 24 C 89 34, 74 39, 48 38 C 24 39, 7 32, 11 21"
                  strokeWidth="1.4"
                  opacity="0.7"
                />
              </g>
            </svg>
            <span>connect</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
