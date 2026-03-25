import { ArrowUpRight } from "lucide-react";

interface Props {
  href: string;
  label: string;
}

export default function ExternalLink({ href, label }: Props) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.2rem",
        fontSize: "0.875rem",
        color: "var(--accent)",
        textDecoration: "none",
      }}
    >
      {label}
      <ArrowUpRight size={14} />
    </a>
  );
}
