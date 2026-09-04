"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";

const NAV_LINK =
  "text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip">
      <FadeIn onLoad delay={0} y={-20}>
        <nav className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          <a href="#about" className={NAV_LINK}>
            About
          </a>
          <Link href="/experience" className={NAV_LINK}>
            Experience
          </Link>
          <a href="#projects" className={NAV_LINK}>
            Projects
          </a>
          <a href="mailto:rijulpoudel72@gmail.com" className={NAV_LINK}>
            Contact
          </a>
        </nav>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn onLoad delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m rijul
          </h1>
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0">
        <FadeIn onLoad delay={0.6} y={30}>
          <Magnet>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile.jpg"
              alt="Rijul Poudel"
              className="w-[280px] object-cover sm:w-[360px] md:w-[440px] lg:w-[520px]"
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn onLoad delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            a developer driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn onLoad delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
