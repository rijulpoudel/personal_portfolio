"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";

const MOON_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";
const OBJECT_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png";
const LEGO_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png";
const GROUP_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png";

const ABOUT_TEXT =
  "I'm a software developer at the Specify Collections Consortium, building open-source software used around the world for natural history collections. CS at the University of Kansas, class of 2027. I build at hackathons, shoot for my studio Crafteako, and care as much about how software feels as how it works. Let's build something incredible together!";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {/* Decorative corner images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute left-[1%] top-[4%] sm:left-[2%] md:left-[4%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MOON_URL} alt="" loading="lazy" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={OBJECT_URL} alt="" loading="lazy" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute right-[1%] top-[4%] sm:right-[2%] md:right-[4%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LEGO_URL} alt="" loading="lazy" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={GROUP_URL} alt="" loading="lazy" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeIn>

      {/* Centered content */}
      <div className="flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>
        <AnimatedText
          text={ABOUT_TEXT}
          className="mt-10 max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA] sm:mt-14 md:mt-16"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        />
        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
