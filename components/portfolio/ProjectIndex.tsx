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

/** Barça ball. Dribbles along the rail while the track moves, idles otherwise. Number 10 for Messi. */
function RailBall() {
  return (
    <span className="project-rail__ball" aria-hidden="true">
      <svg viewBox="0 0 60 60">
        <g className="project-rail__ball-bounce">
          <g className="project-rail__ball-spin">
            <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="2.6" />
            {/* Center patch — blaugrana garnet, with Messi's 10 */}
            <path
              d="M30 22 L37.6 27.1 L34.7 36 L25.3 36 L22.4 27.1 Z"
              fill="#A50044"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text
              className="project-rail__ball-number"
              x="30"
              y="33.5"
              textAnchor="middle"
              fill="#f5ece3"
            >
              10
            </text>
            {/* Seams — classic five-spoke football */}
            <path d="M30 22 L30 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M37.6 27.1 L54.7 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M34.7 36 L45.3 51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M25.3 36 L14.7 51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M22.4 27.1 L5.3 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Rim patches — blaugrana blue and garnet petals */}
            <path
              d="M30 22 C25.5 14.5 24 8.5 30 4 C36 8.5 34.5 14.5 30 22 Z"
              fill="#004D98"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M37.6 27.1 C44.5 29 51 30.5 54.7 22 C50.4 16.5 43.8 18.6 37.6 27.1 Z"
              fill="#A50044"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M34.7 36 C38.5 42.5 42.4 47.8 45.3 51 C39.6 53.6 34.6 49 34.7 36 Z"
              fill="#004D98"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M25.3 36 C21.5 42.5 17.6 47.8 14.7 51 C20.4 53.6 25.4 49 25.3 36 Z"
              fill="#A50044"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M22.4 27.1 C15.5 29 9 30.5 5.3 22 C9.6 16.5 16.2 18.6 22.4 27.1 Z"
              fill="#004D98"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <ellipse className="project-rail__ball-shadow" cx="30" cy="55.5" rx="11" ry="2.4" fill="currentColor" opacity="0.35" />
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
