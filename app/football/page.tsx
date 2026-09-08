import type { Metadata } from "next";
import FootballArchive from "@/components/football/FootballArchive";

export const metadata: Metadata = {
  title: "My Football Room",
  description:
    "The players Rijul loves, the football he plays, and a tactics board for questions from other supporters.",
};

export default function FootballPage() {
  return <FootballArchive />;
}
