import fs from "fs";
import path from "path";

const WRITINGS_DIR = path.join(process.cwd(), "content", "writings");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

/** Return slugs for all .mdx files in content/writings. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(WRITINGS_DIR)) return [];
  return fs
    .readdirSync(WRITINGS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Read and parse frontmatter from a single post. */
export function getPostMeta(slug: string): PostMeta {
  // Placeholder — wire up gray-matter or next-mdx-remote when ready.
  return {
    slug,
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    date: new Date().toISOString().split("T")[0],
  };
}

/** Return all posts sorted by date descending. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
