import type { Book } from "@/data/books";

interface Props {
  book: Book;
}

export default function BookEntry({ book }: Props) {
  return (
    <div
      style={{
        paddingBlock: "1.25rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <p style={{ fontWeight: 500, color: "var(--text-primary)" }}>{book.title}</p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.2rem" }}>
          {book.author}
        </p>
        {book.note && (
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            {book.note}
          </p>
        )}
      </div>
      <p className="label-caps" style={{ whiteSpace: "nowrap" }}>{book.yearRead}</p>
    </div>
  );
}
