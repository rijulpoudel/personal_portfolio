"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";

interface Project {
  number: string;
  name: string;
  category: string;
  link: string;
  /** [left-top, left-bottom, right-tall] */
  images: [string, string, string];
}

const HIGGS_PREFIX =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F";
const HIGGS_SUFFIX = "&w=1280&q=85";
const higgs = (file: string) => `${HIGGS_PREFIX}${file}${HIGGS_SUFFIX}`;

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Aawaj",
    category: "Midwest Blockathon · 2× Winner",
    link: "https://github.com/rijulpoudel/midwest_blockathon_awaj",
    images: [
      higgs("hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png"),
      higgs("hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png"),
      higgs("hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png"),
    ],
  },
  {
    number: "02",
    name: "Lucid AI",
    category: "DevFest WashU",
    link: "https://github.com/rijulpoudel",
    images: [
      higgs("hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png"),
      higgs("hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png"),
      higgs("hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png"),
    ],
  },
  {
    number: "03",
    name: "Didi",
    category: "NLN Hackathon",
    link: "https://github.com/rijulpoudel",
    images: [
      higgs("hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png"),
      higgs("hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png"),
      higgs("hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png"),
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div>
        {PROJECTS.map((project, i) => (
          <Card key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}

function Card({ project, index, total }: { project: Project; index: number; total: number }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-[85vh]">
      <motion.div
        className="project-card-sticky sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{
          scale,
          transformOrigin: "top center",
          ...({ "--card-offset": `${index * 28}px` } as CSSProperties),
        }}
      >
        {/* Top row: number, category + name, live link */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
          <span
            className="hero-heading font-black leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
          >
            {project.number}
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
              {project.category}
            </span>
            <h3
              className="font-medium uppercase text-[#D7E2EA]"
              style={{ fontSize: "clamp(1.25rem, 3vw, 2.75rem)" }}
            >
              {project.name}
            </h3>
          </div>
          <div className="ml-auto">
            <LiveProjectButton href={project.link} />
          </div>
        </div>

        {/* Bottom row: two-column image grid */}
        <div className="mt-4 flex gap-3 sm:mt-6 sm:gap-4 md:gap-5">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4 md:gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.images[0]}
              alt={`${project.name} preview 1`}
              loading="lazy"
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.images[1]}
              alt={`${project.name} preview 2`}
              loading="lazy"
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div className="w-[60%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.images[2]}
              alt={`${project.name} preview 3`}
              loading="lazy"
              className="h-full w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
