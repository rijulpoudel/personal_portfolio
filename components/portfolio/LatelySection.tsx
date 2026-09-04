"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiGithub,
  FiLayers,
} from "react-icons/fi";

type CardStyle = CSSProperties & {
  "--card-tilt": string;
  "--card-drop": string;
  "--card-delay": string;
  "--card-accent": string;
  "--card-height": string;
};

type LatelyItem = {
  label: string;
  title: string;
  description: string;
  art: "specify" | "aawaj" | "backend" | "mohr" | "ku";
  icon: ReactNode;
  accent: string;
  tilt: string;
  drop: string;
  height: string;
  links: Array<{
    href: string;
    label: string;
    icon: ReactNode;
    external?: boolean;
  }>;
};

const latelyItems: LatelyItem[] = [
  {
    label: "production work",
    title: "Building Specify 7",
    description:
      "Building open-source collections software with Django, React, TypeScript, and MySQL at the KU Biodiversity Institute.",
    art: "specify",
    icon: <FiBriefcase aria-hidden="true" />,
    accent: "#b8dfb2",
    tilt: "-1.8deg",
    drop: "0rem",
    height: "27.75rem",
    links: [
      {
        href: "https://github.com/specify/specify7",
        label: "Specify 7 on GitHub",
        icon: <FiGithub aria-hidden="true" />,
        external: true,
      },
      {
        href: "https://www.specifysoftware.org/",
        label: "Specify Collections Consortium",
        icon: <FiArrowUpRight aria-hidden="true" />,
        external: true,
      },
    ],
  },
  {
    label: "2× hackathon winner",
    title: "Aawaj",
    description:
      "A civic-reporting dApp with on-chain escalation and IPFS evidence, built at Midwest Blockathon.",
    art: "aawaj",
    icon: <FiAward aria-hidden="true" />,
    accent: "#f6a4aa",
    tilt: "1.1deg",
    drop: "1.15rem",
    height: "26.75rem",
    links: [
      {
        href: "/projects/aawaj",
        label: "Read the Aawaj case study",
        icon: <FiArrowUpRight aria-hidden="true" />,
      },
      {
        href: "https://github.com/rijulpoudel/midwest_blockathon_awaj",
        label: "Aawaj on GitHub",
        icon: <FiGithub aria-hidden="true" />,
        external: true,
      },
    ],
  },
  {
    label: "backend studies",
    title: "Django, DRF & APIs",
    description:
      "Going deeper on backend architecture through real APIs, database models, authentication flows, and tests.",
    art: "backend",
    icon: <FiCode aria-hidden="true" />,
    accent: "#f0c85a",
    tilt: "-0.4deg",
    drop: "1.75rem",
    height: "28.25rem",
    links: [
      {
        href: "https://github.com/rijulpoudel",
        label: "Follow the work on GitHub",
        icon: <FiGithub aria-hidden="true" />,
        external: true,
      },
    ],
  },
  {
    label: "currently building",
    title: "Mohr",
    description:
      "Turning a budgeting idea into a focused Django and DRF MVP, one milestone and pull request at a time.",
    art: "mohr",
    icon: <FiLayers aria-hidden="true" />,
    accent: "#e85749",
    tilt: "0.9deg",
    drop: "1rem",
    height: "24.75rem",
    links: [],
  },
  {
    label: "class of 2027",
    title: "KU Computer Science",
    description:
      "Finishing my degree in May 2027 while preparing for new-grad software engineering roles.",
    art: "ku",
    icon: <FiBookOpen aria-hidden="true" />,
    accent: "#fff2a9",
    tilt: "-1.4deg",
    drop: "0.1rem",
    height: "27.25rem",
    links: [
      {
        href: "/about",
        label: "More about Rijul",
        icon: <FiArrowUpRight aria-hidden="true" />,
      },
    ],
  },
];

