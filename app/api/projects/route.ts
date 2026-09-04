import { projects } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

/**
 * The projects, machine-readable.
 *
 *   curl rijulpoudel.com/api/projects
 */
export async function GET() {
  const records = projects.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    builtAt: s.builtAt,
    date: s.eventDate,
    year: s.year,
    location: s.location,
    team: s.team,
    format: s.format,
    stack: s.stack,
    status: s.status,
    ...(s.featured && { featured: true }),
    ...(s.awards && { awards: s.awards.map((d) => d.text) }),
    links: s.links,
    url: `${siteConfig.url}/projects/${s.slug}`,
  }));

  return Response.json(
    {
      meta: {
        title: "Projects · Rijul Poudel",
        author: siteConfig.author.name,
        recordCount: records.length,
        license: "content CC BY 4.0",
        note: "Yes, the portfolio has an API.",
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
