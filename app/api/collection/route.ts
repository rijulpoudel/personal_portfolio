import { specimens } from "@/data/collection";
import { siteConfig } from "@/data/siteConfig";

/**
 * The catalog, machine-readable.
 * Fields follow Darwin Core (https://dwc.tdwg.org) where they fit;
 * the same standard the Specify platform speaks.
 *
 *   curl rijulpoudel.com/api/collection
 */
export async function GET() {
  const records = specimens.map((s) => ({
    type: "SoftwareSpecimen",
    catalogNumber: s.accession,
    scientificName: s.title,
    vernacularName: s.commonName,
    ...(s.nepali && {
      nameAccordingTo: `${s.nepali.script} · Nepali, "${s.nepali.meaning}"`,
    }),
    recordedBy: s.collectors,
    eventDate: s.eventDate,
    year: s.year,
    samplingProtocol: s.method,
    locality: s.locality,
    occurrenceRemarks: s.description,
    occurrenceStatus: s.status,
    ...(s.holotype && { typeStatus: "holotype" }),
    ...(s.determinations && {
      identificationRemarks: s.determinations.map((d) => d.text),
    }),
    associatedReferences: Object.values(s.links).filter(Boolean),
    dynamicProperties: {
      substrate: s.substrate,
      annotations: s.annotations,
    },
  }));

  return Response.json(
    {
      meta: {
        title: "Catalog of Work · R. Poudel, Collector",
        recordedBy: siteConfig.author.name,
        institution: siteConfig.url,
        standard: "Darwin Core, applied loosely and with affection",
        recordCount: records.length,
        license: "content CC BY 4.0",
        note: "Yes, the portfolio has an API. The collector works on collections software.",
      },
      records,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    }
  );
}
