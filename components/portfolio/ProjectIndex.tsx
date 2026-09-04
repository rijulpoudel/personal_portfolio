"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import SectionLabel from "./SectionLabel";

const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

/** Photo slot. Drop `public/images/projects/<slug>-cover.png` to fill it.
 *  Until then the project's initial holds the space. */
function CardCover({ slug, title }: { slug: string; title: string }) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="project-rail__cover">
      {!missing ? (
        <Image
          src={`/images/projects/${slug}-cover.png`}
          alt={`${title} project photo`}
          fill
          sizes="(max-width: 760px) 78vw, 31rem"
          onError={() => setMissing(true)}
        />
      ) : (
        <div className="project-rail__cover-fallback" aria-hidden="true">
          <span className="project-rail__cover-initial">{title.charAt(0)}</span>
          <span className="project-rail__cover-caption">{title}</span>
        </div>
      )}
    </div>
  );
}

/** Barça match ball. Wide blaugrana panels and the official crest mirror the reference. */
function RailBall() {
  return (
    <span className="project-rail__ball" aria-hidden="true">
      <svg viewBox="0 0 72 72">
        <defs>
          <clipPath id="barca-ball-clip">
            <circle cx="36" cy="34" r="30" />
          </clipPath>
          <pattern id="barca-ball-texture" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.55" fill="#f5ece3" opacity="0.24" />
          </pattern>
        </defs>

        <g className="project-rail__ball-bounce">
          <g className="project-rail__ball-spin">
            <g clipPath="url(#barca-ball-clip)">
              <circle cx="36" cy="34" r="30" fill="#071e4a" />

              {/* Broad, curved blaugrana panels from the reference ball. */}
              <path d="M2 8 C9 9 14 14 17 22 C20 32 18 49 13 64 L0 64 Z" fill="#c61454" />
              <path d="M11 4 C19 5 25 10 28 18 C31 28 28 48 24 66 L13 66 C18 49 20 32 17 22 C14 14 9 9 2 8 Z" fill="#0755a4" />
              <path d="M24 2 C30 1 36 2 41 5 L40 30 L31 31 L28 18 C25 10 19 5 11 4 Z" fill="#d51d62" />
              <path d="M31 31 L40 30 L42 66 L24 66 L28 48 Z" fill="#081b43" />
              <path d="M41 5 C48 5 55 9 59 16 C64 26 62 47 58 66 L42 66 L40 30 Z" fill="#0755a4" />
              <path d="M59 16 C64 19 68 25 72 33 L72 66 L58 66 C62 47 64 26 59 16 Z" fill="#b90d45" />

              {/* Curved seams and a subtle dimple texture. */}
              <path d="M2 21 C17 17 26 14 40 15 C53 16 63 21 70 30" fill="none" stroke="#f5ece3" strokeWidth="1.15" opacity="0.45" />
              <path d="M4 53 C18 57 27 59 39 58 C53 57 64 52 70 44" fill="none" stroke="#f5ece3" strokeWidth="1.15" opacity="0.38" />
              <circle cx="36" cy="34" r="30" fill="url(#barca-ball-texture)" />
            </g>

            <circle cx="36" cy="34" r="30" fill="none" stroke="currentColor" strokeWidth="2.6" />
            <image
              className="project-rail__ball-crest"
              href="/images/fc-barcelona-crest.svg"
              x="22.5"
              y="18.5"
              width="27"
              height="27.4"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>

        <ellipse className="project-rail__ball-shadow" cx="36" cy="67" rx="13" ry="2.5" fill="currentColor" opacity="0.35" />
      </svg>
    </span>
  );
}

