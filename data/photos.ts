/**
 * Photos: pictures, each with its photo data.
 * Add image files under /public/photos/ and register them here.
 * EXIF fields are recorded manually for now (camera, lens, exposure).
 */

export interface Photo {
  /** PH-YYYY-NNN */
  id: string;
  src: string; // path under /public
  alt: string;
  title: string;
  date: string; // YYYY-MM-DD or YYYY-MM
  location: string;
  camera?: string;
  lens?: string;
  exposure?: string; // e.g. "1/250 · f/2.8 · ISO 400"
  note?: string;
}

export const photos: Photo[] = [
  // TODO(rijul): add photographs, e.g.:
  // {
  //   id: "PH-2025-001",
  //   src: "/photos/massachusetts-street-dusk.jpg",
  //   alt: "Massachusetts Street at dusk, Lawrence, Kansas",
  //   title: "Massachusetts Street, dusk",
  //   date: "2025-10",
  //   location: "Lawrence, KS",
  //   camera: "Sony A7 III",
  //   lens: "35mm f/1.8",
  //   exposure: "1/160 · f/2.2 · ISO 800",
  // },
];
