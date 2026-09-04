"use client";

import { useEffect } from "react";
import HeroSection from "./HeroSection";
import MarqueeSection from "./MarqueeSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import ProjectsSection from "./ProjectsSection";

export default function Landing() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBackground = html.style.background;
    const prevBodyBackground = body.style.background;
    html.style.background = "#0C0C0C";
    body.style.background = "#0C0C0C";
    return () => {
      html.style.background = prevHtmlBackground;
      body.style.background = prevBodyBackground;
    };
  }, []);

  return (
    <div className="font-kanit bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
