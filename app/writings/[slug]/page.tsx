import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <article style={{ maxWidth: "680px", marginInline: "auto" }}>
        <h1 className="text-h1" style={{ marginBottom: "0.5rem" }}>
          {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h1>
        <p className="label-caps" style={{ marginBottom: "3rem" }}>2026-03-24</p>
        <div style={{ lineHeight: "1.7", color: "var(--text-primary)" }}>
          <p>MDX content will be rendered here once lib/mdx.ts is wired up.</p>
        </div>
      </article>
    </div>
  );
}
