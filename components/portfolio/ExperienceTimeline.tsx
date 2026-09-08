"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { experiences, type Experience } from "@/data/experience";

const organizationMarks = ["S7", "KU", "MIN", "SR"] as const;

const organizationLogos: Record<string, string> = {
  "DEP-2026-004": "/images/orgs/specify-logo.png",
  "DEP-2024-003": "/images/ku-logo.svg",
  "DEP-2022-002": "/images/orgs/min-logo.png",
  "DEP-2022-001": "/images/orgs/srcn-logo.png",
};

const education = {
  institution: "University of Kansas",
  location: "Lawrence, Kansas",
  degree: "Bachelor of Science in Computer Science",
  date: "Expected May 2027",
  details: [
    "Minor in Data Science",
    "University Honors Program · Dean's List",
  ],
};

function ExperienceDoodle() {
  return (
    <svg className="experience-paper__doodle" viewBox="0 0 180 108" aria-hidden="true">
      <path pathLength={1} d="M75 85c-11-4-17-13-17-25 0-16 12-29 29-31 18-2 34 8 38 25 3 13-2 25-13 32" />
      <path pathLength={1} d="m69 35-13-21 24 8m35 10 18-17-2 28" />
      <path pathLength={1} d="M81 51c5-5 11-5 16 0m-13 12c8 6 17 6 25-1" />
      <path pathLength={1} d="M94 86c-4 9-14 14-28 14-15 0-29-6-39-17l7-27c17 0 31 5 42 17" />
      <path pathLength={1} d="M34 56c13 3 27 9 41 18m-39-6c12 2 22 6 32 12" />
      <path pathLength={1} d="M131 45c9 3 15 8 18 16m-12-25 8-8m-1 18 12-3" />
    </svg>
  );
}

function TimelineRail({ mark, tone, logo }: { mark: string; tone: number; logo?: string }) {
  return (
    <div className="experience-paper__rail" aria-hidden="true">
      {logo ? (
        <span className="experience-paper__badge experience-paper__badge--logo" data-tone={tone}>
          <Image src={logo} alt="" width={48} height={48} sizes="48px" />
        </span>
      ) : (
        <span className="experience-paper__badge" data-tone={tone}>
          {mark}
        </span>
      )}
      <span className="experience-paper__dot" />
      <span className="experience-paper__line" />
    </div>
  );
}

function DateRange({ experience }: { experience: Experience }) {
  return (
    <span className="experience-paper__dates">
      {experience.startDate} – {experience.endDate ?? "Present"}
    </span>
  );
}

export default function ExperienceTimeline() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (id: string) => {
    setExpandedItems((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section ref={sectionRef} id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className={`experience-paper${isVisible ? " experience-paper--visible" : ""}`}>
        <ExperienceDoodle />
        <span className="experience-paper__tape experience-paper__tape--left" aria-hidden="true" />
        <span className="experience-paper__tape experience-paper__tape--right" aria-hidden="true" />

        <header className="experience-paper__heading">
          <h2 id="experience-title">
            Experience <span>&amp; education</span>
          </h2>
          <span aria-hidden="true" />
        </header>

        <ol className="experience-paper__list">
          {experiences.map((experience, index) => {
            const isExpanded = expandedItems.has(experience.id);
            const extraId = `experience-details-${experience.id.toLowerCase()}`;
            const entryStyle = { "--entry-index": index } as CSSProperties;

            return (
              <li className="experience-paper__item" key={experience.id} style={entryStyle}>
                <TimelineRail
                  mark={organizationMarks[index] ?? "RP"}
                  tone={index}
                  logo={organizationLogos[experience.id]}
                />

                <article className="experience-paper__entry">
                  <header className="experience-paper__organization">
                    <h3>{experience.company}</h3>
                    {experience.location && <p>{experience.location}</p>}
                  </header>

                  <div className="experience-paper__role-row">
                    <h4>{experience.role}</h4>
                    <DateRange experience={experience} />
                  </div>

                  <ul className="experience-paper__summary">
                    <li>{experience.description[0]}</li>
                  </ul>

                  <div
                    id={extraId}
                    className="experience-paper__extra"
                    data-expanded={isExpanded ? "true" : "false"}
                    aria-hidden={!isExpanded}
                  >
                    <div>
                      {experience.context && <p className="experience-paper__context">{experience.context}</p>}
                      {experience.description.length > 1 && (
                        <ul>
                          {experience.description.slice(1).map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      )}
                      {experience.techStack && (
                        <p className="experience-paper__stack">
                          {experience.techStack.map((technology) => (
                            <span key={technology}>{technology}</span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    className="experience-paper__toggle"
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={extraId}
                    onClick={() => toggleItem(experience.id)}
                  >
                    {isExpanded ? "Show less" : "Show more"}
                    <FiChevronDown aria-hidden="true" />
                  </button>
                </article>
              </li>
            );
          })}
        </ol>

        <div id="education" className="experience-paper__education">
          <h3>Education</h3>

          <div
            className="experience-paper__education-row"
            style={{ "--entry-index": experiences.length } as CSSProperties}
          >
            <TimelineRail mark="KU" tone={4} logo="/images/ku-logo.svg" />
            <article className="experience-paper__entry">
              <header className="experience-paper__organization">
                <h4>{education.institution}</h4>
                <p>{education.location}</p>
              </header>
              <div className="experience-paper__role-row">
                <h5>{education.degree}</h5>
                <span className="experience-paper__dates">{education.date}</span>
              </div>
              <ul className="experience-paper__education-details">
                {education.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
