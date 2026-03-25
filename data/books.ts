export interface Book {
  title: string;
  author: string;
  yearRead: number;
  note?: string;
  rating?: number;
}

export const books: Book[] = [
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    yearRead: 2025,
    note: "Required reading for anyone who builds things.",
    rating: 5,
  },
  {
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    yearRead: 2025,
    note: "Changed how I think about complexity.",
    rating: 5,
  },
  {
    title: "Placeholder Book",
    author: "Placeholder Author",
    yearRead: 2024,
    rating: 4,
  },
];
