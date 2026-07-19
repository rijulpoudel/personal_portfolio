import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";

export const metadata: Metadata = {
  title: { absolute: "Rijul Poudel — Developer & Designer" },
};

export default function HomePage() {
  return <Landing />;
}