function SpecifyArt() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="A hand-drawn civic reporting interface">
      <rect width="360" height="220" rx="6" fill="#d9ead4" />
      <rect x="20" y="20" width="320" height="180" rx="7" fill="#fffdf4" stroke="#37312c" strokeWidth="4" />
      <path d="M20 54h320" stroke="#37312c" strokeWidth="4" />
      <circle cx="39" cy="37" r="5" fill="#e75d50" />
      <circle cx="57" cy="37" r="5" fill="#f0c85a" />
      <circle cx="75" cy="37" r="5" fill="#6fc4a4" />
      <rect x="38" y="76" width="75" height="98" rx="3" fill="#e9e2d6" />
      <path d="M129 82h154M129 104h115M129 126h139M129 148h91" stroke="#756b62" strokeLinecap="round" strokeWidth="8" />
      <path d="M51 153c8-31 16-53 31-69m-18 31c-14-4-19-12-21-23m36 16c14-3 22-11 27-21" fill="none" stroke="#568863" strokeLinecap="round" strokeWidth="5" />
      <path d="M49 158h61" stroke="#37312c" strokeLinecap="round" strokeWidth="4" />
      <text x="278" y="185" fill="#c94c40" fontFamily="monospace" fontSize="14" fontWeight="700">SPECIFY 7</text>
    </svg>
  );
}

function AawajArt() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="A hand-drawn civic report moving through five escalation levels">
      <rect width="360" height="220" rx="6" fill="#f6a4aa" />
      <rect x="18" y="18" width="324" height="184" rx="8" fill="#fff8ee" stroke="#3a302a" strokeWidth="4" />
      <path d="M18 52h324" stroke="#3a302a" strokeWidth="4" />
      <circle cx="39" cy="35" r="5" fill="#e75d50" />
      <circle cx="57" cy="35" r="5" fill="#f0c85a" />
      <circle cx="75" cy="35" r="5" fill="#6fc4a4" />
      <path d="m47 117 48-24v58l-48-20Z" fill="#e95c4f" stroke="#352d28" strokeLinejoin="round" strokeWidth="4" />
      <rect x="35" y="112" width="16" height="25" rx="4" fill="#f4be52" stroke="#352d28" strokeWidth="4" />
      <path d="m63 139 10 25h19l-14-31" fill="#e95c4f" stroke="#352d28" strokeLinejoin="round" strokeWidth="4" />
      <path d="M110 122h25" stroke="#e95c4f" strokeDasharray="7 6" strokeLinecap="round" strokeWidth="4" />
      {["W", "M", "D", "P", "F"].map((label, index) => (
        <g key={label} transform={`translate(${142 + index * 39} 106)`}>
          <circle cx="14" cy="14" r="14" fill={index === 4 ? "#e95c4f" : "#f2d881"} stroke="#352d28" strokeWidth="3" />
          <text x="14" y="19" textAnchor="middle" fill="#352d28" fontFamily="monospace" fontSize="13" fontWeight="700">{label}</text>
          {index < 4 && <path d="M29 14h9" stroke="#352d28" strokeLinecap="round" strokeWidth="3" />}
        </g>
      ))}
      <text x="145" y="167" fill="#c8483e" fontFamily="sans-serif" fontSize="24" fontWeight="800">AAWAJ</text>
      <text x="145" y="186" fill="#6d6259" fontFamily="monospace" fontSize="10">REPORT · PROVE · ESCALATE</text>
    </svg>
  );
}

function BackendArt() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="A hand-drawn backend API editor">
      <rect width="360" height="220" rx="6" fill="#f0c85a" />
      <rect x="20" y="18" width="320" height="184" rx="8" fill="#202423" stroke="#423a33" strokeWidth="4" />
      <path d="M20 50h320" stroke="#5d5d58" strokeWidth="3" />
      <circle cx="40" cy="34" r="5" fill="#e65d50" />
      <circle cx="58" cy="34" r="5" fill="#f0c85a" />
      <circle cx="76" cy="34" r="5" fill="#6fc4a4" />
      <text x="42" y="80" fill="#e85749" fontFamily="monospace" fontSize="16">GET</text>
      <text x="87" y="80" fill="#f5ece3" fontFamily="monospace" fontSize="16">/api/reports</text>
      <text x="42" y="111" fill="#b8dfb2" fontFamily="monospace" fontSize="15">{"{"}</text>
      <text x="61" y="135" fill="#f6a4aa" fontFamily="monospace" fontSize="14">{`"status"`}</text>
      <text x="136" y="135" fill="#f5ece3" fontFamily="monospace" fontSize="14">: 200,</text>
      <text x="61" y="160" fill="#f6a4aa" fontFamily="monospace" fontSize="14">{`"framework"`}</text>
      <text x="166" y="160" fill="#f5ece3" fontFamily="monospace" fontSize="14">{`: "DRF"`}</text>
      <text x="42" y="184" fill="#b8dfb2" fontFamily="monospace" fontSize="15">{"}"}</text>
    </svg>
  );
}

