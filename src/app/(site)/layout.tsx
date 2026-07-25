import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PageTransition from "@/components/PageTransition";
import SkipLink from "@/components/SkipLink";
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
    alternateName: "DCLM Columbia",
    description: CHURCH.description[0] ?? undefined,
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
    areaServed: [
      { "@type": "City", name: "Columbia, Maryland" },
      { "@type": "AdministrativeArea", name: "Howard County, Maryland" },
      { "@type": "State", name: "Maryland" },
    ],
    knowsLanguage: ["en"],
    sameAs: [
      CHURCH.social.facebook,
      CHURCH.social.instagram,
      CHURCH.social.youtube,
    ].filter(Boolean),
    founder: {
      "@type": "Person",
      name: "Pastor Dr. William F. Kumuyi",
    },
    memberOf: {
      "@type": "Organization",
      name: "Deeper Christian Life Ministry",
      alternateName: "DCLM",
      description:
        "A Nigerian-founded, multinational holiness Christian denomination headquartered in Lagos, Nigeria, with branches across Africa, Europe, Asia, and the Americas.",
      url: "https://dclm.org/",
    },
    event: CHURCH.upcomingEvents.slice(0, 3).map((e) => ({
      "@type": "Event",
      name: e.title,
      startDate: e.date || undefined,
      location: {
        "@type": "Place",
        name: CHURCH.name,
        address: `${CHURCH.address.line1}, ${CHURCH.address.line2} ${CHURCH.address.line3}`,
      },
    })),
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkipLink />
      <ScrollProgressBar />
      <Header />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
