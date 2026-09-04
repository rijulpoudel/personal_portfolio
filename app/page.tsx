import type { Metadata } from "next";
import PortfolioHome from "@/components/portfolio/PortfolioHome";

export const metadata: Metadata = {
  title: { absolute: "Rijul Poudel · Software Developer" },
};

export default function HomePage() {
  return <PortfolioHome />;
}
