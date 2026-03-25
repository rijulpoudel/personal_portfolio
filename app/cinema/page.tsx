import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import MovieEntry from "@/components/ui/MovieEntry";
import { movies } from "@/data/movies";

export const metadata: Metadata = {
  title: "Cinema",
  description: "Films I love, ranked.",
};

const tiers = ["S", "A", "B", "C"] as const;

export default function CinemaPage() {
  return (
    <div className="container-page" style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <PageHeader title="Cinema" />
      <div style={{ marginTop: "3rem", maxWidth: "640px" }}>
        {tiers.map((tier) => {
          const tierMovies = movies.filter((m) => m.tier === tier);
          if (!tierMovies.length) return null;
          return (
            <div key={tier} style={{ marginBottom: "3rem" }}>
              <p className="label-caps" style={{ marginBottom: "1rem" }}>{tier} Tier</p>
              {tierMovies.map((movie, i) => (
                <MovieEntry key={i} movie={movie} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
