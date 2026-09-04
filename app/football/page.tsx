import type { Metadata } from "next";
import FootballArchive from "@/components/football/FootballArchive";

export const metadata: Metadata = {
  title: "The Midfield Room",
  description:
    "Rijul Poudel's football room: a retro, interactive guestbook about Barcelona, midfielders, and the questions that keep a match alive.",
};

export default function FootballPage() {
  return <FootballArchive />;
}
