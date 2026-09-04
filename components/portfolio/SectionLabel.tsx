import type { ReactNode } from "react";

interface SectionLabelProps {
  index?: string;
  children: ReactNode;
  inverse?: boolean;
}

export default function SectionLabel({
  index,
  children,
  inverse = false,
}: SectionLabelProps) {
  return (
    <p
      className="section-label"
      data-inverse={inverse ? "true" : undefined}
    >
      {index ? (
        <span className="section-label__index" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}