function MohrArt() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="A hand-drawn budgeting dashboard for Mohr">
      <rect width="360" height="220" rx="6" fill="#9ed7d6" />
      <rect x="26" y="18" width="308" height="184" rx="8" fill="#fffaf0" stroke="#332d28" strokeWidth="4" />
      <text x="45" y="59" fill="#332d28" fontFamily="sans-serif" fontSize="28" fontWeight="800">MOHR</text>
      <path d="M45 73h270" stroke="#d9cec0" strokeWidth="3" />
      <rect x="45" y="91" width="114" height="73" rx="7" fill="#f3e2ad" stroke="#332d28" strokeWidth="3" />
      <text x="58" y="115" fill="#665c54" fontFamily="monospace" fontSize="11">THIS MONTH</text>
      <path d="M61 146h15v-13h15v13h15v-28h15v28h17" fill="none" stroke="#e45a4f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <path d="M184 108h112M184 132h82M184 156h98" stroke="#756b62" strokeLinecap="round" strokeWidth="9" />
      <circle cx="296" cy="49" r="13" fill="#e45a4f" />
      <path d="m290 49 4 4 8-9" fill="none" stroke="#fffaf0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function CardArt({ kind }: { kind: LatelyItem["art"] }) {
  if (kind === "specify") return <SpecifyArt />;
  if (kind === "aawaj") return <AawajArt />;
  if (kind === "backend") return <BackendArt />;
  if (kind === "mohr") return <MohrArt />;

  return (
    <div className="lately-card__ku-art">
      <span>KU</span>
      <Image
        src="/images/profile.png"
        alt="Rijul Poudel"
        fill
        sizes="(max-width: 760px) 76vw, 240px"
      />
      <strong>&apos;27</strong>
    </div>
  );
}

export default function LatelySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("lately-section--visible");
      return;
    }

    section.classList.add("lately-section--motion-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("lately-section--visible");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="lately-section" aria-labelledby="lately-title">
      <header className="lately-section__heading">
        <h2 id="lately-title">
          What I&apos;ve been <span><s>up to</s> lately</span>
        </h2>
        <span className="lately-section__chalk-rule" aria-hidden="true" />
      </header>

      <div className="lately-clothesline">
        <svg className="lately-clothesline__rope" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
          <path className="lately-clothesline__rope-shadow" d="M-20 18 Q720 92 1460 18" />
          <path className="lately-clothesline__rope-core" d="M-20 14 Q720 84 1460 14" />
          <path className="lately-clothesline__rope-highlight" d="M-20 11 Q720 80 1460 11" />
        </svg>
        <span className="lately-clothesline__tape lately-clothesline__tape--left" aria-hidden="true" />
        <span className="lately-clothesline__tape lately-clothesline__tape--right" aria-hidden="true" />

        <ul className="lately-cards" aria-label="What Rijul has been working on lately">
          {latelyItems.map((item, index) => {
            const style: CardStyle = {
              "--card-tilt": item.tilt,
              "--card-drop": item.drop,
              "--card-delay": `${120 + index * 90}ms`,
              "--card-accent": item.accent,
              "--card-height": item.height,
            };

            return (
              <li className="lately-card-wrap" style={style} key={item.title}>
                <span className="lately-card__pin" aria-hidden="true">
                  <i />
                </span>

                <article className="lately-card">
                  <div className="lately-card__art">
                    <CardArt kind={item.art} />
                  </div>

                  <p className="lately-card__label">
                    {item.icon}
                    <span>{item.label}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p className="lately-card__description">{item.description}</p>

                  {item.links.length > 0 && (
                    <div className="lately-card__links">
                      {item.links.map((link) => (
                        <a
                          href={link.href}
                          key={link.label}
                          aria-label={link.label}
                          title={link.label}
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
