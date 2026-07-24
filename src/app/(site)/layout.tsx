import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PageTransition from "@/components/PageTransition";
import { getChurchData } from "@/lib/data";

const SITE_URL = "https://deeperlifecolumbia.org";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CHURCH = await getChurchData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: CHURCH.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.jpg`,
    image: `${SITE_URL}/images/gallery/congregation-wide.jpg`,
    telephone: CHURCH.phone,
    email: CHURCH.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CHURCH.address.line1,
      addressLocality: "Columbia",
      addressRegion: "MD",
      postalCode: "21045",
      addressCountry: "US",
    },
    sameAs: [
      CHURCH.social.facebook,
      CHURCH.social.instagram,
      CHURCH.social.youtube,
    ],
    founder: {
      "@type": "Person",
      name: "Pastor Dr. William F. Kumuyi",
    },
    memberOf: {
      "@type": "Organization",
      name: "Deeper Christian Life Ministry",
      url: "https://dclm.org/",
    },
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
