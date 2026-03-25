import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type PreProps = ComponentPropsWithoutRef<"pre">;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-h1" style={{ marginTop: "2rem", marginBottom: "0.75rem" }} {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-h2" style={{ marginTop: "2rem", marginBottom: "0.75rem" }} {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-h3" style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }} {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p style={{ lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "1rem" }} {...props} />
  ),
  a: (props: AnchorProps) => (
    <a
      style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  code: (props: CodeProps) => (
    <code
      style={{
        backgroundColor: "var(--bg-secondary)",
        padding: "0.1rem 0.35rem",
        borderRadius: "0.25rem",
        fontSize: "0.875em",
        fontFamily: "var(--font-geist-mono)",
      }}
      {...props}
    />
  ),
  pre: (props: PreProps) => (
    <pre
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: "0.5rem",
        padding: "1.25rem",
        overflowX: "auto",
        marginBlock: "1.5rem",
        fontSize: "0.875rem",
        lineHeight: "1.6",
      }}
      {...props}
    />
  ),
};

export default components;
