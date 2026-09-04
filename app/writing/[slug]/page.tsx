import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostMeta, getPostSlugs } from "@/lib/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  return { title: meta.title };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const meta = getPostMeta(slug);

  return (
    <main className="container-sheet" style={{ paddingBlock: "3.5rem" }}>
      <article style={{ maxWidth: "640px" }}>
        <Link
          href="/writing"
          className="voice-type-caps quiet-link no-print"
          style={{ textDecoration: "none", color: "var(--ink-faded)" }}
        >
          ← All writing
        </Link>

        <p className="voice-type" style={{ color: "var(--ink-faded)", marginTop: "2.5rem" }}>
          Lawrence, KS · {meta.date}
        </p>
        <h1 className="display-title" style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>
          {meta.title}
        </h1>

        <div className="prose-block">
          <p>
            This note is still being drafted. MDX
            rendering will be wired up in <code>lib/mdx.ts</code>.
          </p>
        </div>
      </article>
    </main>
  );
}
