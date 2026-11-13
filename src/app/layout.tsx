import type { Metadata, Viewport } from "next";
import { Kalam, Schibsted_Grotesk } from "next/font/google";
import Effects from "@/components/Effects";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { services, site } from "@/data/site";
import "./globals.css";

const display = Schibsted_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const hand = Kalam({ variable: "--font-hand", subsets: ["latin"], weight: ["400", "700"] });

const description =
  "Creative Works is a digital marketing and technology company in Vijayanagar, Bengaluru. Videos, design, websites, apps, social media and ads, from idea to measurable growth.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Creative Works | Digital Marketing & Technology Company in Bengaluru", template: "%s | Creative Works" },
  description,
  applicationName: site.legalName,
  keywords: ["digital marketing agency Bengaluru", "social media marketing", "website development", "app development", "video production", "Vijayanagar"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: site.legalName, title: "Creative Works | Creative Ideas. Powerful Execution. Measurable Growth.", description, url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0e2620" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  slogan: site.tagline.join(" "),
  parentOrganization: { "@type": "Organization", name: "SaiDurga Enterprises" },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: `${site.address.locality}, ${site.address.city}`,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: "IN",
  knowsAbout: services.map((s) => s.name),
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div className="stripe" aria-hidden="true" />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Effects />
      </body>
    </html>
  );
}
