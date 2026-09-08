"use client";

import { useLayoutEffect, useRef, useState } from "react";
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

const PROJECT_SPRING_STIFFNESS = 150;
const PROJECT_SPRING_DAMPING = 23;
const BALL_RADIUS_PX = 25;
const BALL_BOUNCE_DISTANCE_PX = 54;

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

  const [pinned, setPinned] = useState(false);
  const [percent, setPercent] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const ballSlot = ballSlotRef.current;
    const lineWrap = ballSlot?.parentElement;
    const ballBounce = ballSlot?.querySelector<SVGGElement>(".project-rail__ball-bounce");
    const ballSpin = ballSlot?.querySelector<SVGGElement>(".project-rail__ball-spin");
    const ballShadow = ballSlot?.querySelector<SVGEllipseElement>(".project-rail__ball-shadow");

    if (
      !section ||
      !viewport ||
      !stage ||
      !track ||
      !fill ||
      !ballSlot ||
      !lineWrap ||
      !ballBounce ||
      !ballSpin ||
      !ballShadow
    ) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let maxScroll = 0;
    let lineWidth = 0;
    let pinHeight = 0;
    let sectionTop = 0;
    let visualProgress = 0;
    let progressVelocity = 0;
    let lastVisualProgress = 0;
    let lastTimestamp = 0;
    let rollAngle = 0;
    let dribblePhase = 0;
    let initialized = false;
    let renderedPercent = -1;
    let movingClassApplied = false;
    let disposed = false;

    const clamp = (value: number, minimum = 0, maximum = 1) =>
      Math.min(maximum, Math.max(minimum, value));

    const readTargetProgress = () => {
      const raw = maxScroll > 0 ? (window.scrollY - sectionTop) / maxScroll : 1;
      return clamp(raw);
    };

    const measure = () => {
      pinHeight = window.innerHeight;
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
      lineWidth = lineWrap.clientWidth;
      section.style.height = `${Math.round(pinHeight + maxScroll)}px`;
    };

    const updateMovingClass = (moving: boolean) => {
      if (moving === movingClassApplied) return;
      movingClassApplied = moving;
      section.classList.toggle("project-rail--moving", moving);
    };

    const render = (timestamp: number) => {
      raf = 0;
      if (disposed) return;

      const targetProgress = readTargetProgress();
      if (!initialized) {
        visualProgress = targetProgress;
        lastVisualProgress = targetProgress;
        initialized = true;
      } else {
        const deltaTime = Math.min(0.032, lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 1 / 60);
        const displacement = targetProgress - visualProgress;
        const acceleration =
          displacement * PROJECT_SPRING_STIFFNESS - progressVelocity * PROJECT_SPRING_DAMPING;

        progressVelocity += acceleration * deltaTime;
        visualProgress += progressVelocity * deltaTime;

        if (visualProgress <= 0 && progressVelocity < 0) {
          visualProgress = 0;
          progressVelocity = 0;
        } else if (visualProgress >= 1 && progressVelocity > 0) {
          visualProgress = 1;
          progressVelocity = 0;
        }

        if (Math.abs(targetProgress - visualProgress) < 0.00002 && Math.abs(progressVelocity) < 0.00025) {
          visualProgress = targetProgress;
          progressVelocity = 0;
        }
      }
      lastTimestamp = timestamp;

      track.style.transform = `translate3d(${(-visualProgress * maxScroll).toFixed(2)}px, 0, 0)`;
      const zoomProgress = clamp(visualProgress / 0.25);
      const easedZoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
      const zoom = 0.94 + 0.06 * easedZoom;
      stage.style.transform = `scale(${zoom.toFixed(4)})`;
      fill.style.transform = `scaleX(${visualProgress.toFixed(5)})`;
      ballSlot.style.transform = `translate3d(${(visualProgress * lineWidth).toFixed(2)}px, 0, 0)`;

      const travelPx = (visualProgress - lastVisualProgress) * lineWidth;
      lastVisualProgress = visualProgress;
      rollAngle += (travelPx / BALL_RADIUS_PX) * (180 / Math.PI);
      dribblePhase = (dribblePhase + (Math.abs(travelPx) * Math.PI) / BALL_BOUNCE_DISTANCE_PX) % Math.PI;

      const speedPx = Math.abs(progressVelocity * lineWidth);
      const speedStrength = clamp(speedPx / 280);
      const settleStrength = clamp(speedPx / 45);
      const airborne = Math.max(0, Math.sin(dribblePhase));
      const lift = airborne * (4 + 10 * speedStrength) * settleStrength;
      const impact = Math.pow(1 - airborne, 8) * speedStrength * settleStrength;
      const scaleX = 1 + impact * 0.13;
      const scaleY = 1 - impact * 0.1;
      const shadowScale = 1 - airborne * speedStrength * 0.3;
      const shadowOpacity = 0.35 - airborne * speedStrength * 0.2;

      ballBounce.style.transform = `translate3d(0, ${(-lift).toFixed(2)}px, 0) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
      ballSpin.style.transform = `rotate(${rollAngle.toFixed(2)}deg)`;
      ballShadow.style.transform = `scaleX(${shadowScale.toFixed(3)})`;
      ballShadow.style.opacity = shadowOpacity.toFixed(3);

      const nextPercent = Math.round(visualProgress * 100);
      if (nextPercent !== renderedPercent) {
        renderedPercent = nextPercent;
        setPercent(nextPercent);
      }

      const moving =
        Math.abs(targetProgress - visualProgress) >= 0.00002 || Math.abs(progressVelocity) >= 0.00025;
      updateMovingClass(moving);

      if (moving) {
        raf = window.requestAnimationFrame(render);
      } else {
        lastTimestamp = 0;
      }
    };

    const requestRender = () => {
      if (raf === 0) raf = window.requestAnimationFrame(render);
    };
    const handleResize = () => {
      measure();
      requestRender();
    };

    measure();
    setPinned(true);
    requestRender();

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) handleResize();
      }).catch(() => {});
    }
    const settleTimer = window.setTimeout(() => {
      if (!disposed) handleResize();
    }, 600);

    return () => {
      disposed = true;
      if (raf !== 0) window.cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
      section.style.height = "";
      section.classList.remove("project-rail--moving");
      ballSlot.style.transform = "";
      ballBounce.style.transform = "";
      ballSpin.style.transform = "";
      ballShadow.style.transform = "";
      ballShadow.style.opacity = "";
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
