import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photographs, each with its photo data: date, location, camera, exposure.",
};

export default function PhotosPage() {
  return (
    <main className="container-page" style={{ paddingBlock: "3.5rem" }}>
      <p className="voice-kicker" style={{ marginBottom: "0.75rem" }}>
        Photos
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Photographs.
      </h1>
      <p
        className="voice-reading"
        style={{ color: "var(--ink-faded)", maxWidth: "560px", marginBottom: "3.5rem" }}
      >
        Each one recorded with its photo data: date, location,
        camera, exposure. The full gallery lives at{" "}
        <a className="quiet-link" href="https://crafteako.com" target="_blank" rel="noopener noreferrer">
          Crafteako
        </a>
        .
      </p>

      {photos.length === 0 ? (
        <>
        <div className="note-slip" style={{ maxWidth: "480px" }}>
          <span className="note-date">2026. </span>
          The photographs for this page are being digitized. Until
          then, everything is on view at{" "}
          <a className="quiet-link" href="https://crafteako.com" target="_blank" rel="noopener noreferrer">
            crafteako.com
          </a>
          . <span className="note-date">· R.P.</span>
        </div>
        </>
      ) : (
        <div style={{ display: "grid", gap: "4.5rem" }}>
          {photos.map((o) => (
            <figure key={o.id} style={{ margin: 0 }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  border: "1px solid var(--rule)",
                }}
              >
                <Image
                  src={o.src}
                  alt={o.alt}
                  width={1600}
                  height={1067}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <figcaption
                className="voice-type"
                style={{ marginTop: "0.75rem", color: "var(--ink-faded)", lineHeight: 1.7 }}
              >
                <strong style={{ color: "var(--ink)" }}>
                  {o.id} · {o.title}
                </strong>
                <br />
                {o.date} · {o.location}
                {o.camera && (
                  <>
                    {" "}
                    · {o.camera}
                    {o.lens && `, ${o.lens}`}
                  </>
                )}
                {o.exposure && <> · {o.exposure}</>}
                {o.note && (
                  <>
                    <br />
                    {o.note}
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}
