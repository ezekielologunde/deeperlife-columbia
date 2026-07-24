import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://deeperlifecolumbia.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Deeper Life Bible Church Columbia | Columbia, MD",
    template: "%s | Deeper Life Bible Church Columbia",
  },
  description:
    "The citadel for Christ-centered living in Columbia, Maryland — a family-oriented church for true worship, undiluted teaching, and the Gospel of Jesus Christ.",
  keywords: [
    "Deeper Life Bible Church",
    "Deeper Life Columbia",
    "Deeper Christian Life Ministry",
    "DCLM",
    "church in Columbia Maryland",
    "Bible church Howard County",
    "Pastor Ahmed J. Adeyemi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Deeper Life Bible Church Columbia",
    title: "Deeper Life Bible Church Columbia | Columbia, MD",
    description:
      "The citadel for Christ-centered living in Columbia, Maryland — a family-oriented church for true worship, undiluted teaching, and the Gospel of Jesus Christ.",
    images: ["/images/gallery/congregation-wide.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Life Bible Church Columbia | Columbia, MD",
    description:
      "The citadel for Christ-centered living in Columbia, Maryland — a family-oriented church for true worship, undiluted teaching, and the Gospel of Jesus Christ.",
    images: ["/images/gallery/congregation-wide.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
