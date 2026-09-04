import SectionLabel from "./SectionLabel";

export default function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="portfolio-shell about-section__grid">
        <div>
          <SectionLabel index="05">About</SectionLabel>
          <h2 id="about-title">
            Bharatpur shaped the questions. Kansas sharpened the tools.
          </h2>
        </div>

        <div className="about-section__copy">
          <p>
            I build software for the people who keep the world&apos;s natural
            history. At the Specify Collections Consortium, I work on Specify
            7, open-source software used around the world to manage natural
            history collections.
          </p>
          <p>
            I&apos;m studying Computer Science with a Data Science minor at the
            University of Kansas, graduating in 2027. Before Kansas, there were
            math-olympiad campaigns, computational biology research, and design
            work in Nepal. That mix still shapes how I approach systems: make
            the structure rigorous and the interface humane.
          </p>
          <blockquote>
            I care as much about how software feels as how it works.
          </blockquote>
          <div className="about-section__links">
            <a className="portfolio-text-link" href="/about">
              More about me <span aria-hidden="true">→</span>
            </a>
            <a
              className="portfolio-text-link"
              href="https://crafteako.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Photography at Crafteako <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
