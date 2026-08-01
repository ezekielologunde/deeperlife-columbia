import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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

const SITE_DESCRIPTION =
  "A Bible church in Columbia, Maryland welcoming all nations for Christ-centered worship, undiluted Bible teaching, and the Gospel of Jesus Christ. Part of Deeper Christian Life Ministry (DCLM), a Nigerian-founded, multinational holiness church with roots in Lagos, Nigeria and branches across Africa, Europe, Asia, and the Americas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Deeper Life Bible Church Columbia, MD | Bible Church for All Nations",
    template: "%s | Deeper Life Bible Church Columbia",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Deeper Life Bible Church",
    "Deeper Life Columbia",
    "Deeper Christian Life Ministry",
    "DCLM",
    "Bible church in Columbia Maryland",
    "Bible church Howard County MD",
    "church near Columbia MD",
    "African church Columbia Maryland",
    "African church Howard County",
    "Nigerian church Maryland",
    "Nigerian church near me",
    "Nigerian community church Columbia MD",
    "holiness church Maryland",
    "DCLM Maryland",
    "Pastor Ahmed J. Adeyemi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Deeper Life Bible Church Columbia",
    title: "Deeper Life Bible Church Columbia, MD | Bible Church for All Nations",
    description: SITE_DESCRIPTION,
    images: ["/images/gallery/congregation-wide.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Life Bible Church Columbia, MD | Bible Church for All Nations",
    description: SITE_DESCRIPTION,
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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