export default function ProjectIndex() {
  const railProjects = projects;

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const ballSlotRef = useRef<HTMLDivElement>(null);
  const trotTimeout = useRef<number | null>(null);
  const lastProgress = useRef(-1);

  const [pinned, setPinned] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const ballSlot = ballSlotRef.current;
    if (!section || !viewport || !stage || !track || !fill || !ballSlot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let maxScroll = 0;
    let pinHeight = 0;
    let sectionTop = 0;
    let disposed = false;

    const measure = () => {
      pinHeight = window.innerHeight;
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${Math.round(pinHeight + maxScroll)}px`;
    };

    const setTrotting = (moving: boolean) => {
      if (moving) {
        section.classList.add("project-rail--trotting");
        if (trotTimeout.current !== null) window.clearTimeout(trotTimeout.current);
        trotTimeout.current = window.setTimeout(() => {
          section.classList.remove("project-rail--trotting");
        }, 280);
      }
    };

    const render = () => {
      raf = 0;
      if (disposed) return;
      const raw = maxScroll > 0 ? (window.scrollY - sectionTop) / maxScroll : 1;
      const progress = Math.min(1, Math.max(0, raw));
      track.style.transform = `translate3d(${(-progress * maxScroll).toFixed(1)}px, 0, 0)`;
      const zoom = 0.94 + 0.06 * Math.min(1, progress / 0.15);
      stage.style.transform = `scale(${zoom.toFixed(4)})`;
      fill.style.transform = `scaleX(${progress.toFixed(4)})`;
      ballSlot.style.left = `${(progress * 100).toFixed(2)}%`;
      if (progress !== lastProgress.current) {
        lastProgress.current = progress;
        setTrotting(true);
        setPercent((current) => {
          const next = Math.round(progress * 100);
          return current === next ? current : next;
        });
      }
    };

    const requestRender = () => {
      if (raf === 0) raf = window.requestAnimationFrame(render);
    };

    measure();
    setPinned(true);
    render();

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      requestRender();
    });
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) {
          measure();
          requestRender();
        }
      }).catch(() => {});
    }
    const settleTimer = window.setTimeout(() => {
      if (!disposed) {
        measure();
        requestRender();
      }
    }, 600);

    return () => {
      disposed = true;
      if (raf !== 0) window.cancelAnimationFrame(raf);
      if (trotTimeout.current !== null) window.clearTimeout(trotTimeout.current);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", requestRender);
      section.style.height = "";
      section.classList.remove("project-rail--trotting");
    };
  }, []);

  const total = railProjects.length;
  const current = Math.min(total, Math.floor((percent / 100) * total) + 1);

  return (
    <section
      ref={sectionRef}
      id="project-index"
      className={`project-rail${pinned ? " project-rail--pinned" : ""}`}
      aria-labelledby="project-index-title"
    >
      <div className="project-rail__pin">
        <div ref={stageRef} className="project-rail__stage">
          <header className="project-rail__heading">
            <SectionLabel>Projects</SectionLabel>
            <div>
              <h2 id="project-index-title">
                {NUMBER_WORDS[total] ?? total} builds, one long walk.
              </h2>
              <p>
                Keep scrolling — the walk drives the rail sideways and the ball
                keeps dribbling. Click any card to open its project page.
              </p>
            </div>
          </header>

          <div ref={viewportRef} className="project-rail__viewport">
            <div ref={trackRef} className="project-rail__track">
              {railProjects.map((project) => (
                <article className="project-rail__card" key={project.slug}>
                  <span className="project-rail__tape" aria-hidden="true" />
                  <CardCover slug={project.slug} title={project.title} />
                  <p className="project-rail__year">{project.year}</p>
                  <h3 className="project-rail__name">
                    <Link
                      className="project-rail__link"
                      href={`/projects/${project.slug}`}
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="project-rail__common">{project.tagline}</p>
                  <p className="project-rail__summary">{project.description}</p>
                  <p className="project-rail__method">
                    {project.format} · {project.builtAt}
                  </p>
                  <ul
                    className="project-rail__tech"
                    aria-label={`Technologies used in ${project.title}`}
                  >
                    {project.stack.slice(0, 4).map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                    {project.stack.length > 4 && (
                      <li>+{project.stack.length - 4} more</li>
                    )}
                  </ul>
                  <Link
                    className="project-rail__open"
                    href={`/projects/${project.slug}`}
                    aria-label={`Open the ${project.title} project page`}
                  >
                    Open project <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}

              <div className="project-rail__endcap">
                <p className="project-rail__endcap-fin">fin.</p>
                <p>
                  That is every build — for now. Keep scrolling for the rest
                  of the board.
                </p>
                <span aria-hidden="true">↓</span>
              </div>
            </div>
          </div>

          <div className="project-rail__progress">
            <span className="project-rail__count" aria-hidden="true">
              {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="project-rail__linewrap">
              <div
                className="project-rail__line"
                role="progressbar"
                aria-label="Projects scroll progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div ref={fillRef} className="project-rail__fill" />
              </div>
              <div ref={ballSlotRef} className="project-rail__ball-slot">
                <RailBall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
