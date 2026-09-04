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

/** Original chalk pup. Trots while the rail moves, idles otherwise. Faces right. */
function RailPup() {
  return (
    <svg className="project-rail__pup" viewBox="0 0 76 60" aria-hidden="true">
      <g
        className="project-rail__pup-trot"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className="project-rail__pup-tail"
          d="M17 30 C11 29 8 24 9 18"
        />
        <path d="M16 34 C16 26 24 22 34 22 L48 22 C56 22 60 26 60 32 C60 38 54 41 46 41 L28 41 C20 41 16 38 16 34 Z" />
        <path d="M26 41 L26 52 M31 41 L31 52 M47 41 L47 52 M52 41 L52 52" />
        <circle cx={60} cy={15} r={8} />
        <path d="M67 13 C71 13 73 16 73 19" />
        <path d="M56 8 C54 3 58 1 60 4 C62 7 60 11 58 12" />
        <circle cx={61} cy={14} r={1.4} fill="currentColor" stroke="none" />
        <circle cx={71.5} cy={18.5} r={1.6} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export default function ProjectIndex() {
  const railProjects = projects;

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pupSlotRef = useRef<HTMLDivElement>(null);
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
    const pupSlot = pupSlotRef.current;
    if (!section || !viewport || !stage || !track || !fill || !pupSlot) return;
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
      pupSlot.style.left = `${(progress * 100).toFixed(2)}%`;
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
                Keep scrolling — the walk drives the rail sideways and the pup
                keeps pace. Click any card to open its project page.
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
              <div ref={pupSlotRef} className="project-rail__pup-slot">
                <RailPup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
