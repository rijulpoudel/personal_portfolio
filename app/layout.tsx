import type { Metadata } from "next";
import { Source_Serif_4, Courier_Prime, Noto_Serif_Devanagari, Kanit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { siteConfig } from "@/data/siteConfig";
import "@/styles/globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier-prime",
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400"],
  variable: "--font-devanagari",
  display: "swap",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: "%s · Catalog of Work · R. Poudel",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.title,
  },
  icons: {
    icon: "/images/profile.png",
    apple: "/images/profile.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${courierPrime.variable} ${notoDevanagari.variable} ${kanit.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
