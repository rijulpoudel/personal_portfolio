export interface Movie {
  title: string;
  year: number;
  tier: "S" | "A" | "B" | "C" | "D";
  genre?: string[];
  note?: string;
}

export const movies: Movie[] = [
  {
    title: "Mulholland Drive",
    year: 2001,
    tier: "S",
    genre: ["Mystery", "Drama"],
    note: "Lynch at his most Lynch.",
  },
  {
    title: "Parasite",
    year: 2019,
    tier: "S",
    genre: ["Thriller", "Drama"],
    note: "Flawless.",
  },
  {
    title: "Placeholder Film",
    year: 2020,
    tier: "A",
    genre: ["Drama"],
  },
];
