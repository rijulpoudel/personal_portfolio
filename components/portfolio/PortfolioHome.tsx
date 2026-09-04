import BlackboardStudio from "./BlackboardStudio";
import ContactSection from "./ContactSection";
import ExperienceTimeline from "./ExperienceTimeline";
import Hero from "./Hero";
import LatelySection from "./LatelySection";
import ProjectIndex from "./ProjectIndex";
import SiteHeader from "./SiteHeader";

export default function PortfolioHome() {
  return (
    <div className="portfolio-site">
      <BlackboardStudio />
      <a className="portfolio-skip-link" href="#portfolio-main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="portfolio-main" tabIndex={-1}>
        <Hero />
        <LatelySection />
        <ExperienceTimeline />
        <ProjectIndex />
      </main>
      <ContactSection />
    </div>
  );
}
