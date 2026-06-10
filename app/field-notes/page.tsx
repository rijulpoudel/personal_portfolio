import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Numbered notes from the field: on software, collections, and craft.",
};

export default function FieldNotesPage() {
  const posts = getAllPosts();

  return (
    <div className="container-sheet" style={{ paddingBlock: "3.5rem" }}>
      <p className="voice-institutional" style={{ marginBottom: "0.75rem" }}>
        Field Notes
      </p>
      <h1 className="display-title" style={{ marginBottom: "1rem" }}>
        Notes from the field.
      </h1>
      <p
        className="voice-reading"
        style={{ color: "var(--ink-faded)", maxWidth: "560px", marginBottom: "3rem" }}
      >
        Working notes on software, collections data, and craft. Numbered,
        dated, kept in order.
      </p>

      {posts.length === 0 ? (
        <p className="voice-type" style={{ color: "var(--ink-faded)" }}>
          The notebook is open but its first entry is still being written.
        </p>
      ) : (
        <div className="ledger">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/field-notes/${post.slug}`}
              className="ledger-row"
              style={{ gridTemplateColumns: "5rem 1fr 7rem" }}
            >
              <span className="ledger-acc">
                FN-{String(posts.length - i).padStart(3, "0")}
              </span>
              <span className="ledger-specimen">
                {post.title}
                <span className="arrow"> →</span>
              </span>
              <span style={{ color: "var(--ink-faded)" }}>{post.date}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
