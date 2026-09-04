"use client";

import FadeIn from "./FadeIn";

const SERVICES = [
  {
    number: "01",
    name: "Web Development",
    description:
      "Full-stack web apps with React, TypeScript, Django, and MySQL — the same stack used by research institutions in dozens of countries.",
  },
  {
    number: "02",
    name: "Mobile Development",
    description:
      "Cross-platform mobile apps with React Native and Expo, from hackathon prototypes to real-time, location-aware products.",
  },
  {
    number: "03",
    name: "UI/UX Design",
    description:
      "Clean, modern interfaces with attention to layout, typography, and feel — software should be as considered as it is functional.",
  },
  {
    number: "04",
    name: "Brand & Graphic Design",
    description:
      "Cohesive visual identities and campaign graphics in Figma — work that has reached 1,400+ students across web and social.",
  },
  {
    number: "05",
    name: "Photography & Video",
    description:
      "Studio photography and videography through Crafteako, with a hand-built site and a performance-first image pipeline.",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative z-10 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          What I do
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl border-t border-[rgba(12,12,12,0.15)]">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div className="flex items-center gap-5 border-b border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12">
              <span
                className="font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>
              <div>
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
