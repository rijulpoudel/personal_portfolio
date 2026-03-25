import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BookEntry from "@/components/ui/BookEntry";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Shelf",
  description: "Books I've read.",
};

export default function ShelfPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Shelf" />
      <div style={{ marginTop: "3rem", maxWidth: "640px" }}>
        {books.map((book, i) => (
          <BookEntry key={i} book={book} />
        ))}
      </div>
    </div>
  );
}
