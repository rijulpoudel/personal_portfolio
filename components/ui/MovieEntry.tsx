import type { Movie } from "@/data/movies";

interface Props {
  movie: Movie;
}

export default function MovieEntry({ movie }: Props) {
  return (
    <div
      style={{
        paddingBlock: "0.875rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{movie.title}</span>
        {movie.note && (
          <span style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginLeft: "0.75rem" }}>
            — {movie.note}
          </span>
        )}
      </div>
      <p className="label-caps" style={{ whiteSpace: "nowrap" }}>{movie.year}</p>
    </div>
  );
}
