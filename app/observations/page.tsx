import type { Metadata } from "next";
import Image from "next/image";
import { observations } from "@/data/observations";
import { PlateIllustration } from "@/components/ui/engravings";

export const metadata: Metadata = {
  title: "Field Observations",
  description:
    "Photographs from the field, each with its collection data: date, locality, camera, exposure.",
};

export default function ObservationsPage() {
  return (
    <div className="container-page" style={{ paddingBlock: "3.5rem" }}>
      <p className="voice-institutional" style={{ marginBottom: "0.75rem" }}>
        Field Observations
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Photographs from the field.
      </h1>
      <p
        className="voice-reading"
        style={{ color: "var(--ink-faded)", maxWidth: "560px", marginBottom: "3.5rem" }}
      >
        Each one recorded with its collection data: date, locality,
        instrument, exposure. The full archive lives at{" "}
        <a className="quiet-link" href="https://crafteako.com" target="_blank" rel="noopener noreferrer">
          Crafteako
        </a>
        .
      </p>

      {observations.length === 0 ? (
        <>
        <figure className="plate" style={{ marginBottom: "2rem" }}>
          <figcaption className="plate-roman">Plate I</figcaption>
          <PlateIllustration kind="camera" size={168} className="plate-art" />
          <p className="plate-caption">
            fig. 1. field camera, bellows type. The instrument of observation.
          </p>
        </figure>
        <div className="annotation-slip" style={{ maxWidth: "480px" }}>
          <span className="ann-date">ann. 2026. </span>
          The field photographs in this catalog are being digitized. Until
          then, the archive is on view at{" "}
          <a className="quiet-link" href="https://crafteako.com" target="_blank" rel="noopener noreferrer">
            crafteako.com
          </a>
          . <span className="ann-date">· R.P.</span>
        </div>
        </>
      ) : (
        <div style={{ display: "grid", gap: "4.5rem" }}>
          {observations.map((o) => (
            <figure key={o.number} style={{ margin: 0 }}>
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
                  {o.number} · {o.title}
                </strong>
                <br />
                {o.date} · {o.locality}
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
    </div>
  );
}
