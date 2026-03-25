import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Writings",
  description: "Things I've written down.",
};

// Placeholder posts — replace with real MDX data via lib/mdx.ts
const posts = [
  {
    slug: "my-first-post",
    title: "My First Post",
    date: "2026-03-24",
    excerpt: "A placeholder post to get things started.",
  },
];

export default function WritingsPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Writings" />
      <div style={{ marginTop: "3rem", maxWidth: "640px" }}>
        {posts.map((post) => (
          <div
            key={post.slug}
            style={{ paddingBlock: "1.5rem", borderBottom: "1px solid var(--border)" }}
          >
            <Link href={`/writings/${post.slug}`} style={{ textDecoration: "none" }}>
              <h3 className="text-h3" style={{ color: "var(--text-primary)" }}>
                {post.title}
              </h3>
            </Link>
            <p className="label-caps" style={{ marginTop: "0.25rem" }}>{post.date}</p>
            {post.excerpt && (
              <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.9375rem" }}>
                {post.excerpt}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
