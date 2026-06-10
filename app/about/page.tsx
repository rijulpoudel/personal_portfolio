import type { Metadata } from "next";
import Image from "next/image";
import { books } from "@/data/books";
import { movies } from "@/data/movies";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "The Collector",
  description:
    "Poudel, Rijul (b. Kathmandu, Nepal). Collector active Lawrence, Kansas, 2023–. Fields: web systems, collections software, photography.",
};

export default function AboutPage() {
  return (
    <div className="container-sheet" style={{ paddingBlock: "3.5rem" }}>
      {/* ── Collector's biography ───────────────────────────────── */}
      <p className="voice-institutional" style={{ marginBottom: "0.75rem" }}>
        Biographical Note · From the Finding Aid
      </p>
      <h1 className="display-title" style={{ marginBottom: "2.5rem" }}>
        POUDEL, RIJUL{" "}
        <span style={{ fontWeight: 400, fontSize: "0.6em", color: "var(--ink-faded)" }}>
          (b. Kathmandu, Nepal · काठमाडौँ)
        </span>
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(min(100%, 380px), 640px) auto",
          gap: "3rem",
          alignItems: "start",
          flexWrap: "wrap",
        }}
        className="bio-grid"
      >
      <div className="prose-archive" style={{ maxWidth: "640px" }}>
        <p className="voice-type" style={{ color: "var(--ink-faded)" }}>
          Collector active Lawrence, Kansas, 2023–. Fields: web systems,
          collections software, photography.
        </p>
        <p>
          I build software for the people who keep the world&apos;s natural
          history. At the Specify Collections Consortium — based at the KU
          Biodiversity Institute — I work on Specify 7, the open-source
          platform museums and herbaria around the world use to catalog their
          specimens. It is the rare first job where the code you write helps
          keep two hundred years of collected knowledge findable.
        </p>
        <p>
          I&apos;m studying Computer Science with a Data Science minor at the
          University of Kansas (Honors Program, Dean&apos;s List, International
          Excellence Award, class of 2027). Outside of coursework I build at
          hackathons — most recently Aawaj, a tamper-proof civic reporting
          dApp that took Best Beginner Track at the Midwest Blockathon — and I
          care as much about how software feels as how it works.
        </p>
        <p>
          The other half of my practice is behind a camera.{" "}
          <a className="quiet-link" href="https://crafteako.com" target="_blank" rel="noopener noreferrer">
            Crafteako
          </a>{" "}
          is my photography and videography studio; its website is also the
          only project in this catalog built with no framework at all, on
          purpose. Before Kansas there was Kathmandu: math olympiad campaigns,
          a computational biology research program, and the habit of
          collecting things carefully.
        </p>
        <p>
          Correspondence:{" "}
          <a className="quiet-link" href={`mailto:${siteConfig.author.email}`}>
            {siteConfig.author.email}
          </a>
        </p>
      </div>

      <figure className="portrait-mount">
        <Image
          src="/images/profile.jpg"
          alt="Rijul Poudel"
          width={280}
          height={373}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <figcaption className="voice-type" style={{ marginTop: "0.625rem", textAlign: "center", color: "var(--ink-faded)" }}>
          The collector. Lawrence, Kansas.
        </figcaption>
      </figure>
      </div>

      {/* ── Specimens kept for personal study ───────────────────── */}
      <section style={{ marginTop: "5rem" }}>
        <h2 className="section-heading">Specimens Kept for Personal Study</h2>

        <p className="voice-type-caps" style={{ color: "var(--ink-faded)", margin: "1.5rem 0 0.5rem" }}>
          Books
        </p>
        <div>
          {books.map((b) => (
            <div key={b.title} className="study-row">
              <span className="study-title">{b.title}</span>
              <span className="study-meta">{b.author}</span>
              <span className="study-meta">{b.yearRead}</span>
            </div>
          ))}
        </div>

        <p className="voice-type-caps" style={{ color: "var(--ink-faded)", margin: "2.5rem 0 0.5rem" }}>
          Films
        </p>
        <div>
          {movies.map((m) => (
            <div key={m.title} className="study-row">
              <span className="study-title">{m.title}</span>
              <span className="study-meta">{m.genre?.join(", ")}</span>
              <span className="study-meta">{m.year}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
