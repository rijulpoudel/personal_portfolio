/**
 * Field observations: photographs, each with its collection data.
 * Add image files under /public/observations/ and register them here.
 * EXIF fields are recorded manually for now (camera, lens, exposure).
 */

export interface Observation {
  /** OBS-YYYY-NNN */
  number: string;
  src: string; // path under /public
  alt: string;
  title: string;
  date: string; // YYYY-MM-DD or YYYY-MM
  locality: string;
  camera?: string;
  lens?: string;
  exposure?: string; // e.g. "1/250 · f/2.8 · ISO 400"
  note?: string;
}

export const observations: Observation[] = [
  // TODO(rijul): add field photographs, e.g.:
  // {
  //   number: "OBS-2025-001",
  //   src: "/observations/massachusetts-street-dusk.jpg",
  //   alt: "Massachusetts Street at dusk, Lawrence, Kansas",
  //   title: "Massachusetts Street, dusk",
  //   date: "2025-10",
  //   locality: "Lawrence, KS",
  //   camera: "Sony A7 III",
  //   lens: "35mm f/1.8",
  //   exposure: "1/160 · f/2.2 · ISO 800",
  // },
];
