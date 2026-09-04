import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing",
  description: "Numbered notes on software, data, and craft.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <main className="container-sheet" style={{ paddingBlock: "3.5rem" }}>
      <p className="voice-kicker" style={{ marginBottom: "0.75rem" }}>
        Writing
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Notes, kept in order.
      </h1>
      <p
        className="voice-reading"
        style={{ color: "var(--ink-faded)", maxWidth: "560px", marginBottom: "3rem" }}
      >
        Working notes on software, data, and craft. Numbered,
        dated, kept in order.
      </p>

      {posts.length === 0 ? (
        <p className="voice-type" style={{ color: "var(--ink-faded)" }}>
          The notebook is open but its first entry is still being written.
        </p>
      ) : (
        <div className="note-index">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="note-row"
              style={{ gridTemplateColumns: "5rem 1fr 7rem" }}
            >
              <span className="note-num">
                FN-{String(posts.length - i).padStart(3, "0")}
              </span>
              <span className="note-title">
                {post.title}
                <span className="arrow"> →</span>
              </span>
              <span style={{ color: "var(--ink-faded)" }}>{post.date}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
