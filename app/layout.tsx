import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Best Escorts in Uganda & Kampala Call Girls | Hex Escorts UG",
  description:
    "Top-rated Uganda escorts and hookup girls in Kampala. Browse verified profiles of independent call girls, erotic companions, and sexy girls in Uganda for 100% discreet bookings.",
  keywords: "escorts, uganda escorts, escorts in uganda, hookup girls, kampala escorts, escorts in kampala, call girls in kampala, hot girls in uganda, sexy girls kampala, hook ups ug",
  metadataBase: new URL('https://www.hexescortsug.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hex Escorts UG – Verified Escorts in Uganda",
    description:
      "Find premium verified escorts and companions in Uganda. Browse genuine profiles from Kampala, Entebbe, Jinja and more.",
    url: "https://www.hexescortsug.xyz",
    siteName: "Hex Escorts UG",
    locale: "en_UG",
    type: "website",
  },
  verification: {
    google: "GPTdzpbCAZkm2ngY85XrfQc-iNDolN3mBsRrbfzUDGY",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Replace G-XXXXXXXXXX with your actual ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <meta name="google-site-verification" content="a4cIerGGQNrp6mGtzm10LrttBGPE8lo6J3K2AAqHvho" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Hex Escorts UG",
                "url": "https://www.hexescortsug.xyz",
                "logo": "https://www.hexescortsug.xyz/favicon.ico",
                "sameAs": [
                  "https://x.com/vickywiz60",
                  "https://t.me/+1R927eT3ccg5N2Zk"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Hex Escorts UG",
                "image": "https://www.hexescortsug.xyz/favicon.ico",
                "@id": "https://www.hexescortsug.xyz",
                "url": "https://www.hexescortsug.xyz",
                "telephone": "+2560706089641",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kampala Road",
                  "addressLocality": "Kampala",
                  "addressRegion": "Central",
                  "postalCode": "0000",
                  "addressCountry": "UG"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 0.3476,
                  "longitude": 32.5825
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              }
            ])
          }}
        />
      </head>
      <body>
        <ScrollToTop />
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
